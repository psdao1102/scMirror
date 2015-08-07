var express = require('express');
var router = express.Router();
var Listing = require('../models/listingModel');

// Create
exports.create =  function (req, res) {
	res.render('create', {
		nav_create: true
	});
};

exports.create_product =  function (req, res) {
	res.render('create/product', {
		nav_create: true
	});
};

exports.create_recipe =  function (req, res) {
	res.render('create/recipe', {
		nav_create: true
	});
};