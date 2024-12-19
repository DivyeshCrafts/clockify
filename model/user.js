var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    useremail: { type: String, default: "" },
    username: { type: String, default: "" },
    password: { type: String, default: "" }
});

module.exports = userSchema;
