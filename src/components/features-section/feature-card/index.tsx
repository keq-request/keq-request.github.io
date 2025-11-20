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
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-slate-800">
      {/* 渐变边框效果 */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

      {/* 图标 */}
      <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300 mb-6`}>
        <Icon size={32} stroke={2} />
      </div>

      {/* 内容 */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
        {name}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </p>

      {/* 装饰箭头 */}
      <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </div>
  );
}
