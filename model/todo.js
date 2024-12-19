var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    user_id: {type: mongoose.ObjectId, default:""},
    title: { type: String, default:"" },
    description: { type: String, default:"" },
    reminderTime: { type: String, required: "" },
    dueDate: { type: String, default:"" },
    is_delete: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
    created_at: { type: String, default: "" },
});

module.exports = todoSchema;