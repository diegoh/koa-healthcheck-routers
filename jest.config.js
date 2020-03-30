module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  resetMocks: true,
  logHeapUsage: true,
  testTimeout: 1000,
  coverageDirectory: 'misc/.coverage'
};
