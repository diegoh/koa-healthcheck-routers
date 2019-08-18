const assert = require('assert');
const supertest = require('supertest');

describe('GET /health', () => {
  let server;
  let request;

  before(() => {
    server = require('../server');
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

    assert.deepStrictEqual(Object.keys(response.body), [
      'success',
      'name',
      'version'
    ]);
  });

  it('does not return undefined fields', async () => {
    const response = await request
      .get('/health')
      .set('Accept', 'application/json')
      .expect(200);

    const keys = Object.keys(response.body);

    keys.forEach(key => {
      const field = response.body[key];
      assert.notStrictEqual(typeof field, undefined);
      assert.notStrictEqual(typeof field, null);
      assert.notStrictEqual(typeof field, '');
      assert.notStrictEqual(typeof field, 0);
    });
  });
});
