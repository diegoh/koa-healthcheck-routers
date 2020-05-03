import { Health } from './Health';

describe('src/models/Health', () => {
  it('sets the package name', () => {
    const response = new Health();
    expect(response.name).toBe(process.env.npm_package_name);
  });
  it('sets the package version', () => {
    const response = new Health();
    expect(response.version).toBe(process.env.npm_package_version);
  });
});
