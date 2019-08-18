const logger = require('@diegoh/logger');

const logCall = name =>
  logger.info({
    code: `${name}:HEALTH:0001`,
    message: 'Called health endpoint'
  });

const logOk = health =>
  logger.info({
    code: `${health.name}:HEALTH:0002`,
    message: 'Health OK',
    health
  });

module.exports = async (ctx, next) => {
  const name = process.env.npm_package_name;
  const version = process.env.npm_package_version;

  logCall(name);

  const health = {
    success: true,
    name,
    version
  };

  ctx.body = health;
  ctx.status = 200;

  logOk(health);
  await next();
};
