import StatusCodes from 'http-status-codes';
import { ServiceResponse } from '../base/ServiceResponse';
import { ServiceStatus } from '../base/ServiceStatus';
import { DeepResponse } from './DeepResponse';

describe('DeepResponse', () => {
  const responseBody = { dummy: 'example' };

  describe('base properties', () => {
    const health = new DeepResponse([]);

    it('sets the checks', () => {
      const { checks } = health;
      expect(checks).toStrictEqual([]);
    });
  });

  describe('when every check is healthy', () => {
    const healthyCheckResults: ServiceResponse[] = [
      new ServiceResponse({
        config: {
          url: 'http://foo.example.com'
        },
        status: StatusCodes.OK,
        data: responseBody
      }),
      new ServiceResponse({
        config: {
          url: 'http://bar.example.com'
        },
        status: StatusCodes.OK,
        data: responseBody
      })
    ];

    it('the checks property is set', () => {
      const { checks } = new DeepResponse(healthyCheckResults);
      expect(checks).toStrictEqual(healthyCheckResults);
    });
    it('isHealthy is true', () => {
      const { isHealthy } = new DeepResponse(healthyCheckResults);
      expect(isHealthy).toBe(true);
    });
    it('output is null', () => {
      const { output } = new DeepResponse(healthyCheckResults);
      expect(output).not.toBeDefined();
    });
    it('status is "pass"', () => {
      const { status } = new DeepResponse(healthyCheckResults);
      expect(status).toStrictEqual(ServiceStatus.pass);
    });
  });

  describe('when some checks are unhealthy', () => {
    const notFoundUrl = 'http://foo.example.com';

    const unhealthyCheckResults: ServiceResponse[] = [
      new ServiceResponse({
        config: {
          url: notFoundUrl
        },
        status: StatusCodes.NOT_FOUND,
        data: responseBody
      }),
      new ServiceResponse({
        config: {
          url: 'http://bar.example.com'
        },
        status: StatusCodes.OK,
        data: responseBody
      })
    ];

    it('sets the checks property', () => {
      const { checks } = new DeepResponse(unhealthyCheckResults);
      expect(checks).toStrictEqual(unhealthyCheckResults);
    });
    it('sets isHealthy to false', () => {
      const { isHealthy } = new DeepResponse(unhealthyCheckResults);
      expect(isHealthy).toBe(false);
    });
    it('sets the error output', () => {
      const { output } = new DeepResponse(unhealthyCheckResults);

      expect(output).toStrictEqual([
        {
          componentName: notFoundUrl,
          data: responseBody
        }
      ]);
    });
    it('sets the status to "fail"', () => {
      const { status } = new DeepResponse(unhealthyCheckResults);
      expect(status).toStrictEqual(ServiceStatus.fail);
    });
  });
});
