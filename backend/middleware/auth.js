const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.users;

module.exports.admin = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    console.log(userId);
    console.log(req.body.userId);
    console.log(isAdmin);
    console.log(req.body.isAdmin);
    if (req.body.isAdmin === isAdmin) {
      next();
    } else if (req.body.userId === userId) {
      next();
    } else {
      throw '403: unauthorized request wrong cookie';
    }

    
  } catch {
    res.status(402).json({ message: `Authentification error (JWT Cookie) !` });
  }
};

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET_TOKEN,
      async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          res.cookie('jwt', '', { maxAge: 1 });
          next();
        } else {
          res.locals.user = decodedToken.userId;
          console.log(res.locals.user);
          next();
        }
      }
    );
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET_TOKEN,
      async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.status(200).json('no token');
        } else {
          const Tok = decodedToken.userId;
          res.locals.user = Tok;

          next();
        }
      }
    );
  } else {
    console.log('No token');
  }
};
