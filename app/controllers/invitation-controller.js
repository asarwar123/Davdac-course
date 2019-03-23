var User = require('../models/users');
var Invitation = require('../models/invitation');
var Board = require('./board-controller');
var emailCtrl = require('../controllers/mailgun-controller');

exports.getMyInvitations = function (req, res) {
    Invitation.find({ to: req.user.id })
        .populate([{ 'path': 'board', 'select': 'name desc' }])
        .populate([{ 'path': 'from', 'select': 'email first_name last_name' }])
        .exec((err, invitations) => {
            if (err) {
                return res.status(400).json(err);
            }
            res.status(200).json(invitations);
        });
};

exports.inviteUsers = function (req, res) {


    User.findOne({ email: req.body.email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json(err);
        }
        console.log(user.id);

        // if (user.boards.indexOf(req.params.boardId) > -1) {
        //     return res.status(400).json({ 'msg': 'User is already part of this board!' });
        // }

        let NewInvitation = Invitation();
        NewInvitation.from = req.user.id;
        NewInvitation.to = user._id;
        NewInvitation.board = req.params.boardId;

        NewInvitation.save((err, invitation) => {
            console.log(invitation);
            if (err) {
                return res.status(400).json(err);
            }

            Invitation.findById(invitation._id)
                .populate([{ 'path': 'board' }])
                .populate([{ 'path': 'to', 'select': 'email first_name' }])
                .exec((err, invitation) => {
                    if (err) {
                        return res.status(400).json(err);
                    }
                    emailCtrl.SendEmail('New Invitation', 'You have been invited to collborate on board,You can accept request from your app!')
                    res.status(200).json(invitation);
                });
        });
    });
};

exports.answerInvitation = function (req, res) {
    let accepted = req.params.accept;

    Invitation.findByIdAndRemove(req.params.id, (err, invitation) => {
        if (accepted = 1) {
            Board.findByIdAndUpdate(invitation.board, { $addToSet: { users: invitation.to } }, { new: true }, (err, board) => {
                if (err) {
                    return res.status(400).json(err);
                }

                User.findByIdAndUpdate(invitation.to, { $addToSet: { boards: board } }).exec();

                return res.json(board);
            });
        }
        else {
            return res.json(null);
        }
    });
};