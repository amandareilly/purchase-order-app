const express = require('express');
const data = require('../../source/client-js/MOCK-DATA/mock-request-data');

const router = express.Router();

// List All Requests
router.get('/', (req, res) => {
    res.render('requestDashboard', {
        loggedIn: true,
        data: data,
    });
});

// Create new Request
router.get('/new', (req, res) => {
    res.render('requestDetail', {
        loggedIn: true,
    });
});


// View existing request
router.get('/:id', (req, res) => {
    res.render('requestDetail', {
        loggedIn: true,
    });
});

module.exports = router;