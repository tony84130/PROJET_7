
// Récupération du modèle jsonwebtoken

const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      //res.locals.user = null
      throw 'User ID non valable';
    } else {
      //let user = UserModel.findById(decodedToken.userId);
      //res.locals.user = user;
      next();
    }
  } catch {
    //res.locals.user = null
    res.status(401).json({
      error: new Error('Requête non athentifiée !')
    });
  }
};

