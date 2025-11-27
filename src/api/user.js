import request from '@/utils/request'

export interface UserInfo {
  id: number
  username: string
  email: string
  phone: string
  role: string
  status: number
  createTime: string
  avatar?: string
  remark?: string
}

export interface CreateUserParams {
  username: string
  email: string
  phone: string
  role: string
  password: string
  status: number
  remark?: string
}

export interface UpdateUserParams extends Partial<CreateUserParams> {
  id: number
}

export interface UserListParams {
  username?: string
  status?: string
  page: number
  size: number
}

export interface UserListResponse {
  list: UserInfo[]
  total: number
}

// 获取用户列表
export const getUserList = (params: UserListParams) => {
  return request.get<UserListResponse>('/user/list', { params })
}

// 获取用户详情
export const getUserDetail = (id: number) => {
  return request.get<UserInfo>(`/user/detail/${id}`)
}

// 创建用户
export const createUser = (data: CreateUserParams) => {
  return request.post<{ id: number }>('/user/create', data)
}

// 更新用户
export const updateUser = (data: UpdateUserParams) => {
  return request.put('/user/update', data)
}

// 删除用户
export const deleteUser = (id: number) => {
  return request.delete(`/user/delete/${id}`)
}

// 重置密码
export const resetUserPassword = (id: number) => {
  return request.post(`/user/reset-password/${id}`)
}