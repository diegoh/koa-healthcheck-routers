const assert = require('assert');
const supertest = require('supertest');

describe('GET /health', () => {
  let server;

  before(() => {
    server = require('../../../src');
  });

  beforeEach(async () => {
    request = supertest(server);
  });

  after(() => {
    server.close();
  });

  it('returns a 200 upon success', async () => {
    await request
      .get('/health')
      .set('Accept', 'application/json')
      .expect(200);
  });

  it('returns the expected health response', async () => {
    const response = await request
      .get('/health')
      .set('Accept', 'application/json')
      .expect(200);

    assert.deepStrictEqual(response.body, {
      name: 'Users API',
      version: '1.0.0',
      success: true,
      port: 3000
    });
  });
});
