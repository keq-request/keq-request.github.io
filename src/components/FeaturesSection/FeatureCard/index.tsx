import type { Icon } from '@tabler/icons-react';
import type { ReactNode } from 'react';

interface FeatureCardProps {
  name: string;
  description: string;
  Icon: Icon;
  gradient: string;
}

export default function FeatureCard({ name, description, Icon, gradient }: FeatureCardProps): ReactNode {
  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-slate-800 overflow-hidden">
      {/* 渐变边框效果 */}
      <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

      {/* 背景装饰圆点 */}
      <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300" style={{ background: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>

      {/* 装饰光效 */}
      <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-3xl transition-all duration-500`}></div>

      {/* 图标 */}
      <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-br ${gradient} text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 mb-6`}>
        <Icon size={32} stroke={2} />
      </div>

      {/* 内容 */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-orange-500 group-hover:to-pink-500 transition-all duration-300">
        {name}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </p>

      {/* 底部装饰线条 */}
      <div className={`absolute bottom-0 left-0 h-1 bg-linear-to-r ${gradient} w-0 group-hover:w-full transition-all duration-500 ease-out`}></div>
    </div>
  )
}
