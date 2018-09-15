const express = require('express');
const bodyParser = require('body-parser');
const PurchaseRequestApiController = require('../controllers/PurchaseRequestApiController');
const UserApiController = require('../controllers/UserApiController');
const AuthController = require('../controllers/AuthController');
const ItemApiController = require('../controllers/ItemApiController');

const router = express.Router();
const jsonParser = bodyParser.json();

const { authMiddleware } = require('../middleware/authentication');

router.use(jsonParser);
router.use(authMiddleware)
    // requests endpoints
    // get all requests
router.get('/requests', PurchaseRequestApiController.getAllRequests);
// get a specific request
router.get('/requests/:id', PurchaseRequestApiController.getRequestById);
// save a new request
router.post('/requests', PurchaseRequestApiController.saveNewRequest);
// update an existing request
router.put('/requests/:id', PurchaseRequestApiController.updateRequest);
// delete an existing request
router.delete('/requests/:id', PurchaseRequestApiController.deleteRequest);

// request item endpoints
// add an item to a request
router.post('/requests/:id/addItem', ItemApiController.addItem);
// delete an item from a request
router.delete('/requests/:id/item/:itemId', ItemApiController.deleteItem);
// update an item in a request
router.put('/requests/:id/item/:itemId', ItemApiController.updateItem);

//user endpoints
//get all users
router.get('/users', UserApiController.getAllUsers);
//get a specific user by id
router.get('/users/byId/:id', UserApiController.getUserById);
// get a specific user by email
router.get('/users/byEmail/:email', UserApiController.getUserByEmail);
//create a new user
router.post('/users', UserApiController.createUser);

// auth api endpoints
router.post('/auth/login', AuthController.issueToken);
router.post('/auth/refresh', AuthController.issueToken);

module.exports = router;