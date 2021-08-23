const { body } = require('express-validator');
const UserModel = require('../../model/user');

module.exports = () => [
  body('email', 'Please provide an email address').exists().isString().notEmpty()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .bail()
    .custom(async (value) => {
      const doc = await UserModel.findOne({ email: value }).exec();
      if (doc) {
        return Promise.reject(new Error('A user with this email already exists.'));
      }
      return true;
    }),
  body('password', 'Please provide a valid password').exists().isString().notEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters.'),
  body('name', 'Please provide a valid name').exists().isString().notEmpty(),
];
