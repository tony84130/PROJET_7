
const dbc = require("../config/db");
const db = dbc.getDB();
const fs = require("fs");
const crypto = require('crypto');

// Importation des modules bcrypt et jsonwebtoken
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Constante pour la création du token
const maxAge = 3 * 24 * 60 * 60 * 1000;
const creatToken = (id) => {
  return jwt.sign({id}, process.env.SECRET_TOKEN, {
    expiresIn: maxAge
  })
}

// Vérifier pour le pseudo déjà existant ?? Celui dans les commentaires ??
// Création d'un compte utilisateur
exports.signUp = (req, res, next) => {
  console.log(req.body);
  const password = req.body.password;
  const email = req.body.email;
  const prenom = req.body.prenom;
  const nom = req.body.nom;
  //const pseudo = req.body.pseudo;
  //const sql = `SELECT email, pseudo FROM users WHERE email=? OR pseudo=?`;
  const sql = `SELECT email FROM users WHERE email=?`;
  //const sqlPseudo = `SELECT pseudo FROM users WHERE pseudo=?`;
  //let query = db.query(sql, email, pseudo, async (err, docs) => {

  let query = db.query(sql, email, async (err, docs) => {
    //console.log(docs.length >= 1)
    if (err) throw err;

    if (!email || !password || !prenom || !nom ) {
      return res.status(400).json({ error: "Veuillez remplir toutes les informations demandées !" });
    }
    
    if (docs.length >= 1) {
      return res.status(400).json({ error: "Utilisateur déja existant !" });
    }
    
    if (password.length <= 8) {
      return res.status(400).json({
        message: "Le mot de passe doit être de 6 caractéres minimum!",
      });
    }
    else {
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const newUser = {
            prenom: req.body.prenom,
            nom: req.body.nom,
            email: req.body.email,
            password: hash,
            //isAdmin: req.body.isAdmin,
          };
          let sql = "INSERT INTO users SET ?";
          let query = db.query(sql, newUser, (err, docs) => {
            if (err) throw err;
            //console.log(docs);
            res.status(201).json({ message: "Utilisateur créé!" });
          });
        })
        .catch((error) => res.status(500).json({ error }));
    }
  });

  
};

// Passer le pseudo à l'utilisateur connecté ??
// Connexion à un compte utilisateur
exports.login = (req, res, next) => {
  const email = req.body.email;
  const sql = `SELECT * FROM users WHERE email=?`;
  let query = db.query(sql, email, async (err, docs) => {
    if (err) throw err;
    console.log(err);
    console.log(docs);
    if (docs.length === 0) {
      return res
        .status(401)
        .json({ error: "Identifiant incorrect" });
    } else {
      bcrypt.compare(req.body.password, docs[0].password)
      .then((valid) => {
        if (!valid) {
          return res
            .status(401)
            .json({ error: "Mot de passe incorrect" });
        }
        //const token = creatToken(docs[0].id);
        // À vérifier ??
        //res.cookie('jwt', token, { httpOnly: true, maxAge });
        res.status(200).json({
          userId: docs[0].id,
          //pseudo: docs[0].pseudo,
          token: jwt.sign({ userId: docs[0].id/*, pseudo: docs[0].pseudo*/ }, process.env.SECRET_TOKEN, {
            expiresIn: "24h",
          }),
        });
        /*
        res.status(200).json({
          userId: docs[0].id,
          token: jwt.sign({ userId: docs[0].id }, process.env.SECRET_TOKEN, {
            expiresIn: "24h",
          }),
        });
        */
        console.log("utilisateur connecté");
      });
    }
  });
};

// À corriger !!!!!
// Déconnexion d'un compte utilisateur
exports.logout = (req, res, next) => {
  //res.cookie('jwt', '', { maxAge : 1 }).json({message: "Utilisateur deconnecté !"});
  console.log("utilisateur connecté");
  //res.redirect('/');
}

/*
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
*/

// Récupération des infos de tous les utilisateurs
exports.getAllUsers = (req, res, next) => {
  const sql = `SELECT id, email, prenom, nom, isAdmin, bio, picture FROM users`;
  let query = db.query(sql, (err, docs) => {
    if (err) throw err;
    res.status(200).json(docs);
  })
};

// Récupération des infos d'un utilisateur
exports.userInfo = (req, res, next) => {
  const userId = req.params.id;
  const sql = `SELECT id, email, prenom, nom, isAdmin, bio, picture FROM users WHERE id='${userId}'`;[]
  let query = db.query(sql, (err, docs) => {
    if (err) throw err;
    res.status(200).json(docs);
  })
};

