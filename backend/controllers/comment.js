
const dbc = require("../config/db");
const db = dbc.getDB();

// Modifier la routes ou req.body.post_id ??
// Ajout d'un commentaire
exports.commentPost = (req, res, next) => {
    const newComment = {
      text: req.body.text,
      user_id:`${req.auth.userId}`,
      post_id: req.body.post_id,
    };
    const sql = "INSERT INTO comments SET ?";
    db.query(sql, newComment, (err, result) => {
      if (err) throw err;
      res.status(200).json({ message: "Commentaire créé!" });
    });
};

// Récupération des commentaires
exports.getCommentsPost = (req, res, next) => {
    const postId = req.params.id;
    //const sql ="SELECT * FROM comments WHERE post_id = ?;";
    //const sql ="SELECT * FROM comments JOIN users ON (users.id = comments.user_id) WHERE post_id = ?;";
    const sql ="SELECT user_id, text FROM comments WHERE post_id = ?;";
    db.query(sql, postId, (err, docs) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      res.status(200).json(docs);
    });
};

// Modification d'un commentaire
exports.editCommentPost = (req, res, next) => {
    if (!objectID.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id)
    }

    try {
        return Post.findById(
            req.params.id,
            (err, docs) => {  
                const theComment = docs.comments.find((comment) => 
                    comment._id==req.body.commentId
                )
                
                if (!theComment) { res.status(404).send('Comment not found') }
                else { theComment.text = req.body.text }

                return docs.save((err) => {
                    if (!err) { return res.status(200).send(docs) }
                    else { res.status(500).send(err) }
                })
                
            }
        )
    }
    catch (err) {
        return res.status(400).send(err)
    }
}

// Suppression d'un commentaire par l'auteur ou par l'administrateur
exports.deleteCommentPost = (req, res, next) => {
    const commentId = req.params.id;
    const userId = req.auth.userId;
    const sqlAdminInfos = "SELECT isAdmin FROM users WHERE id = ? ;";
    const sqlInfos = "SELECT * FROM comments WHERE id = ? ;";
    let adminCheckout = null;
    db.query(sqlAdminInfos, [userId], (err, docs) => {
      if(err) throw err;
      adminCheckout = docs[0].isAdmin;
      console.log(adminCheckout);
      db.query(sqlInfos, [commentId], (err, docs) => {
        if (err) throw err;
        if (userId === docs[0].user_id || adminCheckout === 1) {
          const sql = `DELETE FROM comments WHERE id = ${commentId};`;
          db.query(sql, (err, docs) => {
            if (err) {
              res.status(404).json({ err });
              throw err;
            }
            res.status(200).json({ message: "Commentaire supprimé!" });
            console.log("Commentaire supprimé!");
          });
        } else {
          return res.status(403).json({ error: "Accès refusé" });
        }
      });
    });
};

/*
// Ajout d'un commentaire
exports.commentPost = (req, res, next) => {
    const message = req.body.message;
    const post_id = req.body.id;
    const posterId = req.body.posterId;
    const commenterPseudo = req.body.pseudo;
    const sql = `INSERT INTO posts comments (post_id, posterId, commenterPseudo, message, created_at) VALUES (post_id, posterId, commenterPseudo, message, CURRENT_TIMESTAMP)`;

    db.query(sql, (err, docs) => {
        if (err) {
            res.status(404).json({err});
            console.log(err);
            throw err;
        }
        res.status(200).json(docs);
    })
}
*/

