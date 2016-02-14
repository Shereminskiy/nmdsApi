var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    new Promise(function(resolved, rejected) {
        // check if token is active
        jwt.verify(
            req.headers.authorization.replace('Bearer ', ''),
            sails.config.secret,
            function (err, decoded) {
                if (err) rejected(err);
                resolved(decoded);
            }
        );
    })
    .then(function resolved(user) {
        // add user into request
        req.session.user = user;
        User.findOne({id: user.id, token: req.headers.authorization}).then(function(user) {
            if(user) {
                return next();
            } else {
                return res.forbidden("You are not permitted to perform this action.");
            }
        });
    })
    .catch(function (err) {
        return res.forbidden(err.message);
    });
    //return res.forbidden('You are not permitted to perform this action.');
};