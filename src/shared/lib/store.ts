import { Indexed } from "../model";
import { EventBus } from "./event-bus";

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

  // const result = path.split('.').reduceRight<Indexed>(
  //   (acc, key) => ({
  //     [key]: acc,
  //   }),
  //   value as any,
  // );
  // return merge(object as Indexed, result);
};

class Store extends EventBus {
  private state: Indexed = {};

  public getState(): Indexed {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();

// function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
//     // используем class expression
//   return class extends Component {
//     constructor(props) {
//       super({...props, ...mapStateToProps(store.getState())});

//       // подписываемся на событие
//         store.on(StoreEvents.Updated, () => {
//           // вызываем обновление компонента, передав данные из хранилища
//           this.setProps({...mapStateToProps(store.getState())});
//             });
//     }
//   } 
// }

// function connect(mapStateToProps: (state: Indexed) => Indexed) {
//     return function(Component: typeof Block) {
//       return class extends Component {
//         constructor(props) {
//                   // сохраняем начальное состояние
//                   let state = mapStateToProps(store.getState());
  
//             super({...props, ...state});
  
//             // подписываемся на событие
//               store.on(StoreEvents.Updated, () => {
//                       // при обновлении получаем новое состояние
//                       const newState = mapStateToProps(store.getState());
                
//                       // если что-то из используемых данных поменялось, обновляем компонент
//                       if (!isEqual(state, newState)) {
//                     this.setProps({...newState});
//                       }
  
//                       // не забываем сохранить новое состояние
//                       state = newState;
//                   });
//           }
//       }
//       }
//   }
  

// function mapUserToProps(state) {
//   return {
//     name: state.user.name,
//     avatar: state.user.avatar,
//   };
// }

// connect(UserProfile, mapUserToProps);