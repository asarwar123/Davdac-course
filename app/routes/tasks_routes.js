var express = require('express');
var router = express.Router();
var taskctrl = require('../controllers/task-conroller');

router.get('/:id', taskctrl.getTask);
router.post('/:boardId', taskctrl.addTask);
router.put('/:id', taskctrl.updateTask);

router.post('/:id/comments', taskctrl.addComments);
router.post('/:id/attachments', taskctrl.addAttachment);


module.exports = router;