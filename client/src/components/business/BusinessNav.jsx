import { NavLink } from 'react-router-dom'

export default function BusinessNav() {
  return (
    <nav className="business-nav">
      <NavLink to="/business" end>Home</NavLink>
      <NavLink to="/business/services">Services</NavLink>
      <NavLink to="/business/projects">Projects</NavLink>
      <NavLink to="/business/pricing">Pricing</NavLink>
      <NavLink to="/business/testimonials">Testimonials</NavLink>
      <NavLink to="/business/contact">Contact</NavLink>
    </nav>
  )
}
