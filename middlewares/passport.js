const { Strategy } = require("passport-jwt");
const { ExtractJwt } = require("passport-jwt");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

module.exports = function (passport, User) {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = config.jwtSecret;
  passport.use(
    new Strategy(options, async (jwtPayload, done) => {
      const user = await User.findOne({ where: { email: jwtPayload.email } });
      if (!user) {
        done(true, false);
      }
      done(null, user);
    })
  );
};
