/* eslint-disable import/first */
jest.mock('axios');

import { URL } from 'url';
import axios from 'axios';
import StatusCodes from 'http-status-codes';
import { mocked } from 'ts-jest/utils';
import { Health } from '../../models/Health';
import { ServiceErrorResponse } from '../../models/ServiceErrorResponse';
import { ServiceOkResponse } from '../../models/ServiceOkResponse';
import { performServiceCalls } from './performServiceCalls';

describe('performServiceCalls', () => {
  const axiosMock = mocked(axios, true);

  const healthyResponseContents = {
    status: StatusCodes.OK,
    data: { healthy: 'good' }
  };
  const notFoundResponseContents = {
    status: StatusCodes.NOT_FOUND,
    data: { healthy: 'bad' }
  };

  beforeEach(() => {
    axiosMock.mockClear();
  });

  describe('when performing all checks', () => {
    const mockServiceUrl1 = 'http://localhost:1111/healthcheck';
    const mockServiceUrl2 = 'http://localhost:2222/healthcheck';

    const urls = [new URL(mockServiceUrl1), new URL(mockServiceUrl2)];

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
    it('sets the success status to true when all calls are ok', async () => {
      axiosMock.get.mockImplementation(async () => healthyResponseContents);

      const health = await performServiceCalls(urls);

      const healthy = new Health([
        new ServiceOkResponse(healthyResponseContents),
        new ServiceOkResponse(healthyResponseContents)
      ]);

      expect(health).toEqual(expect.objectContaining(healthy));
    });

    it('does not throw when the response from any service is not 200', async () => {
      axiosMock.get
        .mockImplementationOnce(async () => healthyResponseContents)
        .mockImplementationOnce(async () => {
          throw notFoundResponseContents;
        });

      const unhealthy = new Health([
        new ServiceOkResponse(healthyResponseContents),
        new ServiceErrorResponse(notFoundResponseContents)
      ]);

      const health = await performServiceCalls(urls);
      expect(health).toStrictEqual(expect.objectContaining(unhealthy));
    });

    it('catches and handles outgoing request errors', async () => {
      const err = new Error('bad!!');
      axiosMock.get.mockImplementation(async () => {
        throw err;
      });

      const expected = new Health([
        new ServiceErrorResponse(err),
        new ServiceErrorResponse(err)
      ]);

      const health = await performServiceCalls(urls);
      expect(health).toStrictEqual(expect.objectContaining(expected));
    });
  });
});
