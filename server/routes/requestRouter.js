const express = require('express');
const RequestController = require('../controllers/RequestController');
const { authMiddleware } = require('../middleware/authentication');
const router = express.Router();
router.use(authMiddleware);
// List All Requests
router.get('/', RequestController.getAllRequests);

// Create new Request
router.post('/new', RequestController.createNewRequest);

// View existing request
router.get('/:id', RequestController.getExistingRequest);

// Delete Item
router.get('/:id/items/delete/:itemId', RequestController.deleteItem);

// Add Item
router.post('/:id/addItem', RequestController.addItem);

module.exports = router;