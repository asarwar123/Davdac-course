var Tasks = require('../models/task');
var Board = require('../models/board');
var User = require('../models/users');
var email = require('../controllers/mailgun-controller');

exports.addTask = function (req, res) {
    let boardId = req.params.boardId;

    if (!req.body.name || !boardId) {
        return res.status(400).send({ "msg": "You must send Board name & Id to add one!" });
    }

    let newTask = Tasks(req.body);
    newTask.creator = req.user.id;

    newTask.save((err, task) => {
        if (err) {
            return res.status(400).json(err);
        }

        Board.findByIdAndUpdate(boardId, { $push: { tasks: task } }).exec();

        if (task.assignee != task.creator) {
            User.findById(task.assignee, (err, user) => {
                if (!user)
                    email.SendEmail("New Task", "You have been assigned new task as:\n Name:" + newTask.name);
            });

            return res.json(task);
        }
    });


};

exports.getTask = function (req, res) {
    Tasks.findById(req.params.id)
        .populate([{'path': 'comments.user', 'select': 'email first_name last_name'}])
        .exec((err, task) => {
            if (err) {
                return res.status(400).json(err);
            }

            return res.json(task);
        });
};

exports.updateTask = function (req, res) {
    Tasks.findByIdAndUpdate(req.params.id, req.body, (err, task) => {
        if (err) {
            return res.status(400).json(err);
        }

        if (task.assignee != req.body.assignee) {
            User.findById(task.assignee, (err, user) => {
                if (!user)
                    email.SendEmail("New Task", "You have been assigned new task as:\n Name:" + newTask.name);
            });
        }

        return res.json(task);
    });
};


exports.addComments = function (req, res) {

    req.body.user = req.user.id;
    req.body.created_at = new Date().getTime();

    Tasks.findByIdAndUpdate(req.params.id, { $push: { comments: req.body } }, { new: true }, (err, task) => {
        if (err) {
            return res.status(400).json(err);
        }

        return res.json(task);
    });
};

exports.addAttachment = function (req, res) {
    req.body.created_at = new Date().getTime();

    Tasks.findByIdAndUpdate(req.params.id, { $push: { attachements: req.body } }, { new: true }, (err, task) => {
        if (err) {
            return res.status(400).json(err);
        }

        return res.json(task);
    });
};