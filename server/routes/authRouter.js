const express = require('express');
const AuthController = require('../controllers/AuthController');
const jsonParser = require('body-parser').json();
const router = express.Router();
router.use(jsonParser);

const { localAuth } = require('../middleware/authentication');

router.get('/', AuthController.loginForm);
router.post('/', localAuth, AuthController.issueToken);

module.exports = router;