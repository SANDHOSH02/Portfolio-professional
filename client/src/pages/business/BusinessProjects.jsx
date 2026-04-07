import { useState } from 'react'

const categories = ['All', 'Construction', 'Shops', 'Colleges']

const projects = [
  {
    title: 'BuildRight Contractors',
    category: 'Construction',
    desc: 'Full-stack project portfolio with interactive gallery, lead capture, and admin dashboard.',
    outcome: '3x more monthly inquiries after launch.',
  },
  {
    title: 'SteelFrame Builders',
    category: 'Construction',
    desc: 'Responsive showcase of completed builds with before/after sliders and client testimonials.',
    outcome: 'Reduced bounce rate by 45%.',
  },
  {
    title: 'FreshMart Groceries',
    category: 'Shops',
    desc: 'E-commerce site with product catalog, online ordering, and delivery scheduling.',
    outcome: '200+ online orders in the first month.',
  },
  {
    title: 'StyleHouse Boutique',
    category: 'Shops',
    desc: 'Modern storefront with lookbook gallery, size guides, and Stripe checkout.',
    outcome: '60% increase in online sales.',
  },
  {
    title: 'Greenfield Academy',
    category: 'Colleges',
    desc: 'Admissions portal with application tracking, event calendar, and parent dashboard.',
    outcome: 'Streamlined admissions process, 2x applications.',
  },
  {
    title: 'TechBridge Institute',
    category: 'Colleges',
    desc: 'Course catalog, student booking system, and faculty pages with blog integration.',
    outcome: 'Improved student engagement by 35%.',
  },
]

export default function BusinessProjects() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <section className="business-projects">
      <h2><span>#</span>Projects &amp; Case Studies</h2>
      <p className="section-subtitle">Real results for real businesses</p>

      <div className="project-filters">
        {categories.map((c) => (
          <button
            key={c}
            className={`filter-btn ${active === c ? 'active' : ''}`}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filtered.map((p) => (
          <div className="project-card" key={p.title}>
            <div className="project-card-category">{p.category}</div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="project-outcome">
              <strong>Result:</strong> {p.outcome}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
