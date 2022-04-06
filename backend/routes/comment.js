
// Création de la route permettant les actions liées aux commentaires

const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');

// Récupération des middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Commentaires
router.post('/comment/:id', auth, commentCtrl.commentPost);
//router.post("/:id/comment", auth, commentCtrl.commentPost);
//router.patch('/edit-comment-post/:id', auth, commentCtrl.editCommentPost);
router.delete('/delete-comment/:id', auth, commentCtrl.deleteCommentPost);
router.get('/get-comment/:id', auth, commentCtrl.getCommentsPost);

//router.post('/comment-post/:id', /*auth,*/ commentCtrl.commentPost);
//router.put('/edit-comment-post/:id', /*auth,*/ commentCtrl.editCommentPost);
//router.delete('/delete-comment-post/:id', /*auth,*/ commentCtrl.deleteCommentPost);

module.exports = router;