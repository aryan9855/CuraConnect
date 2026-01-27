import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import DotGrid from './components/DotGrid'
import Navbar from './components/core/HomePage/common/Navbar'


function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col font-inter relative bg-richblack-900">
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
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
      <div className="relative z-10">
        <Navbar/>
        <Routes>
          <Route path ="/" element={<Home/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
