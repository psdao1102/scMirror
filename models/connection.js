var pg = require('pg');

var PGConnection = function (mode) {
	this.client = new pg.Client(this.conString);

	this.executeQuery = function (sqlStr, values, callback) {
		this.client.connect(function (err) {
			if (err) {
				callback({ errorType: this.ERRORTYPES.CONNECTIONFAILED, message: err });
				return;
			}
			this.client.query(sqlStr, values, function (err, result) { //sql string should contain $1, $2 etc to represent prepaired statements, and in values there should be that many values. Order matters
				if (err) {
					callback({ errorType: this.ERRORTYPES.QUERYFAILED, message: err });
					return;
				}
				this.client.end();
				callback(null, result);
			}.bind(this));
		}.bind(this));
	}.bind(this);
};

PGConnection.prototype.conString = {prod:"postgres://postgres:helpingthenextbillion@45.55.43.20/postgres", testing: "postgres://postgres:helpingthenextbillion@45.55.43.20/test"};
PGConnection.prototype.ERRORTYPES = { //allows for easy lookup of what type of error we got, so that we can do logic to handle errors
	CONNECTIONFAILED:0,
	QUERYFAILED: 1,
	BADINPUT: 2,
	UNKNOWN:3
};





module.exports = PGConnection;