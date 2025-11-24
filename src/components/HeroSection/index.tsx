import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import { IconBrandGithub, IconBrandTypescript, IconLink, IconRefresh, IconWorld } from "@tabler/icons-react";
import type { ReactNode } from "react";
import CodeExample from "./CodeExample";
import FeatureTag from "./FeatureTag";
import HeroBackground from "./HeroBackground";
import HeroBadge from "./HeroBadge";
import HeroTitle from "./HeroTitle";

export default function HeroSection(): ReactNode {
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

            {/* 标题和描述 */}
            <HeroTitle />

            {/* 特性标签云 */}
            <div className="flex flex-wrap gap-3">
              <FeatureTag text={<Translate id="hero.feature.chaining">链式调用</Translate>} icon={IconLink} />
              <FeatureTag text={<Translate id="hero.feature.middleware">中间件驱动</Translate>} icon={IconRefresh} />
              <FeatureTag text={<Translate id="hero.feature.typescript">TypeScript</Translate>} icon={IconBrandTypescript} />
              <FeatureTag text={<Translate id="hero.feature.crossPlatform">跨平台</Translate>} icon={IconWorld} />
            </div>

            {/* 按钮组 */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/docs/introduction"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-900 dark:text-gray-900 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all! hover:scale-105 border border-gray-200 dark:border-gray-300 no-underline"
                style={{ textDecoration: "none" }}
              >
                <span className="absolute inset-0 w-full h-full bg-linear-to-r from-orange-50 to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative flex items-center gap-2">
                  <Translate id="hero.button.getStarted">快速开始</Translate>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>
              <Link
                to="https://github.com/keq-request/keq"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 rounded-xl hover:bg-gray-200 dark:hover:bg-slate-700 transition-all! hover:shadow-lg no-underline"
                style={{ textDecoration: "none" }}
              >
                <IconBrandGithub className="w-5 h-5 group-hover:rotate-12 transition-transform mr-2" />
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