// À corriger !!!!!
// Récupération des infos de l'utilisateur connecté
exports.userProfil = (req, res, next) => {
  const userId = req.auth.userId;
  const sql = `SELECT id, email, prenom, nom, isAdmin, bio, picture FROM users WHERE id='${userId}'`;
  let query = db.query(sql, (err, docs) => {
    res.status(200).json(docs);
    console.log(userId)
    console.log(id)
  })
};

/*
// Quand l'utilisateur existe deja ? sinon enlever la possibilité de changer le pseudo !
// Regler probleme de nodemon crash quand il y a des erreurs
// Modification des infos d'un utilisateur
exports.updateUser = (req, res, next) => {
  const userPageId = req.params.id;
  const userId = req.auth.userId;
  const pseudo = req.body.pseudo;
  const email = req.body.email;
  const bio = req.body.bio;
  const file = req.file;
  const sqlInfos = `SELECT pseudo, id, email, bio, picture FROM users WHERE id='${userPageId}'`;
  const sqlAdminInfos = `SELECT isAdmin FROM users WHERE id='${userId}'`;
  let adminCheckout = null;

  let query = db.query(sqlAdminInfos, (err, docs) => {
    if (err) throw err;
    adminCheckout = docs[0].isAdmin;
    let query = db.query(sqlInfos, (err, docs1) => {
      if (err) throw err;
      if (userId == `${docs1[0].id}` || adminCheckout === 1) {
        if (file) {
          const new_profil_image_url = `${req.protocol}://${req.get("host")}/images/profils/${req.file.filename}`;
          console.log(docs1[0]);
          console.log(docs1[0].picture);
          if(docs1[0].picture !== null) {
            oldFileName = docs1[0].picture.split("/images/profils/")[1];
            if (oldFileName !== "avatar.png") {
              fs.unlink(`images/profils/${oldFileName}`, () => {
                if (err) console.log(err);
                else {
                  console.log("Ancienne image de profile supprimée");
                }
              });
            }
            const newUserInfos = {
              //pseudo: pseudo,
              //email: email,
              bio: bio,
              picture: new_profil_image_url,
            };
            
            const sql = `UPDATE users SET ? WHERE id='${userPageId}'`;
            let query = db.query(sql, newUserInfos, (err, docs) => {
              if (err) {
                res.status(500).json({
                  error: "Erreur lors de la modification de l'utilisateur",
                });
                throw err;
              }
              res.status(200).json({ message: "Utilisateur modifié!" });
              console.log("utilisateur modifié");
            });
          } else {
            const newUserInfos = {
              //pseudo: pseudo,
              //email: email,
              bio: bio,
              picture: new_profil_image_url,
            };
            const sql = `UPDATE users SET ? WHERE id='${userPageId}'`;
            let query = db.query(sql, newUserInfos, (err, docs) => {
              if (err) {
                res.status(500).json({
                  error: "Erreur lors de la modification de l'utilisateur",
                });
                throw err;
              }
              res.status(200).json({ message: "Utilisateur modifié!" });
              console.log("utilisateur modifié");
            });
          }
        } else {
          const newUserInfos = {
            //pseudo: pseudo,
            //email: email,
            bio: bio
          };
          const sql = `UPDATE users SET ? WHERE id='${userPageId}'`;
          let query = db.query(sql, newUserInfos, (err, docs) => {
            if (err) {
              res.status(500).json({
                error: "Erreur lors de la modification de l'utilisateur",
              });
              throw err;
            }
            res.status(200).json({ message: "Utilisateur modifié!" });
            console.log("utilisateur modifié");
          });
        }
      } else {
        return res.status(403).json({ error: "Accès refusé" });
      }
    });
  });
};
*/

// TEST
// Modification de la biographie d'un utilisateur
exports.updateUser = (req, res, next) => {
  const userPageId = req.params.id;
  const userId = req.auth.userId;
  const bio = req.body.bio;
  const sqlInfos = `SELECT prenom, nom, id, email, bio, picture FROM users WHERE id='${userPageId}'`;
  const sqlAdminInfos = `SELECT isAdmin FROM users WHERE id='${userId}'`;
  let adminCheckout = null;

  let query = db.query(sqlAdminInfos, (err, docs) => {
    if (err) throw err;
    adminCheckout = docs[0].isAdmin;
    let query = db.query(sqlInfos, (err, docs1) => {
      if (err) throw err;
      if (userId == `${docs1[0].id}` || adminCheckout === 1) {
        
          const newUserInfos = {
            bio: bio
          };
          const sql = `UPDATE users SET ? WHERE id='${userPageId}'`;
          let query = db.query(sql, newUserInfos, (err, docs) => {
            if (err) {
              res.status(500).json({
                error: "Erreur lors de la modification de l'utilisateur",
              });
              throw err;
            }
            res.status(200).json({ message: "Utilisateur modifié!" });
            console.log("utilisateur modifié");
          });
        
      } else {
        return res.status(403).json({ error: "Accès refusé" });
      }
    });
  });
};

