/* eslint-disable import/first */
// https://github.com/kulshekhar/ts-jest/issues/661
jest.mock('./performServiceCalls');

import { URL } from 'url';
import { createMockContext } from '@shopify/jest-koa-mocks';
import StatusCodes from 'http-status-codes';
import { DefaultContext, ParameterizedContext } from 'koa';
import { mocked } from 'ts-jest/utils';
import { ServiceResponse } from '../base/ServiceResponse';
import { DeepResponse } from './DeepResponse';
import { DeepState } from './DeepState';
import { deepHandler } from './handler';
import { performServiceCalls } from './performServiceCalls';

describe('handlers/healthcheck', () => {
  const next = jest.fn();
  const performServiceCallsMock = mocked(performServiceCalls, true);
  let ctx: ParameterizedContext<DeepState, DefaultContext>;

  const healthyResponse = [
    new ServiceResponse({
      config: {
        url: 'http://localhost:1111'
      },
      status: StatusCodes.OK,
      data: { healthy: 'good' }
    }),
    new ServiceResponse({
      config: {
        url: 'http://localhost:1112'
      },
      status: StatusCodes.OK,
      data: { healthy: 'good' }
    })
  ];

  const errorResponse = [
    new ServiceResponse({
      config: {
        url: 'http://localhost:1111'
      },
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      data: { error: 'bad' }
    })
  ];

  beforeEach(() => {
    ctx = createMockContext({
      state: new DeepState([
        new URL('http://localhost:1111'),
        new URL('http://localhost:1112')
      ])
    }) as ParameterizedContext<DeepState, DefaultContext>;

    next.mockClear();
    performServiceCallsMock.mockClear();
  });

  it('sets a healthy response', async () => {
    performServiceCallsMock.mockImplementation(async () => healthyResponse);

    await deepHandler(ctx, next);

    const expected = new DeepResponse(healthyResponse);

    expect(JSON.parse(JSON.stringify(ctx.body))).toEqual(
      JSON.parse(JSON.stringify(expected))
    );
  });

  it('calls next upon success', async () => {
    performServiceCallsMock.mockImplementation(async () => healthyResponse);

    await deepHandler(ctx, next);

    expect(next.mock.calls.length).toEqual(1);
  });

  it('sets an unhealthy response code', async () => {
    performServiceCallsMock.mockImplementation(async () => errorResponse);

    await deepHandler(ctx, next);

    expect(ctx.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
