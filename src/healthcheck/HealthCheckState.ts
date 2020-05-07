import { URL } from 'url';

export class HealthCheckState {
  httpHealthcheckUrls: URL[];

  constructor(urls: URL[]) {
    this.httpHealthcheckUrls = urls;
  }
}
