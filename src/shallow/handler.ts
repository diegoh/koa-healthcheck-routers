import { DefaultContext, DefaultState, Next, ParameterizedContext } from 'koa';
import { BaseResponse } from '../base/BaseResponse';

export async function shallowHealthHandler(
  ctx: ParameterizedContext<DefaultState, DefaultContext>,
  next: Next
): Promise<void> {
  ctx.body = new BaseResponse();
  await next();
}
