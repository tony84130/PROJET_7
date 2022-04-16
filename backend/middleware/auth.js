
// Récupération du modèle jsonwebtoken et des variables d'environnement
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req,res,next) => {
  try{
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
      const userId = decodedToken.userId;
      //const userPseudo = decodedToken.pseudo;
      //req.auth = {userId:userId};
      req.auth = {userId};
      //req.auth = {userPseudo};
      if (req.body.userId && req.body.userId !== userId) {
          throw 'UserId non valide!';
      } else {
          console.log('UserId valide! : ' + req.auth.userId);
          next();
      }
  } catch {
      res.status(401).json({error: 'Requête invalide, non autorisé !'});
  }
};

/*
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
*/
