import { URL } from 'url';
import { HealthCheckRouter } from './HealthCheckRouter';

describe('src/healthcheck/HealthCheckRouter', () => {
  it('sets up the deep healthcheck endpoint', () => {
    const router = new HealthCheckRouter([new URL('http://localhost:8888')]);
    const route = router.stack[1];
    expect(route.path).toEqual('/healthcheck');
  });
});
