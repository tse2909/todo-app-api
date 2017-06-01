var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var todoSchema = new Schema({
    title: String,
    finish: Boolean
});
module.exports = mongoose.model('Todo', todoSchema);