var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {
    	nav_index: true
    });
});

module.exports = router;