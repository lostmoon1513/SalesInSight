import { useNavigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-8xl font-bold text-gray-800 mb-4">404</p>
        <p className="text-white text-xl font-semibold mb-2">Page not found</p>
        <p className="text-gray-500 text-sm mb-6">
          The page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate('/upload')}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          Go to Upload
        </button>
      </div>
    </PageTransition>
  )
}