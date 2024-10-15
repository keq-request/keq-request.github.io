import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Icon from '../../components/icon.vue'


export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('Icon', Icon)
  }
} satisfies Theme
