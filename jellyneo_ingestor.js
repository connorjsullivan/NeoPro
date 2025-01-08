const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

// Function to parse HTML and extract item details
const parseItemsFromHTML = (html) => {
    const $ = cheerio.load(html);
    const items = [];

    $('.jnflex-grid div').each((index, element) => {
        const name = $(element).find('a.no-link-icon').last().text().trim();
        const imgURL = $(element).find('img.item-result-image').attr('src');
        const titleText = $(element).find('img.item-result-image').attr('title');
        const rarity = titleText ? titleText.match(/r\d+/)[0] : undefined;
        let priceText = $(element).find('.text-small a.price-history-link').text().trim();
        const priceMatch = priceText.replace(/,/g, '').match(/(\d+)/);
        const resale_price = priceMatch ? parseInt(priceMatch[0], 10) : 0; // Use 0 if price is not found

        if (name && imgURL && rarity) { // Ensure we have the basic required data
            items.push({
                name,
                store_price: 0,
                resale_price,
                percent_profit: 0,
                rarity,
                imgURL
            });
        }
    });

    return items;
};

// Function to read, update, and write the Prices.json file
function updatePricesJson(newItems) {
  const filePath = path.join(__dirname, 'Prices.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    let existingItems = [];

    if (!err && data) {
      try {
        const json = JSON.parse(data);
        existingItems = json.Prices || [];
      } catch (parseErr) {
        console.error('Error parsing JSON from file:', parseErr);
        return;
      }
    }

    const itemsMap = new Map(existingItems.map(item => [item.name, item]));

    newItems.forEach(item => {
      itemsMap.set(item.name, item);
    });

    const updatedItems = Array.from(itemsMap.values());

    fs.writeFile(filePath, JSON.stringify({ Prices: updatedItems }, null, 2), 'utf8', writeErr => {
      if (writeErr) {
        console.error('Error writing to JSON file:', writeErr);
        return;
      }
      console.log('Prices.json has been updated successfully!');
    });
  });
}

// Function to read HTML, parse it, and update the JSON file with new data
function extractDataAndUpdateJSON() {
  fs.readFile('clothes14.html', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the HTML file:', err);
      return;
    }

    // Parse the HTML and extract items
    const items = parseItemsFromHTML(data);

    // Update the Prices.json file with the new items
    updatePricesJson(items);
  });
}

// Call the function to extract data and update the JSON file
extractDataAndUpdateJSON();
