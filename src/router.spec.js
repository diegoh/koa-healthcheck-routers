const KoaRouter = require('@koa/router');
const assert = require('assert');
const td = require('testdouble');

describe('src/router', () => {
  let router;
  let koaRouter;
  let healthRouter;

  beforeEach(() => {
    healthRouter = {
      routes: () => 'health.routes()',
      allowedMethods: () => 'health.allowedMethods()'
    };

    koaRouter = td.replace('@koa/router');
    koaRouter.prototype.use = td.function();
    td.replace('./health/handlers', healthRouter);
    router = require('./router');
  });
  afterEach(() => {
    td.reset();
  });

  it('exports a router', () => {
    assert.ok(router instanceof KoaRouter);
  });

  describe('health router', () => {
    it('uses given routes', () => {
      td.verify(router.use('health.routes()'));
    });
    it('uses given allowed methods', () => {
      td.verify(router.use('health.allowedMethods()'));
    });
  });
});
