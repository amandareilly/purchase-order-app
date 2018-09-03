const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const PurchaseRequestApiController = require('../controllers/PurchaseRequestApiController');
const UserApiController = require('../controllers/UserApiController');
const AuthController = require('../controllers/AuthController');
const ItemApiController = require('../controllers/ItemApiController');

const router = express.Router();
const jsonParser = bodyParser.json();

const localAuth = passport.authenticate('local', { session: false });
const jwtAuth = passport.authenticate('jwt', { session: false });

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

// request item endpoints
// add an item to a request
router.post('/requests/:id/addItem', jsonParser, ItemApiController.addItem);
// delete an item from a request
router.delete('/requests/:id/item/:itemId', jsonParser, ItemApiController.deleteItem);
// update an item in a request
router.put('/requests/:id/item/:itemId', jsonParser, ItemApiController.updateItem);

//user endpoints
//get all users
router.get('/users', UserApiController.getAllUsers);
//get a specific user by id
router.get('/users/byId/:id', jsonParser, UserApiController.getUserById);
// get a specific user by email
router.get('/users/byEmail/:email', jsonParser, UserApiController.getUserByEmail);
//create a new user
router.post('/users', jsonParser, UserApiController.createUser);

// auth api endpoints
router.post('/auth/login', localAuth, AuthController.issueToken);
router.post('/auth/refresh', jwtAuth, AuthController.issueToken);

module.exports = router;