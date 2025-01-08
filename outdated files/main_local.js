//Hi thanks for reading my first public user facing program!


//need to install via terminal
//npm init -y
//npm install cheerio

//mock data
//let priceDict = [{name:"Antigravity Games", store_price: 800, resale_price: 1000, percent_profit: 0},
//{name:"Achyfi Recipes", store_price: 1200, resale_price: 1300, percent_profit: 0},
//{name:"4 Billion Pie Recipes", store_price: 18000, resale_price: 31000, percent_profit: 0}
//]

//Main Calls
const fs = require('fs');
const cheerio = require('cheerio');
var http = require('http');
const PORT=8080; 


function main(){
        console.log("Starting the Magic");
        
        let filePath = 'Neopets - Booktastic Books.html';
        let booktastic_testshop_html = fs.readFileSync(filePath, 'utf8');
        // utf8 is the default text encoding
        let booktastic_testshop = pullData(booktastic_testshop_html)
        let percentedDict= calculateProfitPercentage(booktastic_testshop);
        let sorted_prices = sortdict(percentedDict);
        output_window_html(sorted_prices);

        //output_window(sorted_prices) 
        //need a web server to take / host dependecies to use this method
    }

function pullData(html){ 
    //We will need to pull the data from the current page and store it in a variable
    const $ = cheerio.load(html);
    const items = [];
    console.log("cheerio'ing" + items.length)

    $('.shop-item').each((index, element) => {
        // Use Cheerio to find the item name and store price within each '.shop-item'
        const name = $(element).find('.item-name b').text();
        const priceText = $(element).find('.item-stock').last().text(); // Assuming the last '.item-stock' contains the price
        const price = parseInt(priceText.replace(/Cost: /g, '').replace(/ NP/g, '').replace(/,/g, ''), 10);
    
        // Add an object to the 'items' array containing the name and parsed store price
        items.push({ name, store_price: price, resale_price: 1, percent_profit: 0 });
    });
    console.log("cheerio'd" + items.length)
    return items;
}

function calculateProfitPercentage(unpercentedDict){

    const percentedDict= unpercentedDict.map(item=> {
        const profit_percentage = ((item.resale_price - item.store_price) / (item.store_price))* 100;
        return {name: item.name, store_price: item.store_price, resale_price: item.resale_price, percent_profit: profit_percentage};
    });
    return percentedDict;

}

function sortdict(price_dictionary){
//Expecting name store price, resale price, and profit percentage
    price_dictionary.sort((a, b) => b.percent_profit - a.percent_profit);
    console.log("Dictionary being sorted: " + JSON.stringify(price_dictionary));

    return price_dictionary;

}

function output_window(profit_chart){
    // this will need to auto open on each page load
    var price_window = window.open()
    
    if (price_window){
        //Makes it so it only continues if window succesfully opens
        var pricePageHTML = "<html><head><title>Profit Chart</title></head><body>"
        //This lets us make the page dynamically

        pricePageHTML += "<table><tr><th>Object Name</th><th>Store Price</th><th>Resale Price</th><th>Profit Percentage</th></tr>";
        profit_chart.forEach(function(item) {
            pricePageHTML += "<tr><td>" + item.name + "</td><td>" + item.store_price + "</td><td>" + item.resale_price + "</td><td>" + (item.percent_profit).toFixed(2) + "%</td></tr>";
        });
        pricePageHTML += "</table></body></html>";
        pricePageHTML += "Loaded correctly! If Above Table is blank, something got messed up!"
    }
    else {
        // Failed to open the new window
        alert("Failed to open the new window. Please enable pop-ups for this site.");
    }
    price_window.document.write(pricePageHTML)
}


function output_window_html(profit_chart){
    let pricePageHTML = "<!DOCTYPE html><html><head><title>Profit Chart</title></head><body>"
    pricePageHTML += "<table><tr><th>Object Name</th><th>Store Price</th><th>Resale Price</th><th>Profit Percentage</th></tr>";
    profit_chart.forEach(function(item) {
        pricePageHTML += "<tr><td>" + item.name + "</td><td>" + item.store_price + "</td><td>" + item.resale_price + "</td><td>" + item.percent_profit.toFixed(2) + "%</td></tr>";
    });
    pricePageHTML += "</table></body></html>";
    pricePageHTML += "Loaded correctly! If the above table is blank, something got messed up!";

    // Write the HTML content to a file
    fs.writeFileSync('output.html', pricePageHTML, 'utf8');
    console.log("HTML output successfully written to 'output.html'. Open this file in your browser to view the result.");
}


//web server








try {
    main();

    fs.readFile('output.html', function (err, html) {
        if (err) throw err;    
    
        http.createServer(function(request, response) {  
            response.writeHeader(200, {"Content-Type": "text/html"});  
            response.write(html);  
            response.end();  
        }).listen(PORT);
    });
} catch (error) {
    console.error('Error during script execution:', error);
}



//add fields to dictionary
// to add - pulling these values to get exact store price
// we will use a pessimistic store price to start
// potential imapact from half price day
