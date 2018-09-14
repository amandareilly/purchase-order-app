const express = require('express');
const bodyParser = require('body-parser');
const PurchaseRequestApiController = require('../controllers/PurchaseRequestApiController');
const UserApiController = require('../controllers/UserApiController');
const AuthController = require('../controllers/AuthController');
const ItemApiController = require('../controllers/ItemApiController');

const router = express.Router();
const jsonParser = bodyParser.json();

const { localAuth, jwtAuth } = require('../middleware/authentication');

let authMiddleware;
if (process.env.NODE_ENV !== "TEST") {
    authMiddleware = jwtAuth;
} else {
    authMiddleware = (req, res, next) => {
        if (req.header('X-TEST-BYPASS-AUTH')) {
            next();
        } else {
            jwtAuth(req, res, next);
        }
    };
}
router.use(authMiddleware)
    // requests endpoints
    // get all requests
router.get('/requests', jwtAuth, PurchaseRequestApiController.getAllRequests);
// get a specific request
router.get('/requests/:id', jsonParser, jwtAuth, PurchaseRequestApiController.getRequestById);
// save a new request
router.post('/requests', jsonParser, jwtAuth, PurchaseRequestApiController.saveNewRequest);
// update an existing request
router.put('/requests/:id', jsonParser, jwtAuth, PurchaseRequestApiController.updateRequest);
// delete an existing request
router.delete('/requests/:id', jsonParser, jwtAuth, PurchaseRequestApiController.deleteRequest);

// request item endpoints
// add an item to a request
router.post('/requests/:id/addItem', jsonParser, ItemApiController.addItem);
// delete an item from a request
router.delete('/requests/:id/item/:itemId', jsonParser, jwtAuth, ItemApiController.deleteItem);
// update an item in a request
router.put('/requests/:id/item/:itemId', jsonParser, jwtAuth, ItemApiController.updateItem);

//user endpoints
//get all users
router.get('/users', jwtAuth, UserApiController.getAllUsers);
//get a specific user by id
router.get('/users/byId/:id', jsonParser, jwtAuth, UserApiController.getUserById);
// get a specific user by email
router.get('/users/byEmail/:email', jsonParser, jwtAuth, UserApiController.getUserByEmail);
//create a new user
router.post('/users', jsonParser, jwtAuth, UserApiController.createUser);

// auth api endpoints
router.post('/auth/login', localAuth, AuthController.issueToken);
router.post('/auth/refresh', jwtAuth, AuthController.issueToken);

module.exports = router;