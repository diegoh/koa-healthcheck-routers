export class HealthResponse {
  name: string;

  version: string;

  success: boolean;

  constructor(success: boolean) {
    const { env } = process;
    this.version = env.npm_package_version;
    this.name = env.npm_package_name;
    this.success = success;
  }
}
