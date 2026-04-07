import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Custom Website Development',
    desc: 'Fully responsive, hand-crafted websites tailored to your brand and business goals.',
    tags: ['React', 'Vite', 'Responsive'],
  },
  {
    title: 'E-Commerce Solutions',
    desc: 'Online stores with product management, payment integration, and inventory tracking.',
    tags: ['Shopify', 'Stripe', 'Cart'],
  },
  {
    title: 'Booking & Scheduling Systems',
    desc: 'Appointment and event booking platforms for schools, clinics, and service businesses.',
    tags: ['Calendar', 'Notifications', 'Admin'],
  },
  {
    title: 'Portfolio & Gallery Sites',
    desc: 'Showcase construction projects, design work, or products with stunning visual layouts.',
    tags: ['Gallery', 'Lightbox', 'SEO'],
  },
  {
    title: 'Website Maintenance & Support',
    desc: 'Ongoing updates, security patches, performance monitoring, and content changes.',
    tags: ['Hosting', 'SSL', 'Backups'],
  },
  {
    title: 'SEO & Performance Optimization',
    desc: 'Speed optimization, search engine visibility, and analytics integration.',
    tags: ['Lighthouse', 'Analytics', 'Core Web Vitals'],
  },
]

export default function Services() {
  return (
    <section className="business-services">
      <h2><span>#</span>Services</h2>
      <p className="section-subtitle">What I can build for your business</p>
      <div className="services-grid">
        {services.map((s) => (
          <div className="service-card" key={s.title}>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <div className="service-tags">
              {s.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
      <div className="services-cta">
        <Link to="/business/contact" className="btn-primary">Discuss Your Project</Link>
      </div>
    </section>
  )
}
