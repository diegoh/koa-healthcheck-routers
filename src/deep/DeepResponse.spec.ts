import StatusCodes from 'http-status-codes';
import { ServiceResponse } from '../base/ServiceResponse';
import { ServiceStatus } from '../base/ServiceStatus';
import { DeepResponse } from './DeepResponse';

describe('DeepResponse', () => {
  const responseBody = { dummy: 'example' };

  describe('base properties', () => {
    const { checks } = new DeepResponse([]);

    it('sets the checks', () => {
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

    const { isHealthy, output, status } = new DeepResponse(healthyCheckResults);

    it('isHealthy is true', () => {
      expect(isHealthy).toBe(true);
    });
    it('output is null', () => {
      expect(output).not.toBeDefined();
    });
    it('status is "pass"', () => {
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

    const { isHealthy, output, status } = new DeepResponse(
      unhealthyCheckResults
    );

    it('sets isHealthy to false', () => {
      expect(isHealthy).toBe(false);
    });
    it('sets the error output', () => {
      expect(output).toStrictEqual([
        {
          componentName: notFoundUrl,
          data: responseBody
        }
      ]);
    });
    it('sets the status to "fail"', () => {
      expect(status).toStrictEqual(ServiceStatus.fail);
    });
  });
});
