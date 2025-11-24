export interface User {
  id: string
  email: string
  nombre: string
  role: 'admin' | 'customer'
  created_at: string
  updated_at: string
}

export interface UserFormData {
  email: string
  nombre: string
  role: 'admin' | 'customer'
  password?: string
}

