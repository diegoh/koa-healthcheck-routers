const { env } = process;
const path = require('path');

module.exports = {
  name: 'Users API',
  server: {
    port: env.PORT || 3000
  },

  logs: {
    path: path.resolve('.', 'misc'),
    consoleLevel: 'error'
  }
};
