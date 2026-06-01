import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, ChevronRight, TrendingUp, ShieldAlert } from 'lucide-react'

function ScoreBadge({ score }) {
  if (score >= 70) return (
    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
      {score} · Healthy
    </span>
  )
  if (score >= 40) return (
    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
      {score} · At Risk
    </span>
  )
  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
      {score} · Critical
    </span>
  )
}

export default function CallRow({ call, index }) {
  const navigate = useNavigate()
  const { id, fileName, timestamp, metrics, insights } = call

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      onClick={() => navigate(`/dashboard/${id}`)}
      className="bg-gray-900 border border-gray-800 hover:border-indigo-500/40 hover:bg-gray-800/60 
                 rounded-2xl px-6 py-4 cursor-pointer transition-all group"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left: File name + date */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium truncate">{fileName}</p>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-1">
            <Calendar size={12} />
            {new Date(timestamp).toLocaleString()}
          </div>
        </div>

        {/* Middle: Quick stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-gray-400">
            <TrendingUp size={14} className="text-green-500" />
            <span>{insights.buyingSignals.length} signals</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <ShieldAlert size={14} className="text-red-500" />
            <span>{insights.objectionMoments.length} objections</span>
          </div>
        </div>

        {/* Right: Score + arrow */}
        <div className="flex items-center gap-3">
          <ScoreBadge score={metrics.dealHealthScore} />
          <ChevronRight
            size={18}
            className="text-gray-600 group-hover:text-indigo-400 transition-colors"
          />
        </div>
      </div>

      {/* Competitor pills if any */}
      {insights.competitorMentions.length > 0 && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-800">
          <span className="text-gray-600 text-xs">Competitors:</span>
          {insights.competitorMentions.map((c, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 text-xs border border-yellow-500/20"
            >
              {c}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}