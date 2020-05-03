import * as HttpStatusCodes from 'http-status-codes';
import * as nock from 'nock';
import { server } from './server';

describe('GET /healthcheck', () => {
  it('returns a 200 upon success', async () => {
    nock('http://localhost:11111')
      .get('/healthcheck')
      .reply(200, 'OK');
    nock('http://localhost:22222')
      .get('/healthcheck')
      .reply(200, 'OK');
    nock('http://localhost:33333')
      .get('/healthcheck')
      .reply(200, 'OK');

    return server
      .get('/healthcheck')
      .set('Accept', 'application/json')
      .expect(HttpStatusCodes.OK);
  });

  it('returns a 500 upon error', async () => {
    nock('http://localhost:11111')
      .get('/healthcheck')
      .reply(200, 'OK');
    nock('http://localhost:22222')
      .get('/healthcheck')
      .reply(200, 'OK');
    nock('http://localhost:33333')
      .get('/healthcheck')
      .reply(500, 'Internal Server Error');

    await server
      .get('/healthcheck')
      .set('Accept', 'application/json')
      .expect(HttpStatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('returns the expected health response', async () => {
    nock('http://localhost:11111')
      .get('/healthcheck')
      .reply(200, 'OK');
    nock('http://localhost:22222')
      .get('/healthcheck')
      .reply(200, 'OK');
    nock('http://localhost:33333')
      .get('/healthcheck')
      .reply(200, 'OK');

    const response = await server
      .get('/healthcheck')
      .set('Accept', 'application/json')
      .expect(HttpStatusCodes.OK);

    expect(Object.keys(response.body)).toEqual(['name', 'version']);
  });
});
