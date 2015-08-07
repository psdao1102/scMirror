var express = require('express');
var router = express.Router();

var user = require('./controllers/user');

router.get('/', function (req, res) {
    res.render('index', {
    	nav_index: true
    });
});

router.get('/user/registerform', user.registerform);
router.post('/user/register', user.post_register);
router.get('/user/login', user.login);
router.post('/user/login', user.post_login);
router.get('/user/management', user.management);
router.post('/user/update', user.post_update);
router.post('/user/logout', user.logout);

module.exports = router;