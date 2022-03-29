const rateLimit = require('express-rate-limit');

//Utiliser pour limiter les demandes répétées lors de la connexion.
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 minutes
  max: 10 //Limite chaque adresse IP à 10 requête par windowMs
})

module.exports = limiter;