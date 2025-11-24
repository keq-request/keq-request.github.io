import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import type { ReactNode } from 'react';

export default function HeroBadge(): ReactNode {
  return (
    <Link
      to="/docs/next/introduction"
      style={{ textDecoration: 'none' }}
      className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-orange-100 to-yellow-100 dark:from-orange-950/50 dark:to-yellow-950/50 px-4 py-2 text-sm font-semibold text-orange-800! dark:text-orange-300! border border-orange-200 dark:border-orange-800 select-none"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
      </span>

      <Translate id="hero.badge"> Keq@5 即将发布</Translate>
    </Link>
  );
}
