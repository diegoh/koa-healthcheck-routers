import { RouterParamContext } from '@koa/router';
import * as KoaRouter from '@koa/router';
import { createMockContext } from '@shopify/jest-koa-mocks';
import { DefaultContext, DefaultState, ParameterizedContext } from 'koa';
import { BaseRouter } from './BaseRouter';

describe('BaseRouter', () => {
  const next = jest.fn();
  let ctx: ParameterizedContext<
    DefaultState,
    RouterParamContext<DefaultContext, {}>
  >;

  beforeEach(() => {
    ctx = createMockContext() as ParameterizedContext<
      DefaultState,
      RouterParamContext<DefaultContext, {}>
    >;
    ctx.type = 'dummy';
    next.mockClear();
  });

  it('sets up the ctx.type', async () => {
    const router = new BaseRouter();
    const middleware = router.stack[0].stack[0];
    await middleware(ctx, next);
    const { type } = ctx;
    expect(type).toStrictEqual('application/health+json');
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('intantiates koa router', () => {
    const router = new BaseRouter();
    expect(router).toBeInstanceOf(KoaRouter);
  });
});
