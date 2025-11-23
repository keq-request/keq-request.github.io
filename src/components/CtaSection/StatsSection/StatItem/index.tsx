import type { ReactNode } from 'react'

interface StatItemProps {
  label: ReactNode
  value: number
  isLoading: boolean
  format?: 'number' | 'string'
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k+`
  }
  if (num > 100) {
    return `${Math.floor(num / 100) * 100}+`
  }
  return num.toString()
}

export default function StatItem({ label, value, isLoading, format = 'number' }: StatItemProps): ReactNode {
  const displayValue = format === 'string' ? value.toString() : formatNumber(value)

  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-black text-white mb-2">
        {isLoading ? (
          <span className="inline-block w-16 h-10 bg-white/20 rounded animate-pulse" />
        ) : (
          displayValue
        )}
      </div>
      <div className="text-sm text-white/80 font-medium">
        {label}
      </div>
    </div>
  )
}
