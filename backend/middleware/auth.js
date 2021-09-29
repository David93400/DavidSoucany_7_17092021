const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.users;

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin
    if (req.body.userId && req.body.userId !== userId) {
      throw '403: unauthorized request wrong cookie';
    } else if (req.body.isAdmin && req.body.isAdmin !== isAdmin) {
      throw '403: unauthorized request wrong cookie';
    } 
      
      next();
}
    catch {
    res.status(401).json({ message: `Authentification error (JWT Cookie) !` });
  }
};

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        
        res.locals.user = decodedToken.userId;
        console.log(res.locals.user);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_TOKEN, async (err, decodedToken) => {
      
      if (err) {
        console.log(err);
        res.status(200).json('no token');
      } else {
        const Tok = decodedToken.userId;
        res.locals.user = Tok;

        next();
      }
    });
  } else {
    console.log('No token');
  }
};
