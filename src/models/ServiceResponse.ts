export class ServiceResponse {
  isHealthy: boolean;

  status: number;

  data?: unknown;

  message?: string;

  constructor(response: Partial<ServiceResponse>, isHealthy: boolean) {
    Object.assign(this, response);
    this.isHealthy = isHealthy;

    if (!response.data && response.message) {
      this.data = response.message;
    }
    if (!response.status) {
      this.status = 500;
    }
  }
}
