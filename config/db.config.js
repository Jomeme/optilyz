const mongoose = require('mongoose');
const { logger } = require('./logger.config');

module.exports.initializeDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true
    }, (err) => {
      if (err) {
        logger.error(err);
      } else {
        logger.info('Connected to database.');
      }
    });
    return mongoose.connection;
  } catch (error) {
    logger.error('Error initializing mongodb', error);
  }
};
