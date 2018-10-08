var express = require('express');
var router = express.Router();
var boardCtrl = require('../controllers/board-controller');

router.get('/', boardCtrl.getBoards);
router.get('/:id', boardCtrl.getBoard);
router.post('/', boardCtrl.addBoard);
router.put('/:id', boardCtrl.updateBoard);
router.delete('/:id', boardCtrl.deleteBoard);


module.exports = router;