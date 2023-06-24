const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('quotes').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    const quoteId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('quotes').find({
        _id: quoteId
    });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createQuote = async (req, res) => {
    const quote = {
        quote: req.body.quote,
        source: req.body.source,
        category: req.body.category,
    };
    const response = await mongodb.getDb().db().collection('quotes').insertOne(quote);
    res.status(201).json(response);
};

const updateQuote = async (req, res) => {
    const id = new ObjectId(req.params.id);
    const quote = {
        quote: req.body.quote,
        source: req.body.source,
        category: req.body.category,

    };
    const result = await mongodb
        .getDb()
        .db()
        .collection('quotes')
        .replaceOne({
                _id: id
            },
            quote
        );
    res.status(204).json(result);
};

const deleteQuote = async (req, res) => {
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('quotes').deleteOne({
        _id: id
    });
    res.status(200).json(result);
};

module.exports = {
    getAll,
    getSingle,
    createQuote,
    updateQuote,
    deleteQuote
};