export interface UserInfo {
  id: number
  username: string
  avatar: string
  email?: string
  phone?: string
}

export interface LoginForm {
  username: string
  password: string
}

export interface MenuItem {
  path: string
  name: string
  title: string
  icon?: string
  children?: MenuItem[]
}