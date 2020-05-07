import * as KoaRouter from '@koa/router';
import { handler } from './handler';

export class HeartBeatRouter extends KoaRouter {
  constructor() {
    super();
    this.get('/heartbeat', handler);
  }
}
