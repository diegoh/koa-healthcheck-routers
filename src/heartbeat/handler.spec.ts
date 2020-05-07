import { createMockContext } from '@shopify/jest-koa-mocks';
import { DefaultContext, DefaultState, ParameterizedContext } from 'koa';
import { Health } from '../Health';
import { handler } from './handler';

describe('src/heartbeat/handler', () => {
  const next = jest.fn();
  const ctx: ParameterizedContext<
    DefaultState,
    DefaultContext
  > = createMockContext();

  it('sets a healthy response', async () => {
    await handler(ctx, next);
    const expected = new Health();
    expect(ctx.body).toEqual(expected);
  });
});
