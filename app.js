var express      = require('express'),
    app          = express(),
    path         = require('path'),

    // middleware
    favicon      = require('static-favicon'),
    logger       = require('morgan'),
    cookieParser = require('cookie-parser'),
    session      = require('express-session'),
    bodyParser   = require('body-parser');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ 'secret': 'the secret session key'}));
app.use(express.static(path.join(__dirname, 'public')));

// in dev, inject the livereload script into all non-static files
if (app.get('env') === 'development') {
    app.use(require('connect-livereload')());
}

app.use('/', require('./routes/prismic'));

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
