const fs = require('fs');
const http = require('http');

////////////////////////////////////////////////////////////////
///Files

// //Blocking, Synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

// console.log(textIn);

// const textOut = `This is what we know about the avocado : ${textIn}.\n Created on ${Date.now()}`;

// fs.writeFileSync('./txt/output.txt', textOut, 'utf-8');

// console.log("File Write Successful")

// //Non-Blocking , asynchronous way of writing

// fs.readFile('./txt/starthh.txt', 'utf-8', (err, data1) => {
//     if(err) return console.log("Error", err);
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         if(err) throw err;
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             if(err) throw err;
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`,'utf-8', (err) => {
//                 if(err) throw err;
//                 console.log("File Write Successful")
//             })
//         });
//     });
// });
// console.log('Will Read file!')

////////////////////////////////////////////
// Server

const server = http.createServer((req, res) => {
    res.end('Hello From The Server!');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Server is running!');
});