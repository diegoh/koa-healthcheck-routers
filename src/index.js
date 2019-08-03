const logger = require('@diegoh/logger');
const startServer = require('@diegoh/webserver');
const config = require('./config');
const router = require('./router');

try {
  module.exports = startServer(
    { port: config.server.port },
    router.routes(),
    router.allowedMethods()
  );
} catch (error) {
  logger.error(error);
  throw error;
}
