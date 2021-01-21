import { HeartBeatRouter } from './HeartBeatRouter';

describe('HeartBeatRouter', () => {
  describe('heartbeat setup', () => {
    it('sets up the heartbeat endpoint', () => {
      const router = new HeartBeatRouter();
      const route = router.stack[0];
      expect(route.path).toEqual('/heartbeat');
    });
  });
});
