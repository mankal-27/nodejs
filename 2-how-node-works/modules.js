// console.log(arguments);
// console.log(require('module').wrapper)

// module.exports
const C = require('./test-module');
const calc1 = new C;
console.log(calc1.add(2,4));

//exports
const calc2 = require('./test-module-1');
console.log(calc2.add(2,8));

const {add, multiply, divide} = require('./test-module-1');
console.log(add(2,9));

//Caching functions

require('./test-module-2')();
require('./test-module-2')();
require('./test-module-2')();