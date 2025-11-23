import Translate from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { ReactNode } from "react";

export default function HeroTitle(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <div className="space-y-8">
      {/* 大标题 */}
      <div>
        <h1 className="font-black tracking-tight text-gray-900 dark:text-white">
          <span className="block">{siteConfig.title}</span>
          <span className="block mt-2 bg-linear-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
            <Translate id="hero.tagline">让请求更简单</Translate>
          </span>
        </h1>
      </div>

      {/* 描述 */}
      <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
        <Translate id="hero.description">
          {siteConfig.tagline}
        </Translate>
      </p>
    </div>
  );
}
