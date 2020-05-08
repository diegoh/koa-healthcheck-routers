import { nodeModuleNameRegex, semverRegex } from '.';

export const responseBodyMatchers = {
  name: expect.stringMatching(nodeModuleNameRegex),
  version: expect.stringMatching(semverRegex)
};
