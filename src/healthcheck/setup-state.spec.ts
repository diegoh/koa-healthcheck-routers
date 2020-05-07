import { URL } from 'url';
import { createMockContext } from '@shopify/jest-koa-mocks';
import { HealthCheckState } from '../HealthCheckState';
import { setupState } from './setup-state';

describe('src/healthcheck/HealthCheckRouter', () => {
  const urls = [
    new URL('http://localhost:22222/healthcheck'),
    new URL('http://localhost:55555/healthcheck')
  ];

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
