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

  const serviceResponse = new ServiceResponse(response);

  it('sets the componentName', () => {
    const { componentName } = serviceResponse;
    expect(componentName).toStrictEqual(response.config.url);
  });
  it('sets the status', () => {
    const { status } = serviceResponse;
    expect(status).toStrictEqual(response.status);
  });
  it('sets the data', () => {
    const { data } = serviceResponse;
    expect(data).toStrictEqual(response.data);
  });
  it('sets the health', () => {
    const { isHealthy } = serviceResponse;
    expect(isHealthy).toStrictEqual(response.isHealthy);
  });
  it('sets a default status', () => {
    const withoutStatus = { ...serviceResponse };
    delete withoutStatus.status;
    const { status } = new ServiceResponse(withoutStatus);
    expect(status).toStrictEqual(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
