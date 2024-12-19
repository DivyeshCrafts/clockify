var validator = require("../../../../../controller/validationforrequest");

module.exports.registerValidation = (req, res, next) => {
    const validationRule = {
        "useremail": "required|email",
        "username": "required|string",
        "password": "required|string"
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.send({
                status: false,
                message: "ValidationFailed",
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports.loginValidation = (req, res, next) => {
    const validationRule = {
        "useremail": "required|email",
        "password": "required|string"
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.send({
                status: false,
                message: "ValidationFailed",
                data: err
            });
        } else {
            next();
        }
    });
};
