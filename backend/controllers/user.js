const db = require ('../models');
const User = db.users;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



  
  



// Retrieve all Users from the DB

exports.getAllUsers = (req, res) => {
  User.findAll()
    .then((users) => {
      
      res.status(200).json({ data: users });
    })
    .catch((error) => res.status(400).json({ error }));

};

// Find a single User with an id

exports.findOneUser = (req, res) => {


};

// Update an user by id

exports.updateUser = (req, res) => {


};

//  Delete an user by id

exports.deleteUser = (req, res) => {


};


