import { ChatsAPI } from "../api/ChatsAPI"
import { UserDTO } from "../api/types"
import store from "../core/Store"
// import { IUser } from "../types/IUser"
import MessagesController from "./MessagerController"



class ChatsController {
  private api: ChatsAPI

  constructor() {
    this.api = new ChatsAPI()
  }

  async getChats() {
    store.set("chats.list.isLoading", true)

    try {
      const chatsList = await this.api.read()
  
      chatsList.map(async (chat) => {
        const token = await this.getToken(chat.id)
        // console.log(token)

        await MessagesController.connect(chat.id, token)
      })

      store.set("chats.list.data", chatsList)
      console.log(store)
    } catch (error) {
      store.set("chats.list.error", (error as Error).message)
    } finally {
      store.set("chats.list.isLoading", false)
    }

  }

  getToken(id: number) {
    return this.api.getToken(id)
  }

  createChatModal(isOpen: boolean) {
    store.set("addChatModal", isOpen)
    console.log(store)
  }

  addUserModal(isOpen: boolean){
    store.set("addUserModal", isOpen)

  }

  deleteUserModal(isOpen:boolean){
    store.set("deleteUserModal", isOpen)
  }

  async createChat(data: {title: string}) {
    store.set("createNewChat.isLoading", true)

    try {
      await this.api.create(data)
    } catch (error) {
      store.set("createNewChat.eerror", (error as Error).message)
    } finally {
      store.set("createNewChat.isLoading", false)
    }

  }

  async deleteChat(id: number) {
    try {
      await this.api.deleteChat(id)
    } catch (error) {
      console.error(error)
    }
  }

  selectChat(id: number | undefined) {
    store.set("selectedId", id)
    // await MessagesController.fetchOldMessages(id)

  }
  deleteUserSelect(id: number) {
    store.set('modals.deleteUser.selectedUserId', id)
  }

  addUserSerError(error: string) {
    // console.log("установка")
    store.set("addChatUser.error", error)
  }

  async addUser( users: number[]) {
    store.set("addChatUser.isLoading", true)
    const my = store.getState()
    const id = my.selectedId ? my.selectedId : 0
  
    try {
      await this.api.addUsers(id, users)
    } catch (error) {
      store.set("addChatUser.eerror", (error as Error).message)
    } finally {
      store.set("addChatUser.isLoading", false)
    }

  }
  
  async getUsers(id: number): Promise<UserDTO[]> {
    // // console.log("N")
    // const my = store.getState()
    // const id = my.selectedId ? my.selectedId : 0
    return this.api.getUsers(id)
  }

  async deleteUser(id: number, users: number[]) {
    store.set("modals.deleteUser.isLoading", true)


    try {
      await this.api.deleteUsers(id, users)
    } catch (error) {
      store.set("modals.deleteUser.error", (error as Error).message)
    } finally {
      store.set("modals.deleteUser.isLoading", false)
      this.deleteUserModal(false)
      // this.getChats()
    }

  }

}

export default new ChatsController()
