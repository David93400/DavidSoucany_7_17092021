const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const mysql = require('mysql');
const { Sequelize } = require('sequelize');
require('dotenv').config();
const { checkUser, requireAuth } = require('./middleware/auth');




// Lancement de Express

const app = express();
app.use(cookieParser());

// Configuration CORS

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// Sécurité headers

app.use(helmet())
app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
  })
);

// parse requests of content-type - application/json
app.use(express.json({ origin: true, credentials: true }));

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
const commentRoutes = require ('./routes/comment');

// Jwt

app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).json(res.locals.user);
});

// Routeurs

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);



// 

module.exports = app;
