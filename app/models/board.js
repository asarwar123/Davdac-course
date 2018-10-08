var mongoose = require('mongoose');

var boardschema = new mongoose.Schema({
    name: String,
    Desc: String
});

module.exports = mongoose.model('Board', boardschema);