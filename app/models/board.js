var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

// Defines the collection Boards
var boardSchema = new mongoose.Schema({
    name: String,
    desc: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tasks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
    }],
    users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    }]
});

boardSchema.plugin(timestamps);

module.exports = mongoose.model('Board', boardSchema);
