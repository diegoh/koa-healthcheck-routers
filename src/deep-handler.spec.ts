/* eslint-disable import/first */
// https://github.com/kulshekhar/ts-jest/issues/661
jest.mock('./check-health');

import { URL } from 'url';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { DefaultState, ParameterizedContext } from 'koa';
import { mocked } from 'ts-jest/utils';
import { checkHealth } from './check-health';
import { deepHandler } from './deep-handler';
import { Health } from './models/Health';

describe('src/deep-handler', () => {
  const next = jest.fn();
  let ctx: ParameterizedContext<DefaultState, any>;
  const checkHealthMock = mocked(checkHealth, true);

  beforeEach(() => {
    ctx = {
      response: {
        body: null,
      },
    };

    checkHealthMock.mockClear();
  });

  describe('when no urls are given', () => {
    it('sets a healthy response', async () => {
      await deepHandler(ctx, next);

      const expected = new Health();

      expect(ctx.body).toEqual(expected);
    });

    it('does not perform deep healthchecks', async () => {
      await deepHandler(ctx, next);

      expect(checkHealthMock.mock.calls).toHaveLength(0);
    });
  });

  describe('when urls are given', () => {
    beforeEach(() => {
      const httpHealthcheckServices = [
        new URL('http://localhost:1111'),
        new URL('http://localhost:1112'),
      ];

      ctx.state = { healthchecks: { http: httpHealthcheckServices } };
    });
    it('sets a healthy response', async () => {
      checkHealthMock.mockImplementation(async () => true);

      await deepHandler(ctx, next);

      const expected = new Health();

      expect(ctx.body).toEqual(expected);
    });

    it('sets an unhealthy response', async () => {
      checkHealthMock.mockImplementation(async () => false);

      await deepHandler(ctx, next);

      const expected = new Health();

      expect(ctx.body).toEqual(expected);
    });

    it('sets an unhealthy response code', async () => {
      checkHealthMock.mockImplementation(async () => false);

      await deepHandler(ctx, next);

      expect(ctx.status).toEqual(INTERNAL_SERVER_ERROR);
    });
  });
});
