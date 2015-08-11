var express = require('express');
var router = express.Router();
var Browse = require('../models/browseModel');

var BrowseController = (function() {

	return {

		create: function (req, res) {
			res.render('create', {
				nav_create: true
			});
		},

		products: function (req, res) {
			res.render('browse/product', {
				nav_browse_products: true
			});
		},

		recipes: function (req, res) {
			res.render('browse/recipe', {
				nav_browse_recipes: true
			});
		}

	};

})();

module.exports = BrowseController;