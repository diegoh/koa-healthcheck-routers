import * as Router from '@koa/router';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { Context, Next } from 'koa';
import { HealthResponse } from './health-response.class';

export const handler = async (ctx: Context, next: Next): Promise<void> => {
  ctx.body = new HealthResponse(true);

  try {
    await next();
  } catch (error) {
    ctx.body = new HealthResponse(false);
    ctx.status = INTERNAL_SERVER_ERROR;
  }
};

export const router = new Router().get('/health', handler);
