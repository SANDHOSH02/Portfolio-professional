import { Routes, Route } from 'react-router-dom'
import { ModeProvider } from './context/ModeContext'
import HomePage from './pages/HomePage'
import OtherSidePage from './pages/OtherSidePage'
import BusinessLayout from './pages/business/BusinessLayout'
import BusinessHome from './pages/business/BusinessHome'
import Services from './pages/business/Services'
import BusinessProjects from './pages/business/BusinessProjects'
import Pricing from './pages/business/Pricing'
import Testimonials from './pages/business/Testimonials'
import Contact from './pages/business/Contact'
import './styles/index.css'
import './styles/business.css'

function App() {
  return (
    <ModeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/other-side" element={<OtherSidePage />} />
        <Route path="/business" element={<BusinessLayout />}>
          <Route index element={<BusinessHome />} />
          <Route path="services" element={<Services />} />
          <Route path="projects" element={<BusinessProjects />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </ModeProvider>
  )
}

export default App
