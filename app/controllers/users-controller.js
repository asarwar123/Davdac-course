var users = require('../models/users');
var jwt = require('jsonwebtoken');
var config = require('../../config');

function creatToken(user) {
    return jwt.sign({ id: user.is, name: user.first_name }, config.jwtsecret);
}

exports.addUser = function (req, res) {
    if (!req.body.password || !req.body.email) {
        res.status(400).send({ "msg": "you must set user email and password to proceed" });
    }

    var newUser = users(req.body);
    newUser.save((err, user) => {
        if (err) {
            res.status(400).json(err);
        }

        res.json(user);
    });
};

exports.loginUser = function (req, res) {
    if (!req.body.email) {
        res.status(400).send({ "msg": "you must send the email" });
    }

    if (!req.body.password) {
        res.status(400).send({ "msg": "you must send the password" });
    }

    users.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            res.json(err);
            return;
        }

        if (!user) {
            res.status(400).send({ msg: "The user was not found" });
            return;
        }

        user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
                res.status(200).json({ token: creatToken(user) });
            }
            else
                res.status(400).json({ msg: "The email or password is invalid" })
        });
    });
};

exports.getUser = function (req, res) {
    users.findById(req.user.id, function (err, user) {
        if (err) {
            res.status(400).json(err);
        }

        res.json(user);
    })
};