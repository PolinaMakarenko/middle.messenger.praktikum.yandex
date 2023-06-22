import EventBus from "./EventBus"
import set from "../services/set"
import { ChatDTO, MessageChat, UserDTO } from "../api/types"
import Block from "./Block";


export type StateType = {
  chats: {
    users?: UserDTO[]
    list: {
      data: ChatDTO[]
      isLoading: boolean
    }
  },
  user: {
    data?: UserDTO,
    error?: string,
    isLoading: boolean
  },
  messages: Array<MessageChat[]>,
  addChatModal: boolean,
  addUserModal: boolean,
  deleteUserModal: boolean,
  createNewChat: {
    isLoading: boolean;
    eerror?: string
  },
  deleteUser: {      
    isLoading: boolean;
    error?: string;
  },
  addChatUser: {
    isLoading: boolean;
    eerror?: string
  }
  selectedId?: number,
}

const initialState: StateType = {
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
  deleteUser: {
    isLoading: false
  }
};


 export class Store extends EventBus  {
  static EVENTS = {
    UPDATED: "updated"
  } as const

  private state = initialState as StateType;

  public set(keypath: string, value: unknown) {
    set(this.state, keypath, value);

    this.emit(Store.EVENTS.UPDATED, this.state);
  }

  public getState(): StateType {
    return this.state;
  }
}

export const store = new Store();


export function withStore<SP>(mapStateToProps: (state: StateType) => any) {
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


