import { HealthResponse } from './health-response.class';

describe('src/health-response.class', () => {
  it('sets the success status to true', () => {
    const response = new HealthResponse(true);
    expect(response.success).toBe(true);
  });
  it('sets the success status to false', () => {
    const response = new HealthResponse(false);
    expect(response.success).toBe(false);
  });
  it('sets the success status to false by default', () => {
    const response = new HealthResponse();
    expect(response.success).toBe(false);
  });
  it('sets the package name', () => {
    const response = new HealthResponse(true);
    expect(response.name).toBe(process.env.npm_package_name);
  });
  it('sets the package version', () => {
    const response = new HealthResponse(true);
    expect(response.version).toBe(process.env.npm_package_version);
  });
});
