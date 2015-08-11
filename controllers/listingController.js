var express = require('express');
var router = express.Router();
var Listing = require('../models/listingModel');

var ListingController = (function() {

	return {

		create: function (req, res) {
			res.render('create', {
				nav_create: true
			});
		},

		create_product: function (req, res) {
			res.render('create/product', {
				nav_create: true
			});
		},

		create_recipe: function (req, res) {
			res.render('create/recipe', {
				nav_create: true
			});
		}

	};

})();

module.exports = ListingController;