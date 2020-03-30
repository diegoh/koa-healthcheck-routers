import * as HttpStatusCodes from 'http-status-codes';
import { server } from './server';

describe('GET /health', () => {
  it('returns a 200 upon success', async () => {
    await server
      .get('/health')
      .set('Accept', 'application/json')
      .expect(HttpStatusCodes.OK);
  });

  it('returns the expected health response', async () => {
    const response = await server
      .get('/health')
      .set('Accept', 'application/json')
      .expect(HttpStatusCodes.OK);

    expect(Object.keys(response.body)).toEqual(['version', 'name', 'success']);
  });
});