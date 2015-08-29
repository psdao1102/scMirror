var express = require('express');
var PGConnection = require('./connection');

//constructor
var Client = function () {
	this.data = {
		id: 0,
		firstName: '',
		lastName: '',
		email: '',
		description: '',
		clientState:1,
		code:'',
		rate:0
	};
	

};

Client.prototype = {
	clientStates: {
		offline:1,
		away:2,
		online:3,
		beforeConnected:4,
		connected:5,
		afterConnected:6
	},
	findByEmailStatement: 'SELECT * FROM "client" WHERE "email" = $1 limit 1',
	findByCodeStatement: 'SELECT * FROM "client" WHERE "code" = $1 limit 1',
	insertStatement: 'INSERT INTO "client"("firstName","lastName","email","description", "clientstateid", "code", "rate") VALUES($1,$2,$3,$4,$5,$6,$7)',
	updateStatement: 'UPDATE "client" SET "firstName" = $1, "lastName"=$2,"email"=$3,"description"=$4,"clientstateid"=$5, "code"=$6, "rate"=$7 WHERE "id"=$8',

	insert: function (callback) {
		var clientData = this.data;
		var connection = new PGConnection();
		connection.executeQuery(Client.prototype.insertStatement, 
			[clientData.firstName, clientData.lastName, clientData.email, clientData.description, clientData.clientState, clientData.code, clientData.rate], 
			function (err, result) {
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
		if (this.data.id <= 0) { //if the id is set to 0, then this must be a new client, and should be inserted not updated.
			callback('Must be an existing object in the database');
			return;
		}
		var clientData = this.data;
		var connection = new PGConnection();
		connection.executeQuery(Client.prototype.updateStatement, 
			[clientData.firstName, clientData.lastName, clientData.email, clientData.description, clientData.clientState, clientData.code, clientData.rate, clientData.id], 
			function (err, result) {
				if (err) { //if error log, and return
					console.log(err);
					callback("Server Error: Please try Again Later");
					return;
				}
				callback();
				return;
		});
	},

	findByEmail: function (callback) {
		var clientData = this.data;
		var connection = new PGConnection();
		connection.executeQuery(Client.prototype.findByEmailStatement, [clientData.email], function (err, result) {
			if (err) { //if error log, and return
				console.log(err);
				callback("Server Error: Please try Again Later");
				return;
			}
			if (result.rows.length <= 0) { //no rows means that we didnt find a password and email match
				callback("client not Found");
				return;
			}
			clientData.id = result.rows[0].id; //if we get a row setup the clientdata to equal that of the client data in the row.
			clientData.firstName = result.rows[0].firstName;
			clientData.lastName = result.rows[0].lastName;
			clientData.description = result.rows[0].description;
			clientData.clientState = result.rows[0].clientState;
			clientData.code = result.rows[0].code;
			clientData.rate = result.rows[0].rate;
			callback();
			return;
		});
	},
	
	findByCode: function (callback) {
		var clientData = this.data;
		var connection = new PGConnection();
		connection.executeQuery(Client.prototype.findByCodeStatement, [clientData.code], function (err, result) {
			if (err) { //if error log, and return
				console.log(err);
				callback("Server Error: Please try Again Later");
				return;
			}
			if (result.rows.length <= 0) { //no rows means that we didnt find a password and email match
				callback("client not Found");
				return;
			}
			clientData.id = result.rows[0].id; //if we get a row setup the clientdata to equal that of the client data in the row.
			clientData.firstName = result.rows[0].firstName;
			clientData.lastName = result.rows[0].lastName;
			clientData.description = result.rows[0].description;
			clientData.clientState = result.rows[0].clientstateid;
			clientData.code = result.rows[0].code;
			clientData.rate = result.rows[0].rate;
			callback();
			return;
		});
	}

};

module.exports = Client;