'use strict';

var mongoose = require('mongoose');
var shortId = require('shortid');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

module.exports = function (users) {

	var userSchema = new mongoose.Schema(
    {
        _id: String,
    	email: String,
        password: String,
        pseudo: String,
        registrationDate: Date,
        vouchers: [{ type : String, ref: 'vouchers' }],
        vouchersToExchange: [{ type : String, ref: 'vouchers' }],
        role: { type: String, enum: ['manager', 'customer'] }
	}, { _id: false });
	var collectionUsers = mongoose.model('users', userSchema);
  	
  	var Users = {

        get: function get(id, callback) {
            collectionUsers.findOne({_id: id}, function(err, user) {
                if (err) {
            		return callback(null, {
                		status: 500,
                		cause: 'Error occured: ' + err
	          		});
    		    }
                if (user) {
        		    return callback(user, null);
                }
                return callback(null, {
                    status: 404,
                    cause: 'User not found'
                });
            });
        },
        
        signup: function signup(email, password, pseudo, role, callback) {
            collectionUsers.findOne({pseudo: pseudo}, function(err, user) {
        		if (err) {
            		return callback(null, {
                		status: 500,
                		cause: 'Error occured: ' + err
	          		});
    		    }
                if (user) {
        		    return callback(null, {
                        status: 409,
                        cause: 'User already exist'
                    });
                }
                var userToAdd = new collectionUsers({
                    _id: shortId.generate(),
                    email: email,
                    password: bcrypt.hashSync(password),
                    pseudo: pseudo,
                    registrationDate: new Date().toJSON().slice(0,10),
                    role: role
                });
                return userToAdd.save(function(err, createdUser) {
                    if(err) {
                        return callback(null, {
                            status: 500,
                            cause: 'Problem creating user : ' + err
                        });
                    }
                    var token = jwt.sign(createdUser, 'aabbcc', {
                        expiresIn : 60*60*24
                    });
                    return callback({ user: createdUser, token: token }, null);
                });
    		});
        },

        login: function login(pseudo, password, callback) {
            collectionUsers.findOne({pseudo: pseudo}, function(err, user) {
                if (err) {
                    return callback(null, {
                        status: 500,
                        cause: 'Error occured: ' + err
                    });
                }
                if(user) {
                    return bcrypt.compare(password, user.password, function(err, res) {
                        if(res) {
                            var token = jwt.sign(user, 'aabbcc', {
                                expiresIn : 60*60*24
                            });
                            return callback({ user: user, token: token }, null);
                        }
                        return callback(null, {
                            status: 401,
                            cause: 'Authentification failed, incorrect password'
                        });
                    });
                }
                return callback(null, {
                    status: 404,
                    cause: 'User not found'
                });
            });
        },

        remove: function remove(id, callback) {
            collectionUsers.findOneAndRemove({_id: id}, function(err, user) {
                if (err) {
                    return callback(null, {
                        status: 500,
                        cause: 'Error occured: ' + err
                    });
                }
                if(user) {
                    return callback(user, null);
                }
                return callback(null, {
                    status: 404,
                    cause: 'User not found'
                });
            });
        }
    };

    return Users;
};