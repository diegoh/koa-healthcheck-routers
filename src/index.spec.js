const assert = require('assert');
const td = require('testdouble');

describe('src/index', () => {
  let startServer;
  let router;
  let logger;
  let config;

  beforeEach(() => {
    logger = td.replace('@diegoh/logger');
    startServer = td.replace('@diegoh/webserver');
    router = td.replace('./router');
    config = require('./config');
  });

  afterEach(() => {
    td.reset();
  });

  it('starts the server', () => {
    require('./index');
    td.verify(
      startServer(
        {
          port: config.server.port
        },
        router.routes(),
        router.allowedMethods()
      )
    );
  });

  describe('error handling', () => {
    it('logs an error message', () => {
      const error = new Error('Oh no!');
      td.when(startServer(), { ignoreExtraArgs: true }).thenThrow(error);

      try {
        require('./index');
        assert.fail('should have thrown');
      } catch (e) {
        assert.strictEqual(e.message, 'Oh no!');
      }

      td.verify(logger.error(error));
    });
  });
});
