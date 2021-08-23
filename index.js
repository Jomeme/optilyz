const dotenv = require('dotenv');
dotenv.config();

const http = require('http');
const app = require('./app');
const { logger } = require('./config/logger.config');
const { initializeDatabase } = require('./config/db.config');

const PORT = process.env.PORT || 8089;

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
  initializeDatabase();
});

module.exports = server;