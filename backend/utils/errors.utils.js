
/*
module.exports.signUpErrors = (err) => {
    let errors = { pseudo: '', email: '', password: "" }

    if (err.message.includes('pseudo')) {
        errors.pseudo = "Pseudo incorreect ou déjà pris";
    }
    if (err.message.includes('email')) {
        errors.email = "Email incorreect ou déjà pris";
    }
    if (err.message.includes('password')) {
        errors.password = "Mot de passe incorreect";
    }
    return errors;
}
*/


/*
module.exports.loginErrors = (err) => {
    let errors = { email: '', password: "" }

    if (err.message.includes('email')) {
        errors.email = "Email incorreect ou déjà pris";
    }
    if (err.message.includes('password')) {
        errors.password = "Mot de passe incorreect";
    }
    return errors;
}
*/


// Il faut les importer dans les endroits correspondant


/*
module.exports.uploadErrors = (err) => {
    let errors = { format: "", maxSize: "" };

    if (err.message.includes('invalid files')) {
        errors.format = "Format incompatible";
    }
    if (err.message.include('max size')) {
        errors.maxSize = "Le fichier dépasse 500ko";
    }

    return errors
}
*/