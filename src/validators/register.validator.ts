import type { RegisterErrors, RegisterRequest } from '@/models/auth.model'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const validateRegister = (form: RegisterRequest): RegisterErrors => {
  const errors: RegisterErrors = {}

  if (!form.firstname) {
    errors.firstname = 'Firstname is required'
  }

  if (!form.lastname) {
    errors.lastname = 'Lastname is required'
  }

  if (!form.email) {
    errors.email = 'Email is required'
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Invalid email format'
  }

  if (!form.password) {
    errors.password = 'Password is required'
  }

  return errors
}
