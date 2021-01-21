import { ServiceResponse } from './ServiceResponse';

export class ServiceOkResponse extends ServiceResponse {
  constructor(response: Partial<ServiceResponse>) {
    super(response, true);
  }
}
