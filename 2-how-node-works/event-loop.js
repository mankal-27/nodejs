const fs = require('fs');
setTimeout(() => console.log("Timer 1 Finished"), 0);
setImmediate(() => console.log("Immediate 1 Finished"));

fs.readFile('test-file.txt', () => {
    console.log('I/O Test File Finished');
})

console.log('Hello from the top-level code');
