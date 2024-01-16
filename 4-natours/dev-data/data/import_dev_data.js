const fs = require('fs');
const Tour = require('./../../models/tourModel');
const dotenv = require('dotenv');

dotenv.config(); // Assuming the config file is named .env in the root directory


const mongoose = require('mongoose');
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log('Connected to MongoDB');
    });

// Read JSON data from file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// Import Data into MongoDB
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data Imported Successfully');
    } catch (error) {
        console.log('Error:', error);
    }
};

// Delete all Data from DATABASE
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data Deleted Successfully');
    } catch (error) {
        console.log('Error:', error);
    }
};

if(process.argv[2] === '--import'){
    importData();
    process.exit();
}else if(process.argv[2] === '--delete'){
    deleteData();
    process.exit(0);
}

console.log(process.argv);
