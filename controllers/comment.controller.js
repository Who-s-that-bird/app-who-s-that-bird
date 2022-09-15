const createError = require("http-errors");

//CRUD
const Bird = require("../models/Bird.model");
const User = require("../models/User.model");
const Comment = require("../models/comment.model");

//READ
module.exports.list = (req, res, next) => {
  Bird.find()
    .sort({ name: 1 })
    .then((birds) => {
      res.render("birds/list", { birds });
    })
    .catch((err) => next(err));
};

//CREATE
module.exports.create = (req, res, next) => {
  Comment.find().then((comments) => {
    res.render("comments/commentCreate", { comments });
  });
};

module.exports.doCreate = (req, res, next) => {
  const userId = req.user.id;
  const birdId = req.params.birdId;
  const annotation = req.body.annotation;

  const comment = {
    user: userId,
    bird: birdId,
    annotation,
  };

  Comment.create(comment)
    .then((comment) => {
      console.log(comment);
      res.redirect(`/bird/${birdId}/total`);
    })
    .catch(next);
};

//UPDATE /EDIT
module.exports.edit = (req, res, next) => {
  const { id } = req.params;

  User.findById(id).then((comment) => {
    res.render("comments/commentCreate", { comment, isEdit: true }); // MIRAR EL res.render !!
  });
};

module.exports.doEdit = (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, req.body, { new: true }) // new true sirve para que te devuelva el nuevo en el then sino te devuelve el viejo
    .then((user) => {
      console.log({ user });

      res.redirect(`/comments/${user.id}`);
    });
};

// DELETE

module.exports.delete = (req, res, next) => {
  const { id } = req.params;

  Comment.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/birds/birdDetailTotal");
    })
    .catch(next);
};
