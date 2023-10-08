import { ApiService } from "."
import { LoginData, VerifyToken, VerifyTokenResult } from "../../types"

export class AuthService {
  static getToken(data: LoginData) {
    return ApiService.post<{ accessToken: string }>("api/auth/", data, {
      headers: {},
    })
  }

  static verifyToken(data: VerifyToken) {
    return ApiService.post<VerifyTokenResult>("api/auth/verify", data, {
      headers: {},
    })
  }
}
