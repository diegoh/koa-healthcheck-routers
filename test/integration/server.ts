import * as Koa from 'koa';
import * as supertest from 'supertest';
import { router } from '../../src/index';

const app = new Koa();
app.use(router.routes());
app.use(router.allowedMethods());

export const server = supertest(app.callback());
