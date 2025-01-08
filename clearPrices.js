
// File to Clear Prices.json (in case of data quality clean up )
// File will
    //Store Prices.json in archive in case of back-up required in oldPrices file with an iterative name
    //Clear Prices.json

    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, 'Prices.json');
    const archiveDir = path.join(__dirname, 'archive');
    
    // Ensure the archive directory exists
    if (!fs.existsSync(archiveDir)) {
        fs.mkdirSync(archiveDir);
    }
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading Prices.json:', err);
            return;
        }
    
        try {
            const json = JSON.parse(data);
    
            // Archive the old Prices.json with a timestamp in its filename
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // e.g., 2025-01-07T10-34-56-123Z
            const oldFilePath = path.join(archiveDir, `Prices_${timestamp}.json`);
            fs.writeFileSync(oldFilePath, data, 'utf8');
            console.log(`Archived old Prices.json as ${oldFilePath}`);
    
            // Clear Prices.json
            json.Prices = [];
            fs.writeFile(filePath, JSON.stringify(json, null, 2), 'utf8', writeErr => {
                if (writeErr) {
                    console.error('Error writing to JSON file:', writeErr);
                    return;
                }
                console.log('Prices.json has been cleared successfully!');
            });
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
        }
    });