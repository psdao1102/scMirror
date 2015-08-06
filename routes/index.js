var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index');
});

// do handlebars
router.get('/test', function(req, res) {
    res.render('test', {
        title: 'The awesome website',
        topic: 'Porridge'
    });
});

module.exports = router;