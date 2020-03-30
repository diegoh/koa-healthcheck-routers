module.exports = {
  require: 'ts-node/register',
  color: true,
  extension: ['.ts'],
  watchFiles: ['src/**/*.ts', 'test/**/*.ts'],
  inlineDiffs: true,
  checkLeaks: true,
  slow: 75,
  timeout: 2000,
  forbidPending: true,
  checkLeaks: true,
  recursive: true
};
