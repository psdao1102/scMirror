var express = require('express');
var sys = require('sys');
var hash = require('node_hash');
var PGConnection = require('./connection');
var bcrypt = require('bcrypt-node');

//This is sql connection info. This should probably be in its on module.
//var config = {
//	userName: 'pnkadmin',
//	password: 'SuperStrongPassword1',
//	server: 'pnk.database.windows.net', 
//	options: {
//		database:'PNKDB',
//		useColumnNames:true,
//		encrypt: true 
//	}
//}

//constructor
var User = function () {
	this.data = {};
	this.data.id = 0
	this.data.firstName = '';
	this.data.lastName = '';
	this.data.email = '';
	this.data.description = '';
	this.data.password = '';
}

User.prototype.data = {}
//sql statements. There are ORM's out there to use, but this is the fastest method and doesnt require choosing a framework to work with.
User.prototype.SelectStatement = 'SELECT * FROM "Users" WHERE "Email" = $1 limit 1';
User.prototype.InsertStatement = 'INSERT INTO "Users"("FirstName","LastName","Email","Password","Description") VALUES($1,$2,$3,$4,$5)';
User.prototype.UpdateStatement = 'UPDATE "Users" SET "FirstName" = $1, "LastName"=$2,"Email"=$3,"Description"=$4 WHERE "Id"=$5';

//getters and setters. We could probably get rid of these, but they help with intellisense.
User.prototype.setFirstName = function (firstName) {
	this.data.firstName = firstName;
}

User.prototype.getFirstName = function () {
	return this.data.firstName;
}

User.prototype.setLastName = function (lastName) {
	this.data.lastName = lastName;
}

User.prototype.getLastName = function () {
	return this.data.lastName;
}

User.prototype.setEmail = function (email) {
	this.data.email = email;	
}

User.prototype.getEmail = function () {
	return this.data.email;	
}

User.prototype.setDescription = function (description) {
	this.data.description = description;
}

User.prototype.getDescription = function () {
	return this.data.description;
}

User.prototype.setAndHashPassword = function (password) { //when setting the password always use this function since it hashes the password. 
	var hashedPassword = bcrypt.hashSync(password); //automatically adds salt
	this.data.password = hashedPassword;	
}

User.prototype.getHashedPassword = function () {
	return this.data.password;	
}

User.prototype.compare = function (pass1, pass2) {
	return bcrypt.compareSync(pass1, pass2); // true
}

//db logic to insert a user.
User.prototype.Insert = function (callback) {
	var userData = this.data;
	var connection = new PGConnection();
	connection.ExecuteQuery(User.prototype.InsertStatement, [userData.firstName, userData.lastName, userData.email, userData.password, userData.description ], function (err, result) {
		if (err) { //if error log, and return
			console.log(err);
			callback("Server Error: Please try Again Later");
			return;
		}
		console.log(result);
		callback();
		return;
	});
}

User.prototype.Update = function (callback) {
	if (this.data.id <= 0) { //if the id is set to 0, then this must be a new user, and should be inserted not updated.
		callback('Must be an existing object in the database');
		return;
	}
	var userData = this.data;
	var connection = new PGConnection();
	connection.ExecuteQuery(User.prototype.UpdateStatement, [userData.firstName, userData.lastName, userData.email, userData.description, userData.id], function (err, result) {
		if (err) { //if error log, and return
			console.log(err);
			callback("Server Error: Please try Again Later");
			return;
		}
		callback();
		return;
	});
}

User.prototype.Find = function (password, callback) {
	var userData = this.data;
	var connection = new PGConnection();
	connection.ExecuteQuery(User.prototype.SelectStatement, [userData.email], function (err, result) {
		if (err) { //if error log, and return
			console.log(err);
			callback("Server Error: Please try Again Later");
			return;
		}
		if (result.rows.length <= 0) { //no rows means that we didnt find a password and email match
			callback("User not Found");
			return;
		}
		if (!User.prototype.compare(password, result.rows[0].Password)) {
			callback("Incorrect Password");
		}
		userData.id = result.rows[0].Id; //if we get a row setup the userdata to equal that of the user data in the row.
		userData.firstName = result.rows[0].FirstName;
		userData.lastName = result.rows[0].LastName;
		userData.description = result.rows[0].Description;
		callback();
		return;
	});
}

module.exports = User;