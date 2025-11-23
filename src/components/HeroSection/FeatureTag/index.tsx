import type { Icon } from '@tabler/icons-react';
import type { ReactNode } from 'react';

interface FeatureTagProps {
  text: ReactNode;
  icon: Icon;
}

export default function FeatureTag({ text, icon: Icon }: FeatureTagProps): ReactNode {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-linear-to-br from-orange-50 to-yellow-50 dark:from-slate-800 dark:to-slate-900 px-4 py-2 border border-orange-200 dark:border-orange-800/30 hover:border-orange-400 dark:hover:border-orange-600 transition-all hover:scale-105 hover:shadow-lg select-none">
      <div className="flex items-center gap-2">
        <Icon size={20} className="text-orange-600 dark:text-orange-400" stroke={2} />
        <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
          {text}
        </span>
      </div>
    </div>
  );
}
