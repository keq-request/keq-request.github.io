import { useEffect, useState } from 'react'

interface KeqStats {
  stars: number
  weeklyDownloads: number
  contributors: number
}

interface GithubApiResponse {
  stargazers_count: number
}

interface NpmApiResponse {
  downloads: number
}

const CACHE_KEY = 'keq_github_stats'
const CACHE_DURATION = 1000 * 60 * 60 // 1 hour

export function useKeqStats(): {
  stats: KeqStats
  loading: boolean
  error: string | null
} {
  const [stats, setStats] = useState<KeqStats>({
    stars: 0,
    weeklyDownloads: 0,
    contributors: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats(): Promise<void> {
      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_DURATION) {
            setStats(data)
            setLoading(false)
            return
          }
        }

        // Fetch fresh data
        const [githubRes, npmRes, contributorsRes] = await Promise.all([
          fetch('https://api.github.com/repos/keq-request/keq'),
          fetch('https://api.npmjs.org/downloads/point/last-week/keq'),
          fetch('https://api.github.com/repos/keq-request/keq/contributors'),
        ])

        if (!githubRes.ok || !npmRes.ok || !contributorsRes.ok) {
          throw new Error('Failed to fetch stats')
        }

        const githubData: GithubApiResponse = await githubRes.json()
        const npmData: NpmApiResponse = await npmRes.json()
        const contributorsData = await contributorsRes.json()

        const newStats: KeqStats = {
          stars: githubData.stargazers_count,
          weeklyDownloads: npmData.downloads,
          contributors: Array.isArray(contributorsData) ? contributorsData.length : 0,
        }

        setStats(newStats)

        // Cache the data
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: newStats,
            timestamp: Date.now(),
          }),
        )
      } catch (err) {
        console.error('Error fetching GitHub stats:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    void fetchStats()
  }, [])

  return { stats, loading, error }
}
