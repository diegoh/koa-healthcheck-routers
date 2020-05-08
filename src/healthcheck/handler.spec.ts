/* eslint-disable import/first */
// https://github.com/kulshekhar/ts-jest/issues/661
jest.mock('./check-health');

import { URL } from 'url';
import { createMockContext } from '@shopify/jest-koa-mocks';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { DefaultContext, ParameterizedContext } from 'koa';
import { mocked } from 'ts-jest/utils';
import { Health } from '../Health';
import { checkHealth } from './check-health';
import { handler } from './handler';
import { HealthCheckState } from './HealthCheckState';

describe('src/deep-handler', () => {
  const next = jest.fn();

  let ctx: ParameterizedContext<HealthCheckState, DefaultContext>;

  const checkHealthMock = mocked(checkHealth, true);

  beforeEach(() => {
    ctx = createMockContext({
      state: new HealthCheckState([
        new URL('http://localhost:1111'),
        new URL('http://localhost:1112')
      ])
    }) as ParameterizedContext<HealthCheckState, DefaultContext>;

    checkHealthMock.mockClear();
  });

  it('sets a healthy response', async () => {
    checkHealthMock.mockImplementation(async () => true);

    await handler(ctx, next);

    const expected = new Health();

    expect(ctx.body).toEqual(expected);
  });

  it('calls next upon success', async () => {
    checkHealthMock.mockImplementation(async () => true);

    await handler(ctx, next);

    expect(next.mock.calls.length).toEqual(1);
  });

  it('sets an unhealthy response code', async () => {
    checkHealthMock.mockImplementation(async () => false);

    await handler(ctx, next);

    expect(ctx.status).toEqual(INTERNAL_SERVER_ERROR);
  });
});
