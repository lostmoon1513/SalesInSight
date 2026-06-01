import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Upload, History, BarChart2, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { to: '/upload', label: 'Upload Call', icon: Upload },
  { to: '/history', label: 'Call History', icon: History },
]

function NavLinks({ onClose }) {
  return (
    <nav className="flex flex-col gap-1">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
            ${isActive
              ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20'
              : 'text-slate-500 hover:bg-white/5 hover:text-slate-300 border border-transparent'
            }`
          }
        >
          <Icon size={16} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

// function Logo() {
//   return (
//     <div className="flex items-center gap-2 mb-8 px-2">
//       <div className="w-2 h-2 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500" />
//       <span style={{ fontFamily: 'Syne, sans-serif' }} className="text-white font-bold text-lg tracking-tight">
//         Sales<span className="text-indigo-400">Insight</span>
//       </span>
//     </div>
//   )
// }
function Logo() {
  return (
    <div className="flex items-center gap-3 mb-8 px-1">
      {/* Bar chart + waveform icon */}
      <div className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
        style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          {/* Bar chart bars */}
          <rect x="1" y="12" width="3" height="6" rx="1" fill="#6366f1" opacity="0.6"/>
          <rect x="5.5" y="8" width="3" height="10" rx="1" fill="#6366f1" opacity="0.8"/>
          <rect x="10" y="5" width="3" height="13" rx="1" fill="#6366f1"/>
          {/* Waveform line */}
          <polyline
            points="14,10 15.5,7 16.5,13 17.5,9 19,10"
            stroke="#a5b4fc"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      <span style={{ fontFamily: 'Syne, sans-serif' }}
        className="text-white font-bold text-base tracking-tight">
        Sales<span className="text-indigo-400">Insight</span>
      </span>
    </div>
  )
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 min-h-screen flex-col px-4 py-6"
        style={{ background: '#0d1220', borderRight: '0.5px solid rgba(255,255,255,0.06)' }}>
        <Logo />
        <NavLinks onClose={() => {}} />
        <div className="mt-auto px-2">
          <p className="text-xs" style={{ color: '#334155' }}>AI-Powered · v1.0 MVP</p>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
        style={{ background: '#0d1220', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
        <Logo />
        <button onClick={() => setMobileOpen(true)} className="text-slate-400 hover:text-white transition-colors">
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 z-50 bg-black/60"
            />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="md:hidden fixed top-0 left-0 bottom-0 z-50 w-56 flex flex-col px-4 py-6"
              style={{ background: '#0d1220', borderRight: '0.5px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center justify-between mb-8 px-2">
                <Logo />
                <button onClick={() => setMobileOpen(false)} className="text-slate-500 hover:text-white">
                  <X size={18} />
                </button>
              </div>
              <NavLinks onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}