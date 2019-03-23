var users = require('../models/users');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var emailCtrl = require('./mailgun-controller');
var bcrypt = require('bcrypt-nodejs');

function creatToken(user) {
    return jwt.sign({ id: user.id, name: user.first_name }, config.jwtsecret);
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
        emailCtrl.SendEmail('Welcome board', 'We welcome you on PK701');

        res.json(user);
    })
};

exports.getUsers = function (req, res) {
    users.find({}, function (err, users) {
        if (err) {
            return res.status(400).json(err);
        }

        return res.json(users);
    });
};

exports.updateUser = function(req, res) {
    users.findById(req.user.id, (err, user) => {
        if (err) {
            res.status(400).json(err);
        }

        if (!user) {
            res.status(400).json({msg: "The user was not found"});
        }

        if (req.body.old_password && req.body.new_password) {
            user.comparePassword(req.body.old_password, function(err, isMatch) {
                if (isMatch && !err) {
                    bcrypt.genSalt(10, function(err, salt) {
                        if (err) return res.status(400).json(err);

                        bcrypt.hash(req.body.new_password, salt, null, function(err, hash) {
                            if (err) return res.status(400).json(err);
                            
                            let updatedUser = req.body;
                            updatedUser.password = hash;
            
                            users.findByIdAndUpdate(user.id, updatedUser, {new: true}, function(err, user) {
                                if (err) {
                                    res.status(400).json(err);
                                }
            
                                res.status(200).json(user);
                            });
                        });
                    });
                } else {
                    res.status(400).json({msg: "Old Password wrong"});
                }
            });
        } else {
            User.findByIdAndUpdate(user.id, req.body, {new: true}, (err, user) => {
                if (err) {
                    res.status(400).json(err);
                }
        
                res.status(200).json(user);
            });
        }
    });
}

exports.deleteUser = function (req, res) {
    if (!req.body.email) {
        return res.status(400).send({ msg: "Provide valid email address" });
    }

    users.findOneAndDelete({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).json(err);
        }

        return res.status(200).send({ msg: "user deleted successfuly" });
    });
};

exports.ChangePwd = function (req, res) {
    if (!req.body.email) {
        return res.status(400).send({ msg: "Provide valid email address" });
    }

    let email = req.body.email;

    users.findOne({ email: email }, function (err, user) {
        if (err) {
            return res.status(400).json(err);
        }
        if (!user) {
            return res.status(400).json({ msg: "user not found" });
        }

        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return res.status(400).json(err);
            }

            bcrypt.hash('changedpwd', salt, null, function (err, hash) {
                if (err) {
                    return res.status(400).json(err);
                }

                users.findByIdAndUpdate(user.id, { password: hash }, function (err, user) {
                    if (err) {
                        return res.status(400).json(err);
                    }
                    return res.status(200).json({ msg: "Check your email for new password" });

                    emailCtrl.SendEmail('Password Changed', 'Password changed to default, change aslong as you login');
                });
            });
        });
    });
};