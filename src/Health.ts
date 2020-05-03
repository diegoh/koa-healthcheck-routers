export class Health {
  name: string;

  version: string;

  constructor() {
    const { env } = process;
    this.name = env.npm_package_name;
    this.version = env.npm_package_version;
  }
}
