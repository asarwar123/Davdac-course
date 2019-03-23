var Board = require('../models/board');
var User = require('../models/users');
var Task = require('../models/task');

exports.getBoards = function (req, res) {

    User.findById(req.user.id)
        .populate([{ 'path': 'boards' }])
        .exec((err, user) => {
            if (err) {
                res.status(400).json(err);
            }

            res.json({ boards: user.boards });
        });
};

exports.getBoard = function (req, res) {
    Board.findById(req.params.id)
        .populate([{ 'path': 'tasks' ,'select':'name priority color due_date assignee'}])
        .populate([{ 'path': 'users', 'select': 'email first_name last_name' }])
        .populate([{ 'path': 'creator', 'select': 'email first_name last_name' }])
        .exec((err, board) => {
            if (err) {
                res.status(400).json(err);
            }

            res.status(400).json(board);

        });
};

exports.addBoard = function (req, res) {
    if (!req.body.name || !req.body.Desc) {
        res.status(400).send({ "msg": "you must set name and description of the Board!" });
    }

    var newBoard = Board(req.body);
    newBoard.creator = req.user.id;

    newBoard.save((err, board) => {
        if (err) {
            res.status(400).json(err);
        }

        User.findByIdAndUpdate(req.user.id, { $push: { boards: board } }).exec();
        res.json(board);
    });
};

exports.updateBoard = function (req, res) {
    if (!req.body.name || !req.body.Desc) {
        res.status(400).send({ "msg": "you must set name and description of the Board!" });
    }

    Board.findByIdAndUpdate(req.params.id, req.body, { "new": true }, (err, board) => {
        if (err) {
            res.status(400).json(err);
        }

        res.status(400).json(board);
    });
};

exports.deleteBoard = function (req, res) {
    Board.findByIdAndDelete(req.params.id, (err, board) => {
        if (err) {
            res.status(400).json(err);
        }

        User.findByIdAndUpdate(req.user.id, { $pull: { boards: board._id } }).exec();

        for (var i = 0; i < board.tasks.length; i++) {
            var oneTask = board.tasks[i];

            Task.findByIdAndRemove (oneTask).exec();
        }


        res.status(200).json(board);
    });
};

exports.delteBoardTask = function (req, res) {

    var taskID=req.params.taskID;
    if (!req.params.id || !taskID) {
        res.status(400).send({ "msg": "you must set Board ID and Task ID!" });
    }

    Board.findByIdAndUpdate(req.params.id,{$pull:{tasks:taskId}},(err,board)=>{
        if (err) {
            res.status(400).json(err);
        }

        Task.findByIdAndRemove(taskID,(err,task)=>{
            if (err) {
                res.status(400).json(err);
            } 
        })

        res.status(200).json(board);
    }); 
};