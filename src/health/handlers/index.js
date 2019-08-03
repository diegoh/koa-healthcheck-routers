const Router = require('@koa/router');
const handler = require('./get');

const router = new Router();

router.get('/health', handler);

module.exports = router;
