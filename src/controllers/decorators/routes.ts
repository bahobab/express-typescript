import 'reflect-metadata';
import { Methods } from './Method';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler } from 'express';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeBinder(method: string ): Function {
  return function (path: string): Function {
  return function (target: any, key: string, desc: RouteHandlerDescriptor): void {

    Reflect.defineMetadata(MetadataKeys.PATH, path, target,key);
    Reflect.defineMetadata(MetadataKeys.METHOD, method, target, key);
  }
}
}

export const get = routeBinder(Methods.GET);
export const post = routeBinder(Methods.POST);
export const put = routeBinder(Methods.PUT);
export const del = routeBinder(Methods.DELETE);
export const patch = routeBinder(Methods.PATCH);
