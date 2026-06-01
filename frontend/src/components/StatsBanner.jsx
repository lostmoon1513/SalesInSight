import { motion } from 'framer-motion'

export default function StatsBanner({ calls }) {
  if (!calls.length) return null

  const avgScore = Math.round(
    calls.reduce((sum, c) => sum + c.metrics.dealHealthScore, 0) / calls.length
  )

  const totalObjections = calls.reduce(
    (sum, c) => sum + c.insights.objectionMoments.length, 0
  )

  const totalSignals = calls.reduce(
    (sum, c) => sum + c.insights.buyingSignals.length, 0
  )

  const stats = [
    { label: 'Total Calls', value: calls.length },
    { label: 'Avg Deal Score', value: `${avgScore}` },
    { label: 'Buying Signals', value: totalSignals },
    { label: 'Objections', value: totalObjections },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4"
        >
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
            {stat.label}
          </p>
          <p className="text-white text-2xl font-bold">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  )
}