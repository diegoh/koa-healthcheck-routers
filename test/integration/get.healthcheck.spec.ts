import StatusCodes from 'http-status-codes';
import * as nock from 'nock';
import { ServiceResponse } from '../../src/base/ServiceResponse';
import { DeepResponse } from '../../src/deep/DeepResponse';
import { server } from './server';

describe('GET /healthcheck', () => {
  const healthcheckPath = '/healthcheck';
  const serviceResponseBody = { example: 'sometimes' };

  const nockReplyWithSuccess = (...urls: string[]): void =>
    urls.forEach((url) => {
      nock(url).get(healthcheckPath).reply(StatusCodes.OK, serviceResponseBody);
    });

  const nockReplyWithNotFound = (...urls: string[]): void =>
    urls.forEach((url) => {
      nock(url)
        .get(healthcheckPath)
        .reply(StatusCodes.NOT_FOUND, serviceResponseBody);
    });

  afterEach(nock.cleanAll);
  afterAll(nock.restore);

  describe('when all services are healthy', () => {
    beforeEach(() => {
      nockReplyWithSuccess(
        'http://localhost:11111',
        'http://localhost:22222',
        'http://localhost:33333'
      );
    });

    it('responds with a 200 status code', async () => {
      await server.get(healthcheckPath).expect(StatusCodes.OK);
    });

    it('responds with the expected body', async () => {
      const { body } = await server.get(healthcheckPath);

      const expected = new DeepResponse([
        new ServiceResponse({
          status: StatusCodes.OK,
          data: serviceResponseBody,
          config: { url: 'http://localhost:11111/healthcheck' }
        }),
        new ServiceResponse({
          status: StatusCodes.OK,
          data: serviceResponseBody,
          config: { url: 'http://localhost:22222/healthcheck' }
        }),
        new ServiceResponse({
          status: StatusCodes.OK,
          data: serviceResponseBody,
          config: { url: 'http://localhost:33333/healthcheck' }
        })
      ]);

      expect(body).toEqual(expected);
    });
  });

  describe('when some services are unhealthy', () => {
    beforeEach(() => {
      nockReplyWithSuccess('http://localhost:11111', 'http://localhost:22222');
      nockReplyWithNotFound('http://localhost:33333');
    });

    it('responds with a 500 status code', async () => {
      await server
        .get(healthcheckPath)
        .expect(StatusCodes.INTERNAL_SERVER_ERROR);
    });

    it('responds with the expected body when a service is unhealthy', async () => {
      const { body } = await server.get(healthcheckPath);

      const expected = new DeepResponse([
        new ServiceResponse({
          status: StatusCodes.OK,
          data: serviceResponseBody,
          config: { url: 'http://localhost:11111/healthcheck' }
        }),
        new ServiceResponse({
          status: StatusCodes.OK,
          data: serviceResponseBody,
          config: { url: 'http://localhost:22222/healthcheck' }
        }),
        new ServiceResponse({
          status: StatusCodes.NOT_FOUND,
          data: serviceResponseBody,
          config: { url: 'http://localhost:33333/healthcheck' }
        })
      ]);

      expect(body).toEqual(expected);
    });
  });
});
