const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('user-data').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('user-data').find({
    _id: userId
  });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createUser = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    bookDescription: req.body.bookDescription,
    favoriteQuote: req.body.favoriteQuote
  };
  const response = await mongodb.getDb().db().collection('user-data').insertOne(user);
  res.status(201).json(response);
};

const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    bookDescription: req.body.bookDescription,
    favoriteQuote: req.body.favoriteQuote
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection('user-data')
    .replaceOne({
        _id: userId
      },
      user
    );
  res.status(204).json(result);
};

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('user-data').deleteOne({
    _id: userId
  });
  res.status(200).json(result);
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};