const td = require('testdouble');
const assert = require('assert');

describe('src/get', () => {
  let handler;
  let logger;
  let packageJson;

  const name = 'mock-api-name';
  const version = '9000.0.1';

  const health = {
    success: true,
    name,
    version
  };

  beforeEach(() => {
    packageJson = {
      name,
      version
    };

    td.replace('../package.json', packageJson);
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
    it('sets the expected response', async () => {
      const ctx = {};
      const next = td.function('next()');

      await handler(ctx, next);

      assert.deepStrictEqual(ctx.body, health);
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
    it('logs the call to the handler', async () => {
      const ctx = {};
      const next = td.function('next()');

      await handler(ctx, next);

      td.verify(
        logger.info({
          code: `${packageJson.name}:HEALTH:0001`,
          message: 'Called health endpoint'
        })
      );
    });
    it('logs upon success', async () => {
      const ctx = {};
      const next = td.function('next()');

      await handler(ctx, next);

      td.verify(
        logger.info({
          code: `${packageJson.name}:HEALTH:0002`,
          message: 'Health OK',
          health
        })
      );
    });
  });
});
