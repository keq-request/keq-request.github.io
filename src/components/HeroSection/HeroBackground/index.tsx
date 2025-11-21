import type { ReactNode } from 'react';

export default function HeroBackground(): ReactNode {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-15 blur-3xl"></div>
      <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full opacity-10 blur-3xl"></div>
    </div>
  );
}
