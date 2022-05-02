
const dbc = require("../config/db");
const db = dbc.getDB();

// Ajout ou suppression d'un like 
exports.likePost = (req, res, next) => {
  const postId = req.params.id;
  const userId = req.auth.userId;

  const sql = `SELECT * FROM likes WHERE post_id = '${postId}' AND user_id = '${userId}';`;
  db.query(sql, (err, docs) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    if (docs.length === 0) {
      const newLike = {
        post_id: postId,
        user_id: userId,
      };
      const sql = "INSERT INTO likes SET ?";
      db.query(sql, newLike, (err, docs) => {
        if (err) throw err;
        res.status(200).json({ message: "Poste liké!" });
      });
    } else {
      const sql = `DELETE FROM likes WHERE post_id = '${postId}' AND user_id = '${userId}';`;
      db.query(sql, (err, docs) => {
        if (err) throw err;
        res.status(200).json({ message: "Poste disliké!" });
      });
    }
  });
};

// Récupération des likes d'un post
exports.getLikePost = (req, res, next) => {
  //const postId = req.body.id;
  const postId = req.params.id;
  const sql = `SELECT * FROM likes WHERE post_id = ${postId};`;
  db.query(sql, (err, docs) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(docs);
  });
};

// Récupération du nombre de like d'un post
exports.getCountLikePost = (req, res, next) => {
  //const postId = req.body.id;
  const postId = req.params.id;
  const sql = `SELECT COUNT(*) FROM likes WHERE post_id = ${postId};`;
  db.query(sql, (err, docs) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(docs);
  });
};


// Récupération des likes d'un utilisateur
exports.getLikeUser = (req, res, next) => {
  //const posterId = req.auth.userId;
  const posterId = req.params.id;
  const sql = `SELECT post_id, user_id FROM likes WHERE user_id = ${posterId};`;
  db.query(sql, (err, docs) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(docs);
  });
};

    