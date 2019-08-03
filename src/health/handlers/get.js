const logger = require('@diegoh/logger');
const { name, server } = require('../../config');
const logMessages = require('../../log-messages');
const { version } = require('../../../package.json');

module.exports = async (ctx, next) => {
  const logs = logMessages.health.handler.get;
  logger.info(logs.called);

  ctx.body = {
    name,
    version,
    success: true,
    port: server.port
  };

  ctx.status = 200;

  logger.info({ ...logs.ok, health: ctx.body });
  await next();
};
