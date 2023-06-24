const express = require('express');
const router = express.Router();

const quoteController = require('../controllers/quotes');

router.get('/', quoteController.getAll);

router.get('/:id', quoteController.getSingle);

router.post('/', quoteController.createQuote);

module.exports = router;