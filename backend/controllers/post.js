const db = require('../models');
const Post = db.posts;
const User = db.users;
const Comment = db.comments;

const fs = require('fs');



// View all posts

exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    // include: [
    //   {
    //     model: User,
    //   },
    //   {
    //     model: Comment,
    //     include: [
    //       {
    //         model: User,
    //       },
    //     ],
    //   },
    // ],
    order: [['createdAt', 'DESC']],
  })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

// View one post

exports.getOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};


// Create post

exports.createPost = (req, res, next) => {
  if (!req.body.content && !req.body.title) {
    return res
      .status(400)
      .json({ errormessage: 'Veuillez choisir un titre et un contenu' });
  }
  Post.create({
    userId: req.body.userId,
    title: req.body.title,
    content: req.body.content,
    attachment: req.file
      ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      : null,
    likes: 0,
    comments: 0,
  })
    .then(() => res.status(201).json({ message: 'Post créé !' }))
    .catch((error) => {
      console.log(error.message);
      return res.status(400).json({ error });
    });
};



// Update a post

exports.updatePost = (req, res, next) => {

  const id = req.params.id;
  
  Post.findOne({ where: { id: id } })
    .then((post) => {
        if (req.file) {
          if (post.attachment !== null) {
            const fileName = post.image.split("/images/")[1];
            fs.unlink(`images/${fileName}`, (err) => {
              if (err) console.log(err);
              else {
                console.log("Image supprimée: " + fileName);
              }
            });
          }
          req.body.image = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
        }
        post
          .update({ ...req.body, id: req.params.id })
          .then(() =>
            res.status(200).json({ message: "Votre a été modifié !" })
          )
          .catch((error) => res.status(400).json({ error }));
      
    })
    .catch((error) => res.status(500).json({ error }));
};


// Delete a post

exports.deletePost = (req, res, next) => {
  const id = req.params.id;
  

  Post.findOne({ where: { id: id } })
    .then((post) => {
      
        if (post.attachment !== null) {
          const fileName = post.image.split("/images/")[1];
          fs.unlink(`images/${fileName}`, (err) => {
            if (err) console.log(err);
            else {
              console.log("Image supprimée: " + fileName);
            }
          });
        }
        post
          .destroy({ where: { id: id } })
          .then(() => res.status(200).json({ message: "post supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      
    })
    .catch((error) => res.status(500).json({ error }));
};

