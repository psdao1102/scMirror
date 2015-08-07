var express = require('express');
var router = express.Router();

var userController = require('./controllers/userController');
var listingController = require('./controllers/listingController');
var browseController = require('./controllers/browseController');


router.get('/', function (req, res) {
    res.render('index', {
    	nav_index: true
    });
});


router.get('/user/registerform', userController.registerform);
router.post('/user/register', userController.post_register);
router.get('/user/login', userController.login);
router.post('/user/login', userController.post_login);
router.get('/user/management', userController.management);
router.post('/user/update', userController.post_update);
router.post('/user/logout', userController.logout);


router.get('/listing', function (req, res) {
    res.render('listing', {
    	nav_listing: true
    });
});
router.get('/listing/create', listingController.create);
router.get('/listing/create/product', listingController.create_product);
router.get('/listing/create/recipe', listingController.create_recipe);


router.get('/browse', function (req, res) {
    res.render('browse', {
    	nav_browse: true
    });
});
router.get('/browse/products', browseController.products);
router.get('/browse/recipes', browseController.recipes);


router.get('/search', function (req, res) {
    res.render('search', {
    	nav_search: true
    });
});


module.exports = router;