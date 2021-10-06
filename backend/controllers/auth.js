const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require("passport");
const LocalStrategy = require("passport-local");


const User = models.users;

const maxAge = 3 * 24 * 60 * 60 * 1000

const passwordValidator = require('password-validator');

// Create a schema

const passwordSchema = new passwordValidator();

// Add properties to it

passwordSchema
  .is().min(8) // Minimum length 8
  .is().max(100) // Maximum length 32
  .has().uppercase() // Must have uppercase letters
  .has().lowercase() // Must have lowercase letters.has()
  .digits(2) // Must have at least 2 digits
  .has().not() .spaces() // Should not have spaces



exports.signup = (req, res) => {

  // if (!passwordSchema.validate(req.body.password)) {
  //   res.status(401).send(`Le mot de passe doit faire entre 8 et 32 caractères, contenir 1 min, 1 maj, 2 chiffres et ne pas contenir d'espaces`,
  //   );
    
  //   return false;
  // }

    bcrypt
      .hash(req.body.password, 10) 
      .then((hash) => {
        delete req.body.password;
        User.create({
          pseudo: req.body.pseudo,
          email: req.body.email,
          password: hash,
        })
          .then(() => res.status(201).json({ message: `Utilisateur créé !` }))
          .catch(() => res.status(400).json({ message : `Un compte avec ce pseudo et/ou cet email existe déjà` }));
      })
      .catch((error) => res.status(500).json({ error }));
};


exports.login = (req, res) => {
  const email = req.body.email;
  User.findOne({
    where: { email },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ err: `Utilisateur non trouvé !` });
      }
      bcrypt
        .compare(req.body.password, user.password) 
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ err: `Mot de passe incorrect !` });
          }
          res.cookie(
            'jwt',
            jwt.sign(
              { userId: user.id, isAdmin: user.isAdmin },
              process.env.JWT_SECRET_TOKEN,
              { expiresIn: maxAge },
              { maxAge: maxAge, httpOnly: true }
            )
            );
                   
          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,         
          }
          ); 
        
        })
        .catch((err) => res.status(500).json({ err}));
    })
    .catch((err) => res.status(500).json({ err }));
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
};

