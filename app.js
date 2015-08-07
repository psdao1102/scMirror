var express = require('express');
var path = require('path');
var cookiesession = require('cookie-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expHbs = require('express-handlebars');

var routes = require('./routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('mysupersecretcode'));
app.use(cookiesession({
	name: 'session',
	keys: ['key1']
}));

//allow jade to pick up all sessions
app.use(function (req, res, next) {
	if (req.session) {
		res.locals.session = req.session;
	}
	next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.engine('.hbs', expHbs({
    extname: '.hbs',
    defaultLayout: 'master',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views',
    helpers: {
    }
}));


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('index', {
        message: "Unknown Server Error, Administration has been notified.",
    });
});


console.log(app.get('env'));


module.exports = app;
