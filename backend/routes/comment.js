
// Création de la route permettant les actions liées aux commentaires

const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');

// Récupération des middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Commentaires
router.post('/comment/', auth, commentCtrl.commentPost);
router.delete('/delete-comment/:id', auth, commentCtrl.deleteCommentPost);
router.get('/get-comment/:id', auth, commentCtrl.getCommentsPost);

module.exports = router;