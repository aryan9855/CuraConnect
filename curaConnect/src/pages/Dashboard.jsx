import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import Loader from "../components/core/HomePage/common/Loader"
import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: authLoading } = useSelector((state) => state.auth)
  const { loading: profileLoading } = useSelector((state) => state.profile)

  if (authLoading || profileLoading) {
    return <Loader />
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* FIXED SIDEBAR */}
      <aside className="w-[260px] shrink-0">
        <Sidebar />
      </aside>

      {/* SCROLLABLE CONTENT */}
      <main className="flex-1 overflow-y-auto px-10 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard
