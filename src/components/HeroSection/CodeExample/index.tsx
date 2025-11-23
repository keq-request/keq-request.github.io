import { translate } from '@docusaurus/Translate';
import CodeBlock from '@theme/CodeBlock';
import type { ReactNode } from 'react';

export default function CodeExample(): ReactNode {
  const codeExample = translate({
    id: 'hero.codeExample',
    message: `import { request } from 'keq'

// 简单的 GET 请求
const user = await request
  .get('/api/users/123')

// 链式调用，优雅而强大
const data = await request
  .post('/api/cats')
  .set('Authorization', token)
  .send({ name: 'Mimi', age: 2 })
  .retry(3)        // 失败重试
  .timeout(5000)   // 超时控制
  .flowControl('serial') // 并发控制`,
  });

  return (
    <div className="relative">
      {/* 发光效果 */}
      <div className="absolute -inset-4 bg-linear-to-r from-orange-400 to-yellow-400 rounded-3xl opacity-20 blur-2xl"></div>

      <div className="relative bg-white dark:bg-linear-to-br dark:from-slate-900 dark:to-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-700">
        {/* 窗口标题栏 */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-700">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"></div>
          </div>
          <span className="text-xs font-mono text-orange-600 dark:text-orange-400 font-semibold">example.ts</span>
          <div className="w-16"></div>
        </div>

        {/* 代码内容 */}
        <div className="[&>div]:my-0! [&>div]:rounded-none! [&>div]:shadow-none! [&>div]:bg-transparent! [&_pre]:rounded-none! [&_pre]:my-0! [&_pre]:bg-gray-50! dark:[&_pre]:bg-slate-900/50! [&_button]:hidden!">
          <CodeBlock language="typescript" title="">
            {codeExample}
          </CodeBlock>
        </div>
      </div>
    </div>
  );
}
