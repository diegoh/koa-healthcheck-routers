module.exports = {
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
};
