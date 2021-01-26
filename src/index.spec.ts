import { URL } from 'url';
import * as KoaRouter from '@koa/router';
import { DeepRouter, ShallowRouter } from './index';

describe('src/index', () => {
  it('exports a DeepRouter that needs to be initialised', () => {
    const router = new DeepRouter([new URL('http://localhost:8888')]);
    expect(router instanceof KoaRouter).toBeTruthy();
  });

  it('exports a ShallowRouter that needs to be initialised', () => {
    const router = new ShallowRouter();
    expect(router instanceof KoaRouter).toBeTruthy();
  });
});
