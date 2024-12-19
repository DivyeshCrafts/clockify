var validator = require("../../../../../controller/validationforrequest");

module.exports.create_todo_or_editValidation = (req, res, next) => {
    const validationRule = {
        "user_id": "required",
        "title": "required",
        "dueDate": "required"
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

module.exports.user_todo_history_daywiseValidation = (req, res, next) => {
    const validationRule = {
        "dueDate": "required"
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

module.exports.todo_daywiseValidation = (req, res, next) => {
    const validationRule = {
        "dueDate": "required"
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