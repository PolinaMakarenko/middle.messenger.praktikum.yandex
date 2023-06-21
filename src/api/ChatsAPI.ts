import BaseAPI from './BaseAPI'
// import { IUser } from '../types/IUser'
// import { IChat } from '../types/IChat'
import { ChatDTO, UserDTO } from './types'

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats')
  }

  create(data: {title: string}) {
    return this.http.post('/', data)
  }

  delete(id: number): Promise<unknown> {
    return this.http.delete('/', { chatId: id })
  }

  read(): Promise<ChatDTO[]> {
    return this.http.get('/')
  }

  getUsers(id: number): Promise<Array<UserDTO & { role: string }>> {
    return this.http.get(`/${id}/users`)
  }

  addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put('/users', { users, chatId: id })
  }

  deleteChat(id: number): Promise<unknown> {
    return this.http.delete('/', { chatId: id })
  }

  deleteUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.delete('/users', { users, chatId: id })
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`)

    return response.token
  }

  update = undefined
}

export default new ChatsAPI()
