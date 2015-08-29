var express = require('express');
var router = express.Router();
var Client = require('../models/clientModel');

var AdminController = function() {

	return {
		index: function (req, res) {
			res.render('adminIndex', {
				nav_registerform: true
			});

		},
		addClient: function(req,res){
			//make a user and set its information
			var client = new Client();
			var data = {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				description: req.body.description,
				clientState:1,
				code:req.body.code,
				rate:req.body.rate
			}
			client.data = data;
			client.insert(function (err) { //insert that user into the database
				console.log("trying to insert");
				if (err) {
					console.log("error with inserting");
					res.render('adminIndex', {
						nav_registerform: true,
						error: err
					});	
				}
				res.render('adminIndex', {
						nav_registerform: true,
						message: "Client Added"
				});	
			});
		}
	};
	
}

module.exports = AdminController;