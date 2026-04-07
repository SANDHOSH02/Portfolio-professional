import { useState } from 'react'

const projectTypes = [
  'Construction / Builder Site',
  'Shop / E-Commerce',
  'College / School Portal',
  'Small Business Website',
  'Other',
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', projectType: '', message: '' })
  const [status, setStatus] = useState(null) // 'success' | 'error' | null

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(null)

    try {
      // Webhook placeholder — replace with your actual endpoint
      const webhookUrl = import.meta.env.VITE_CONTACT_WEBHOOK || ''
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      }
      setStatus('success')
      setForm({ name: '', email: '', projectType: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="business-contact">
      <h2><span>#</span>Get In Touch</h2>
      <p className="section-subtitle">Tell me about your project and I will get back to you within 24 hours</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="projectType">Project Type</label>
          <select
            id="projectType"
            name="projectType"
            required
            value={form.projectType}
            onChange={handleChange}
          >
            <option value="">Select a project type</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows="5"
            value={form.message}
            onChange={handleChange}
            placeholder="Describe your project..."
          />
        </div>

        <button type="submit" className="btn-primary">Send Message</button>

        {status === 'success' && (
          <p className="form-status success">Thanks! I will be in touch soon.</p>
        )}
        {status === 'error' && (
          <p className="form-status error">Something went wrong. Please try again.</p>
        )}
      </form>
    </section>
  )
}
