const jwt = require('jsonwebtoken');

/**
 * Register a user
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
module.exports = async (req, res, next) => {
  try {
    const { user } = req;
    const body = { _id: user._id, email: user.email };
    const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

    res.json({
      status: 'success',
      data: {
        token,
        user
      },
      message: 'Registration successful'
    });
  } catch (error) {
    next(error);
  }
};
