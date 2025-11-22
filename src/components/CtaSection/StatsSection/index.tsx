import type { ReactNode } from 'react'
import { useKeqStats } from './hooks'
import StatItem from './StatItem'

export default function StatsSection(): ReactNode {
  const { stats, loading, error } = useKeqStats()

  if (error) {
    return null
  }

  return (
    <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
      <StatItem label="GitHub Stars" value={stats.stars} isLoading={loading} />
      <StatItem label="每周下载" value={stats.weeklyDownloads} isLoading={loading} />
      <StatItem label="贡献者" value={stats.contributors} isLoading={loading} format="string" />
    </div>
  )
}
