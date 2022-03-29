
const dbc = require("../config/db");
const db = dbc.getDB();
const fs = require("fs");

// Importation des modules bcrypt et jsonwebtoken
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Constante pour la connexion de l'utilisateur
const maxAge = 3 * 24 * 60 * 60 * 1000;
const creatToken = (id) => {
  return jwt.sign({id}, process.env.SECRET_TOKEN, {
    expiresIn: maxAge
  })
}

// Création d'un compte utilisateur
exports.signUp = (req, res, next) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Connexion d'un utilisateur
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          const token = creatToken(user._id);
          res.cookie('jwt', token, { httpOnly: true, maxAge })
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.SECRET_TOKEN,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Déconnexion d'un utilisateur
exports.logout = (req, res, next) => {
  res.cookie('jwt', '', { maxAge : 1 });
  res.redirect('/');
}

// Récupération de tous les utilisateur
exports.getAllUsers = (req, res, next) => {
  User.find().select('-password')
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};

// Récupération des infos utilisateur
exports.userInfo = (req, res, next) => {
  console.log(req.params);
  console.log(req.params.id);
  if (!objectID.isValid(req.params.id)) {
    return res.status(400).send('ID unknown : ' + req.params.id)
  }
  User.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('ID unknown :' + err);
    }
  }).select('-password');
};

// Modification des infos d'un utilisateur
exports.updateUser = (req, res, next) => {
  if (!objectID.isValid(req.params.id)) {
    return res.status(400).send('ID unknown : ' + req.params.id)
  }

  try {
    User.findByIdAndUpdate(
      {_id: req.params.id}, {$set : {bio: req.body.bio}}, 
      { new: true, upsert: true, setDefaultsOnInsert: true},
      (err, docs) => {
        if (!err) { return res.send(docs) }
        if (err) { return res.status(500).send({ message: err }) }
      }
    )
  }
  catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Suppression d'un utilisateur
exports.deleteUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then(() => {
        User.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
          .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Abonnement à un utilisateur
exports.follow = (req, res, next) => {
  if (!objectID.isValid(req.params.id) || !objectID.isValid(req.body.idToFollow)) {
    return res.status(400).send('ID unknown : ' + req.params.id)
  }

  try {
    // add to the follower list
    User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) {
          res.status(201).json(docs);
        }
        else {
          return res.status(400).json(err);
        }
      }
    );
    // add to following list
    User.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        //if (!err) {res.status(201).json(docs);}
        if (err) {
          return res.status(400).json(err);
        }
      }
    );
  }
  catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Désabonnement à un utilisateur
exports.unfollow = (req, res, next) => {
  if (!objectID.isValid(req.params.id) || !objectID.isValid(req.body.idToUnfollow)) {
    return res.status(400).send('ID unknown : ' + req.params.id)
  }

  try {
    // remove to the follower list
    User.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) {
          res.status(201).json(docs);
        }
        else {
          return res.status(400).json(err);
        }
      }
    );
    // remove to following list
    User.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        //if (!err) {res.status(201).json(docs);}
        if (err) {
          return res.status(400).json(err);
        }
      }
    );
  }
  catch (err) {
    return res.status(500).json({ message: err });
  }
};

