import { releaseChannel } from 'expo-updates';

import { environmentDev } from './environments.dev';
import { environmentLocal } from './environments.local';
import { environmentProd } from './environments.prod';

/**
 * Returns the environment configuration based on the current release channel.
 * @param env
 */
function getEnvironment(env = ''): typeof environmentProd {
  if (!env || env === 'default') return environmentLocal; // localhost
  if (env.includes('dev')) return environmentDev;
  return environmentProd;
}

export const env = getEnvironment(releaseChannel);

export default env;
