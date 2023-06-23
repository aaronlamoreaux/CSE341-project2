const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('entries').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('entries').find({
    _id: userId
  });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createEntry = async (req, res) => {
  const entry = {
    quote: req.body.quote,
    source: req.body.source
  };
  const response = await mongodb.getDb().db().collection('entries').insertOne(entry);
  res.status(201).json(response);
};

module.exports = {
  getAll,
  getSingle,
  createEntry
};