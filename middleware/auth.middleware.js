const passport = require('passport');
const LocalStrategy = require('passport-local');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../model/user');

passport.use('registration', new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, async (req, email, password, done) => {
  const { name } = req.body;
  try {
    const user = await UserModel.create({
      email,
      password,
      name
    });
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.use('login', new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, async (req, email, password, done) => {
  try {
    const user = await UserModel.findOne({ email }).exec();
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    const validate = await user.isPasswordValid(password);

    if (!validate) {
      return done(null, false, { message: 'Wrong password' });
    }

    return done(null, user, { message: 'Logged in successfully' });
  } catch (error) {
    return done(error, null, {});
  }
}));

passport.use(new JWTStrategy({ secretOrKey: process.env.JWT_SECRET, jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() }, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    return done(error);
  }
}));
