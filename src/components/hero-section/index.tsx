import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type { ReactNode } from 'react';
import CodeExample from './code-example';
import FeatureTag from './feature-tag';
import HeroBackground from './hero-background';
import HeroBadge from './hero-badge';

export default function HeroSection(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <section className="relative min-h-screen bg-white dark:bg-slate-950 overflow-hidden">
      {/* 静态背景装饰 */}
      <HeroBackground />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        {/* 主要内容区 */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左侧文本内容 */}
          <div className="space-y-8">
            {/* 顶部标签 */}
            <HeroBadge />

            {/* 大标题 */}
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 dark:text-white">
                <span className="block">{siteConfig.title}</span>
                <span className="block mt-2 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                  让请求更简单
                </span>
              </h1>
            </div>

            {/* 描述 */}
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
              {siteConfig.tagline}
            </p>

            {/* 特性标签云 */}
            <div className="flex flex-wrap gap-3">
              <FeatureTag text="链式调用" icon="link" />
              <FeatureTag text="中间件驱动" icon="refresh" />
              <FeatureTag text="TypeScript" icon="typescript" />
              <FeatureTag text="跨平台" icon="world" />
            </div>

            {/* 按钮组 */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/docs/introduction"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-900 dark:text-gray-900 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-300 no-underline"
                style={{ textDecoration: 'none' }}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-50 to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-2">
                  快速开始
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link
                to="https://github.com/keq-request/keq"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 rounded-xl hover:bg-gray-200 dark:hover:bg-slate-700 transition-all hover:shadow-lg no-underline"
                style={{ textDecoration: 'none' }}
              >
                <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </Link>
            </div>
          </div>

          {/* 右侧代码示例 */}
          <CodeExample />
        </div>
      </div>
    </section>
  );
}
