/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var auth = require('../services/auth');

module.exports = {
  login: function (req, res) {
    auth.login(req, res);
  },
  validate_token: function (req, res) {
    auth.isValidToken(req, res);
  },
  logout: function(req, res){
    req.logout();
    res.status(200);

    // drop token from user table
    User.findOneById(req.session.user.id).then(function(user){
      user.token = null;
      user.save(function (err) {
        res.send(err);
      });
    });

    res.send({success: true});
  }
};

