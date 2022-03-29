// Création de la route permettant les actions liées aux commentaires

const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// CRUD post
router.get('/', auth, postCtrl.readPost);
router.post('/', auth, multer.single("image"), postCtrl.createPost);
router.put('/:id', auth, multer.single("image"), postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);

// Ajout ou retrait des likes
router.patch('/like-post/:id', auth, postCtrl.likePost);
router.patch('/unlike-post/:id', auth, postCtrl.unlikePost);

// Commentaires
router.patch('/comment-post/:id', auth, postCtrl.commentPost);
router.patch('/edit-comment-post/:id', auth, postCtrl.editCommentPost);
router.patch('/delete-comment-post/:id', auth, postCtrl.deleteCommentPost);

module.exports = router;