
// Création de la route permettant les actions liées à "user"

const express = require('express');
const router = express.Router();
//const jwt = require('jsonwebtoken');
//const multer = require('multer');
//const upload = multer();

const userCtrl = require('../controllers/user');
const uploadCtrl = require('../controllers/upload');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const checkPassword = require("../middleware/password");
const rateLimit = require("../middleware/rate-limiter");
const requireAuth = require('../middleware/require-auth');

// Auth
// signUp
router.post('/signup', rateLimit,/*auth, checkPassword,*/ userCtrl.signUp);
// login
router.post('/login', rateLimit,/*rateLimit, checkPassword,*/ userCtrl.login, /*requireAuth*/);
// logout
router.get('/logout', /*auth, checkPassword,*/ userCtrl.logout);

// User display
router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.userInfo);
router.put('/:id', /*auth,*/ multer.single('profil_image'), userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser);
router.patch('/follow/:id', auth, userCtrl.follow);
router.patch('/unfollow/:id', auth, userCtrl.unfollow);

// Upload
router.post('/upload', multer.single('profil_image'), uploadCtrl.uploadProfil)

/*
router.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
  })
*/

module.exports = router;