import { ApiService } from "."
import { User } from "../../types/users"

export class UsersService {
  static getUserList() {
    return ApiService.get<{ list: User[]; count: number }>("api/users/")
  }

  static getUser(id: number) {
    return ApiService.get<User>(`api/users/${id}/`)
  }

  static updateUser(id: number, data: Partial<User>) {
    return ApiService.put<Partial<User>, any>(`api/users/${id}/`, data)
  }

  static createUser(data: { email: string; password: string }) {
    return ApiService.post<
      { email: string; password: string },
      { id: number; accessToken: string }
    >(`api/users/`, data)
  }
}
