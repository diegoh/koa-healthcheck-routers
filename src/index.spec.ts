import * as Application from 'koa';
import { HealthResponse } from './health-response.class';
import { handler } from '.';

describe('src/index', () => {
  let ctx: Application.Context;
  const next = jest.fn();

  beforeEach(() => {
    ctx = {
      response: {
        body: null
      }
    } as Application.Context;
  });

  it('sets a healthy response', async () => {
    await handler(ctx, next);

    const expected = new HealthResponse(true);

    expect(ctx.body).toEqual(expected);
  });

  it('sets an unhealthy response', async () => {
    next.mockImplementation(() => {
      throw new Error('Unhealthy API');
    });

    await handler(ctx, next);

    const expected = new HealthResponse(false);

    expect(ctx.body).toEqual(expected);
  });

  it('sets an error status code', async () => {
    next.mockImplementation(() => {
      throw new Error('Unhealthy API');
    });

    await handler(ctx, next);

    expect(ctx.status).toEqual(500);
  });
});
