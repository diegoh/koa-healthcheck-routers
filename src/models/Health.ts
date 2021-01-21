import { ServiceResponse } from './ServiceResponse';

export class Health {
  readonly name: string;

  readonly version: string;

  responses?: ServiceResponse[];

  get isOk(): boolean {
    if (!this.responses) {
      return true;
    }
    if (!this.responses.length) {
      return false;
    }

    return this.responses.every((response) => response && response.isHealthy);
  }

  constructor(responses?: ServiceResponse[]) {
    this.name = process.env.npm_package_name;
    this.version = process.env.npm_package_version;
    this.responses = responses;
  }
}
