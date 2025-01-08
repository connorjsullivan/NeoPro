const fs = require('fs').promises; // Use the promise-based version of the fs module
const cheerio = require('cheerio');
const path = require('path');


function parseItemsFromHTML(html) {
    const $ = cheerio.load(html);
    const items = [];

    // Select each "shop-item" equivalent container
    $('div > p').each((index, element) => {
        const name = $(element).find('a.no-link-icon').last().text().trim(); // Get item name
        const imgURL = $(element).find('img.item-result-image').attr('src'); // Get image URL
        const titleText = $(element).find('img.item-result-image').attr('title'); // Get title (includes rarity)
        const rarity = titleText?.match(/r\d+/)?.[0]; // Extract rarity (e.g., r99)
        const priceText = $(element).find('.price-history-link').text().trim(); // Get price text
        const resale_price = parseInt(priceText.replace(/,/g, '').match(/\d+/)?.[0] || 0, 10); // Convert to number

        // Only add the item if a name and image URL exist
        if (name && imgURL) {
            items.push({
                name,
                store_price: 0, // Default value (can be updated later)
                resale_price,
                percent_profit: 0, // Default value
                rarity,
                imgURL,
            });
        }
    });

    console.log('Parsed items:', items); // Debug log to verify parsing
    return items;
}

async function updatePricesJsonSafe(newItems) {
    const filePath = path.join(__dirname, 'Prices.json');
    try {
        let data = await fs.readFile(filePath, 'utf8');
        console.log('Original file contents:', data);

        let existingItems = [];
        if (data) {
            const json = JSON.parse(data);
            existingItems = json.Prices || [];
        }
        console.log('Existing items:', existingItems);

        const itemsMap = new Map(existingItems.map(item => [item.name, item]));
        newItems.forEach(item => {
            itemsMap.set(item.name, item);
        });

        const updatedItems = Array.from(itemsMap.values());
        console.log('Updated items:', updatedItems);

        await fs.writeFile(filePath, JSON.stringify({ Prices: updatedItems }, null, 2), 'utf8');
        console.log('Prices.json has been updated successfully!');
    } catch (err) {
        console.error('Error updating JSON file:', err);
    }
}

async function extractDataAndUpdateJSON(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        console.log(`Reading file: ${filePath}`);
        const items = parseItemsFromHTML(data);
        console.log('Parsed items:', items);
        await updatePricesJsonSafe(items);
    } catch (err) {
        console.error(`Error reading the HTML file ${filePath}:`, err);
    }
}

async function processMultipleFiles() {
    try {
        const dirPath = path.join(__dirname, 'htmltoIngestCLEARWHENDONE');
        const files = await fs.readdir(dirPath);

        for (let file of files) {
            const filePath = path.join(dirPath, file);
            if (file.endsWith('.html')) {
                console.log(`Processing file: ${filePath}`);
                await extractDataAndUpdateJSON(filePath);
            }
        }
    } catch (err) {
        console.error('Error reading the directory or files:', err);
    }
}

processMultipleFiles().then(() => console.log('All files processed.'));
