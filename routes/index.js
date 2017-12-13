var express = require('express');
var router = express.Router();
var passport = require('passport');

//var Tokens = require('csrf')
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
  // var token=Tokens();
    //var secret = token.secretSync();
    //var csrfToken = token.create(secret);
    //user['se']=csrfToken;
    if((req.body.userName==user.user)&&(req.body.password2==user.password)){
        req.login(user, function (err) {
            res.redirect('bank');
        });
    } else {res.render('login')}
});



router.get('/register',function (req,res,next) {
    res.render('index')
})




// bank
router.get('/bank',authenticationMiddleware(), function (req, res, next) {
    res.render('bank');
});

// transfer
router.post('/transfer', authenticationMiddleware(),function (req,res,next) {
    console.log(req.body.amount+" NIS to "+req.body.dest);
    res.render('bank')
});
// transfer
router.post('/tokenTransfer',authenticationMiddleware(), function (req,res,next) {
    if(req.user.se==req.body._csrf){
        console.log(req.body.amount+" NIS to "+req.body.dest);
        //console.log("token: "+req.body._csrf);
        res.render('bank')
    }
    else {
        redirect('/')
    }
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
