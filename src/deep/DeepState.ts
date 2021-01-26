import { URL } from 'url';

export class DeepState {
  httpHealthcheckUrls: URL[];

  constructor(urls: URL[]) {
    this.httpHealthcheckUrls = urls;
  }
}
