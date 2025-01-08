// ==UserScript==
// @name         NeoPro
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Knowledge of a seasoned Neopets Pro at your Fingers
// @author       ConnSully
// @match        https://www.neopets.com/objects.phtml?type=shop*
// @grant        none
// @icon         https://www.neopets.com/favicon.ico
// @run-at       document-end
// ==/UserScript==
// To Do

const Prices = [
    {
      "name": "4 Billion Pie Recipes",
      "store_price": 0,
      "resale_price": 31900,
      "percent_profit": 0,
      "rarity": "r90",
      "imgURL": "https://images.neopets.com/items/bvb_4millionpierecipes.gif"
    },
    {
      "name": "Do The Moon Bounce",
      "store_price": 0,
      "resale_price": 7200,
      "percent_profit": 0,
      "rarity": "r90",
      "imgURL": "https://images.neopets.com/items/bbo_moon_bounce.gif"
    },
    {
      "name": "Guide to Orange Furniture",
      "store_price": 0,
      "resale_price": 12200,
      "percent_profit": 0,
      "rarity": "r90",
      "imgURL": "https://images.neopets.com/items/bbo_guide_orangefurn.gif"
    },
    {
      "name": "How To Escape",
      "store_price": 0,
      "resale_price": 8550,
      "percent_profit": 0,
      "rarity": "r90",
      "imgURL": "https://images.neopets.com/items/bbo_howtoescape.gif"
    },
    {
      "name": "Kreludan Crosswords",
      "store_price": 0,
      "resale_price": 3900,
      "percent_profit": 0,
      "rarity": "r90",
      "imgURL": "https://images.neopets.com/items/bbo_kreludan_crossword.gif"
    },
    {
      "name": "Made of Stars",
      "store_price": 0,
      "resale_price": 17500,
      "percent_profit": 0,
      "rarity": "r90",
      "imgURL": "https://images.neopets.com/items/bvb_madeofstars.gif"
    },
    {
      "name": "Space Station Holidays",
      "store_price": 0,
      "resale_price": 14800,
      "percent_profit": 0,
      "rarity": "r90",
      "imgURL": "https://images.neopets.com/items/bbo_spacestationholi.gif"
    },
    {
      "name": "Under the Surface Part I",
      "store_price": 0,
      "resale_price": 23000,
      "percent_profit": 0,
      "rarity": "r90",
      "imgURL": "https://images.neopets.com/items/bbo_underthesurface1.gif"
    },
    {
      "name": "Grundos Guide to Brain Washing",
      "store_price": 0,
      "resale_price": 23200,
      "percent_profit": 0,
      "rarity": "r91",
      "imgURL": "https://images.neopets.com/items/bbo_grundo_brainwash.gif"
    },
    {
      "name": "Laser Energy",
      "store_price": 0,
      "resale_price": 13100,
      "percent_profit": 0,
      "rarity": "r91",
      "imgURL": "https://images.neopets.com/items/bbo_lazerenergy.gif"
    },
    {
      "name": "Under the Surface Part II",
      "store_price": 0,
      "resale_price": 23000,
      "percent_profit": 0,
      "rarity": "r91",
      "imgURL": "https://images.neopets.com/items/bbo_underthesurface2.gif"
    },
    {
      "name": "Zarex Diary",
      "store_price": 0,
      "resale_price": 11200,
      "percent_profit": 0,
      "rarity": "r91",
      "imgURL": "https://images.neopets.com/items/bbo_lb_zarexdiary.gif"
    },
    {
      "name": "Get Organised Stay Organised",
      "store_price": 0,
      "resale_price": 47500,
      "percent_profit": 0,
      "rarity": "r92",
      "imgURL": "https://images.neopets.com/items/bbo_organized.gif"
    },
    {
      "name": "Secrets of Sloth",
      "store_price": 0,
      "resale_price": 20000,
      "percent_profit": 0,
      "rarity": "r92",
      "imgURL": "https://images.neopets.com/items/boo_secretsofsloth.gif"
    },
    {
      "name": "Situational Gravity Pranks",
      "store_price": 0,
      "resale_price": 57000,
      "percent_profit": 0,
      "rarity": "r92",
      "imgURL": "https://images.neopets.com/items/bbo_situational_gravity.gif"
    },
    {
      "name": "Zenor Kevix: A Biography",
      "store_price": 0,
      "resale_price": 50000,
      "percent_profit": 0,
      "rarity": "r92",
      "imgURL": "https://images.neopets.com/items/bbo_zenor_bio.gif"
    },
    {
      "name": "Easy Decor in Low Gravity Situations",
      "store_price": 0,
      "resale_price": 48900,
      "percent_profit": 0,
      "rarity": "r93",
      "imgURL": "https://images.neopets.com/items/bbo_easydecor_lowgravitysit.gif"
    },
    {
      "name": "Meteorite Craft Book",
      "store_price": 0,
      "resale_price": 82500,
      "percent_profit": 0,
      "rarity": "r93",
      "imgURL": "https://images.neopets.com/items/bbo_meteorite_craftbk.gif"
    },
    {
      "name": "Myths and Legends of Alien Aishas",
      "store_price": 0,
      "resale_price": 27000,
      "percent_profit": 0,
      "rarity": "r93",
      "imgURL": "https://images.neopets.com/items/bbo_alienaisha_mythandlegend.gif"
    },
    {
      "name": "Kreludan Home Decorating",
      "store_price": 0,
      "resale_price": 0,
      "percent_profit": 0,
      "rarity": "r94",
      "imgURL": "https://images.neopets.com/items/bbo_home_decor.gif"
    },
    {
      "name": "Lennies in Space",
      "store_price": 0,
      "resale_price": 0,
      "percent_profit": 0,
      "rarity": "r94",
      "imgURL": "https://images.neopets.com/items/bbo_lennies_space.gif"
    },
    {
      "name": "Diary of a Baby Space Fungus",
      "store_price": 0,
      "resale_price": 930000,
      "percent_profit": 0,
      "rarity": "r95",
      "imgURL": "https://images.neopets.com/items/bbo_diary_babyspacefungus.gif"
    },
    {
      "name": "Half Moon Pop-Up Book",
      "store_price": 0,
      "resale_price": 290000,
      "percent_profit": 0,
      "rarity": "r95",
      "imgURL": "https://images.neopets.com/items/bbo_halfmoon.gif"
    },
    {
      "name": "Kreludan Architecture",
      "store_price": 0,
      "resale_price": 0,
      "percent_profit": 0,
      "rarity": "r96",
      "imgURL": "https://images.neopets.com/items/bbo_kreludor_architecture.gif"
    },
    {
      "name": "Secrets of the Universe",
      "store_price": 0,
      "resale_price": 0,
      "percent_profit": 0,
      "rarity": "r96",
      "imgURL": "https://images.neopets.com/items/bbo_universe_secrets.gif"
    },
    {
      "name": "It Came From the Mine",
      "store_price": 0,
      "resale_price": 0,
      "percent_profit": 0,
      "rarity": "r97",
      "imgURL": "https://images.neopets.com/items/bbo_from_the_mine.gif"
    },
    {
      "name": "Kreludan Cookie Cookbook",
      "store_price": 0,
      "resale_price": 0,
      "percent_profit": 0,
      "rarity": "r97",
      "imgURL": "https://images.neopets.com/items/bbo_cookie_book.gif"
    },
    {
      "name": "The Big Book of Intermediate Evil Plots",
      "store_price": 0,
      "resale_price": 5450,
      "percent_profit": 0,
      "rarity": "r97",
      "imgURL": "https://images.neopets.com/items/bbo_bigintermediate_evilplots.gif"
    },
    {
      "name": "The Space Ace",
      "store_price": 0,
      "resale_price": 0,
      "percent_profit": 0,
      "rarity": "r97",
      "imgURL": "https://images.neopets.com/items/bbo_the_space_ace.gif"
    },
    {
      "name": "Space Station Schematics",
      "store_price": 0,
      "resale_price": 0,
      "percent_profit": 0,
      "rarity": "r98",
      "imgURL": "https://images.neopets.com/items/bbo_station_schematics.gif"
    },
    {
      "name": "Alien Aisha Invasion",
      "store_price": 0,
      "resale_price": 30000000,
      "percent_profit": 0,
      "rarity": "r99",
      "imgURL": "https://images.neopets.com/items/bbo_book2.gif"
    },
    {
      "name": "Guide to the Neocola Machine",
      "store_price": 0,
      "resale_price": 25000000,
      "percent_profit": 0,
      "rarity": "r99",
      "imgURL": "https://images.neopets.com/items/bbo_krel_neocola.gif"
    },
    {
      "name": "It Came From Kreludor",
      "store_price": 0,
      "resale_price": 25000000,
      "percent_profit": 0,
      "rarity": "r99",
      "imgURL": "https://images.neopets.com/items/bbo_book3.gif"
    },
    {
      "name": "Kreludor Mining Corridor Maps",
      "store_price": 0,
      "resale_price": 310000,
      "percent_profit": 0,
      "rarity": "r99",
      "imgURL": "https://images.neopets.com/items/bbo_lb_corridormaps.gif"
    }
  ]
(function() {
    'use strict';




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
        // Modified displayProcessedItems function to include overlay creation...
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

        loadButton.addEventListener('click', function() {
            const items = pullData();
            const percentedItems = calculateProfitPercentage(items);
            const sortedItems = sortdict(percentedItems);
            displayProcessedItems(sortedItems);
            highlightItemsByRarity();
        });

        document.body.appendChild(loadButton);



})();