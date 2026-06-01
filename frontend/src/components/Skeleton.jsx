export function SkeletonCard({ className = '' }) {
  return (
    <div className={`bg-gray-900 border border-gray-800 rounded-2xl p-5 animate-pulse ${className}`}>
      <div className="h-4 w-32 bg-gray-800 rounded mb-4" />
      <div className="space-y-2">
        <div className="h-3 bg-gray-800 rounded w-full" />
        <div className="h-3 bg-gray-800 rounded w-4/5" />
        <div className="h-3 bg-gray-800 rounded w-3/5" />
      </div>
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-4 animate-pulse">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-800 rounded w-48" />
          <div className="h-3 bg-gray-800 rounded w-32" />
        </div>
        <div className="h-6 w-24 bg-gray-800 rounded-full" />
      </div>
    </div>
  )
}