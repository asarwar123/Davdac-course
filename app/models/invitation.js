var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

// Defines the collection Invitations
var invitationSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }
});

invitationSchema.index({ to: 1, board: 1}, { unique: true });

invitationSchema.plugin(timestamps);

module.exports = mongoose.model('Invitation', invitationSchema);
