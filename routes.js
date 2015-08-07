var express = require('express');
var router = express.Router();

var user = require('controllers/user');

router.get('/', function (req, res) {
    res.render('index', {
    	nav_index: true
    });
});

router.get('/user', user);

module.exports = router;