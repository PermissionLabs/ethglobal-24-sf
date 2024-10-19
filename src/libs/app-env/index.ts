import { devEnv as development } from './configs/env.development';
import { localEnv as local } from './configs/env.local';
import { prodEnv as production } from './configs/env.production';
import { stagingEnv as staging } from './configs/env.staging';
import type { RuntimeEnvironment } from './configs/env.types';

const environments = {
  local,
  development,
  staging,
  production,
};

const env: RuntimeEnvironment = environments[process.env.NEXT_PUBLIC_APP_ENV];

export default env;
