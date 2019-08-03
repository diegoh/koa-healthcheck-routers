const Router = require('@koa/router');
const router = new Router();
const health = require('./health/handlers');

router.use(health.routes());
router.use(health.allowedMethods());

module.exports = router;
