var express = require('express');
var sys = require('sys');
var PGConnection = require('./connection');

//constructor
var Listing = function () {

	this.data = {
		id: 0,
		type: '',
		title: '',
		description: '',
		authorName: '',
		authorHref: '',
		authorBio: '',
		idBarcode: '',
		idAmazon: '',
		specs: '',
		ingredients: '',
		directions: '',
		prepTime: '',
		cookTime: '',
		readyTime: ''
	};

};

Listing.prototype = {

	selectStatement: 'SELECT * FROM "listing" WHERE "id" = $1 limit 1',
	insertStatementProduct: 'INSERT INTO "listing"("type","title","description","authorName","authorBio","idBarcode","idAmazon","specs") VALUES("product",$1,$2,$3,$4,$5,$6,$7)',
	insertStatementRecipe: 'INSERT INTO "listing"("type","title","description","authorName","authorBio","ingredients","directions","prepTime","cookTime","readyTime") VALUES("recipe",$1,$2,$3,$4,$5,$6,$7,$8,$9)',

	setType: function(type) {
		this.data.type = type;
	},

	getType: function () {
		return this.data.type;
	},

	setTitle: function(title) {
		this.data.title = title;
	},

	getTitle: function () {
		return this.data.title;
	},

	setDescription: function(description) {
		this.data.description = description;
	},

	getDescription: function () {
		return this.data.description;
	},

	setAuthorName: function(authorName) {
		this.data.authorName = authorName;
	},

	getAuthorName: function () {
		return this.data.authorName;
	},

	setAuthorBio: function(authorBio) {
		this.data.authorBio = authorBio;
	},

	getAuthorBio: function () {
		return this.data.authorBio;
	},

	setIdBarcode: function(idBarcode) {
		this.data.idBarcode = idBarcode;
	},

	getIdBarcode: function () {
		return this.data.idBarcode;
	},

	setIdAmazon: function(idAmazon) {
		this.data.idAmazon = idAmazon;
	},

	getIdAmazon: function () {
		return this.data.idAmazon;
	},

	setSpecs: function(specs) {
		this.data.specs = specs;
	},

	getSpecs: function () {
		return this.data.specs;
	},

	setIngredients: function(ingredients) {
		this.data.ingredients = ingredients;
	},

	getIngredients: function () {
		return this.data.ingredients;
	},

	setDirections: function(directions) {
		this.data.directions = directions;
	},

	getDirections: function () {
		return this.data.directions;
	},

	setPrepTime: function(prepTime) {
		this.data.prepTime = prepTime;
	},

	getPrepTime: function () {
		return this.data.prepTime;
	},

	setCookTime: function(cookTime) {
		this.data.cookTime = cookTime;
	},

	getCookTime: function () {
		return this.data.cookTime;
	},

	setReadyTime: function(readyTime) {
		this.data.readyTime = readyTime;
	},

	getReadyTime: function () {
		return this.data.readyTime;
	},




	insertProduct: function (callback) {
		var listingData = this.data;
		var connection = new PGConnection("prod");
		connection.executeQuery(Listing.prototype.insertStatementProduct, [listingData.title,listingData.description,listingData.authorName,listingData.authorBio,listingData.idBarcode,listingData.idAmazon,listingData.specs], function (err, result) {
			if (err) { //if error log, and return
				console.log(err);
				callback("Server Error: Please try Again Later");
				return;
			}
			console.log(result);
			callback();
			return;
		});
	},

	insertRecipe: function (callback) {
		var listingData = this.data;
		var connection = new PGConnection("prod");
		connection.executeQuery(Listing.prototype.insertStatementRecipe, [listingData.title,listingData.description,listingData.authorName,listingData.authorBio,listingData.ingredients,listingData.directions,listingData.prepTime,listingData.cookTime,listingData.readyTime], function (err, result) {
			if (err) { //if error log, and return
				console.log(err);
				callback("Server Error: Please try Again Later");
				return;
			}
			console.log(result);
			callback();
			return;
		});
	},

	get: function (id, callback) {
		var listingData = this.data;
		var connection = new PGConnection("prod");
		connection.executeQuery(Listing.prototype.selectStatement, [listingData.id], function (err, result) {
			if (result.rows.length <= 0) { //no rows means we did not find a product with this id
				callback("User not Found");
				return;
			}
			// great!  set listingData to equal the selected listing.
			listingData = result.rows[0];
				// I *think* we can do this, instead of
				// listingData.myField = result.rows[0].myField; ...
				// ... RIGHT???
			callback();
			return;
		});
	}




};

module.exports = Listing;