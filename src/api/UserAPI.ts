import BaseAPI from "./ABaseApI"
import { PasswordData, UserDTO } from "./types"

export class UserAPI extends BaseAPI {
  constructor() {
    super("/user")
  }

  changeInfo(data: UserDTO) {
    return this.http.put("/profile", data)
  }

  chahgePass(data: PasswordData) {
    return this.http.put("/password", data)
  }

  updateAvatar(file: FormData) {
    return this.http.put<UserDTO>("/profile/avatar", file)
  }

  searchUser(data: {login: string}): Promise<UserDTO[]> {
    return this.http.post("/search", data)
  }

}

export default new UserAPI()
