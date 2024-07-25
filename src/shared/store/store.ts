import { authController } from '../../entities/user/controller';
import { EventBus } from '../lib';
import { AppStore, Indexed } from '../model';
import { merge } from '../utils';

export interface State {
  currentUserId?: number;
}

export enum StoreEvents {
  Updated = 'updated',
}

export const set = function (
  object: Indexed | unknown,
  path: string,
  value: unknown,
): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as never,
  );
  return merge(object as Indexed, result);
};

class Store extends EventBus {
  static _instance: Store;
  private __state: AppStore = {

  };

  async init() {
    await authController.getUser();
  }

  getState() {
    return this.__state;
  }

  set(path: string, value: unknown) {
    set(this.__state, path, value);

    // метод EventBus
    this.emit(StoreEvents.Updated);
  }

  reset() {
    this.__state = {} as AppStore;
  }

}


export const store = new Store();
