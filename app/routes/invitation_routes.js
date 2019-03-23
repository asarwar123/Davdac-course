var express = require('express');
var router = express.Router();
var invitationCtrl = require('../controllers/invitation-controller');

router.post('/:boardId', invitationCtrl.inviteUsers);
router.get('/', invitationCtrl.getMyInvitations);
router.post('/:id/:accept', invitationCtrl.answerInvitation);

module.exports = router;