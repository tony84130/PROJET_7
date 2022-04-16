
// Création de la route permettant les actions liées aux utilisateur

const express = require('express');
const router = express.Router();
//const jwt = require('jsonwebtoken');
//const multer = require('multer');

// Récupération du controller user
const userCtrl = require('../controllers/user');

// Récupération des middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const checkPassword = require("../middleware/password");
const rateLimit = require("../middleware/rate-limiter");
const requireAuth = require('../middleware/require-auth');

// Auth
// signUp
router.post('/signup', /*rateLimit,*//* checkPassword,*/ userCtrl.signUp);
// login
router.post('/login', /*rateLimit, checkPassword,*/ userCtrl.login, /*requireAuth*/);
// logout
router.get('/logout', /*auth, checkPassword,*/ userCtrl.logout);

// User display
router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.userInfo);
router.get('/profil', auth, userCtrl.userProfil);
router.put('/:id', auth, multer.single('profil_image'), userCtrl.updateUser);
router.put('/profil/:id', auth, multer.single('profil_image'), userCtrl.updatePictureUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;