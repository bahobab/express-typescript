import 'reflect-metadata';
import {Request, Response, NextFunction, RequestHandler} from 'express'

import {AppRouter} from '../../AppRouter'
import { Methods } from './Method';
import { MetadataKeys } from './MetadataKeys';

function bodyValidators(keys: string): RequestHandler {
  return function(req: Request, res: Response, next: NextFunction): void {
    if (!req.body) {
      res.status(422).send('Invalid Request!');
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send('Invalid Request!');
        return;
      }
    }

    next();
  }
}

export function controller(routePrefix: string): Function {
  return function(target: Function) {
    const router = AppRouter.getIstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(MetadataKeys.PATH, target.prototype, key);
      const method: Methods = Reflect.getMetadata(MetadataKeys.METHOD, target.prototype, key);
      const middlewares = Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target.prototype, key) || [];

      const requiredBodyProps = Reflect.getMetadata(MetadataKeys.VALIDATOR, target.prototype, key) || [];
      const validators = bodyValidators(requiredBodyProps);

      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, validators, routeHandler);
      }
    }
  }
}