var express = require('express');
var router = express.Router();
var passport = require('passport');
//var valider= require('express-validator')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Registration' });

});
router.get('/login', function(req, res, next) {
    res.render('bank', { title: 'User' });

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
router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/bank');
    });


router.get('/bank',authenticationMiddleware(), function (req,res,next) {
    res.render('bank',{title:'ffff'})
})
function authenticationMiddleware () {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/')
    }
}

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    db.users.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});
module.exports = router;

