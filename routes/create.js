var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('create', {
    	nav_create: true
    });
});

// :)

module.exports = router;