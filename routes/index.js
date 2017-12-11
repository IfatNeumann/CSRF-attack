var express = require('express');
var router = express.Router();
var passport = require('passport');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Registration' });

});
router.post('/bank', function(req, res, next) {
    res.render('bank', { title: req.body.username });

});
router.get('/register', function(req, res, next) {
    res.render('index', { title: 'User' });

});

var users=[]
router.post('/register',function (req,res,next) {
    var user={
        user: req.body.username,
        password: req.body.password2,
        email: req.body.email
    }
    users.push(user);
    res.render('login',{title: 'title'})
})
router.post('/login',passport.authenticate('local',{
    successRedirect: '/bank',
    failureRedirect: '/login' }));


router.get('/bank',authenticationMiddleware(), function (req,res,next) {
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

passport.serializeUser(function(username, done) {
    done(null, username);
});

passport.deserializeUser(function(username, done) {
        done(null, username);

});
module.exports = router;

