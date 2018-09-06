const express = require('express');
const RequestController = require('../controllers/RequestController');

const passport = require('passport');
const { localAuth, jwtAuth } = require('../middleware/authentication');
const router = express.Router();
// List All Requests
router.get('/', jwtAuth, RequestController.getAllRequests);

// Create new Request
router.post('/new', RequestController.createNewRequest);

// View existing request
router.get('/:id', RequestController.getExistingRequest);

// Delete Item
router.get('/:id/items/delete/:itemId', RequestController.deleteItem);

// Add Item
router.post('/:id/addItem', RequestController.addItem);

module.exports = router;