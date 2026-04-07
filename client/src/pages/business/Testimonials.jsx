const testimonials = [
  {
    name: 'Rajesh K.',
    role: 'Owner, BuildRight Contractors',
    quote: 'Sandhosh delivered a stunning website that perfectly showcases our construction projects. Inquiries tripled within the first month!',
  },
  {
    name: 'Priya M.',
    role: 'Director, Greenfield Academy',
    quote: 'The admissions portal transformed our enrollment process. Parents love the intuitive interface and real-time application tracking.',
  },
  {
    name: 'Arjun S.',
    role: 'Founder, FreshMart Groceries',
    quote: 'Our online store was up and running in weeks. The ordering system is seamless and our customers keep coming back.',
  },
  {
    name: 'Deepa R.',
    role: 'Manager, StyleHouse Boutique',
    quote: 'The e-commerce site exceeded our expectations. Clean design, fast load times, and sales have been growing steadily.',
  },
]

export default function Testimonials() {
  return (
    <section className="business-testimonials">
      <h2><span>#</span>Testimonials</h2>
      <p className="section-subtitle">What clients say about working with me</p>

      <div className="testimonials-grid">
        {testimonials.map((t) => (
          <div className="testimonial-card" key={t.name}>
            <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
            <div className="testimonial-author">
              <strong>{t.name}</strong>
              <span>{t.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
