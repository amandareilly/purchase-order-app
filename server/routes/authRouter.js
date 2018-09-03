const express = require('express');
const AuthController = require('../controllers/AuthController');
const jsonParser = require('body-parser').json();
const router = express.Router();
router.use(jsonParser);

router.get('/', AuthController.loginForm);
router.post('/', AuthController.processEmail);

module.exports = router;