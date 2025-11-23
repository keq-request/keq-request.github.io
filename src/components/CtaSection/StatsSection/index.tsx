import Translate from '@docusaurus/Translate'
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
      <StatItem label={<Translate id="stats.githubStars">GitHub Stars</Translate>} value={stats.stars} isLoading={loading} />
      <StatItem label={<Translate id="stats.weeklyDownloads">每周下载</Translate>} value={stats.weeklyDownloads} isLoading={loading} />
      <StatItem label={<Translate id="stats.contributors">贡献者</Translate>} value={stats.contributors} isLoading={loading} format="string" />
    </div>
  )
}
