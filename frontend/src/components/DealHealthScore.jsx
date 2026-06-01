import { motion } from 'framer-motion'

function getScoreColor(score) {
  if (score >= 70) return { text: 'text-green-400', bg: 'bg-green-500', label: 'Healthy' }
  if (score >= 40) return { text: 'text-yellow-400', bg: 'bg-yellow-500', label: 'At Risk' }
  return { text: 'text-red-400', bg: 'bg-red-500', label: 'Critical' }
}

export default function DealHealthScore({ score }) {
  const { text, bg, label } = getScoreColor(score)

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 py-4">
      {/* Score circle */}
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background ring */}
          <circle cx="50" cy="50" r="42" fill="none" stroke="#1f2937" strokeWidth="10" />
          {/* Score ring */}
          <motion.circle
            cx="50" cy="50" r="42"
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            className={`stroke-current ${text}`}
            strokeDasharray={`${2 * Math.PI * 42}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - score / 100) }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        {/* Score number */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${text}`}>{score}</span>
          <span className="text-gray-500 text-xs">/ 100</span>
        </div>
      </div>

      {/* Label badge */}
      <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-opacity-20 ${bg} ${text}`}>
        {label}
      </span>

      <p className="text-gray-500 text-xs text-center max-w-[160px]">
        Based on buying intent, engagement & objections
      </p>
    </div>
  )
}