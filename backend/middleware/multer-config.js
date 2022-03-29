
// Récupération des images stockées sur le serveur

const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};

// Définition du lieu de stockage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    //callback(null, 'images');
    if (file.fieldname === "image") callback (null, "./images/posts/");
    else if (file.fieldname === "profil_image") callback (null, "./images/profils/");
  },
  // Définition du nom du fichier image
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage});