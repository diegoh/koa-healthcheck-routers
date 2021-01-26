import StatusCodes from 'http-status-codes';
import { ServiceResponse } from './ServiceResponse';

describe('ServiceResponse', () => {
  const response = {
    config: {
      url: 'componentName'
    },
    status: StatusCodes.OK,
    data: { test: true },
    isHealthy: true
  };

  const { componentName, status, data, isHealthy } = new ServiceResponse(
    response
  );

  it('sets the componentName', () => {
    expect(componentName).toStrictEqual(response.config.url);
  });
  it('sets the status', () => {
    expect(status).toStrictEqual(response.status);
  });
  it('sets the data', () => {
    expect(data).toStrictEqual(response.data);
  });
  it('sets the health', () => {
    expect(isHealthy).toStrictEqual(response.isHealthy);
  });
  it('sets a default status', () => {
    const withoutStatus = {
      config: {
        url: 'componentName'
      },
      data: { test: true },
      isHealthy: true
    };

    const serviceResponse = new ServiceResponse(withoutStatus);

    expect(serviceResponse.status).toStrictEqual(
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  });
});
