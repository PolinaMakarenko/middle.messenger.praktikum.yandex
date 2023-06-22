// import API, { ProfileAPI } from '../api/ProfileAPI'
import { PasswordData, UserDTO } from '../api/types'
import API, { UsereAPI } from '../api/UsereAPI'
import Router from "../core/Rourer"
import { store } from '../core/Store'


export class UserController {
  private readonly api: UsereAPI
  
  constructor() {
    this.api = API
  }

  async changeInfo(data: UserDTO) {
    store.set('user.isLoading', true)

    try {
      const updatedUser = await this.api.changeInfo(data)
      store.set('user.data', updatedUser)
      Router.go("/profile")
    } catch (e) {
      store.set('user.error', (e as Error).message)
    } finally {
      store.set('user.isLoading', false)
    }
  }

  async changeAvatar(file: File) {
    store.set('user.isLoading', true)

    try {
      const formData = new FormData()
      formData.append('avatar', file)
      const updatedUser = await this.api.updateAvatar(formData)

      store.set('user.data', updatedUser)
      Router.go("/profile")
      
    } catch (e) {
      store.set('user.error', (e as Error).message)
    } finally {
      store.set('user.isLoading', false)
    }

  }

  async chahgePassword(data: PasswordData) {
    store.set('user.isLoading', true)

    try {
      await this.api.chahgePass(data)
      Router.go("/profile")
    } catch (e) {
      store.set('user.error', (e as Error).message)
    } finally {
      store.set('user.isLoading', false)
    }

  }

  async searchUser(data: {login: string}): Promise<UserDTO[]> {
    const response = await this.api.searchUser(data)
    return response
  }
}

export default new UserController()
