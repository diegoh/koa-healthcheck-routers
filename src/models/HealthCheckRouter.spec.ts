import { URL } from 'url';
import { createMockContext } from '@shopify/jest-koa-mocks';
import { HealthCheckRouter, setupState } from './HealthCheckRouter';
import { HealthCheckState } from './HealthCheckState';

describe('HealthCheckRouter', () => {
  const urls = [
    new URL('http://localhost:8888/healthcheck'),
    new URL('http://localhost:9999/healthcheck')
  ];

  it('sets up the deep healthcheck endpoint', () => {
    const router = new HealthCheckRouter(urls);
    const route = router.stack[1];
    expect(route.path).toEqual('/healthcheck');
  });

  describe('setupState', () => {
    it('sets up the expected state', async () => {
      const ctx = createMockContext();
      const next = jest.fn();

      const middleware = setupState(urls);
      await middleware(ctx, next);

      expect(ctx.state instanceof HealthCheckState).toBeTruthy();
      expect(ctx.state).toEqual(new HealthCheckState(urls));
      expect(next.mock.calls.length).toBe(1);
    });
  });
});
