const db = require('../models');
const Post = db.posts;
const User = db.users;
const Comment = db.comments;

// get all comments

exports.getAllComments = (req, res) => {
  Comment.findAll({ order: [[`id`, `ASC`]] })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => res.status(400).json({ error }));
};


// get all comments by post

exports.findAllComments = (req, res, next) => {
  // const CommentsForOneMessage = {};
  Comment.findAll({
    where: {
      postId: req.params.id,
    },
    include: {
      model: User,
      required: true,
      attributes: ['pseudo', 'avatar'],
    },
    order: [['id', 'DESC']],
  })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Add comment

exports.createComment = (req, res, next) => {
  const comment = new Comment({
    userId: req.body.userId,
    postId: req.body.postId,
    comment: req.body.comment,
  });
  comment
    .save()
    .then(() => res.status(201).json({ message: 'Commentaire ajouté !' }))
    .catch((error) => res.status(400).json({ error }));
};

// Update comment

exports.updateComment = (req, res, next) => {
  Comment.update({ ...req.body }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
    .catch((error) => res.status(400).json({ error }));
};

// Delete comment

exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
        .catch(error => res.status(400).json({ error }))
}