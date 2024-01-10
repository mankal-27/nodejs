const express = require('express');

const router = express.Router();

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


router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);


module.exports = router;