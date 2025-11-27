import { defineStore } from 'pinia'

interface UserInfo {
  id: number
  username: string
  avatar: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userInfo: {} as UserInfo
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    },
    
    logout() {
      this.token = ''
      this.userInfo = {} as UserInfo
      localStorage.removeItem('token')
    }
  }
})