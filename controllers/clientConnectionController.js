var express = require('express');
var Client = require('../models/clientModel')

var ClientConnectionController = function() {
	var find = function(code, callback){
		if(!code){
			callback("Code cannot be null")
			return null;
		}
		var mClient = new Client();
		mClient.data.code = code;
		mClient.findByCode(function(err){
			if(err){
				console.log(err);
				callback(err);
				return;
			}
			callback(null,mClient);
			return;
		});
	}
	return {
		startConnect: function (req, res) { //get client with code, then set client state to beforeConnecting
			find(req.body.code, function(err,mClient){
				if(err){ //if error send back to index with error message
					res.render('index', {
						error: err
					});
					return;
				}
				mClient.data.clientState = mClient.clientStates.beforeConnected;
				mClient.update(function(err){
					if(err){
						res.render('index', {
							error: err
						});
					}
					res.render('connecting',{
						ClientCode:mClient.data.code
					});
				}); //END UPDATE
				
			}); //END FIND
		}, //END CONNECT
		checkConnection: function(req,res){
			find(req.body.ClientCode, function(err,mClient){
				if(err){ //if error send back to index with error message
					console.log(err);
					res.send("false");
					return;
				}
				if(mClient.data.clientState === mClient.clientStates.connected){
					res.send("true");
					return;
				}else{
					res.send("false");
					return;
				}
			}); //END FIND
		}//END CHECK CONNECTION
	};

};

module.exports = ClientConnectionController;