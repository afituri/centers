var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var office= require('./routes/office');
var routes = require('./routes/index');
var users = require('./routes/users');
var root = require('./routes/root');
var admin = require('./routes/admin');
var cpanel = require('./routes/cpanel');
var phone = require('./routes/phone');
var employee = require('./routes/employee');
var constituency = require('./routes/constituency');
var center = require('./routes/center');
var passport = require('passport');
var report = require('./routes/report');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'HnecDev',resave: true,saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);
app.use('/users', users);
app.use('/root', root);
app.use('/admin', admin);
app.use('/office',office);
app.use('/cpanel',cpanel);
app.use('/phone',phone);
app.use('/employee',employee);
app.use('/constituency',constituency);
app.use('/center', center);
app.use('/report', report);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
