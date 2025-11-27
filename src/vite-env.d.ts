// declare module '*.vue' {
//   import { Component } from 'vue'
//   const component: Component
//   export default component
// }

/// <reference types="vite/client" />

// 为自动导入的 Element Plus 组件添加类型声明
// declare module 'element-plus' {
//   export class ElButton extends import('vue').Component {}
//   // 可以继续添加其他你使用的组件
// }

// 或者使用更通用的方式
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Vuex 类型声明
declare module 'vuex' {
  export * from 'vuex/types/index.d.ts'
}