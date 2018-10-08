var express = require('express');
var router = express.Router();

// router.get('/hello',function(req,res){
//     res.json({message:'welcome to the api!'});
// });

router.use('/boards',require('./board_routes'));
router.use('/users', require('./users'));
router.use('/tasks', require('./tasks'));
router.use('/azeem',require('./azeem'));

module.exports = router;