const assert = require('assert');
const logMessages = require('./log-messages');

describe('src/log-messages', () => {
  it('exports the expected logs', () => {
    assert.deepStrictEqual(logMessages, {
      health: {
        handler: {
          get: {
            called: {
              code: 'USERSAPI0001',
              message: 'Called health endpoint'
            },
            ok: {
              code: 'USERSAPI0002',
              message: 'Health OK'
            }
          }
        }
      }
    });
  });
});
