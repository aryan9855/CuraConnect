import './App.css'
import { Route, Routes } from 'react-router-dom'

import Home from '../src/pages/Home'
import Login from '../src/pages/Login'
import Signup from '../src/pages/Signup'


import Navbar from './components/core/HomePage/common/Navbar'
import DotGrid from './components/DotGrid'

import OpenRoute from './components/core/Auth/OpenRoute'
import PrivateRoute from './components/core/Auth/PrivateRoute'

import Error from './pages/Error'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from './pages/VerifyEmail'

function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col font-inter relative bg-richblack-900">

      {/* Background */}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        <DotGrid
          dotSize={7}
          gap={15}
          baseColor="#271E37"
          activeColor="#5227FF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* App Content */}
      <div className="relative z-10">
        <Navbar />

        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />

          {/* Auth */}
          <Route
            path="/login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />




          <Route
            path="/forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />

          <Route
            path="/update-password/:id"
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
          />


          <Route
            path="/signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />

            <Route
            path="/verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />


<Route path="*" element={<Error />} />

        </Routes>
      </div>
    </div>
  )
}

export default App
