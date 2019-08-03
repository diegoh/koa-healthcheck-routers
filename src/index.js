const logger = require('@diegoh/logger');
const { name, version } = require('../../../package.json');

const logCall = () =>
  logger.info({
    code: `${name}:HEALTH:0001`,
    message: 'Called health endpoint'
  });

const logOk = health =>
  logger.info({
    code: `${name}:HEALTH:0002`,
    message: 'Health OK',
    health
  });

module.exports = async (ctx, next) => {
  logCall();

  const health = {
    name,
    version,
    success: true
  };

  ctx.body = health;
  ctx.status = 200;

  logOk(health);
  await next();
};
