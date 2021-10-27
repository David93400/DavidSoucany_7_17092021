const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = models.users;

const maxAge = 3 * 24 * 60 * 60 * 1000;

// signup

exports.signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      delete req.body.password;
      User.create({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash,
      })
        .then(() =>
          res
            .status(201)
            .json({
              message: `Enregistrement réussi ! Vous pouvez désormais vous connecter !`,
            })
        )
        .catch(() =>
          res
            .status(400)
            .json({
              message: `Un compte avec ce pseudo et/ou cet email existe déjà`,
            })
        );
    })
    .catch((error) => res.status(500).json({ error }));
};

// log in

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
            ),
          );

          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
          });
        })
        .catch((err) => res.status(500).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};


// log out

module.exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
};
