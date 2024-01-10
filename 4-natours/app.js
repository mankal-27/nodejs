const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());


// app.get('/', (req, res) => {
//     res
//     .status(200)
//     .json({ message: 'Hello From the Server Side!', app: 'Natours'});
// });

// app.post('/', (req, res) => {
//     res.send("You can post to this EndPoint");
// })
const PORT = 3000;
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))
app.get('/api/v1/tours', (req, res) => {
    res.status(200)
        .json({
            status:'success',
            results: tours.length,
            data: {
                tours
            }
        });
})

app.post('/api/v1/tours', (req, res) => {
    //console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({
        id: newId
    }, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        if (err) throw err;
        res.status(201).json({
            status:'success',
            data: {
                tour: newTour
            }
        })
    })
})
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});