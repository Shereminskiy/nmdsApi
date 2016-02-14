/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    create: function(req, res) {

    },
    getAll: function (req, res) {
        res.status(200);
        User
            .findOne()
            .where({token: req.headers.authorization})
            .then(function(user){
                return res.json({session: req.session, user: user, time: Math.floor(Date.now() / 1000)});
            }).catch(function(err){
                return res.json(err.message );
                // An error occurred
            });
    }
};

