import StatusCodes from 'http-status-codes';
import { BaseResponse } from '../../src/base/BaseResponse';
import { server } from './server';

const heartbeatPath = '/heartbeat';
describe('GET /heartbeat', () => {
  it('returns a 200 upon success', async () => {
    await server.get(heartbeatPath).expect(StatusCodes.OK);
  });

  it('returns the expected response', async () => {
    const { body } = await server.get(heartbeatPath);

    expect(body).toEqual(new BaseResponse());
  });
});
