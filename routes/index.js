var express = require('express');
var router = express.Router();
var passport = require('passport');
var Tokens = require('csrf');
/* GET home page. */
var user={
    id: 1,
    user: 'Noa',
    password: 1321
};
router.get('/', function(req, res, next) {

  res.render('login', { title: 'Registration' });

});

router.post('/login', function (req, res, next) {
    if((req.body.userName==user.user)&&(req.body.password2==user.password)){
        user1=user
        req.login(user, function (err) {
        });
    } res.redirect('bank');
});



router.get('/register',function (req,res,next) {
    res.render('index')
})




// bank
router.get('/bank',authenticationMiddleware(), function (req, res, next) {

    res.render('bank');
});


function authenticationMiddleware() {

    return function (req, res, next) {
        console.log(req.user);
        console.log(req.isAuthenticated());
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/')
    }

}


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    var usr;
    if (typeof user !== 'undefined' && user) {

        if (id == user.id)
            usr = user;
    }
    done(null, usr);

});

module.exports = router;

