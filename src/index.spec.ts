import { HttpHealthcheckRouter } from '.';

describe('src/index', () => {
  describe('deep healthcheck setup', () => {
    it('sets up the deep healthcheck endpoint', () => {
      const router = new HttpHealthcheckRouter();
      const route = router.stack[0];
      expect(route.path).toEqual('/healthcheck');
    });
  });

  describe('shallow heartbeat setup', () => {
    it('sets up the shallow heartbeat endpoint', () => {
      const router = new HttpHealthcheckRouter();
      const route = router.stack[1];
      expect(route.path).toEqual('/heartbeat');
    });
  });
});
