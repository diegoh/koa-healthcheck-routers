import { URL } from 'url';
import { HealthCheckRouter } from './HealthCheckRouter';

describe('src/healthcheck/HealthCheckRouter', () => {
  const urls = [
    new URL('http://localhost:8888/healthcheck'),
    new URL('http://localhost:9999/healthcheck')
  ];

  it('sets up the deep healthcheck endpoint', () => {
    const router = new HealthCheckRouter(urls);
    const route = router.stack[1];
    expect(route.path).toEqual('/healthcheck');
  });
});
