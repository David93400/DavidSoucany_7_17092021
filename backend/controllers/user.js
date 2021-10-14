const db = require ('../models');
const User = db.users;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');


// Retrieve all Users from the DB

exports.getAllUsers = (req, res) => {
  User.findAll({ order: [[`pseudo`, `ASC`]] })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => res.status(400).json({ error }));

};

// Find a single User with an id

exports.getOneUser = (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));

};

// Update an user by id

exports.updateUser = (req, res) => {

    const id = JSON.parse(req.params.id);

      User.findOne({ where: { id: id } })
        .then((user) => {
          if (req.file) {
            if (user.avatar !== null) {
              const fileName = user.avatar.split(`/uploads/`)[1];
              fs.unlink(
                `../frontend/public/uploads/${fileName}`,
                (err) => {
                  if (err) console.log(err);
                  else {
                    console.log(`Image supprimée: ` + fileName);
                  }
                }
              );
            }
            req.body.avatar = `./uploads/${req.file.filename}`;
          }
          delete req.body.isAdmin;
          delete req.body.password;
          user
            .update({ ...req.body, id: req.params.id })
            .then(() =>
              res.status(200).json({ message: `Votre profil a été modifié !` })
            )
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    
}


//  Delete an user by id

exports.deleteUser = (req, res) => {

  const id = JSON.parse(req.params.id);

    User.findOne({ where: { id: id } })
      .then((user) => {
        if (user.avatar !== null) {
          const fileName = user.avatar.split('/uploads/')[1];
          fs.unlink(`uploads/${fileName}`, (err) => {
            if (err) console.log(err);
            else {
              console.log(`Image supprimée: ` + fileName);
            }
          });
        }
        user
          .destroy({ where: { id: id } })
          .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));

};


