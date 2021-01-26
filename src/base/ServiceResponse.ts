import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

export class ServiceResponse {
  componentName: string;

  status: number;

  data: unknown;

  isHealthy: boolean;

  constructor(response: Partial<AxiosResponse>) {
    this.componentName = response.config?.url;
    this.data = response.data;
    this.status = response.status || StatusCodes.INTERNAL_SERVER_ERROR;
    this.isHealthy = this.status >= 200 && this.status < 300;
  }
}
