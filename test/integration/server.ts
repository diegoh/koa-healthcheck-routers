import * as Koa from 'koa';
import * as supertest from 'supertest';
import { HttpHealthcheckRouter } from '../../src/index';
import { urls } from '../fixtures/urls';

const app = new Koa();
const router = new HttpHealthcheckRouter(urls);

app.use(router.routes());
app.use(router.allowedMethods());

export const server = supertest(app.callback());
