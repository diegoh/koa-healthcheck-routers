import { BaseResponse } from './BaseResponse';

describe('BaseResponse', () => {
  const { serviceId, version, description } = new BaseResponse();

  it('sets the serviceId', () => {
    expect(serviceId).toBe(process.env.npm_package_name);
  });
  it('sets the version', () => {
    expect(version).toBe(process.env.npm_package_version);
  });
  it('sets the description', () => {
    expect(description).toBe(process.env.npm_package_description);
  });
});
