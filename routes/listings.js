var express = require('express');
var app = express();
var create = require('../routes/listings');

app.use('/create', create);

app.get('/', function (req, res) {
    res.render('listings', {
    	nav_create: true
    });
});


module.exports = app;