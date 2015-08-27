var express = require('express');
var sys = require('sys');
var hash = require('node_hash');
var PGConnection = require('./connection');
var bcrypt = require('bcrypt-node');

//constructor
var User = function () {

	this.data = {
		id: 0,
		firstName: '',
		lastName: '',
		email: '',
		description: '',
		password: ''
	};

};

User.prototype = {

	selectStatement: 'SELECT * FROM "user" WHERE "email" = $1 limit 1',
	insertStatement: 'INSERT INTO "user"("firstName","lastName","email","password","description") VALUES($1,$2,$3,$4,$5)',
	updateStatement: 'UPDATE "user" SET "firstName" = $1, "lastName"=$2,"email"=$3,"description"=$4 WHERE "id"=$5',

	setFirstName: function(firstName) {
		this.data.firstName = firstName;
	},

	getFirstName: function () {
		return this.data.firstName;
	},

	setLastName: function (lastName) {
		this.data.lastName = lastName;
	},

	getLastName: function () {
		return this.data.lastName;
	},

	setEmail: function (email) {
		this.data.email = email;	
	},

	getEmail: function () {
		return this.data.email;	
	},

	setDescription: function (description) {
		this.data.description = description;
	},

	getDescription: function () {
		return this.data.description;
	},

	setAndHashPassword: function (password) { //when setting the password always use this function since it hashes the password. 
		var hashedPassword = bcrypt.hashSync(password); //automatically adds salt
		this.data.password = hashedPassword;	
	},

	getHashedPassword: function () {
		return this.data.password;	
	},

	compare: function (pass1, pass2) {
		return bcrypt.compareSync(pass1, pass2); // true
	},

	insert: function (callback) {
		var userData = this.data;
		var connection = new PGConnection();
		connection.executeQuery(User.prototype.insertStatement, [userData.firstName, userData.lastName, userData.email, userData.password, userData.description ], function (err, result) {
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

	update: function (callback) {
		if (this.data.id <= 0) { //if the id is set to 0, then this must be a new user, and should be inserted not updated.
			callback('Must be an existing object in the database');
			return;
		}
		var userData = this.data;
		var connection = new PGConnection();
		connection.executeQuery(User.prototype.updateStatement, [userData.firstName, userData.lastName, userData.email, userData.description, userData.id], function (err, result) {
			if (err) { //if error log, and return
				console.log(err);
				callback("Server Error: Please try Again Later");
				return;
			}
			callback();
			return;
		});
	},

	find: function (password, callback) {
		var userData = this.data;
		var connection = new PGConnection();
		connection.executeQuery(User.prototype.selectStatement, [userData.email], function (err, result) {
			if (err) { //if error log, and return
				console.log(err);
				callback("Server Error: Please try Again Later");
				return;
			}
			if (result.rows.length <= 0) { //no rows means that we didnt find a password and email match
				callback("User not Found");
				return;
			}
			if (!User.prototype.compare(password, result.rows[0].password)) {
				callback("Incorrect Password");
			}
			userData.id = result.rows[0].id; //if we get a row setup the userdata to equal that of the user data in the row.
			userData.firstName = result.rows[0].firstName;
			userData.lastName = result.rows[0].lastName;
			userData.description = result.rows[0].description;
			callback();
			return;
		});
	}

};

module.exports = User;