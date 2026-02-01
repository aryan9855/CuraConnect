import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../components/core/HomePage/common/Loader'
import Sidebar from '../components/core/Dashboard/Sidebar'

function Dashboard() {
  const { loading: authLoading } = useSelector((state) => state.auth)
  const { loading: profileLoading } = useSelector((state) => state.profile)

  if (authLoading || profileLoading) {
    return <Loader />
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 px-8 py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard
