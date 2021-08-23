const jwt = require('jsonwebtoken');
const passport = require('passport');
const APIError = require('../../utils/APIError');
const UserModel = require('../../model/user');

/**
 * Log a user in with email and password
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
module.exports = async (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    try {
      if (err || !user) {
        return next(new APIError({ status: 404, message: info.message, isPublic: true }));
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
        return res.json({
          status: 'success',
          data: {
            token,
            user
          },
          message: 'Login successful'
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
