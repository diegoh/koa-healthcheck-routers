import * as assert from 'assert';
import * as Application from 'koa';
import * as td from 'testdouble';
import { HealthResponse } from './health-response.class';
import { handler } from '.';

describe('src/index', () => {
  afterEach(() => {
    td.reset();
  });

  it('sets a healthy response', async () => {
    const ctx = {
      response: {
        body: null
      }
    } as Application.Context;

    const next = td.function('next()') as Application.Next;

    await handler(ctx, next);

    const expected = new HealthResponse(true);

    assert.deepStrictEqual(ctx.body, expected);
  });

  it('sets an unhealthy response', async () => {
    const ctx = {
      response: {
        body: null
      }
    } as Application.Context;

    const next = td.function('next()') as Application.Next;

    const error = new Error('Unhealthy API');
    td.when(next()).thenReject(error);

    await handler(ctx, next);

    const expected = new HealthResponse(false);

    assert.deepStrictEqual(ctx.body, expected);
  });

  it('sets a 500 response', async () => {
    const ctx = {
      response: {
        body: null
      }
    } as Application.Context;

    const next = td.function('next()') as Application.Next;

    const error = new Error('Unhealthy API');
    td.when(next()).thenReject(error);

    await handler(ctx, next);

    assert.deepStrictEqual(ctx.status, 500);
  });
});
