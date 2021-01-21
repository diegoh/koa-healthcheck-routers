import StatusCodes from 'http-status-codes';
import { Health } from './Health';
import { ServiceResponse } from './ServiceResponse';

describe('src/Health', () => {
  it('sets the package name', () => {
    const { name } = new Health();
    expect(name).toBe(process.env.npm_package_name);
  });
  it('sets the package version', () => {
    const { version } = new Health();
    expect(version).toBe(process.env.npm_package_version);
  });

  describe('status', () => {
    it('isOk is true when initialised with no responses', () => {
      const { isOk } = new Health();
      expect(isOk).toBe(true);
    });

    it('isOk is false if initalised with an empty array', () => {
      const { isOk } = new Health([]);
      expect(isOk).toBe(false);
    });

    it('isOk as false if any of the responses passed is unhealthy', () => {
      const { isOk } = new Health([
        new ServiceResponse(
          { data: 'ERR', status: StatusCodes.NOT_FOUND },
          false
        )
      ]);
      expect(isOk).toBe(false);
    });
  });
});
