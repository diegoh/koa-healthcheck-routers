module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  resetMocks: true,
  verbose: true,
  logHeapUsage: true,
  notify: true,
  testTimeout: 1000,
  coverageDirectory: 'misc/.coverage'
};
