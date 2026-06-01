import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header hidden on mobile since Sidebar has its own top bar */}
        <div className="hidden md:block">
          <Header />
        </div>

        <main className="flex-1 overflow-y-auto p-6 pt-20 md:pt-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}