import { ServiceResponse } from './ServiceResponse';

export class ServiceErrorResponse extends ServiceResponse {
  constructor(response: Partial<ServiceResponse>) {
    super(response, false);
  }
}
