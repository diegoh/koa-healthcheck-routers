import StatusCodes from 'http-status-codes';
import * as nock from 'nock';
import { ServiceResponse } from '../../src/base/ServiceResponse';
import { DeepResponse } from '../../src/deep/DeepResponse';
import { server } from './server';

describe('GET /healthcheck', () => {
  const healthcheckEndpoint = '/healthcheck';

  const genServiceResponse = (
    url: string,
    status: number = StatusCodes.OK
  ): ServiceResponse => {
    const data = { example: StatusCodes.getStatusText(status) };
    nock(url, { allowUnmocked: false })
      .get(healthcheckEndpoint)
      .reply(status, data);

    return new ServiceResponse({
      config: { url: url + healthcheckEndpoint },
      data,
      status
    });
  };

  const urls = ['http://localhost:11111', 'http://localhost:22222'];

  afterEach(nock.cleanAll);
  afterAll(nock.restore);

  it('the service responds with status 200 and the expected body', async () => {
    const responses = new DeepResponse(
      urls.map((url) => genServiceResponse(url))
    );

    return server
      .get(healthcheckEndpoint)
      .expect(StatusCodes.OK, JSON.parse(JSON.stringify(responses)));
  });

  it('the service responds with status 500 and the expected body', async () => {
    const responses = new DeepResponse([
      genServiceResponse(urls[0]),
      genServiceResponse(urls[1], StatusCodes.NOT_FOUND)
    ]);

    return server
      .get(healthcheckEndpoint)
      .expect(
        StatusCodes.INTERNAL_SERVER_ERROR,
        JSON.parse(JSON.stringify(responses))
      );
  });
});
