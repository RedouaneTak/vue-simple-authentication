export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest{
  firstname: string,
  lastname: string,
  email: string,
  password: string
}

export interface User{
  firstname: string,
  lastname: string,
  email: string,
  role: string,
}


export type RegisterErrors = {
  [K in keyof RegisterRequest]?: string
}
