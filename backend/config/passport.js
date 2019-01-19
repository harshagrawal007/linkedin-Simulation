// var JwtStrategy = require("passport-jwt").Strategy;
// var ExtractJwt = require("passport-jwt").ExtractJwt;

// // Setup work and export for the JWT passport strategy
// module.exports = function(passport) {
//   var opts = {};
//   opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("jwt");
//   opts.secretOrKey = "linkedInAuth";

//   passport.use(new JwtStrategy(opts, function(jwt_payload, done) {}));
// };
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('user');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "linkedInAuth";

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
