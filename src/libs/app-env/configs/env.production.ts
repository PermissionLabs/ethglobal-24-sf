// RUNTIME 에 노출됨

import type { RuntimeEnvironment } from './env.types';

export const prodEnv: RuntimeEnvironment = {
  name: 'production',
  baseUrl: 'https://app.example.dev',
};
