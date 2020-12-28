import {Router} from 'express';

export class AppRouter {
  private static instance: Router;

  static getIstance() {
    if (!this.instance) {
      this.instance = Router();
    }
    return this.instance;
  }
}