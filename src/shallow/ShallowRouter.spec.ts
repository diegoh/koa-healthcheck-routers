import { ShallowRouter } from './ShallowRouter';

describe('ShallowRouter', () => {
  describe('heartbeat setup', () => {
    it('sets up the heartbeat endpoint', () => {
      const router = new ShallowRouter();
      const route = router.stack[0];
      expect(route.path).toEqual('/heartbeat');
    });
  });
});
