var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var http = require('http');

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(session({ secret: 'cpsc344' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('cpsc344'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules')));
app.use('/components', express.static(path.join(__dirname, 'bower_components')));

app.use(flash());

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);

  if (err.status === 404) {
  	res.render('status-error', { 
      title: 'CPSC 344 Project', 
      statusCode: 404, 
      errorMessage: 'Page does not exist.' 
    });
  } else {
  	res.render('status-error', {
      title: 'CPSC 344 Project', 
      statusCode: 500,
      errorMessage: 'Oops, looks like something went wrong.'
    });
  }
});

setInterval(function() {
    http.get("http://will-portfolio.herokuapp.com");
}, 300000);
	
module.exports = app;
