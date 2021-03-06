'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var PinSchema = new Schema({
  url: String,
  title: String
});

var UserSchema = new Schema({
  user: {
    type: {
      userName: String,
      userId: String,
      userToken: String,
    }
  },
  pins: [PinSchema]
});

UserSchema.statics.upsertTwitterUser = function(token, tokenSecret, profile, cb) {
  console.log("Is this happening? upsertTwitterUser");
  var that = this;
  return this.findOne({
    'user.userId': profile.id
  }, function(err, user) {
    if (!user) {
      var newUser = new that({
        user: {
          userName: profile.displayName,
          userId: profile.id,
          userToken: token
        }
      });

      newUser.save(function(error, savedUser) {
        if (error) {
          console.log(error);
        }
        return cb(error, savedUser);
      });
    } else {
      return cb(err, user);
    }
  });
};

module.exports = mongoose.model('Users', UserSchema);
