// RUNTIME 에 노출됨

import type { RuntimeEnvironment } from './env.types';

export const stagingEnv: RuntimeEnvironment = {
  name: 'staging',
  baseUrl: 'https://staging-app.example.dev',
};
