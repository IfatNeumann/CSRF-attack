var express = require('express')
var passport = require('passport');
var session = require('express-session');


var app = express();

app.use(passport.initialize());
app.use(passport.session());

module.exports = app;