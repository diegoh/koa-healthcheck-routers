import { DefaultState, ParameterizedContext } from 'koa';
import { Health } from '../Health';
import { handler } from './handler';

describe('src/heartbeat/handler', () => {
  const next = jest.fn();
  let ctx: ParameterizedContext<DefaultState, any>;

  beforeEach(() => {
    ctx = {
      response: {
        body: null
      }
    };
  });

  it('sets a healthy response', async () => {
    await handler(ctx, next);
    const expected = new Health();
    expect(ctx.body).toEqual(expected);
  });
});
