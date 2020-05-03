import { DefaultState, ParameterizedContext } from 'koa';
import { Health } from './models/Health';
import { shallowHandler } from './shallow-handler';

describe('src/deep-handler', () => {
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
    await shallowHandler(ctx, next);
    const expected = new Health();
    expect(ctx.body).toEqual(expected);
  });
});
