const { body } = require('express-validator');

module.exports = () => [
  body('email', 'Please provide a valid email address').exists().isString().notEmpty().isEmail(),
  body('password', 'Please provide a password').exists().isString().notEmpty()
];
