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
      themeConfig: {
        nav: [
          { text: '文档', link: '/zh/guide/introduction' },
          { text: '更新日志', link: 'https://github.com/keq-request/keq/blob/master/CHANGELOG.md' },
        ],

        sidebar: {
          '/zh/guide/': [
            {
              text: '开始',
              items: [
                { text: '介绍', link: '/zh/guide/introduction' },
                { text: '快速上手', link: '/zh/guide/quick-start' }
              ]
            }
          ],
        },
      }
    }
  },

  themeConfig: {
    logo: '/images/logo.svg',
    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Changelog', link: 'https://github.com/keq-request/keq/blob/master/CHANGELOG.md' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Quick Start', link: '/guide/quick-start' }
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/keq-request/keq?tab=readme-ov-file' }
    ],

    footer: {
      message: 'Released under the <a href="https://github.com/keq-request/keq/blob/master/LICENSE"> MIT License</a>.',
    }
  }
})
