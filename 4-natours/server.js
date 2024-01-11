const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const mongoose = require('mongoose');

const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    }).then(() => {
    console.log('Connected to MongoDB');
    })

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true
      },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    }
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
    name: 'Belgaum Beach',
    price: 1344,
    rating: 4.3
});

testTour
    .save()
    .then(doc => {
    console.log(doc);
}).catch(err => {
    if (err.code === 11000) {
        console.log('Duplicate key error:', err.message);
    } else {
        console.log('Error while saving:', err);
    }
})
// Server Listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});