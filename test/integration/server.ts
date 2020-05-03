import * as Koa from 'koa';
import * as supertest from 'supertest';
import { HealthCheckRouter, HeartBeatRouter } from '../../src/index';
import { urls } from '../fixtures/urls';

const app = new Koa();
const healthcheck = new HealthCheckRouter(urls);
const heartbeat = new HeartBeatRouter();

app.use(healthcheck.routes());
app.use(healthcheck.allowedMethods());
app.use(heartbeat.routes());
app.use(heartbeat.allowedMethods());

export const server = supertest(app.callback());
