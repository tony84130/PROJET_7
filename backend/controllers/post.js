const dbc = require("../config/db");
const db = dbc.getDB();
const fs = require("fs");

// Récupération de tous les posts
exports.getAllPost = (req, res, next) => {
    const sql = `SELECT * FROM posts ORDER BY datePost DESC`;

    db.query(sql, (err, docs) => {
        if (err) {
            res.status(404).json({err});
            throw err;
        }
        res.status(200).json(docs);
    })
};

// Récupération d'un post
exports.getOnePost = (req, res, next) => {
    const post_id = req.params.id;
    const sql = 'SELECT * FROM posts WHERE posts.id= ?';
    const sql2 ="SELECT posts.picturePost, posts.id, posts.posterId, posts.message, users.picture, users.prenom, users.nom FROM posts JOIN users ON (posts.posterId = users.id) WHERE posts.id = ?;";

    db.query(sql2, post_id, (err, docs) => {
        if (err) res.status(404).json({err});
        if (!err) res.status(200).json(docs);
    })
}

// Récupération des posts d'un utilisateur
exports.getUserPost = (req, res, next) => {
    const userId = req.params.id;
    const sql = 'SELECT * FROM posts WHERE posts.posterId= ?';

    db.query(sql, userId, (err, docs) => {
        if (err) res.status(404).json({err});
        if (!err) res.status(200).json(docs);
    })
};


// Création d'un post
exports.createPost = (req, res, next) => {
    console.log(req.body.message)
    if (req.file) {
        console.log(req.file);
        const imageUrl = `${req.protocol}://${req.get("host")}/images/posts/${req.file.filename}`;
    
    console.log(imageUrl);

    const newPostWithImage = {
        message: req.body.message,
        posterId: `${req.auth.userId}`,
        //posterPseudo: `${req.auth.userPseudo}`,
        picturePost: imageUrl
    };
    const sql = "INSERT INTO posts SET ?";
    db.query(sql, newPostWithImage, (err, docs) => {
        if (err) throw err;
        res.status(200).json({message: "Post créé !"});
    });
    return;
    }
    const newPost = {
        message: req.body.message,
        posterId: `${req.auth.userId}`,
        //posterPseudo: `${req.auth.userPseudo}`,
        picturePost: null
    }

    const sql = "INSERT INTO posts SET ?"
    db.query(sql, newPost, (err, docs) => {
        if (err) throw err;
        res.status(200).json({message: "Post crée !"})
    })
}

// Modification d'un post
exports.updatePost = (req, res, next) => {
    const post_id = req.params.id;
    const post_text = req.body.message;
    const sql = `UPDATE posts SET message = "${post_text}" WHERE id = ${post_id};`;
    db.query(sql, (err, docs) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).json({message: `Post ${post_id} modifié !`});
  });
};

// Suppression d'un post par l'auteur ou par l'administrateur
exports.deletePost = (req, res, next) => {
    const postId = req.params.id;
    const userId = req.auth.userId;
    const sqlAdminInfos = "SELECT isAdmin FROM users WHERE id = ?";
    let adminCheckout = null;
    const sqlInfos = "SELECT * FROM posts WHERE id = ?";
    let filename = "";

    db.query(sqlAdminInfos, [userId], (err, docs) => {
        //if (err) throw err;
        if (err) console.log(err);
        adminCheckout = docs[0].isAdmin;

        db.query(sqlInfos, [postId], (err, docs) => {
            if (err) throw err;
            if (docs[0].picturePost) {
                filename = docs[0].picturePost.split("/images/posts/")[1];
                console.log(filename);
            }
            if (userId == docs[0].posterId || adminCheckout == 1) {
                const sql = `DELETE FROM posts WHERE id = ${postId}`;
                db.query(sql, (err, docs) => {
                    if (err) {
                        res.status(404).json({err});
                        throw err;
                    }
                    if (filename) {
                        fs.unlink(`images/posts/${filename}`, () => {
                            if (err) console.log(err);
                            else console.log("Image supprimé !");
                        })
                    }
                    res.status(200).json({message: "Post supprimé !"});
                    console.log("Post supprimé !")
                })
            }
            else {
                return res.status(403).json({error: "Accès refusé !"})
            }
        })
    })
};
