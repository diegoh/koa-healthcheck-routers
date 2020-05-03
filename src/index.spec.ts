import { URL } from 'url';
import * as KoaRouter from '@koa/router';
import { HealthCheckRouter, HeartBeatRouter } from './index';

describe('src/index', () => {
  it('exports a HealthCheckRouter that needs to be initialised', () => {
    const router = new HealthCheckRouter([new URL('http://localhost:8888')]);
    expect(router instanceof KoaRouter).toBeTruthy();
  });

  it('exports a HeartBeatRouter that needs to be initialised', () => {
    const router = new HeartBeatRouter();
    expect(router instanceof KoaRouter).toBeTruthy();
  });
});
