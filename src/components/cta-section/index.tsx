import Link from '@docusaurus/Link'
import { useKeqStats } from '@site/src/hooks/useKeqStats'
import { IconBrandGithub, IconFileDescription } from '@tabler/icons-react'
import type { ReactNode } from 'react'
import CTABackground from './cta-background'

function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k+`
  }
  if (num > 100) {
    return `${Math.floor(num / 100) * 100}+`
  }
  return num.toString()
}

export default function CTASection(): ReactNode {
  const { stats, loading } = useKeqStats()
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
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            {[
              { label: 'GitHub Stars', value: loading ? '-' : formatNumber(stats.stars) },
              { label: '每周下载', value: loading ? '-' : formatNumber(stats.weeklyDownloads) },
              { label: '贡献者', value: loading ? '-' : stats.contributors.toString() },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/80 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
