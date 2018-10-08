var Board = require('../models/board');

exports.getBoards = function (req, res) {
    Board.find({}, (err, boards) => {
        if (err) {
            res.status(400).json(err);
        }

        res.json(boards);
    })
};

exports.getBoard = function (req, res) {
    Board.findById(req.params.id,(err,board)=>
    {
        if (err) {
            res.status(400).json(err);
        }

        res.status(444).json(board);

    });
};

exports.addBoard = function (req, res) {
    if (!req.body.name || !req.body.Desc) {
        res.status(400).send({ "msg": "you must set name and description of the Board!" });
    }

    var newBoard = Board(req.body);
    newBoard.save((err, board) => {
        if (err) {
            res.status(400).json(err);
        }

        res.json(board);
    });
};

exports.updateBoard = function (req, res) {
    if (!req.body.name || !req.body.Desc) {
        res.status(400).send({ "msg": "you must set name and description of the Board!" });
    }

    Board.findByIdAndUpdate(req.params.id,req.body,{update:true} ,  (err,board)=>{
        if (err) {
            res.status(400).json(err);
        }

        res.status(444).json(board);
    });
};

exports.deleteBoard = function (req, res) {
    Board.findByIdAndDelete(req.params.id,(err,board)=>{
        if (err) {
            res.status(400).json(err);
        }

        res.status(444).json(board);
    });
};