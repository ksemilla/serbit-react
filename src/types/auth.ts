export interface LoginData {
  email: string
  password: string
}

export interface VerifyToken {
  accessToken: string
}

export interface VerifyTokenResult {
  email: string
  sub: number
  iat: number
  exp: number
}
