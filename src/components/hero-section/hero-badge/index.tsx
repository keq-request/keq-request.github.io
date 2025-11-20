import type { ReactNode } from 'react';

export default function HeroBadge(): ReactNode {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-950/50 dark:to-yellow-950/50 px-4 py-2 text-sm font-semibold text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800 select-none">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
      </span>
      优雅的 HTTP 请求库
    </div>
  );
}
