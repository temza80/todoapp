var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose    = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');


var app = express();
var async=require('async');
var config      = require('./public/lib/config');
app.engine('ejs',require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser(config.get('session:secret')));
app.use(express.static(path.join(__dirname, 'public')));
var MongoStore=require('connect-mongo')(session);

app.use(session({secret:config.get('session:secret'),resave: true, saveUninitialized: true, cookie:{expires:new Date().setYear(new Date().getFullYear()+1)},
    name:config.get('session:name'),
        store: new MongoStore({ mongooseConnection: mongoose.connection })}));
        

app.use(require('express-jquery')('/jquery.js'));
app.use( require('./public/lib/loadUser'));
require('./routes/main')(app);
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use(function(err, req, res, next) {

console.log("err-"+err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

});

module.exports = app;
