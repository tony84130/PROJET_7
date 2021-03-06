
// Création de la route permettant les actions liées aux likes

const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like');

// Récupération des middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Ajout ou retrait des likes
router.post('/like-post/:id', auth, likeCtrl.likePost);
router.get('/get-like-post/:id', auth, likeCtrl.getLikePost);
router.get('/get-count-like-post/:id', auth, likeCtrl.getCountLikePost);
router.get('/get-like-user/:id', auth, likeCtrl.getLikeUser);

module.exports = router;