var express = require('express');
var router = express.Router();
var passport = require('passport');

router.use('/boards', passport.authenticate('jwt', { session: false }), require('./board_routes'));
router.use('/users', require('./users_routes'));
router.use('/tasks', passport.authenticate('jwt', { session: false }), require('./tasks_routes'));
//router.use('/invitations', passport.authenticate('jwt', { session: false }), require('./invitation_routes'));
router.use('/invitations', passport.authenticate('jwt', { session: false }), require('./invitation_routes'));
module.exports = router;