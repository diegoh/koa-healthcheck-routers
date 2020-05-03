/* eslint-disable import/first */
jest.mock('axios');

import { URL } from 'url';
import axios from 'axios';
import { mocked } from 'ts-jest/utils';
import { checkHealth } from './check-health';

describe('src/check-health', () => {
  const axiosMock = mocked(axios, true);

  beforeEach(() => {
    axiosMock.mockClear();
  });

  describe('when performing all checks', () => {
    const mockServiceUrl1 = 'http://localhost:1111/healthcheck';
    const mockServiceUrl2 = 'http://localhost:2222/healthcheck';

    const urls = [new URL(mockServiceUrl1), new URL(mockServiceUrl2)];

    it('calls each url once', async () => {
      axiosMock.get.mockImplementation(async () => ({ status: 200 }));

      await checkHealth(urls);

      expect(axiosMock.get.mock.calls.length).toBe(2);
    });
    it('calls the expected URL for the given url', async () => {
      axiosMock.get.mockImplementation(async () => ({ status: 200 }));

      await checkHealth(urls);

      expect(axiosMock.get.mock.calls).toEqual([
        [mockServiceUrl1],
        [mockServiceUrl2],
      ]);
    });
    it('sets the success status to true when all urls are ok', async () => {
      axiosMock.get.mockImplementation(async () => ({ status: 200 }));

      const health = await checkHealth(urls);
      expect(health).toBe(true);
    });

    it('sets the success status to false when at least one of the urls is not ok', async () => {
      axiosMock.get
        .mockImplementation(async () => ({ status: 200 }))
        .mockImplementation(async () => ({ status: 500 }));

      const health = await checkHealth(urls);

      expect(health).toBe(false);
    });

    it('does not throw when the response from the service is not 200', async () => {
      axiosMock.get
        .mockImplementation(async () => ({ status: 200 }))
        .mockImplementation(async () => ({ status: 403 }));

      const health = await checkHealth(urls);

      expect(health).toBe(false);
    });
  });
});
