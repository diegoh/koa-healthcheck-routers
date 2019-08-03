const config = require('../../config');
const logMessages = require('../../log-messages');
const td = require('testdouble');
const assert = require('assert');

describe('src/health/handlers/get', () => {
  let handler;
  let logger;
  let packageJson;

  beforeEach(() => {
    packageJson = {
      version: '9000.0.1'
    };
    td.replace('../../../package.json', packageJson);
    logger = td.replace('@diegoh/logger');
    handler = require('./get');
  });

  afterEach(() => {
    td.reset();
  });

  it('exports a function', () => {
    assert.strictEqual(typeof handler, 'function');
  });

  describe('happy path', () => {
    it('sets the expected health response', async () => {
      const ctx = {};
      const next = td.function('next()');

      await handler(ctx, next);

      assert.deepStrictEqual(ctx.body, {
        name: config.name,
        version: packageJson.version,
        success: true,
        port: config.server.port
      });
    });
    it('sets the response code to 200', async () => {
      const ctx = {};
      const next = td.function('next()');

      await handler(ctx, next);

      assert.strictEqual(ctx.status, 200);
    });
    it('calls the next middleware', async () => {
      const ctx = {};
      const next = td.function('next()');

      await handler(ctx, next);

      td.verify(next(), { times: 1 });
    });
  });

  describe('logs', () => {
    const logs = logMessages.health.handler.get;

    it('logs the call to the handler', async () => {
      const ctx = {};
      const next = td.function('next()');

      await handler(ctx, next);

      td.verify(logger.info(logs.called));
    });
    it('logs upon success', async () => {
      const ctx = {};
      const next = td.function('next()');

      await handler(ctx, next);

      td.verify(logger.info({ ...logs.ok, health: ctx.body }));
    });
  });
});
