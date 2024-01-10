const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res
    .status(200)
    .json({ message: 'Hello From the Server Side!', app: 'Natours'});
});

app.post('/', (req, res) => {
    res.send("You can post to this EndPoint");
})
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});