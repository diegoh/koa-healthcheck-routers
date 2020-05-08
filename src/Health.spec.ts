import { Health } from './Health';

describe('src/Health', () => {
  let response: Health;
  beforeEach(() => {
    response = new Health();
  });
  it('sets the package name', () => {
    expect(response.name).toBe(process.env.npm_package_name);
  });
  it('sets the package version', () => {
    expect(response.version).toBe(process.env.npm_package_version);
  });
});
