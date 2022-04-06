// Création de la route permettant les actions liées aux posts

const express = require('express');
const router = express.Router();

// Récupération du controller post
const postCtrl = require('../controllers/post');

// Récupération des middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// CRUD post
router.get('/', auth, postCtrl.getAllPost);
router.get('/:id', auth, postCtrl.getOnePost)
router.post('/', auth, multer.single("image"), postCtrl.createPost);
router.put('/:id', auth, multer.single("image"), postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;