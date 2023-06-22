import EventBus from "./EventBus"
import set from "../services/set"
import { UserDTO } from "../api/types"
import Block from "./Block";


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
  deleteUserModal: boolean,
  createNewChat: {
    isLoading: boolean;
    eerror?: string
  },
  modals: {
    deleteUser: {
      show: boolean;
      isLoading: boolean;
      selectedUserId?: number;
      error?: string;
    },
  }
  addChatUser: {
    isLoading: boolean;
    eerror?: string
  }
  selectedId?: number,


}

const initialState: IState = {
  user: {
    isLoading: false,
  },
  chats: {
    list: {
      data: [],
      isLoading: false
    }
  },
  messages: [],
  addChatModal: false,
  addUserModal: false,
  deleteUserModal: false,
  createNewChat: {
    isLoading: false,
  },
  addChatUser: {
    isLoading: false,
  },
  modals: {
    deleteUser: {
      show: false,
      isLoading: false
    }
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


