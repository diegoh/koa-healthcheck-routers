import { createMockContext } from '@shopify/jest-koa-mocks';
import { DefaultContext, DefaultState, ParameterizedContext } from 'koa';
import { BaseResponse } from '../base/BaseResponse';
import { shallowHealthHandler } from './handler';

describe('handlers/shallow', () => {
  const next = jest.fn();
  const ctx: ParameterizedContext<
    DefaultState,
    DefaultContext
  > = createMockContext();

  it('sets a healthy response', async () => {
    await shallowHealthHandler(ctx, next);
    const expected = new BaseResponse();
    expect(ctx.body).toEqual(expected);
  });
});
