import { environmentBase } from './environments.base';
import { prod } from './private-data';

export const environmentProd = {
  ...environmentBase,
  ...prod,
  logEnvironment: 'prod',
};
