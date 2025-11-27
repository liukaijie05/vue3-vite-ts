import { defineStore } from 'pinia'

export interface TabItem {
  name: string
  path: string
  title: string
}

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabs: [] as TabItem[],
    activeTab: ''
  }),
  
  actions: {
    // 添加标签页
    addTab(route: any) {
      const { name, path, meta } = route
      if (!name || this.tabs.some(tab => tab.name === name)) return
      
      this.tabs.push({
        name: name as string,
        path,
        title: meta.title || '未命名'
      })
      this.activeTab = name as string
    },
    
    // 关闭标签页
    closeTab(tabName: string) {
      const index = this.tabs.findIndex(tab => tab.name === tabName)
      if (index > -1) {
        this.tabs.splice(index, 1)
        // 如果关闭的是当前激活的标签页，激活相邻的标签页
        if (this.activeTab === tabName) {
          this.activeTab = this.tabs[Math.max(0, index - 1)]?.name || ''
        }
      }
    },
    
    // 设置激活的标签页
    setActiveTab(tabName: string) {
      this.activeTab = tabName
    }
  }
})