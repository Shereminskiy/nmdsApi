var passport = require("passport");
var jwt = require('jsonwebtoken');

module.exports = {
    login: function (req, res) {
        passport.authenticate('local', function (err, user) {
            if (!user) {
                return res.send({
                    success: false,
                    message: 'invalidLogin'
                });
            } else {
                if (err) {
                    res.send({
                        success: false,
                        message: 'unknownError',
                        error: err
                    });
                } else {
                    delete user[0].token; // remove unecessary value

                    var token = jwt.sign(user[0], sails.config.secret, {expiresIn: 60 * 60 * 24});
                    // Set persistent cookie
                    req.session.cookie.token = token;

                    user[0].token = token;
                    user[0].save(function(err) {
                        if (err) {
                            res.send({
                                success: false,
                                message: 'unknownError',
                                error: err
                            });
                        }
                    });
                }
                res.send({
                    success: true,
                    token: token
                });
            }
        })(req, res);
    },
    isValidToken: function (req, res) {
        if (req.headers.authorization) {
            jwt.verify(
                req.headers.authorization.replace('Bearer ', ''),
                sails.config.secret,
                function (err, decoded) {
                    if (err) return res.send({success: false});
                    if (decoded) {
                        return res.send({success: true, user: decoded[0]});
                    }
                }
            );
        } else {
            return res.send({success: false});
        }
    }
};
