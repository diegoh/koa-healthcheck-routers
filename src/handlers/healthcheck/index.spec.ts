/* eslint-disable import/first */
// https://github.com/kulshekhar/ts-jest/issues/661
jest.mock('./performServiceCalls');

import { URL } from 'url';
import { createMockContext } from '@shopify/jest-koa-mocks';
import StatusCodes from 'http-status-codes';
import { DefaultContext, ParameterizedContext } from 'koa';
import { mocked } from 'ts-jest/utils';
import { Health } from '../../models/Health';
import { HealthCheckState } from '../../models/HealthCheckState';
import { ServiceErrorResponse } from '../../models/ServiceErrorResponse';
import { ServiceOkResponse } from '../../models/ServiceOkResponse';
import { performServiceCalls } from './performServiceCalls';
import { handler } from '.';

describe('handlers/healthcheck', () => {
  const next = jest.fn();
  const performServiceCallsMock = mocked(performServiceCalls, true);
  let ctx: ParameterizedContext<HealthCheckState, DefaultContext>;

  const healthyResponse = new Health([
    new ServiceOkResponse({
      status: StatusCodes.OK,
      data: { healthy: 'good' }
    })
  ]);

  const errorResponse = new Health([
    new ServiceErrorResponse({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      data: { error: 'bad' }
    })
  ]);

  beforeEach(() => {
    ctx = createMockContext({
      state: new HealthCheckState([
        new URL('http://localhost:1111'),
        new URL('http://localhost:1112')
      ])
    }) as ParameterizedContext<HealthCheckState, DefaultContext>;

    performServiceCallsMock.mockClear();
  });

  it('sets a healthy response', async () => {
    performServiceCallsMock.mockImplementation(async () => healthyResponse);

    await handler(ctx, next);

    const expected = new Health();

    expect(ctx.body).toEqual(expected);
  });

  it('calls next upon success', async () => {
    performServiceCallsMock.mockImplementation(async () => healthyResponse);

    await handler(ctx, next);

    expect(next.mock.calls.length).toEqual(2);
  });

  it('sets an unhealthy response code', async () => {
    performServiceCallsMock.mockImplementation(async () => errorResponse);

    await handler(ctx, next);

    expect(ctx.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
