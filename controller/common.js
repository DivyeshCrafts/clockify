let bcrypt = require('bcrypt-nodejs');
let jwt = require('jsonwebtoken');
let tokensecret = "divyeshsecret"

module.exports.validPassword = function (password, passwordDB) {
    return bcrypt.compareSync(password, passwordDB);
};

module.exports.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

module.exports.generateJWT = function (userObject) {
    return jwt.sign(userObject, tokensecret);
};

module.exports.decodedJWT = function (token) {
    return jwt.verify(token, tokensecret, function (err, result) {
        if (err) {
            return false;
        } else {
            return result;
        }
    });
};