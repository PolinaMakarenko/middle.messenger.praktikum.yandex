import EventBus from "./EventBus"
import set from "../services/set"
import { UserDTO } from "../api/types"
import Block from "./Block";


// // export type Dispatch<State> = (
// //   nextStateOrAction: Partial<State> | Action<State>,
// //   payload?: any,
// // ) => void;

// // export type Action<State> = (
// //   dispatch: Dispatch<State>,
// //   state: State,
// //   payload: any,
// // ) => void;

// // export class Store<State extends Record<string, any>> extends EventBus {
// //   private state: State = {} as State;

// //   constructor(defaultState: State) {
// //     super();

// //     this.state = defaultState;
// //     this.set(defaultState);
// //   }

// //   public getState() {
// //     return this.state;
// //   }

// //   public set(nextState: Partial<State>) {
// //     const prevState = { ...this.state };

// //     this.state = { ...this.state, ...nextState };

// //     this.emit("changed", prevState, nextState);
// //   }

// //   dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: any) {
// //     if (typeof nextStateOrAction === "function") {
// //       nextStateOrAction(this.dispatch.bind(this), this.state, payload);
// //     } else {
// //       this.set({ ...this.state, ...nextStateOrAction });
// //     }
// //   }
// // }


// // import { Chat, MessageResponse, User } from '@/api/types';
// import  Block  from "./Block";
// import  set  from "../services/set";
// import { ChatDTO, UserDTO } from "../api/types";
// import isEqual from "../services/isEquat";

// export enum StoreEvents {
//   Updated = "Updated",
// }
export interface IMessage {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  }
}

export interface IChat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: UserDTO,
    time: string;
    content: string;
  }
}

// // interface UserFor  {
// //   data: UserDTO | null;
// //   hasError: boolean;
// //   isLoading: boolean;
// // }

// //  interface ChatInfo {
// //   id: number;
// //   title: string;
// //   avatar: string;
// //   unread_count: number;
// //   mine?: boolean;
// //   last_message?: {
// //     user: UserFor;
// //     time: string;
// //     content: string;
// //   };
// //   events?: Record<string, () => void>;
// // }

// // interface State {
// //   user: UserFor;
// //   chats?: ChatInfo[];
// //   messages?: Record<number, Message[]>;
// //   selectedChat?: number;
// // }

// type InitState = {
//   user: {
//     data?: UserDTO;
//     hasError?: boolean;
//     isLoading: boolean;
//   },
//   chats: {
//     users?: UserDTO[]
//     selectedId?: number
//     list: {
//       data: IChat[]
//       isLoading: boolean
//     }
//   },
//   messages: Array<IMessage[]>,
//   addChatModal: boolean,
//   // chats: {
//   //   data: Chat[];
//   //   hasError: boolean;
//   //   isLoading: boolean;
//   //   token?: string;
//   // },
//   // chat: {
//   //   data: Chat | null;
//   //   hasError: boolean;
//   //   isLoading: boolean;
//   // },
//   // messages: [],
// };

// const initialState: InitState = {
//   user: {
//     // data: null,
//     // hasError: false,
//     isLoading: false,
//   },
//   // chats: {
//   //   data: [],
//   //   hasError: false,
//   //   isLoading: true,
//   //   token: undefined,
//   // },
//   chats: {
//     list: {
//       data: [],
//       isLoading: false
//     }
//   },
//   messages: [],
//   // chat: {
//   //   data: null,
//   //   hasError: false,
//   //   isLoading: true,
//   // },
//   addChatModal: false
// };
type StoreTypes = {
  "updated": [ IState ],
}
export interface IState {
  chats: {
    users?: UserDTO[]
    // selectedId?: number
    list: {
      data: IChat[]
      isLoading: boolean
    }
  },
  user: {
    data?: UserDTO,
    error?: string,
    isLoading: boolean
  },
  messages: Array<IMessage[]>,
  addChatModal: boolean,
  addUserModal: boolean,
  createNewChat: {
    isLoading: boolean;
    eerror?: string
  },
  addChatUser: {
    isLoading: boolean;
    eerror?: string
  }
  selectedId?: number,


}

const initialState: IState = {
  user: {
    // data: null,
    // hasError: false,
    isLoading: false,
  },
  // chats: {
  //   data: [],
  //   hasError: false,
  //   isLoading: true,
  //   token: undefined,
  // },
  chats: {
    list: {
      data: [],
      isLoading: false
    }
  },
  messages: [],
  // chat: {
  //   data: null,
  //   hasError: false,
  //   isLoading: true,
  // },
  addChatModal: false,
  addUserModal: false,
  // selectedId: undefined,
  createNewChat: {
    isLoading: false,
  },
  addChatUser: {
    isLoading: false,
  }
};


 export class Store extends EventBus  {
  static EVENTS = {
    UPDATED: "updated"
  } as const

  private state = initialState as IState;

  public set(keypath: string, value: unknown) {
    set(this.state, keypath, value);

    this.emit(Store.EVENTS.UPDATED, this.state);
  }

  public getState(): IState {
    return this.state;
  }
}

export const store = new Store();

// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// // window.store = store;

export function withStore<SP>(mapStateToProps: (state: IState) => any) {
  return function wrap<P>(Component: typeof Block){
    let previousState: any

    return class WithStore extends Component {

      constructor(props: Omit<P, keyof SP>) {
        previousState = mapStateToProps(store.getState())

        super({ ...(props as P), ...previousState })

        store.on(Store.EVENTS.UPDATED, (newState) => {
          const stateProps = mapStateToProps(newState)

          this.setProps({ ...stateProps })
        })

      }

    }

  }
}

export default store

// export const withStore = (mapStateToProps: (state: State) => any) => {
//   return (Component: typeof Block) => {
//     return class WithStore extends Component {
//       constructor(props: any) {
//         const mappedState = mapStateToProps(store.getState());
//         console.log(mappedState)
//         super({ ...props, ...mappedState });

//         store.on(Store.EVENTS.UPDATED, (newState) => {
//           const newMappedState = mapStateToProps(newState);
//           this.setProps(newMappedState);
//         });
//       }
//     };
//   };
// };

// export default store
///// HoВОЕ

// export enum StoreEvents {
//   Updated = "updated"
// }

// export interface State {
//   user: User,
// }

// class Store extends EventBus {
//   private state: any = {}

//   public getState() {
//     return this.state
//   }

//   public set(path: string, value: any) {
//     set(this.state, path, value)
//     this.emit(StoreEvents.Updated)
//   }
// }

// export const store = new Store();

// export default new Store()
