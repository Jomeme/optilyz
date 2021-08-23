const authRouter = require('./auth.router');
const taskRouter = require('./task.router');

const router = require('express').Router();

// For authentication routes.
router.use('/auth', authRouter);

// For task routes
router.use('/task', taskRouter);

module.exports = router;