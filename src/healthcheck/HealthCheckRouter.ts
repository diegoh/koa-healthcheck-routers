import { URL } from 'url';
import * as Router from '@koa/router';
import { BaseContext, DefaultContext, Next, ParameterizedContext } from 'koa';
import { HealthCheckState } from '../HealthCheckState';
import { handler } from './handler';

export class HealthCheckRouter extends Router<HealthCheckState, BaseContext> {
  constructor(urls: URL[]) {
    super();

    this.use(this.setupState(urls));
    this.get('/healthcheck', handler);
  }

  private setupState = (urls: URL[]) => async (
    ctx: ParameterizedContext<HealthCheckState, DefaultContext>,
    next: Next
  ): Promise<void> => {
    ctx.state = new HealthCheckState(urls);
    await next();
  };
}
