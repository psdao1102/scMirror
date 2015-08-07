var express = require('express');
var router = express.Router();
var User = require('../Models/userModel');

//Registration
router.get('/registerform', function (req, res) {
	res.render('registerform', {
		nav_registerform: true
	});
});

//back end logic for registration
router.post('/register', function (req, res) {
	if (req.body.Password != req.body.ConfirmPassword) {
		res.render('registerform', {
			nav_registerform: true,
			message: "Passwords do not match"
		});	
	}
	//make a user and set its information
	var user = new User();
	user.setFirstName(req.body.FirstName);
	user.setLastName(req.body.LastName);
	user.setDescription(req.body.Description);
	user.setEmail(req.body.Email);
	user.setAndHashPassword(req.body.Password);
	user.Insert(function (err) { //insert that user into the database
		if (err) {
			res.render('registerform', {
				nav_registerform: true,
				message: err
			});	
		}
		res.render('thankyou');
	});
	
});

//login page
router.get('/login', function (req, res) {
	res.render('login');
});

//back end logic for logging in
router.post('/login', function (req, res) {
	if (!req.body.Password || !req.body.Email) {
		res.render('login', { message: "Please fill out all forms" });
	} else {
		var user = new User(); //make a new user and set the email and hash the password. This 2 pieces of information is all that is required to login.
		user.setEmail(req.body.Email);

		user.Find(req.body.Password, function (err) { //find the user
			if (err) { // if there is an error, log it, and send them back to login page.
				console.log(err);
				res.render('login', { message: err });
			} else { //if everything worked out, set the user in the session, and then send them to home.
				req.session.activeuser = user;
				res.render('index');
			}
		});
	}
});

//management page
router.get('/management', function (req, res) {
	if (req.session.activeuser) {
		res.render('profile');
	} else {
		res.render('index', { message: "Server Error: Please log out and log back in" });
	}
});


//back end logic for updating user information
router.post('/update', function (req, res) {
	var user = new User(); //make a user and set it to the active user data. It seems that class information doesnt get saved in the session, only data information.
	user.data = req.session.activeuser.data;
	//set the user data to the form data.
	user.setFirstName(req.body.FirstName);
	user.setLastName(req.body.LastName);
	user.setDescription(req.body.Description);
	user.setEmail(req.body.Email);
	user.Update(function (err) { //update the user
		if (err) {
			console.log(err); //if error send back to profile... we could add a model here to send back an error message
			res.render('profile' , { message: err });
		} else { //if everything goes great send them back to home.
			req.session.activeuser = user;
			res.render('index'); 
		}
		
	});
});

//back end logic for logging out(there is no logout page)
router.get('/logout', function (req, res) {
	if (req.session && req.session.activeuser) {
		req.session.activeuser = null;
	}
	res.render('index');
});


module.exports = router;