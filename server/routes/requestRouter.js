const express = require('express');
const RequestController = require('../controllers/RequestController');

const router = express.Router();
// List All Requests
router.get('/', RequestController.getAllRequests);

// Create new Request
router.get('/new', RequestController.createNewRequest);

// View existing request
router.get('/:id', RequestController.getExistingRequest);

// Delete Item
router.get('/:id/items/delete/:itemId', RequestController.deleteItem);

module.exports = router;