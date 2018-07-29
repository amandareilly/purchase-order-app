const express = require('express');
const bodyParser = require('body-parser');
const PurchaseRequestApiController = require('../controllers/PurchaseRequestApiController');

const router = express.Router();
const jsonParser = bodyParser.json();
// requests endpoints
// get all requests
router.get('/requests', PurchaseRequestApiController.getAllRequests);
// get a specific request
router.get('/requests/:id', jsonParser, PurchaseRequestApiController.getRequestById);
// save a new request
router.post('/requests', jsonParser, PurchaseRequestApiController.saveNewRequest);
// update an existing request
router.put('/requests/:id', jsonParser, PurchaseRequestApiController.updateRequest);
// delete an existing request
router.delete('/requests/:id', jsonParser, PurchaseRequestApiController.deleteRequest);

module.exports = router;