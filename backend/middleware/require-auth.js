
// Récupération du modèle jsonwebtoken

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
        if (err) {
          console.log(err)
        } else {
          console.log(decodedToken.id);
          next;
        }
      });
    } else {
      console.log('No token')
    }
  };