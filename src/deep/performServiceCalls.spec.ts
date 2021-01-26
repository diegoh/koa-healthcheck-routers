/* eslint-disable import/first */
jest.mock('axios');

import { URL } from 'url';
import axios from 'axios';
import StatusCodes from 'http-status-codes';
import { mocked } from 'ts-jest/utils';
import { ServiceResponse } from '../base/ServiceResponse';
import { axiosConfig, performServiceCalls } from './performServiceCalls';

describe('performServiceCalls', () => {
  const axiosMock = mocked(axios, true);

  const mockServiceUrl1 = 'http://localhost:1111/healthcheck';
  const mockServiceUrl2 = 'http://localhost:2222/healthcheck';

  const healthyResponseContents = {
    config: {
      url: 'healthyResponseUrl'
    },
    status: StatusCodes.OK,
    data: { healthy: 'good' }
  };
  const notFoundResponseContents = {
    config: {
      url: 'notFoundResponseUrl'
    },
    status: StatusCodes.NOT_FOUND,
    data: { healthy: 'bad' }
  };

  beforeEach(() => {
    axiosMock.create.mockImplementation(() => axiosMock);
  });

  afterEach(() => {
    axiosMock.create.mockClear();
    axiosMock.get.mockClear();
    axiosMock.mockClear();
  });

  const urls = [new URL(mockServiceUrl1), new URL(mockServiceUrl2)];

  it('sets axios timeout', async () => {
    expect(axiosConfig.timeout).toStrictEqual(2000);
  });
  it('sets axios to not throw an error when the response from a service is unhealty', async () => {
    expect(axiosConfig.validateStatus()).toBeTruthy();
  });

  it('sets axios to not throw errors upon failed requests', async () => {
    axiosMock.get.mockImplementation(async () => healthyResponseContents);

    await performServiceCalls(urls);

    expect(axiosMock.create).toHaveBeenCalledTimes(1);
    expect(axiosMock.create).toHaveBeenCalledWith(axiosConfig);
  });

  it('calls each url once', async () => {
    axiosMock.get.mockImplementation(async () => healthyResponseContents);

    await performServiceCalls(urls);

    expect(axiosMock.get.mock.calls.length).toBe(2);
  });
  it('calls the expected URL for the given url', async () => {
    axiosMock.get.mockImplementation(async () => healthyResponseContents);

    await performServiceCalls(urls);

    expect(axiosMock.get.mock.calls).toEqual(
      expect.objectContaining([[mockServiceUrl1], [mockServiceUrl2]])
    );
  });

  it('returns a list of responses', async () => {
    axiosMock.get
      .mockImplementationOnce(async () => healthyResponseContents)
      .mockImplementationOnce(async () => notFoundResponseContents);

    const responses = await performServiceCalls(urls);

    expect(responses).toStrictEqual([
      new ServiceResponse(healthyResponseContents),
      new ServiceResponse(notFoundResponseContents)
    ]);
  });
});
