import { Link } from 'react-router-dom'

const tiers = [
  {
    name: 'Starter',
    price: '$499',
    features: [
      'Single-page responsive site',
      'Contact form integration',
      'Mobile-friendly design',
      'Basic SEO setup',
      '1 round of revisions',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$1,299',
    features: [
      'Multi-page website (up to 6 pages)',
      'Custom design & animations',
      'E-commerce or booking system',
      'SEO & analytics integration',
      'CMS for easy updates',
      '3 rounds of revisions',
    ],
    cta: 'Most Popular',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Fully custom web application',
      'Admin dashboard & CMS',
      'API integrations',
      'Priority support & maintenance',
      'Performance optimization',
      'Unlimited revisions',
    ],
    cta: 'Contact Me',
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section className="business-pricing">
      <h2><span>#</span>Pricing</h2>
      <p className="section-subtitle">Transparent packages for every budget</p>

      <div className="pricing-grid">
        {tiers.map((tier) => (
          <div className={`pricing-card ${tier.highlighted ? 'highlighted' : ''}`} key={tier.name}>
            {tier.highlighted && <div className="pricing-badge">Popular</div>}
            <h3>{tier.name}</h3>
            <div className="pricing-amount">{tier.price}</div>
            <ul>
              {tier.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Link to="/business/contact" className="btn-primary">{tier.cta}</Link>
          </div>
        ))}
      </div>
    </section>
  )
}
