const EventEmitter = require("events");

const myEmmiter = new EventEmitter();

myEmmiter.on('newSale', () => {
    console.log("There was a new Sale!");
})

myEmmiter.on('newSale', () => {
    console.log("Customer Name : Manjunath");
})

myEmmiter.emit('newSale');
