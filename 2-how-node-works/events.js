const EventEmitter = require("events");

const myEmmiter = new EventEmitter();

myEmmiter.on('newSale', () => {
    console.log("There was a new Sale!");
})

myEmmiter.on('newSale', () => {
    console.log("Customer Name : Manjunath");
})

myEmmiter.on('newSale', (stock) => {
    console.log(`There are now ${stock} Items left in Stock.`);
})

myEmmiter.emit('newSale', 9);
