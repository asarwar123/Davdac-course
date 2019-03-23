var express = require('express');
var router = express.Router();
var userCtrl=require('../controllers/users-controller');
var passport=require('passport');

router.post('/',userCtrl.addUser);
router.post('/reset',userCtrl.ChangePwd);
router.post('/login',userCtrl.loginUser);

router.get('/',passport.authenticate('jwt',{session:false}),userCtrl.getUser);
router.put('/update',passport.authenticate('jwt',{session:false}),userCtrl.updateUser);
router.delete('/delete',passport.authenticate('jwt',{session:false}),userCtrl.deleteUser);


module.exports = router;