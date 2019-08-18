const Koa = require('koa');
const router = require('../../../src');

const app = new Koa();

app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(3000);
module.exports = server;
