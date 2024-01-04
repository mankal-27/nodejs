const fs = require('fs');
const http = require('http');
const url = require('url');
var slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate')
//////////////////////////////////////////
//Server

const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const slugs = dataObj.map(el => slugify(el.productName,{lower: true}));

const server = http.createServer((req, res) => {
    console.log(req.url);
    const {query, pathname} = url.parse(req.url, true);
   
    //OverView Page
    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const cardsHTML = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('%PRODUCT_CARDS%', cardsHTML);
        res.end(output);
    }
    //Products Page
    else if(pathname === '/product'){
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }
    //API Page
    else if(pathname === '/api'){
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);
    }
    //Page Not Found
    else{
        res.writeHead(404, {
            'Content-Type': 'text/html'
        })
        res.end('<h1>Page Not Found!</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Server is running!');
});