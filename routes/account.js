'use strict';

var express = require('express');
var router = express.Router();
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var auth = require('../tools/authentication');

var users = require ('../config').users;

router.get('/api/account/me', auth.ensureAuthorized, function(req, res) {
	var user = _.get(jwt.decode(req.token, {complete: true}), 'payload._doc');
	users.get(user._id, function(user, err) {
		if(err) {
			res.status(err.status).send(err.cause);
		} else {
			res.status(200).json(user);
		}
	});
});

router.get('/api/account/:id', auth.ensureAuthorized, function(req, res) {
	users.get(req.params.id, function(user, err) {
		if(err) {
			res.status(err.status).send(err.cause);
		} else {
			res.status(200).json(user);
		}
	});
});

router.post('/api/account/signup', function(req, res) {
	if(!req.body.email || !req.body.password || !req.body.pseudo || !req.body.role) {
		res.status(401).send('Required email/password/pseudo/role');
	} else {
		users.signup(req.body.email, req.body.password, req.body.pseudo, req.body.role, function(user, err){
			if(err) {
				res.status(err.status).send(err.cause);
			} else {
                res.status(200).json(user);
			}
		});
	}
});

router.post('/api/account/authenticate', function(req, res) {
	if(!req.body.pseudo || !req.body.password) {
		res.status(401).send('Required email/password');
	} else {
		users.login(req.body.pseudo, req.body.password, function(token, err) {
			if(err) {
				res.status(err.status).send(err.cause);
			} else {
				res.status(200).send(token);
			}
		});
	}
});

router.delete('/api/account/:id', auth.ensureAuthorized, function(req, res) {
	users.remove(req.params.id, function(user, err) {
		if(err) {
			res.status(err.status).send(err.cause);
		} else {
			res.status(204).send();
		}
	});
});

module.exports = router;