import { environmentBase } from './environments.base';
import { dev } from './private-data';

export const environmentDev = {
  ...environmentBase,
  ...dev,
  logEnvironment: 'develop',
};
