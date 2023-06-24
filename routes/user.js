const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-data');

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle);

router.post('/', userController.createUser);

module.exports = router;