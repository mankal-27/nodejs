const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1. Middleware
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
    console.log('Hello From Middleware');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

//2. File For all Tours
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

//3. Route Handlers
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

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {

    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    res.status(200).json({
        status: 'Sucsess',
        data: {
            tour: '<Updated tour here>'
        }
    })
};

const deleteTour = (req, res) => {

    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    res.status(204).json({
        status: 'Sucsess',
        data:null
    })
};

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This Route is Not Implemented'
    })
}

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This Route is Not Implemented'
    })
}

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This Route is Not Implemented'
    })
}

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This Route is Not Implemented'
    })
}

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This Route is Not Implemented'
    })
}

// 4. Routes

//app.get('/api/v1/tours', getAllTours);
//app.get('/api/v1/tours/:id', getTour);
//app.post('/api/v1/tours', createTour);
//app.patch('/api/v1/tours/:id', updateTour);
//app.delete('/api/v1/tours/:id', deleteTour);

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter
    .route('/')
    .get(getAllTours)
    .post(createTour);

tourRouter
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

app
    .route('/')
    .get(getAllUsers)
    .post(createUser);

app
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);


app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
    
// Server Listener
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});