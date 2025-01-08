//Hi thanks for reading my first public user facing program!



// NTD:
    // 1. Let Prices reference another file / live database
    // Need to add Tampermonkey script to NeoPro Repository (make a downloader?)
    // Add supported shops and rarities to readme
    // Move load buttons and other logic out of this file
    // Faster / more efficient process for updating pricing.json
    // Add a Config File

        // Rarities
        // Customization Options
        // Minimum Profits to appear
    // 2. List Shops where prices are supported (and other information on rarities)
    // 3. Handle scenario of INFLATION ADJUSTED ITEMS
    // 4. Add optional chaining (`?.`) for `Prices.find` in `matchDetailsFromPrices`
    // 5. Modularize `initNeoPro` for reusability
    // 6. Add debugging logs to key operations (e.g., `fetchPrices`, `createLoadButton`)
    // 7. Add fallback handling for empty `Prices` in `highlightItemsByRarity`
    // 8. Improve responsiveness of the `neoProOverlay` with better CSS
    // 9. Add optional chaining (`?.`) for missing attributes in `pullData`
    // 10. Actually highlight the items in the shop for buying
    // 11. MAke it look less janky 

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
            // Check if overlay already exists
            let overlay = document.getElementById('neoProOverlay');
            if (!overlay) {
                // Create the overlay container
                overlay = document.createElement('div');
                overlay.id = 'neoProOverlay';
                overlay.style.position = 'fixed';
                overlay.style.top = '50px';
                overlay.style.right = '20px';
                overlay.style.width = '400px';
                overlay.style.maxHeight = '80%';
                overlay.style.backgroundColor = '#ffffff';
                overlay.style.border = '1px solid #ddd';
                overlay.style.borderRadius = '12px';
                overlay.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
                overlay.style.overflowY = 'auto';
                overlay.style.padding = '20px';
                overlay.style.zIndex = '1600';
                overlay.style.fontFamily = 'Arial, sans-serif';
                overlay.style.transition = 'opacity 0.3s ease-in-out';
        
                // Add the overlay to the document
                document.body.appendChild(overlay);
            }
        
            // Clear existing content (except the close button)
            overlay.innerHTML = '';
        
            // Add a close button
            const closeButton = document.createElement('button');
            closeButton.textContent = '×';
            closeButton.style.position = 'absolute';
            closeButton.style.top = '10px';
            closeButton.style.right = '10px';
            closeButton.style.border = 'none';
            closeButton.style.background = 'transparent';
            closeButton.style.fontSize = '24px';
            closeButton.style.cursor = 'pointer';
            closeButton.style.color = '#888';
            closeButton.style.transition = 'color 0.3s ease';
        
            // Close button hover effect
            closeButton.addEventListener('mouseenter', () => {
                closeButton.style.color = '#555';
            });
        
            closeButton.addEventListener('mouseleave', () => {
                closeButton.style.color = '#888';
            });
        
            // Close functionality
            closeButton.addEventListener('click', () => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                }, 300); // Matches the transition time
            });
        
            overlay.appendChild(closeButton);
        
            // Check if items array is empty and display a message if true
            if (items.length === 0) {
                const noItemsMessage = document.createElement('div');
                noItemsMessage.textContent = 'No Rare Items Found';
                noItemsMessage.style.textAlign = 'center';
                noItemsMessage.style.color = '#666';
                noItemsMessage.style.fontSize = '18px';
                noItemsMessage.style.marginTop = '50px';
                overlay.appendChild(noItemsMessage);
                return;
            }
        
            // Create and style a title for the overlay
            const title = document.createElement('h2');
            title.textContent = 'NeoPro Highlights';
            title.style.marginTop = '0';
            title.style.marginBottom = '20px';
            title.style.color = '#333';
            title.style.fontSize = '22px';
            title.style.borderBottom = '1px solid #ddd';
            title.style.paddingBottom = '10px';
            overlay.appendChild(title);
        
            // Create a list to display items
            const itemList = document.createElement('div');
            itemList.style.display = 'flex';
            itemList.style.flexDirection = 'column';
            itemList.style.gap = '15px';
        
            items.forEach(item => {
                const itemContainer = document.createElement('div');
                itemContainer.style.display = 'flex';
                itemContainer.style.alignItems = 'center';
                itemContainer.style.border = '1px solid #eee';
                itemContainer.style.borderRadius = '8px';
                itemContainer.style.padding = '10px';
                itemContainer.style.backgroundColor = '#f9f9f9';
                itemContainer.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.1)';
        
                // Add item image
                if (item.imgURL) {
                    const imgElement = document.createElement('img');
                    imgElement.src = item.imgURL;
                    imgElement.alt = item.name;
                    imgElement.style.width = '60px';
                    imgElement.style.height = '60px';
                    imgElement.style.borderRadius = '4px';
                    imgElement.style.marginRight = '15px';
                    imgElement.style.objectFit = 'cover';
                    itemContainer.appendChild(imgElement);
                }
        
                // Add item details
                const textContainer = document.createElement('div');
                textContainer.style.display = 'flex';
                textContainer.style.flexDirection = 'column';
        
                const itemName = document.createElement('div');
                itemName.textContent = item.name;
                itemName.style.fontSize = '16px';
                itemName.style.fontWeight = 'bold';
                itemName.style.color = '#333';
        
                const profitInfo = document.createElement('div');
                profitInfo.textContent = `Profit: ${item.percent_profit.toFixed(2)}%`;
                profitInfo.style.fontSize = '14px';
                profitInfo.style.color = '#555';
        
                textContainer.appendChild(itemName);
                textContainer.appendChild(profitInfo);
        
                itemContainer.appendChild(textContainer);
                itemList.appendChild(itemContainer);
            });
        
            overlay.appendChild(itemList);
        }
        
    
        function createLoadButton() {
            const loadButton = document.createElement('button');
            loadButton.textContent = "Load NeoPro";
            loadButton.style.padding = '12px 24px';
            loadButton.style.fontSize = '18px';
            loadButton.style.fontFamily = 'Arial, sans-serif';
            loadButton.style.borderRadius = '8px';
            loadButton.style.cursor = 'pointer';
            loadButton.style.backgroundColor = '#4CAF50'; // Green background
            loadButton.style.color = 'white'; // White text
            loadButton.style.border = 'none'; // Remove border
            loadButton.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)'; // Subtle shadow
            loadButton.style.transition = 'all 0.3s ease'; // Smooth hover effect
        
            // Add hover effects
            loadButton.addEventListener('mouseenter', function () {
                loadButton.style.backgroundColor = '#45a049'; // Slightly darker green
                loadButton.style.transform = 'scale(1.05)'; // Slight zoom
            });
        
            loadButton.addEventListener('mouseleave', function () {
                loadButton.style.backgroundColor = '#4CAF50'; // Back to original color
                loadButton.style.transform = 'scale(1)'; // Reset zoom
            });
        
            // Add click functionality
            loadButton.addEventListener('click', async function () {
                const items = pullData();
                const percentedItems = calculateProfitPercentage(items);
                const sortedItems = sortdict(percentedItems);
                displayProcessedItems(sortedItems);
                highlightItemsByRarity();
            });
        
            // Create a container to center the button and add spacing
            const buttonContainer = document.createElement('div');
            buttonContainer.style.display = 'flex';
            buttonContainer.style.justifyContent = 'center';
            buttonContainer.style.alignItems = 'center';
            buttonContainer.style.marginTop = '20px'; // Add spacing above the button
            buttonContainer.style.marginBottom = '20px'; // Add spacing below the button
        
            buttonContainer.appendChild(loadButton);
        
            // Find the "Shop Inventory" header and insert the container
            const shopHeader = document.querySelector('h2');
            if (shopHeader && shopHeader.textContent.includes('Shop Inventory')) {
                shopHeader.insertAdjacentElement('afterend', buttonContainer); // Place the container after the header
            } else {
                console.error("Shop Inventory header not found");
                document.body.appendChild(buttonContainer); // Fallback: append to body
            }
        }
        
        
        async function initNeoPro() {
            Prices = await fetchPrices(); // Load prices
            createLoadButton(); // Create the "Load NeoPro" button
        }
        
        // Attach to the global window object
        window.initNeoPro = initNeoPro;
        
        // Immediately invoke the function
        initNeoPro();


    })();