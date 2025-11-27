<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <div class="logo">
        <span v-if="!isCollapse">管理系统</span>
      </div>
      <el-menu
        :default-active="activeMenu"
        router
        :collapse="isCollapse"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#409eff"
      >
        <el-menu-item index="/dashboard">
          <el-icon><PieChart /></el-icon>
          <span>仪表盘</span>
        </el-menu-item>
        
        <el-sub-menu index="management">
          <template #title>
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/user">用户列表</el-menu-item>
          <el-menu-item index="/user/add">添加用户</el-menu-item>
        </el-sub-menu>
        
        <el-menu-item index="/system">
          <el-icon><Setting /></el-icon>
          <span>系统设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    
    <el-container>
      <!-- 头部 -->
      <el-header class="header">
        <div class="header-left">
          <el-button
            text
            @click="toggleCollapse"
            class="collapse-btn"
          >
            <el-icon><Expand v-if="isCollapse" /><Fold v-else /></el-icon>
          </el-button>
        </div>
        
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="user-info">
              <el-avatar :size="30" :src="userStore.userInfo.avatar" />
              <span>{{ userStore.userInfo.username }}</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      
      <!-- 标签页 -->
      <div class="tabs-container">
        <el-tabs
          v-model="tabsStore.activeTab"
          type="card"
          closable
          @tab-click="handleTabClick"
          @tab-remove="handleTabRemove"
        >
          <el-tab-pane
            v-for="tab in tabsStore.tabs"
            :key="tab.name"
            :name="tab.name"
            :label="tab.title"
          />
        </el-tabs>
      </div>
      
      <!-- 主要内容 -->
      <el-main class="main-content">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" :key="$route.fullPath" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTabsStore } from '@/store/tabs'
import { useUserStore } from '@/store/user'
import { ElMessageBox } from 'element-plus'

const route = useRoute()
const router = useRouter()
const tabsStore = useTabsStore()
const userStore = useUserStore()

const isCollapse = ref(false)

const activeMenu = computed(() => route.path)

// 监听路由变化，添加标签页
watch(
  () => route,
  (newRoute) => {
    if (newRoute.meta.title) {
      tabsStore.addTab(newRoute)
    }
  },
  { immediate: true, deep: true }
)

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

const handleTabClick = (tab: any) => {
  const targetTab = tabsStore.tabs.find(t => t.name === tab.paneName)
  if (targetTab) {
    router.push(targetTab.path)
  }
}

const handleTabRemove = (tabName: string) => {
  if (tabsStore.tabs.length === 1) {
    ElMessageBox.alert('至少保留一个标签页', '提示')
    return
  }
  
  tabsStore.closeTab(tabName)
  // 跳转到激活的标签页
  if (tabsStore.activeTab) {
    const activeTab = tabsStore.tabs.find(tab => tab.name === tabsStore.activeTab)
    if (activeTab) {
      router.push(activeTab.path)
    }
  }
}

const handleCommand = (command: string) => {
  if (command === 'logout') {
    ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      userStore.logout()
      router.push('/login')
    })
  } else if (command === 'profile') {
    // 跳转到个人中心
    router.push('/profile')
  }
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.el-aside {
  background-color: #001529;
  transition: width 0.3s;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  background: white;
}

.collapse-btn {
  font-size: 18px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.tabs-container {
  background: white;
  padding: 0 20px;
}

.main-content {
  background: #f5f5f5;
  padding: 20px;
}
</style>