import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { IconBrandGithub } from "@tabler/icons-react";
import type { ReactNode } from "react";
import CodeExample from "./CodeExample";
import FeatureTag from "./FeatureTag";
import HeroBackground from "./HeroBackground";

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
            {/* <HeroBadge /> */}

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
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-900 dark:text-gray-900 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all! hover:scale-105 border border-gray-200 dark:border-gray-300 no-underline"
                style={{ textDecoration: "none" }}
              >
                <span className="absolute inset-0 w-full h-full bg-linear-to-r from-orange-50 to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative flex items-center gap-2">
                  快速开始
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
