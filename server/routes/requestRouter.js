const express = require('express');
const router = express.Router();

// List All Requests
router.get('/', function(req, res) {
    res.render('requestDashboard');
});

// Create new Request
router.get('/new', function(req, res) {
    res.render('requestDetail');
});


// View existing request
router.get('/:id', function(req, res) {
    res.render('requestDetail');
});

module.exports = router;