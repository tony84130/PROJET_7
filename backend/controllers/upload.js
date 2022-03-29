
//const User = require('../models/User');
//const fs = require('fs');
//const { promisify } = require('util');
//const { uploadErrors } = require('../utils/errors.utils');
//const pipeline = promisify(require('stream').pipeline);

//const multer = require('multer');

exports.uploadProfil = (req, res, next) => {
    try {
        res.status(201).send(req, res)
    }
    catch (err) {
        res.status(200).send(err)
    }
}

/*
exports.uploadProfil = (req, res, next) => {
    const MIME_TYPES = {
        'image/jpg': 'jpg',
        'image/jpeg': 'jpg',
        'image/png': 'png'
      };
      
      // Définition du lieu de stockage
      const storage = multer.diskStorage({
        destination: (req, file, callback) => {
          callback(null, 'images');
        },
        // Définition du nom du fichier image
        filename: (req, file, callback) => {
          const name = file.originalname.split(' ').join('_');
          const extension = MIME_TYPES[file.mimetype];
          callback(null, name + Date.now() + '.' + extension);
        }
      });

      module.exports = multer({storage: storage}).single('image');
}
*/

/*
exports.uploadProfil = (req, res, next) => {
    
    try {
        if (
            req.file.detectedMimeType != "image/jpg" &&
            req.file.detectedMimeType != "image/png" &&
            req.file.detectedMimeType != "image/jpeg"
        ) {
            throw Error("invalid file");
        }
        if (req.file.size > 500000) {
            throw Error("max size")
        }
    }
    catch (err) {
        //const errors = uploadErrors(err);
        //return res.status(201).json({ errors });
        return res.status(201).json(err);
    }
    

    const fileName = req.body.name + ".jpg";

    pipeline(
        req.file.stream,
        fs.createWriteStream(
            //`${__dirname}/../client/public/uploads/profil/${fileName}`
            `${__dirname}/../models/${fileName}`
        )
    )
}
*/

/*
exports.uploadProfil = (req, res, next) => {
    const image = JSON.parse(req.body.file);
    delete image._id;
    const user = new User({
        ...image,
        picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    user.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
        .catch(error => res.status(400).json({ error }));
    */
    /*
    try {
        if (
            req.file.detectedMimeType != "image/jpg" &&
            req.file.detectedMimeType != "image/png" &&
            req.file.detectedMimeType != "image/jpeg"
        ) {
            throw Error("invalid file");
        }
        if (req.file.size > 500000) {
            throw Error("max size")
        }
    }
    catch (err) {
        //const errors = uploadErrors(err);
        //return res.status(201).json({ errors });
        return res.status(201).json(err);
    }
    

    const fileName = req.body.name + ".jpg";

    pipeline(
        req.file.stream,
        fs.createWriteStream(
            //`${__dirname}/../client/public/uploads/profil/${fileName}`
            `${__dirname}/../models/${fileName}`
        )
    )
    */
   /*
}
*/