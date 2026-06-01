import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, SearchX } from 'lucide-react'
import StatsBanner from '../components/StatsBanner'
import CallRow from '../components/CallRow'
import { fetchCallHistory } from '../services/api'
import PageTransition from '../components/PageTransition'
import { SkeletonRow } from '../components/Skeleton'

export default function History() {
  const navigate = useNavigate()
  const [calls, setCalls] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCallHistory()
        setCalls(data)
      } catch (err) {
        setCalls([])
        console.error('Failed to fetch history:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = calls.filter((c) =>
  (c.fileName || '').toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <PageTransition>
        <div className="max-w-4xl mx-auto space-y-3">
          {[...Array(4)].map((_, i) => <SkeletonRow key={i} />)}
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto">
        {/* Page heading */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Call History</h2>
            <p className="text-gray-400 text-sm mt-1">
              {calls.length} call{calls.length !== 1 ? 's' : ''} analyzed
            </p>
          </div>
          <button
            onClick={() => navigate('/upload')}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
          >
            <Upload size={15} />
            Upload New Call
          </button>
        </div>

        {/* Stats banner */}
        <StatsBanner calls={calls} />

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by filename..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Call list */}
        <div className="flex flex-col gap-3">
          {filtered.length > 0 ? (
            filtered.map((call, i) => (
              <CallRow key={call.id} call={call} index={i} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <SearchX size={40} className="text-gray-700 mb-3" />
              <p className="text-gray-400 font-medium">No calls found</p>
              <p className="text-gray-600 text-sm mt-1">
                {search ? 'Try a different search term.' : 'Upload your first call to get started.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}