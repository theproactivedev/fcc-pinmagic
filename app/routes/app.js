const expressJwt = require('express-jwt');
const request = require('request');
const jwt = require('jsonwebtoken');
let router = require("express").Router();
let Users = require('../models/Users.js');

module.exports = function(app, passport) {
  var createToken = function(auth) {
    return jwt.sign({
      id: auth.id
    }, 'my-secret',
    {
      expiresIn: 60 * 120
    });
  };

  var generateToken = function (req, res, next) {
    req.token = createToken(req.auth);
    return next();
  };

  var sendToken = function (req, res) {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
  };

  var authenticate = expressJwt({
    secret: 'my-secret',
    requestProperty: 'auth',
    getToken: function(req) {
      if (req.headers['x-auth-token']) {
        return req.headers['x-auth-token'];
      }
      return null;
    }
  });

  var getCurrentUser = function(req, res, next) {
    Users.findOne({
      "_id" : req.auth.id
    }, function(err, user) {
      if (err) {
        next(err);
      } else {
        req.user = user;
        next();
      }
    });
  };

  router.route('/auth/twitter/reverse')
  .post(function(req, res) {
    request.post({
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        oauth_callback: "https://eg-fcc-pinterest.herokuapp.com/twitter-callback",
        consumer_key: process.env.TWITTER_KEY,
        consumer_secret: process.env.TWITTER_SECRET
      }
    }, function (err, r, body) {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      res.send(JSON.parse(jsonStr));
    });
  });

  router.route('/auth/twitter')
    .post(function(req, res, next) {
      request.post({
        url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
        oauth: {
          consumer_key: process.env.TWITTER_KEY,
          consumer_secret: process.env.TWITTER_SECRET,
          token: req.query.oauth_token
        },
        form: { oauth_verifier: req.query.oauth_verifier }
      }, function (err, r, body) {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
        const parsedBody = JSON.parse(bodyString);
        req.body['oauth_token'] = parsedBody.oauth_token;
        req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
        req.body['user_id'] = parsedBody.user_id;

        next();
      });
    }, passport.authenticate('twitter-token', {session: false}), function(req, res, next) {
        if (!req.user) {
          return res.status(401).send("User Not Authenticated");
        }
        // prepare token for API
        req.auth = {
          id: req.user.id
        };

        return next();
  }, generateToken, sendToken);

  app.use("/api/v1", router);

  app.route("/addingPhoto").post(authenticate, getCurrentUser, function(req, res) {
    let obj = {
      url: req.body.url,
      title: req.body.title
    };
    Users.update(
      { "_id": req.auth.id },
      { $push : { "pins" : obj } },
      { upsert: true, new: true},
      function(err) {
        if (err) console.log(err);
      }
    );
  });

  app.route("/deletingPhoto").delete(authenticate, getCurrentUser, function(req, res) {
    Users.findOneAndUpdate(
      {"_id": req.auth.id},
      {$pull : { "pins" : { title : req.body.imgTitle } } },
      function(err) {
        if (err) console.log(err);
    });
  });

  app.route("/gettingUserPhotos").get(authenticate, getCurrentUser, function(req, res) {
    Users.findOne({ "_id": req.auth.id },
      function(err, user) {
        if (err) console.log(err);
        if (user) {
          res.json(user.pins);
        }
    });
  });

  app.route("/gettingAllPhotos").get(function(req, res) {

    Users.find({}, function(err, users) {
      var photos = [];
      users.forEach(function(user) {
        photos = photos.concat(user.pins);
      });
      res.json(photos);
    });
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
};
