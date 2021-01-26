import { ServiceStatus } from './ServiceStatus';

/*
 * Based on RFC8259:
 * Proposes a service health check response format for HTTP APIs
 */
export class BaseResponse {
  /**
   * is a unique identifier of the service, in the application scope
   */
  serviceId: string;

  /**
   * public version of the service
   */
  version: string;

  /**
   * human-friendly description of the service
   */
  description: string;

  isHealthy = true;

  /**
   * Indicates whether the service status is acceptable or not. API publishers SHOULD use following values for the field.
   */
  status: ServiceStatus;

  /**
   * raw error output, in case of “fail” or “warn” states. This field SHOULD be omitted for “pass” state
   */
  output?: unknown[];

  constructor(response?: Partial<BaseResponse>) {
    const serviceId = process.env.npm_package_name;
    const version = process.env.npm_package_version;
    const description = process.env.npm_package_description;

    if (response) {
      Object.assign(this, { ...response, serviceId, version, description });
    } else {
      Object.assign(this, { serviceId, version, description });
    }
  }
}
