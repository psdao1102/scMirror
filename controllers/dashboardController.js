var express = require('express');
var Client = require('../models/clientModel');
var PGConnection = require('../models/connection');

var DashboardController = function(){
	var selectConnectingUsersStatement = 'SELECT * FROM "client" WHERE "clientstateid" = 4';
	return {
		getConnectingUsers: function(req,res){
			var connection = new PGConnection("prod");
			connection.executeQuery(selectConnectingUsersStatement, null, function (err, result) {	
				if(err){
					console.log(err);
					res.send({data:null, error:"Error getting clients"});
					return;
				}
				var clients = [];
				//make a client from each row
				for(var i = 0; i< result.rows.length; i++){
					var client = new Client();
					client.fillUsingRow(result.rows[i]);
					clients[i] = client;
				}
				res.send({data:clients});
				return;
			});
		}, //END GET CONNECTING USERS
		connectClient: function(req,res){
			var client = new Client();
			client.data.code = req.body.ClientCode;
			client.findByCode(function(err){
				if(err){
					console.log(err);
					res.send({error: err});
					return;
				}
				client.data.clientState = client.clientStates.connected;
				client.update(function(err){
					if(err){
						console.log(err);
						res.send({error:err});
						return;
					}
					res.send({}); //success
				});
			});
		}
	};
};

module.exports = DashboardController;