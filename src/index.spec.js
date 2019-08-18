const KoaRouter = require('@koa/router');
const assert = require('assert');
const td = require('testdouble');

describe('src/index', () => {
  let router;
  let koaRouter;

  beforeEach(() => {
    koaRouter = td.replace('@koa/router');
    koaRouter.prototype.get = td.function('router.get()');

    td.replace('./get', 'get handler');
    router = require('./index');
  });
  afterEach(() => {
    td.reset();
  });

  it('exports a router', () => {
    assert.ok(router instanceof KoaRouter);
  });

  describe('health router', () => {
    it('sets up a get endpoint for /health', () => {
      td.verify(router.get('/health', 'get handler'));
    });
  });
});
