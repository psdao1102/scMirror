var express = require('express');
var router = express.Router();
var Browse = require('../models/browseModel');

// Create
exports.products =  function (req, res) {
	res.render('browse/product', {
		nav_browse_products: true
	});
};

exports.recipes =  function (req, res) {
	res.render('browse/recipe', {
		nav_browse_recipes: true
	});
};