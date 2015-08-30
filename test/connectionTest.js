var expect = require("chai").expect;
var mocha = require("mocha");
var PGConnection = require("../models/connection")

describe("connection", function() {
	it("connects to pgAdmin", function() {
		var con = new PGConnection("test");
		con.executeQuery("Select 1", null, function(err){
			expect(err).to.be(null);
		});
	});
});
