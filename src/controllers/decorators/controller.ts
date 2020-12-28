import 'reflect-metadata';

import {AppRouter} from '../../AppRouter'
import { Methods } from './Method';
import { MetadataKeys } from './MetadataKeys';

export function controller(routePrefix: string): Function {
  const router = AppRouter.getIstance();
  return function(target: Function) {
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      Reflect.defineMetadata(MetadataKeys.PATH, routePrefix, target, key);

      const path = Reflect.getMetadata(MetadataKeys.PATH, target.prototype, key);
      const method: Methods = Reflect.getMetadata(MetadataKeys.METHOD, target.prototype, key);

      if (path) {
        router[method](`${routePrefix}${path}`, routeHandler);
      }

    }
  }
}