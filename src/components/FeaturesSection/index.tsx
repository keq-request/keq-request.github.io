import Translate from '@docusaurus/Translate';
import { IconBrandTypescript, IconLayersLinked, IconLink, IconSparkles, IconTarget, IconWorld } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import FeatureCard from './FeatureCard';

export default function FeaturesSection(): ReactNode {
  return (
    <section className="relative py-20 sm:py-32 bg-linear-to-b from-white via-orange-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-orange-100 to-yellow-100 dark:from-orange-950/50 dark:to-yellow-950/50 px-4 py-2 text-sm font-bold text-orange-600 dark:text-orange-400 mb-6">
            <Translate id="features.badge">核心特性</Translate>
          </div>
          <h2 className="font-black text-gray-900 dark:text-white mb-6">
            <Translate id="features.title.line1">为现代 Web 开发</Translate>
            <span className="block mt-2 bg-linear-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              <Translate id="features.title.line2">量身打造</Translate>
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            <Translate id="features.description">提供开发者所需的一切功能，让 HTTP 请求变得简单而强大</Translate>
          </p>
        </div>

        {/* 特性网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <FeatureCard
            name={<Translate id="features.card.middleware.name">强大的中间件系统</Translate>}
            description={<Translate id="features.card.middleware.description">受 Koa 启发的洋葱模型中间件，让你能够灵活地扩展请求功能。内置重试、超时、并发控制等常用中间件。</Translate>}
            Icon={IconLayersLinked}
            gradient="from-orange-500 to-amber-500"
          />
          <FeatureCard
            name={<Translate id="features.card.chaining.name">优雅的链式调用</Translate>}
            description={<Translate id="features.card.chaining.description">受 SuperAgent 启发的 API 设计，支持链式调用。代码简洁易读,让 HTTP 请求变得优雅而直观。</Translate>}
            Icon={IconLink}
            gradient="from-yellow-500 to-orange-500"
          />
          <FeatureCard
            name={<Translate id="features.card.typescript.name">完备的 TypeScript 支持</Translate>}
            description={<Translate id="features.card.typescript.description">原生 TypeScript 编写，提供完整的类型定义。支持从 Swagger 文档生成类型安全的请求代码。</Translate>}
            Icon={IconBrandTypescript}
            gradient="from-amber-500 to-yellow-500"
          />
          <FeatureCard
            name={<Translate id="features.card.crossPlatform.name">跨平台运行</Translate>}
            description={<Translate id="features.card.crossPlatform.description">同时支持浏览器和 Node.js 环境，一套代码多端运行。基于标准的 Fetch API，兼容性好。</Translate>}
            Icon={IconWorld}
            gradient="from-orange-400 to-yellow-400"
          />
          <FeatureCard
            name={<Translate id="features.card.routing.name">智能路由匹配</Translate>}
            description={<Translate id="features.card.routing.description">支持按域名、路径、方法等条件灵活配置中间件。轻松为不同的 API 服务配置不同的处理逻辑。</Translate>}
            Icon={IconTarget}
            gradient="from-yellow-400 to-amber-400"
          />
          <FeatureCard
            name={<Translate id="features.card.outOfBox.name">开箱即用</Translate>}
            description={<Translate id="features.card.outOfBox.description">零配置即可使用，同时提供丰富的配置选项。自动处理请求序列化和响应解析。</Translate>}
            Icon={IconSparkles}
            gradient="from-amber-400 to-orange-400"
          />
        </div>
      </div>
    </section>
  );
}
