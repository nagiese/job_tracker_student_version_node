"use strict";
/* PULL IN OUR DEPENDENCIES */
var express = require('express'),
	router = express.Router(),
	multer = require('multer'),
	/* GET CONTROLLER FILES
	NOTE: HERE I CREATED A CONTROLLER FOR EACH SECTION. THIS IS JUST ONE WAY OF DOING IT I COULD HAVE DONE IT PER PAGE OR ANOTHER TYPE OF GROUPING */
	login = require('../controllers/admin/login'),
	home = require('../controllers/admin/home');
	
	

module.exports = function(app){
	/* GET STATEMENTS */
	/* LOGIN */
	router.get('/', login.index);

	/* HOME */
	router.get('/home', home.index);

	/* ACCOUNTS */
	
	/* CONTACTS */

	/* JOBS */	
		
	/* POST STATEMENTS */
	router.post('/login', login.login);

	/* ACCOUNTS */	
	
	/* CONTACT */
	
	/* JOB */
	

	app.use(router);
}
