const fs = require("fs");
const server  = require("http").createServer();

server.on('request', (req, res) => {
    //Solution1 
    // fs.readFile('test-file.txt', (err, data) => {
    //     if(err){
    //         console.log(err);
    //     }
    //     res.end(data)
    // })

    //Solution2 : Streams
    const readableStream = fs.createReadStream('test-file.txt');
    readableStream.on('data', chunk => {
        res.write(chunk);
    });
    readableStream.on('end', () => {
        res.end();
    });
    readableStream.on('error', err => {
        console.log(err);
        res.statusCode = 500;
        res.end("File not found");
    });
})

server.listen(8000, '127.0.0.1', () => {
    console.log('listening on ');
})