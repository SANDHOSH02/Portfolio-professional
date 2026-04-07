import { Outlet } from 'react-router-dom'
import Logo from '../../components/Logo'
import ModeToggle from '../../components/ModeToggle'
import BusinessNav from '../../components/business/BusinessNav'

export default function BusinessLayout() {
  return (
    <div className="business-mode">
      <header className="business-header">
        <Logo />
        <BusinessNav />
        <ModeToggle />
      </header>
      <main className="business-main">
        <Outlet />
      </main>
      <footer className="business-footer">
        <p>&copy; {new Date().getFullYear()} Sandhosh — Freelance Web Development</p>
      </footer>
    </div>
  )
}
