var express = require('express');
var router = express.Router();
var userCtrl=require('../controllers/users-controller');
var passport=require('passport');

// router.get('/hello',function(req,res){
//     res.json({message:'users!'});
// });

// router.get('/',userCtrl.getUsers);
// router.get('/:id',userCtrl.getUser);
router.post('/',userCtrl.addUser);
router.post('/login',userCtrl.loginUser);

router.get('/',passport.authenticate('jwt',{session:false}),userCtrl.getUser);

module.exports = router;