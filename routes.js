var express = require('express');
var router = express.Router();

var UserController = require('./controllers/userController');
var ListingController = require('./controllers/listingController');
var BrowseController = require('./controllers/browseController');
var AdminController = require('./controllers/adminController');
var ClientConnectionController = require('./controllers/clientConnectionController');

var userController = new UserController();
var listingController = new ListingController();
var browseController = new BrowseController();
var adminController = new AdminController();
var clientConnectionController = new ClientConnectionController();

router.get('/', function (req, res) {
    res.render('index', {
    	nav_index: true
    });
});


router.get('/user/registerform', userController.registerForm);
router.post('/user/register', userController.post_register);
router.get('/user/login', userController.login);
router.post('/user/login', userController.post_login);
router.get('/user/management', userController.management);
router.post('/user/update', userController.post_update);
router.get('/user/logout', userController.logout);

router.post('/connect', clientConnectionController.startConnect);

router.get('/admin', adminController.index);
router.post('/admin/addClient', adminController.addClient);


router.get('/listing', function (req, res) {
    res.render('listing', {
    	nav_listing: true
    });
});
router.get('/listing/create', listingController.create);
router.get('/listing/create/product', listingController.createProduct);
router.get('/listing/create/recipe', listingController.createRecipe);


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