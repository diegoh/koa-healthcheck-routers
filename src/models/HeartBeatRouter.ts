import * as KoaRouter from '@koa/router';
import { handler } from '../handlers/heartbeat';

/**
 * Shallow Check: Response is successful if the service is ready
 */
export class HeartBeatRouter extends KoaRouter {
  constructor() {
    super();
    this.get('/heartbeat', handler);
  }
}
