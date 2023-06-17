// import EventBus from "./EventBus";

import EventBus from "./EventBus";

// export type Dispatch<State> = (
//   nextStateOrAction: Partial<State> | Action<State>,
//   payload?: any,
// ) => void;

// export type Action<State> = (
//   dispatch: Dispatch<State>,
//   state: State,
//   payload: any,
// ) => void;

// export class Store<State extends Record<string, any>> extends EventBus {
//   private state: State = {} as State;

//   constructor(defaultState: State) {
//     super();

//     this.state = defaultState;
//     this.set(defaultState);
//   }

//   public getState() {
//     return this.state;
//   }

//   public set(nextState: Partial<State>) {
//     const prevState = { ...this.state };

//     this.state = { ...this.state, ...nextState };

//     this.emit("changed", prevState, nextState);
//   }

//   dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: any) {
//     if (typeof nextStateOrAction === "function") {
//       nextStateOrAction(this.dispatch.bind(this), this.state, payload);
//     } else {
//       this.set({ ...this.state, ...nextStateOrAction });
//     }
//   }
// }


// import { Chat, MessageResponse, User } from '@/api/types';
import  Block  from "./Block";
import  set  from "../services/set";
import { Chat, UserDTO } from "../api/types";
import isEqual from "../services/isEquat";

export enum StoreEvents {
  Updated = "Updated",
}

type State = {
  user: {
    data: UserDTO | null;
    hasError: boolean;
    isLoading: boolean;
  },
  chats: {
    data: Chat[];
    hasError: boolean;
    isLoading: boolean;
    token?: string;
  },
  chat: {
    data: Chat | null;
    hasError: boolean;
    isLoading: boolean;
  },
};

const initialState: State = {
  user: {
    data: null,
    hasError: false,
    isLoading: true,
  },
  chats: {
    data: [],
    hasError: false,
    isLoading: true,
    token: undefined,
  },
  chat: {
    data: null,
    hasError: false,
    isLoading: true,
  },
};

class Store extends EventBus {
  private state = initialState;

  public set(keypath: string, value: unknown) {
    set(this.state, keypath, value);

    this.emit(StoreEvents.Updated, this.state);
  }

  public getState() {
    return this.state;
  }
}

export const store = new Store();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.store = store;

// export const withStore = (mapStateToProps: (state: State) => any) => {
//   return (Component: typeof Block) => {
//     return class WithStore extends Component {
//       constructor(props: any) {
//         const mappedState = mapStateToProps(store.getState());
//         // console.log("hf")
//         super({ ...props, ...mappedState });

//         store.on(StoreEvents.Updated, (newState) => {
//           const newMappedState = mapStateToProps(newState);
//           this.setProps(newMappedState);
//         });
//       }
//     };
//   };
// };

// export function withStore<SP>(mapStateToProps: (state: State) => any) {
//   return function wrap<P>(Component: typeof Block){
//     let previousState: any

//     return class WithStore extends Component {

//       constructor(props: Omit<P, keyof SP>) {
//         previousState = mapStateToProps(store.getState())

//         super({ ...(props as P), ...previousState })

//         store.on(StoreEvents.Updated, (newState) => {
//           const stateProps = mapStateToProps(newState)
//           // console.log({...stateProps})
//           this.setProps(stateProps);


//           // this.setProps({ ...stateProps })
//         })

//       }

//     }

//   }
// }


// export function withStore(mapStateToProps: (state: State) => any) {
//   return function wrapper(Component: unknown) {
//     return class extends (Component as typeof Block) {
//       constructor(props: Record<string, any>) {
//         let state = mapStateToProps(store.getState() as State);

//         super({ ...props, ...state });

//         store.on(StoreEvents.Updated, () => {
//           const newState = mapStateToProps(store.getState() as State);

//           if (!isEqual(state, newState)) {
//             this.setProps({ ...newState });
//           }

//           state = newState;
//         });
//       }
//     };
//   };
// }

export const withStore = (mapStateToProps: (state: State) => any) => {
  return (Component: typeof Block) => {
    return class WithStore extends Component {
      constructor(props: any) {
        const mappedState = mapStateToProps(store.getState());
        console.log(mappedState)
        super({ ...props, ...mappedState });

        store.on(StoreEvents.Updated, (newState) => {
          const newMappedState = mapStateToProps(newState);
          this.setProps(newMappedState);
        });
      }
    };
  };
};
