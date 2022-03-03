import { environmentDev } from './environments.dev';

export const environmentLocal = {
  ...environmentDev,
  logEnvironment: 'localhost'
};
