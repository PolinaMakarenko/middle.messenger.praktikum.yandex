// import { Routes } from ".."
import API, { AuthAPI, SigninData, SignupData } from "../api/AuthAPI"
import Router from "../core/Rourer"
import store from "../core/Store"

export class AuthController {
  private readonly api: AuthAPI

  constructor() {
    this.api = API
  }

  async signup(data: SignupData) {
    store.set("user.isLoading", true)
    try {
      console.log(data)
      await this.api.signup(data)

      await this.getUser()

      Router.go("/messenger")
    } catch (e: any) {
      store.set("user.error", (e as Error).message)
    } finally {
      store.set("user.isLoading", false)
    }
  }


  async signin(data: SigninData) {
    store.set("user.isLoading", true)
    try {
      await this.api.signin(data)

      await this.getUser()

      Router.go("/messenger")
    } catch (e: any) {
      store.set("user.error", (e as Error).message)
    } finally {
      store.set("user.isLoading", false)
    }
  }

  
  async getUser() {
    store.set("user.isLoading", true)
    try {
      const user = await this.api.read()
      store.set("user.data", user)
    } catch (error) {
      store.set("user.error", (error as Error).message)
      store.set("user.isLoading", false)
      throw new Error(error as string)
    } finally {
      store.set("user.isLoading", false)
    }

  }


  async logout() {
    store.set('user.isLoading', true)
    try {
      // MessagesController.closeAll()

      await this.api.logout()
      store.set('user.data', undefined)

      Router.go("/")
    } catch (e: any) {
      store.set('user.error', (e as Error).message)
    } finally {
      store.set('user.isLoading', false)
    }
  }
}

export default new AuthController()
