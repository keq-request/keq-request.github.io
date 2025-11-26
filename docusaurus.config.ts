import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'
import rehypeShiki from '@shikijs/rehype'
import rehypeShikiOptions from './src/shiki/options'

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Keq',
  tagline: '基于中间件与链式调用的现代 HTTP 客户端。',
  favicon: 'img/logo.svg',

  future: {
    // Tailwind CSS 引入的 PostCSS 插件会导致 Docusaurus 4 构建 CSS 时 Minify 失败
    v4: false,
  },

  url: 'https://keq-request.github.io',
  baseUrl: '/',

  organizationName: 'keq-request',
  projectName: 'keq-request.github.io',
  deploymentBranch: 'master',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/keq-request/keq',
          beforeDefaultRehypePlugins: [
            [
              rehypeShiki,
              rehypeShikiOptions,
            ],
          ],
          versions: {
            current: {
              label: '5.x (Next)',
              badge: false,
            },
            v2: {
              label: '2.x',
              badge: false,
            },
          },
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/keq-request/keq',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          beforeDefaultRehypePlugins: [
            [
              rehypeShiki,
              rehypeShikiOptions,
            ],
          ],
        },
        theme: {
          customCss: [
            './src/css/custom.css',
            './src/css/shiki.css',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Keq',
      logo: {
        alt: 'Keq Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '文档',
        },
        {
          to: '/blog',
          label: '博客',
          position: 'left',
        },
        {
          href: 'https://github.com/keq-request/keq',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'docsVersionDropdown',
          versions: ['current', 'v2'],
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Keq, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    './src/plugins/tailwind.plugin.ts',
  ],

  scripts: [
    {
      defer: true,
      src: '//analytics.nas.val-istar-guo.com/script.js',
      'data-website-id': '7d522440-47a3-4164-86c4-d7abb0299cfd',
    },
  ],
}

export default config
