var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

// Defines the collection Tasks
var taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: String,
    priority: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        default: 'MEDIUM'
    },
    color: String,
    due_date: Date,
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            text: String,
            created_at: Date,
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    attachements: [{
            name: String,
            created_at: Date,
    }]
});

taskSchema.plugin(timestamps);

module.exports = mongoose.model('Task', taskSchema);
