import { useLocation } from 'react-router-dom'

const pageTitles = {
  '/upload': 'Upload Call',
  '/history': 'Call History',
}

export default function Header() {
  const { pathname } = useLocation()

  const title = pathname.startsWith('/dashboard')
    ? 'Call Analysis'
    : pageTitles[pathname] ?? 'SalesInsight'

  return (
    <header className="h-14 flex items-center justify-between px-6"
      style={{ background: '#080c14', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>

      <h1 style={{ fontFamily: 'Syne, sans-serif' }}
        className="text-white font-semibold text-base">
        {title}
      </h1>

      {/* Logo mark — replaces bell */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-xl"
          style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <rect x="1" y="12" width="3" height="6" rx="1" fill="#6366f1" opacity="0.6"/>
            <rect x="5.5" y="8" width="3" height="10" rx="1" fill="#6366f1" opacity="0.8"/>
            <rect x="10" y="5" width="3" height="13" rx="1" fill="#6366f1"/>
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
        <span className="hidden sm:block font-bold text-sm"
          style={{ fontFamily: 'Syne, sans-serif', color: '#f1f5f9' }}>
          Sales<span style={{ color: '#818cf8' }}>Insight</span>
        </span>
      </div>

    </header>
  )
}