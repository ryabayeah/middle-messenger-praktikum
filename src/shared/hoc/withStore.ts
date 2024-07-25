import { Block } from '../lib';
import { AppStore, Indexed } from '../model';
import { store, StoreEvents } from '../store/store';
import { isEqual } from '../utils';

export const withStore = (mapStateToProps: (state: AppStore) => Indexed) => {
  return (Component: typeof Block) => {
    const oldState = mapStateToProps(store.getState());

    return class extends Component {
      constructor(props: AppStore | Indexed) {
        super({ ...props, ...mapStateToProps(store.getState()) });

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(oldState, newState)) {
            this.setProps({ ...mapStateToProps(store.getState()) });
          }
        });
      }
    };
  };
};
