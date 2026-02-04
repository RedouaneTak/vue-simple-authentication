import type { LoginRequest, LoginErrors } from "@/models/auth.model";

export const validateLogin = (form: LoginRequest): LoginErrors => {
  const errors: LoginErrors = {}

    if (!form.email) {
    errors.email = 'Email is required'
  }

  if (!form.password) {
    errors.password = 'Password is required'
  }

  return errors

}
