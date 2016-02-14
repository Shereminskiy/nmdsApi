var bcrypt = require('bcrypt-nodejs');
//var auth = require('../services/auth');

module.exports = {
    userTypes : {
        client: 1,
        consultant: 2,
        manager: 3
    },
    attributes: {
        username: {
            type: 'string',
            required: true,
            unique: true,
            maxLength: 60,
            index: true
        },
        password: {
            type: 'string',
            required: true,
            maxLength: 30,
            minLength: 8
        },
        email: {
            type: 'string',
            required: true,
            unique: true,
            email: true,
            maxLength: 60
        },
        token: {
            type: 'string',
            maxLength: 400
        },
        toJSON: function () {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },
    beforeCreate: function (user, cb) {

        //delete user.password_confirmation;
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(user.password, salt, function () {
            }, function (err, hash) {
                user.password = hash;
                cb(null, user);
            });
        });
    }
};