// TEST
// Modification de la photo de l'utilisateur
exports.updatePictureUser = (req, res, next) => {
  const userPageId = req.params.id;
  const userId = req.auth.userId;
  const bio = req.body.bio;
  const file = req.file;
  const sqlInfos = `SELECT prenom, nom, id, email, bio, picture FROM users WHERE id='${userPageId}'`;
  const sqlAdminInfos = `SELECT isAdmin FROM users WHERE id='${userId}'`;
  let adminCheckout = null;

  let query = db.query(sqlAdminInfos, (err, docs) => {
    if (err) throw err;
    adminCheckout = docs[0].isAdmin;
    let query = db.query(sqlInfos, (err, docs1) => {
      if (err) throw err;
      if (userId == `${docs1[0].id}` || adminCheckout === 1) {
        if (file) {
          const new_profil_image_url = `${req.protocol}://${req.get("host")}/images/profils/${req.file.filename}`;
          console.log(docs1[0]);
          console.log(docs1[0].picture);
          if(docs1[0].picture !== null) {
            oldFileName = docs1[0].picture.split("/images/profils/")[1];
            if (oldFileName !== "avatar.png") {
              fs.unlink(`images/profils/${oldFileName}`, () => {
                if (err) console.log(err);
                else {
                  console.log("Ancienne image de profile supprimée");
                }
              });
            }
            const newUserInfos = {
              picture: new_profil_image_url,
            };
            
            const sql = `UPDATE users SET ? WHERE id='${userPageId}'`;
            let query = db.query(sql, newUserInfos, (err, docs) => {
              if (err) {
                res.status(500).json({
                  error: "Erreur lors de la modification de l'utilisateur",
                });
                throw err;
              }
              res.status(200).json({ message: "Utilisateur modifié!" });
              console.log("utilisateur modifié");
            });
          } else {
            const newUserInfos = {
              picture: new_profil_image_url,
            };
            const sql = `UPDATE users SET ? WHERE id='${userPageId}'`;
            let query = db.query(sql, newUserInfos, (err, docs) => {
              if (err) {
                res.status(500).json({
                  error: "Erreur lors de la modification de l'utilisateur",
                });
                throw err;
              }
              res.status(200).json({ message: "Utilisateur modifié!" });
              console.log("utilisateur modifié");
            });
          }
        } else {
            console.log("Aucun fichier selectionné !")
            return res.status(404).json({ error: "Mauvaise requête" });
        }
      } else {
        return res.status(403).json({ error: "Accès refusé" });
      }
    });
  });
};

// Supprimé en cascade les posts, likes et commentaires de l'utilisateur ??
// Suppression d'un utilisateur par l'auteur ou par l'administrateur
exports.deleteUser = (req, res, next) => {
  const userPageId = req.params.id;
  const userId = req.auth.userId;
  const sqlInfos = `SELECT id ,picture FROM users WHERE id='${userPageId}'`;
  const sqlAdminInfos = `SELECT isAdmin FROM users WHERE id='${userId}'`;
  let adminCheckout = null;

  let query = db.query(sqlAdminInfos, (err, docs) => {
    if (err) throw err;
    adminCheckout = docs[0].isAdmin;
    let query = db.query(sqlInfos, (err, docs1) => {
      if (err) throw err;
      if (userId === docs1[0].id || adminCheckout === 1) {
        if(docs1[0].picture) {
          const oldFileName = docs1[0].picture.split("/images/profils/")[1];
  
          if (oldFileName !== "avatar.png") {
            fs.unlink(`images/profils/${oldFileName}`, () => {
              if (err) console.log(err);
              else {
                console.log("Image de profile supprimée");
              }
            });
          }
        }

        const sql = `DELETE FROM users WHERE id = '${userPageId}';`;

        
        let query = db.query(sql, (err, docs) => {
          if (err) throw err;
          res.status(200).json({ message: "Utilisateur supprimé!" });
          console.log("utilisateur supprimé");
        });

      } else {
        return res.status(403).json({ error: "Accès refusé" });
      }
    });
  });
  console.log(`userId: ${userId} userPageId: ${userPageId}`);
};
