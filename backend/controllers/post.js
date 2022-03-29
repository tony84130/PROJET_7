const dbc = require("../config/db");
const db = dbc.getDB();
const fs = require("fs");

const Post = require('../models/Post');
const User = require('../models/User');
const objectID = require('mongoose').Types.ObjectId;

/*
Vérifier le tri des publications de la plus récente à la plus ancienne
*/

// Récupération de tous les posts
exports.readPost = (req, res, next) => {
    Post.find().sort({ createAt: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(404).json({ error }));
};

// Création d'un post
exports.createPost = (req, res, next) => {

    //const imageurl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;

    const newPost = new Post({
        posterId: req.body.posterId,
        message: req.body.message,
        //picture: req.body.picture,
        video: req.body.video,
        likers: [],
        comments: []
    })

    try {
        newPost.save()
        .then(() => res.status(201).json({ message: 'Post créé !' }))
        .catch(error => res.status(400).json({ error }));
    }
    catch (err) {
        return res.status(400).send(err)
    }
};

// Modification d'un post
exports.updatePost = (req, res, next) => {
    if (!objectID.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id)
    }

    const updatedRecord  = {
        message: req.body.message
    }

    Post.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
            if (!err) { res.send(docs); }
            else { console.log('Update error : + err') }
        }
    )
};

// Suppression d'un post
exports.deletePost = (req, res, next) => {
    if (!objectID.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id)
    }

    Post.findOne({ _id: req.params.id })
    .then(() => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Post supprimé !'}))
          .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Ajout d'un like
exports.likePost = (req, res, next) => {
    if (!objectID.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id)
    }

    try {
        Post.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id }
            },
            { new: true },
            (err, docs) => {
                if (err) { return res.status(400).send(err) }
            }
        );
        User.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id }
            },
            { new: true },
            (err, docs) => {
                if (!err) { res.send(docs) }
                else { return res.status(400).send(err) }
            }
        )
    }
    catch (err) {
        return res.status(400).send(err)
    }
};

// Retrait d'un like
exports.unlikePost = (req, res, next) => {
    if (!objectID.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id)
    }

    try {
        Post.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id }
            },
            { new: true },
            (err, docs) => {
                if (err) { return res.status(400).send(err) }
            }
        );
        User.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id }
            },
            { new: true },
            (err, docs) => {
                if (!err) { res.send(docs) }
                else { return res.status(400).send(err) }
            }
        )
    }
    catch (err) {
        return res.status(400).send(err)
    }
};

// Ajout d'un commentaire
exports.commentPost = (req, res, next) => {
    if (!objectID.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id)
    }

    try {
        return Post.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime()
                    }
                }
            },
            { new: true },
            (err, docs) => {
                if (!err) { return res.send(docs) }
                else { return res.status(400).send(err) }
            }
        )
    }
    catch (err) {
        return res.status(400).send(err)
    }
}

// Modification d'un commentaire
exports.editCommentPost = (req, res, next) => {
    if (!objectID.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id)
    }

    try {
        return Post.findById(
            req.params.id,
            (err, docs) => {  
                const theComment = docs.comments.find((comment) => 
                    comment._id==req.body.commentId
                )
                
                if (!theComment) { res.status(404).send('Comment not found') }
                else { theComment.text = req.body.text }

                return docs.save((err) => {
                    if (!err) { return res.status(200).send(docs) }
                    else { res.status(500).send(err) }
                })
                
            }
        )
    }
    catch (err) {
        return res.status(400).send(err)
    }
}

// Suppression d'un commentaire
exports.deleteCommentPost = (req, res, next) => {
    if (!objectID.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id)
    }

    try {
        return Post.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId
                    }
                }
            },
            { new: true },
            (err, docs) => {
                if (!err) { return res.send(docs) }
                else { return res.status(400).send(err) }
            }
        )
    }
    catch (err) {
        return res.status(400).send(err)
    }
}
