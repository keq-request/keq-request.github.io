import Link from '@docusaurus/Link'
import { IconBrandGithub, IconFileDescription } from '@tabler/icons-react'
import type { ReactNode } from 'react'
import CTABackground from './CtaBackground'
import StatsSection from './StatsSection'

export default function CTASection(): ReactNode {

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      <CTABackground />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            准备好开始了吗？
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            立即开始使用 Keq，体验更优雅的 HTTP 请求方式
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/docs/introduction"
              className="group inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-gray-900 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all! hover:scale-105 no-underline"
              style={{ textDecoration: 'none' }}
            >
              <span className="flex items-center gap-2">
                阅读文档
                <IconFileDescription className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" />
              </span>
            </Link>

            <Link
              to="https://github.com/keq-request/keq"
              className="group inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all! border border-white/30 hover:border-white/50 no-underline"
              style={{ textDecoration: 'none' }}
            >
              <span className="flex items-center gap-2">
                <IconBrandGithub className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                查看源码
              </span>
            </Link>
          </div>

          {/* 统计数据 */}
          <StatsSection />
        </div>
      </div>
    </section>
  )
}
