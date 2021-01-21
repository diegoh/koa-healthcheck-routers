import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  logHeapUsage: true,
  testTimeout: 1000,
  coverageDirectory: 'misc/.coverage',
  moduleFileExtensions: ['ts', 'js'],
  timers: 'real'
};

export default config;
