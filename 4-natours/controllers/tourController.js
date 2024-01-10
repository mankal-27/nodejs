const fs = require('fs');
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))


const checkID = (req, res, next, val) => {
    console.log(`Tour ID is : ${val}`);
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next();
};

const getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status:'success',
        requestedAt : req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
};

const getTour = (req, res) => {
    console.log(req.params)
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    
    res.status(200)
        .json({
            status:'success',
            data : {
                tours: tour
            }
        });
};

const checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.price){
        return res.status(404).json({
            status: 'fail',
            message: 'Name Or Price must be provided'
        });
    }
    next();
};
const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({
        id: newId
    }, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        if (err) throw err;
        res.status(201).json({
            status:'success',
            data: {
                tour: newTour
            }
        })
    })
};

const updateTour = (req, res) => {
    res.status(200).json({
        status: 'Sucsess',
        data: {
            tour: '<Updated tour here>'
        }
    })
};

const deleteTour = (req, res) => {
    res.status(204).json({
        status: 'Sucsess',
        data:null
    })
};

module.exports = {
    getAllTours : getAllTours,
    getTour : getTour,
    createTour : createTour,
    updateTour : updateTour,
    deleteTour : deleteTour,
    checkID: checkID,
    checkBody : checkBody
}