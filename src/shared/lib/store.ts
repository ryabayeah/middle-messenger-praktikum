import { EventBus } from '.';
import { AppStore, Indexed } from '../model';
import { merge } from '../utils';

export enum StoreEvents {
  Updated = 'updated',
}

export const set = (
  object: Indexed | unknown,
  path: string,
  value: unknown,
): Indexed | unknown => {
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

export class Store extends EventBus {
  static __instance: Store;
  private __state: AppStore = {
    isLoading:{}
  };

  constructor() {
    super();
    if (Store.__instance) {
      return Store.__instance;
    }

    Store.__instance = this;

    this._registerEvents(this);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(StoreEvents.Updated, this._storeDidUpdate.bind(this));
  }
  protected _storeDidUpdate() {}
  getState() {
    return this.__state;
  }

  set(path: string, value: unknown) {
    set(this.__state, path, value);
    this.emit(StoreEvents.Updated);
  }

  reset() {
    this.__state = {} as AppStore;
  }
}

export const store = new Store();
