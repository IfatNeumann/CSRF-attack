var express = require('express');
var router = express.Router();
var passport = require('passport');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Registration' });

});
router.get('/register', function(req, res, next) {
  req.login(req.body.username,function (err) {
      res.redirect('/ ')
      
  });
    res.render('index', { title: 'Registration' });

});

router.post('/login',passport.authenticate('local',{
    successRedirect: '/bank',
    failureRedirect: '/login' }));


router.get('/test',authenticationMiddleware(), function (req,res,next) {
    res.render('error',{title:'ffff'})
})
function authenticationMiddleware () {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/')
    }
}


module.exports = router;

