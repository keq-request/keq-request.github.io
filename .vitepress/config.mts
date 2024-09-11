import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Keq",
  description: "Keq is a request API write by Typescript for flexibility, readability, and a low learning curve.",
  cleanUrls: true,
  lastUpdated: true,

  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        editLink: {
          pattern: 'https://github.com/keq-request/keq-request.github.io/edit/master/:path',
          text: '在 GitHub 上编辑此页',
        },

        docFooter: {
          prev: '上一页',
          next: '下一页',
        },

        outline: {
          label: '页面导航',
        },

        lastUpdated: {
          text: '最后更新于',
          formatOptions: {
            dateStyle: 'short',
            timeStyle: 'medium'
          }
        },

        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',

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
    editLink: {
      pattern: 'https://github.com/keq-request/keq-request.github.io/edit/master/:path',
    },

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
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                }
              }
            },
          }
        }
      }
    }
  }
})
