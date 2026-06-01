export default function InsightCard({ title, icon: Icon, children, className = '' }) {
  return (
    <div className={`bg-gray-900 border border-gray-800 rounded-2xl p-5 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon size={18} className="text-indigo-400" />}
        <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
          {title}
        </h3>
      </div>
      {children}
    </div>
  )
}