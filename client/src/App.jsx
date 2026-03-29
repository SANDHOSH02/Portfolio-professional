import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import OtherSidePage from './pages/OtherSidePage'
import './styles/index.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/other-side" element={<OtherSidePage />} />
    </Routes>
  )
}

export default App
