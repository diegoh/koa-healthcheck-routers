import StatusCodes from 'http-status-codes';
import * as nock from 'nock';
import { nodeModuleNameRegex, semverRegex } from '../helpers';
import { server } from './server';

describe('GET /healthcheck', () => {
  it('returns a 200 upon success', async () => {
    nock('http://localhost:11111').get('/healthcheck').reply(200);
    nock('http://localhost:22222').get('/healthcheck').reply(200);
    nock('http://localhost:33333').get('/healthcheck').reply(200);

    return server
      .get('/healthcheck')
      .set('Accept', 'application/json')
      .expect(StatusCodes.OK);
  });

  it('returns a 500 upon error', async () => {
    nock('http://localhost:11111').get('/healthcheck').reply(200);
    nock('http://localhost:22222').get('/healthcheck').reply(200);
    nock('http://localhost:33333')
      .get('/healthcheck')
      .reply(500, 'Internal Server Error');

    await server
      .get('/healthcheck')
      .set('Accept', 'application/json')
      .expect(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('returns the expected response', async () => {
    nock('http://localhost:11111').get('/healthcheck').reply(200);
    nock('http://localhost:22222').get('/healthcheck').reply(200);
    nock('http://localhost:33333').get('/healthcheck').reply(200);

    const response = await server
      .get('/healthcheck')
      .set('Accept', 'application/json')
      .expect(StatusCodes.OK);

    expect(response.body).toMatchObject({
      name: expect.stringMatching(nodeModuleNameRegex),
      version: expect.stringMatching(semverRegex)
    });
  });
});
