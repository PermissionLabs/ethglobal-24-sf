// RUNTIME 에 노출됨

import type { RuntimeEnvironment } from './env.types';

export const devEnv: RuntimeEnvironment = {
  name: 'development',
  baseUrl: 'https://dev-app.example.dev',
};
