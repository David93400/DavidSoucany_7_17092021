const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const mysql = require('mysql');
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Lancement de Express

const app = express();

// Sécurité headers

app.use(helmet())
app.use(cors())

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// Connect to DB

const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASSWORD}`,
  {
    dialect: `mysql`,
    host: `${process.env.DB_HOST}`,
    logging: false,
  }
);

try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!');
} catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
}



// appel des models dans la DB

const db = require("./models");
db.sequelize.sync();



// Import des routes

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post');

// Routeurs

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);


// 

module.exports = app;
