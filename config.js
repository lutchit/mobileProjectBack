'use strict';

module.exports = {
    // The port to serve application
    port: process.env.PORT || '3000',

    users: require('./lib/users')(),

    mongo: {
        development: 'mongodb://root:toor@ds143777.mlab.com:43777/mobileproject'
    },
};