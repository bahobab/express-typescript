import 'reflect-metadata';
import {Router} from 'express';

export const router = Router();

export function controller(routePrefix: string): Function {
  
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