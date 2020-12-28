import 'reflect-metadata';
import {AppRouter} from '../../AppRouter'

export function controller(routePrefix: string): Function {
  const router = AppRouter.getIstance();
  return function(target: Function) {
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      Reflect.defineMetadata('path', routePrefix, target, key);

      const path = Reflect.getMetadata('path', target.prototype, key);

      if (path) {
        router.get(`${routePrefix}${path}`, routeHandler);
      }

    }
  }
}