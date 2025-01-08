//Hi thanks for reading my first public user facing program!



// NTD:
    // 1. Let Prices reference another file / live database
    // 2. List Shops where prices are supported (and other information on rarities)
    // 3. Handle scenario of INFLATION ADJUSTED ITEMS
    // 4. Add optional chaining (`?.`) for `Prices.find` in `matchDetailsFromPrices`
    // 5. Modularize `initNeoPro` for reusability
    // 6. Add debugging logs to key operations (e.g., `fetchPrices`, `createLoadButton`)
    // 7. Add fallback handling for empty `Prices` in `highlightItemsByRarity`
    // 8. Improve responsiveness of the `neoProOverlay` with better CSS
    // 9. Add optional chaining (`?.`) for missing attributes in `pullData`

    console.log("main.js loaded successfully!");


    async function fetchPrices() {
        const url = 'https://raw.githubusercontent.com/connorjsullivan/NeoPro/main/Prices.json';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json(); // `data` contains { Prices: [...] }
            console.log('Prices loaded:', data.Prices); // Log the actual array
            return data.Prices; // Return only the array
        } catch (error) {
            console.error('Error fetching Prices:', error);
            return []; // Return an empty array on failure
        }
    }
    (async function() {
        'use strict';
    
        let Prices = [];

    
        // Function to extract data from shop items with the format matching "Prices"
        function pullData() {
            const items = [];
            document.querySelectorAll('.shop-item .item-img').forEach(element => {
                const name = element.getAttribute('data-name') || 'Name not found';
                const store_price = parseInt(element.getAttribute('data-price').replace(/,/g, ''), 10) || 0;
    
                items.push({
                    name,
                    store_price: store_price,
                    resale_price: 0, // Default or lookup from Prices data
                    percent_profit: 0, // Calculated later
                    rarity: "r0", // Default or lookup from Prices data
                    imgURL: element.src || 'URL not found', // Assuming element has src attribute
                });
            });
            return matchDetailsFromPrices(items);
        }
    
        // Function to match and merge details from Prices data into pulled data
        function matchDetailsFromPrices(items) {
            return items.reduce((acc, item) => {
                const matchedItem = Prices.find(priceItem => priceItem.name === item.name);
                if (matchedItem) {
                    acc.push({
                        ...item,
                        resale_price: matchedItem.resale_price,
                        rarity: matchedItem.rarity,
                        imgURL: matchedItem.imgURL,
                    });
                }
                return acc;
            }, []);
        }
    
    
        function calculateProfitPercentage(items) {
            return items.map(item => {
                if (item.resale_price && item.store_price) {
                    item.percent_profit = ((item.resale_price - item.store_price) / item.store_price) * 100;
                } else {
                    item.percent_profit = 0; // No profit if either price is missing
                }
                return item;
            });
        }
    
        function sortdict(items) {
        return items.sort((a, b) => b.percent_profit - a.percent_profit);
    }
    
           function highlightItemsByRarity() {
            Prices.forEach(item => {
                const itemElement = document.querySelector(`img[src="${item.imgURL}"]`);
                if (itemElement) {
                    const rarity = parseInt(item.rarity.substring(1), 10); // Convert rarity string r90 to integer 90
                    let backgroundColor = '';
                    if (rarity >= 90 && rarity <= 94) {
                        backgroundColor = 'lightyellow';
                    } else if (rarity >= 95 && rarity <= 96) {
                        backgroundColor = 'orange';
                    } else if (rarity === 97) {
                        backgroundColor = 'red';
                    } else if (rarity === 98) {
                        backgroundColor = 'green';
                    } else if (rarity === 99) {
                        backgroundColor = 'purple';
                    }
    
                    if (backgroundColor) {
                        itemElement.parentNode.style.backgroundColor = backgroundColor; // Assuming the img element is wrapped by a parent element you want to highlight
                    }
                }
            });
        }
    
    
        function displayProcessedItems(items) {
            let overlay = document.getElementById('neoProOverlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'neoProOverlay';
                overlay.style.position = 'fixed';
                overlay.style.top = '50px';
                overlay.style.right = '10px';
                overlay.style.backgroundColor = '#fff';
                overlay.style.border = '1px solid #000';
                overlay.style.padding = '10px';
                overlay.style.width = '300px';
                overlay.style.height = 'auto';
                overlay.style.zIndex = '1600';
                overlay.style.overflowY = 'scroll';
                overlay.style.maxHeight = '90%';
                document.body.appendChild(overlay);
            }
            overlay.innerHTML = ''; // Clear existing content
    
            // Check if items array is empty and display "No Rare Items Found" message if true
            if (items.length === 0) {
                const noItemsMessage = document.createElement('div');
                noItemsMessage.textContent = 'No Rare Items Found';
                noItemsMessage.style.textAlign = 'center';
                noItemsMessage.style.marginTop = '20px';
                overlay.appendChild(noItemsMessage);
            } else {
                items.forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.style.marginBottom = '10px';
    
                    if (item.imgURL) {
                        const imgElement = document.createElement('img');
                        imgElement.src = item.imgURL;
                        imgElement.style.width = '100px';
                        imgElement.style.height = '100px';
                        imgElement.style.display = 'block';
                        itemElement.appendChild(imgElement);
                    }
    
                    const textElement = document.createElement('div');
                    textElement.textContent = `${item.name} - Profit: ${item.percent_profit.toFixed(2)}%`;
                    textElement.style.marginTop = '5px';
    
                    itemElement.appendChild(textElement);
                    overlay.appendChild(itemElement);
                });
            }
        }
    
        function createLoadButton() {
            const loadButton = document.createElement('button');
            loadButton.textContent = "Load NeoPro";
            loadButton.style.position = 'fixed';
            loadButton.style.top = '10px';
            loadButton.style.left = '10px';
            loadButton.style.zIndex = '1500';
            loadButton.style.padding = '10px 20px';
            loadButton.style.fontSize = '16px';
            loadButton.style.fontFamily = 'Arial, sans-serif';
            loadButton.style.borderRadius = '5px';
            loadButton.style.cursor = 'pointer';
    
            loadButton.addEventListener('click', async function() {
                const items = pullData();
                const percentedItems = calculateProfitPercentage(items);
                const sortedItems = sortdict(percentedItems);
                displayProcessedItems(sortedItems);
                highlightItemsByRarity();
            });
    
            document.body.appendChild(loadButton);
        }
        async function initNeoPro() {
            Prices = await fetchPrices(); // Load prices
            createLoadButton(); // Create the "Load NeoPro" button
        }

        initNeoPro();
    })();