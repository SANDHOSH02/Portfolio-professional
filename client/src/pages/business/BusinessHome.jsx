import { Link } from 'react-router-dom'

export default function BusinessHome() {
  return (
    <section className="business-home">
      <div className="business-hero">
        <h1>
          Building <span>Digital Experiences</span> for Your Business
        </h1>
        <p>
          Professional web development for construction companies, retail shops,
          colleges, schools, and small businesses. From concept to launch, I
          craft websites that drive results.
        </p>
        <div className="business-hero-ctas">
          <Link to="/business/services" className="btn-primary">View Services</Link>
          <Link to="/business/contact" className="btn-outline">Get a Quote</Link>
        </div>
      </div>

      <div className="business-highlights">
        <div className="highlight-card">
          <span className="highlight-icon">&#9881;</span>
          <h3>Construction Sites</h3>
          <p>Portfolio showcases, project galleries, and lead generation for contractors and builders.</p>
        </div>
        <div className="highlight-card">
          <span className="highlight-icon">&#128722;</span>
          <h3>Shops &amp; Retail</h3>
          <p>E-commerce storefronts, product catalogs, and online ordering systems.</p>
        </div>
        <div className="highlight-card">
          <span className="highlight-icon">&#127979;</span>
          <h3>Colleges &amp; Schools</h3>
          <p>Admissions portals, booking systems, event pages, and student dashboards.</p>
        </div>
      </div>
    </section>
  )
}
