import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Keq",
  description: "Keq is a request API write by Typescript for flexibility, readability, and a low learning curve.",
  cleanUrls: true,

  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
    }
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/keq-request/keq?tab=readme-ov-file' }
    ]
  }
})
