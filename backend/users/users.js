const express = require('express');
const router = express.Router();
const controller = require('./usersController');

router.get('/', controller.getUsers);

router.get('/login', controller.login);

router.post('/create-user', controller.createUser);

module.exports = router;
