import { URL } from 'url';
import { createMockContext } from '@shopify/jest-koa-mocks';
import { DeepRouter, setupState } from './DeepRouter';
import { DeepState } from './DeepState';

describe('DeepRouter', () => {
  const urls = [
    new URL('http://localhost:8888/healthcheck'),
    new URL('http://localhost:9999/healthcheck')
  ];
  it('sets up the deep healthcheck endpoint', () => {
    const router = new DeepRouter(urls);
    const route = router.stack[2];
    expect(route.path).toEqual('/healthcheck');
  });

  describe('setupState', () => {
    it('sets up the expected state', async () => {
      const ctx = createMockContext();
      const next = jest.fn();

      const middleware = setupState(urls);
      await middleware(ctx, next);

      expect(ctx.state instanceof DeepState).toBeTruthy();
      expect(ctx.state).toEqual(new DeepState(urls));
      expect(next.mock.calls.length).toBe(1);
    });
  });
});
