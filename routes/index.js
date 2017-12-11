var express = require('express');
var router = express.Router();
var passport = require('passport');
//var valider= require('express-validator')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Registration' });

});


router.post('/login', function (req, res, next) {
    req.login(req.body.username, function (err) {
        res.redirect('bank');
    });
});
/*
router.post('/login', function (req, res, next) {
    var token = Tokens();
    var username = req.body.userName;
    var password = req.body.password;
    var secret = token.secretSync();
    var csrfToken = token.create(secret);
    if (username == "Avi" && password == "1234") {
        user = {id: 1, username: "Avi", csrft: csrfToken};
        req.login(user, function (err) {
            res.redirect('bank');
        });


    }
    else {
        res.send("error");
    }

    //res.render('login');
});
*/
var users=[]

router.get('/register',function (req,res,next) {
    res.render('index')
})
router.post('/register',function (req,res,next) {
    var user={
        user: req.body.username,
        password: req.body.password2,
        email: req.body.email
    }
    users.push(user);
    res.render('login',{title: 'title'})
})



router.get('/bank', function (req,res,next) {
    res.render('bank',{title:'ffff'})
})
function authenticationMiddleware (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/')

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

