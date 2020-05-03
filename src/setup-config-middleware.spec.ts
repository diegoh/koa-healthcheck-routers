import { URL } from 'url';
import { DefaultState, ParameterizedContext } from 'koa';
import { setupConfigMiddleware } from './setup-config-middleware';

describe('src/setup-config-middleware', () => {
  let ctx: ParameterizedContext<DefaultState, any>;
  const urls = [
    new URL('http://localhost:1111/healthcheck'),
    new URL('http://localhost:2222/healthcheck'),
  ];

  const next = jest.fn();

  it('sets up the urls in the request context', async () => {
    ctx = {
      response: {
        body: null,
      },
      state: undefined,
    };

    const middleware = setupConfigMiddleware(urls);
    await middleware(ctx, next);

    expect(ctx.state).toEqual({
      healthchecks: {
        http: urls,
      },
    });
  });
});
