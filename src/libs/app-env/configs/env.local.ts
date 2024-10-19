// RUNTIME 에 노출됨

import type { RuntimeEnvironment } from './env.types';

export const localEnv: RuntimeEnvironment = {
  name: 'local',
  baseUrl: 'https://test-app.example.dev:3000',
};
