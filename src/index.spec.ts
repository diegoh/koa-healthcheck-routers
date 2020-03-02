import * as assert from 'assert';
import * as Application from 'koa';
import { func, reset, when } from 'testdouble';
import { HealthResponse } from './health-response.class';
import { handler } from '.';

describe('src/index', () => {
  afterEach(() => {
    reset();
  });

  it.only('sets a success response', async () => {
    const ctx = {
      response: {
        body: null
      }
    } as Application.Context;

    const next = func('next()') as Application.Next;

    await handler(ctx, next);

    const expected = new HealthResponse(true);

    assert.deepStrictEqual(ctx.response.body, expected);
  });

  // it('sets an error response', async () => {
  //   const ctx = {
  //     body: null
  //   } as Application.Context;

  //   const next = func('next()') as Application.Next;

  //   const error = new Error('Bad!');
  //   when(next()).thenReject(error);

  //   await handler(ctx, next);

  //   const expected = new HealthResponse(false);

  //   assert.deepStrictEqual(ctx.body, expected);
  // });
});
