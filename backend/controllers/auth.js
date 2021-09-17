const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = models.users;

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



exports.signup = (req, res, next) => {

  if (!passwordSchema.validate(req.body.password)) {
    
    res.status(401).json({
      message: `Le mot de passe doit faire entre 8 et 32 caractères, contenir 1 min, 1 maj, 2 chiffres et ne pas contenir d'espaces`,
    });
    return false;
  }

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


exports.login = (req, res, next) => {
  const email = req.body.email;
  User.findOne({
    where: { email },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: `Utilisateur non trouvé !` });
      }
      bcrypt
        .compare(req.body.password, user.password) 
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: `Mot de passe incorrect !` });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
              { userId: user.id, is_admin: user.is_admin },
              process.env.SECRET_TOKEN,
              {
                expiresIn: '24h',
              }
            ),
            is_admin: user.is_admin,
            Message : `Bonjour ${user.pseudo} !`
          }
          );
          
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};