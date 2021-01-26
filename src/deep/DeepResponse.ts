import { BaseResponse } from '../base/BaseResponse';
import { ServiceResponse } from '../base/ServiceResponse';
import { ServiceStatus } from '../base/ServiceStatus';

function getHealthByCheckResults(checks: ServiceResponse[]): boolean {
  const hasChecks = !!checks.length;
  const everyServiceIsHealthy = checks.every(
    (service: ServiceResponse) => service && service.isHealthy === true
  );
  return hasChecks && everyServiceIsHealthy;
}

function getOutputForFailedChecks(checks: ServiceResponse[]): unknown[] | null {
  if (!checks || !checks.length) {
    return undefined;
  }
  const issues = checks.filter((check) => !check.isHealthy);

  if (!issues || !issues.length) {
    return undefined;
  }

  return issues.map((check) => ({
    componentName: check.componentName,
    data: check.data
  }));
}

export class DeepResponse extends BaseResponse {
  /**
   * an object that provides detailed health statuses of additional downstream systems and endpoints which can affect the overall health of this API
   */
  checks: ServiceResponse[];

  constructor(checks: ServiceResponse[]) {
    const isHealthy = getHealthByCheckResults(checks);
    const output = getOutputForFailedChecks(checks);
    const status = isHealthy ? ServiceStatus.pass : ServiceStatus.fail;

    super({
      isHealthy,
      status,
      output
    });

    this.checks = checks;
  }
}
