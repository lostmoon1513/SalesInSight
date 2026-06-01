import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  TrendingUp, ShieldAlert, Users, Lightbulb,
  ArrowLeft, Calendar, Activity
} from 'lucide-react'
import InsightCard from '../components/InsightCard'
import TalkRatioChart from '../components/TalkRatioChart'
import DealHealthScore from '../components/DealHealthScore'
import { fetchCallById } from '../services/api'
import PageTransition from '../components/PageTransition'
import { SkeletonCard } from '../components/Skeleton'


const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
}

export default function Dashboard() {
  const { callId } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchCallById(callId)
        setData(result)
      } catch (err) {
        setStage('error')
        setErrorMsg('Failed to load call data.')
      } 
      finally {
        setLoading(false)
      }
    }
    load()
  }, [callId])
  
// Replace the loading block with:
if (loading) {
  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SkeletonCard className="h-64" />
          <SkeletonCard className="h-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <SkeletonCard />
      </div>
    </PageTransition>
  )
  }

  const { metrics, insights, fileName, timestamp } = data
  return (
  <PageTransition>
    <div className="max-w-5xl mx-auto"> {/* or max-w-4xl */}
      {<div className="max-w-5xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate('/history')}
        className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to History
      </button>

      {/* Call info bar */}
      <motion.div
        custom={0} variants={fadeUp} initial="hidden" animate="show"
        className="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-4 flex flex-wrap items-center justify-between gap-4 mb-6"
      >
        <div>
          <p className="text-white font-semibold text-lg">{fileName}</p>
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-0.5">
            <Calendar size={14} />
            {new Date(timestamp).toLocaleString()}
          </div>
        </div>
        <div className="flex items-center gap-2 bg-indigo-600/20 border border-indigo-500/30 rounded-xl px-4 py-2">
          <Activity size={16} className="text-indigo-400" />
          <span className="text-indigo-300 text-sm font-medium">
            Deal Score: <strong>{metrics.dealHealthScore}</strong>
          </span>
        </div>
      </motion.div>

      {/* Row 1: Talk Ratio + Deal Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
          <InsightCard title="Talk Ratio" icon={Users}>
            <TalkRatioChart
              repRatio={metrics.talkRatioRep}
              prospectRatio={metrics.talkRatioProspect}
            />
          </InsightCard>
        </motion.div>

        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show">
          <InsightCard title="Deal Health Score" icon={Activity}>
            <DealHealthScore score={metrics.dealHealthScore} />
          </InsightCard>
        </motion.div>
      </div>

      {/* Row 2: Buying Signals + Objections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show">
          <InsightCard title="Buying Signals" icon={TrendingUp}>
            <ul className="space-y-2">
              {insights.buyingSignals.length > 0
                ? insights.buyingSignals.map((signal, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-green-500 shrink-0" />
                      {signal}
                    </li>
                  ))
                : <p className="text-gray-500 text-sm">No buying signals detected.</p>
              }
            </ul>
          </InsightCard>
        </motion.div>

        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show">
          <InsightCard title="Objections Detected" icon={ShieldAlert}>
            <ul className="space-y-2">
              {insights.objectionMoments.length > 0
                ? insights.objectionMoments.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0" />
                      {obj}
                    </li>
                  ))
                : <p className="text-gray-500 text-sm">No objections detected.</p>
              }
            </ul>
          </InsightCard>
        </motion.div>
      </div>

      {/* Row 3: Competitor Mentions */}
      <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show" className="mb-4">
        <InsightCard title="Competitor Mentions" icon={Users}>
          {insights.competitorMentions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {insights.competitorMentions.map((c, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium"
                >
                  {c}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No competitors mentioned.</p>
          )}
        </InsightCard>
      </motion.div>

      {/* Row 4: Coaching */}
      <motion.div custom={6} variants={fadeUp} initial="hidden" animate="show">
        <InsightCard title="AI Coaching Recommendations" icon={Lightbulb}>
          <p className="text-gray-300 text-sm leading-relaxed">
            {insights.coachingAdvice}
          </p>
        </InsightCard>
      </motion.div>
    </div>}
    </div>
  </PageTransition>
  )
}