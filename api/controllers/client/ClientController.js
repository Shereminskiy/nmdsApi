/**
 * ClientController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    create: function(req, res) {
        User.create({
            username: req.param("username"),
            password: req.param("password"),
            email: req.param("email")
        }, function (err, user) {
            console.log("SSSSSSs");
            if(err) return res.status(400).json({success: false, error: err.messages});
            res.status(201).json({success: true, user: user});
        });
    }
};

