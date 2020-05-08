import * as HttpStatusCodes from 'http-status-codes';
import { responseBodyMatchers } from '../helpers/response-body-matchers';
import { server } from './server';

describe('GET /heartbeat', () => {
  it('returns a 200 upon success', async () => {
    await server
      .get('/heartbeat')
      .set('Accept', 'application/json')
      .expect(HttpStatusCodes.OK);
  });

  it('returns the expected response', async () => {
    const response = await server
      .get('/heartbeat')
      .set('Accept', 'application/json')
      .expect(HttpStatusCodes.OK);

    expect(response.body).toMatchObject(responseBodyMatchers);
  });
});
