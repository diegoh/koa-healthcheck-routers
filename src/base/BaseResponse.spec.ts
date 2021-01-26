import { BaseResponse } from './BaseResponse';

describe('BaseResponse', () => {
  const health = new BaseResponse();

  it('sets the serviceId', () => {
    const { serviceId } = health;
    expect(serviceId).toBe(process.env.npm_package_name);
  });
  it('sets the version', () => {
    const { version } = health;
    expect(version).toBe(process.env.npm_package_version);
  });
  it('sets the description', () => {
    const { version } = health;
    expect(version).toBe(process.env.npm_package_version);
  });
});
