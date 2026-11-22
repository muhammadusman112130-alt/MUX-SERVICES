import { useState } from 'react'
import { contactAPI } from '../services/api'
import './Contact.css'

function Contact({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    locality: 'Bosan Road',
    subject: 'electrical',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
    if (errorMessage) setErrorMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Email, and Message).')
      return
    }

    try {
      setIsSubmitting(true)
      setErrorMessage('')
      await contactAPI.send(formData)
      setIsSubmitted(true)
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        locality: 'Bosan Road',
        subject: 'electrical',
        message: ''
      })
    } catch (err) {
      setErrorMessage(err.message || 'Failed to send message. Please reach our 24/7 helpline.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleFaq = (index) => {
    setOpenFaqIndex(prev => (prev === index ? -1 : index))
  }

  const handleServicesNav = () => {
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('services')
    }
  }

  const faqList = [
    {
      q: 'How quickly can a verified technician reach my address in Multan?',
      a: 'Our intelligent locality dispatch routes technicians across Cantt, Bosan Road, Gulgasht, Shah Rukn-e-Alam, Model Town, and Suraj Miani. In emergency situations, our verified specialists arrive at your doorstep in under 30 minutes with calibrated diagnostic tools.'
    },
    {
      q: 'Are repair prices fixed upfront or do technicians charge extra at the doorstep?',
      a: 'MUX SERVICES enforces 100% upfront pricing transparency. Before any work begins, technicians provide a standardized, agreed diagnostic estimate based on our official rate card. There are zero hidden doorstep surcharges or arbitrary street bargaining.'
    },
    {
      q: 'How does MUX Services verify technician identity and safety?',
      a: 'Every technician on our platform undergoes rigorous National Identity Card (CNIC) authentication, criminal record verification with local law enforcement, and certified hands-on trade skills testing before visiting any home.'
    },
    {
      q: 'What should I do if an emergency electrical or plumbing issue happens at night?',
      a: 'We operate an active 24/7 emergency dispatch helpline across Multan. You can call our emergency hotline at 061-4587700 or message our WhatsApp desk for on-call night technicians.'
    },
    {
      q: 'Can I request an advance quotation for home renovation or commercial maintenance?',
      a: 'Yes! Select "Corporate & Commercial Maintenance" or "General Inquiry" in the contact form, or connect with our support desk. We provide comprehensive itemized billings and corporate SLA proposals.'
    }
  ]

  return (
    <main className="contact-page">
      <div className="contact-container">
        {/* ── HEADER / HERO ── */}
        <header className="contact-header">
          <div className="contact-badge">
            <span className="contact-badge-dot"></span>
            <span>MULTAN CUSTOMER CARE &amp; EMERGENCY DISPATCH</span>
          </div>
          <h1 className="contact-title">
            Direct Contact &amp; Technical Support For <span className="contact-title-shine">Multan Homes.</span>
          </h1>
          <p className="contact-description">
            Need doorstep technical support, certified contractor dispatch, or upfront estimate assistance?
            MUX SERVICES connects Multan residents with institutional-grade customer care across Cantt, Bosan Road,
            Gulgasht, Shah Rukn-e-Alam, Model Town, and surrounding sectors.
          </p>
        </header>

        {/* ── QUICK CONTACT ACCESS STRIP ── */}
        <section className="contact-quick-strip" aria-label="Quick Emergency Channels">
          <div className="quick-strip-card">
            <span className="quick-strip-icon">⚡</span>
            <div className="quick-strip-info">
              <span className="quick-strip-label">24/7 Emergency Line</span>
              <a href="tel:+92614587700" className="quick-strip-val">061-4587700</a>
            </div>
          </div>

          <div className="quick-strip-div"></div>

          <div className="quick-strip-card">
            <span className="quick-strip-icon">💬</span>
            <div className="quick-strip-info">
              <span className="quick-strip-label">WhatsApp Live Desk</span>
              <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="quick-strip-val">
                +92 300 1234567
              </a>
            </div>
          </div>

          <div className="quick-strip-div"></div>

          <div className="quick-strip-card">
            <span className="quick-strip-icon">⏱️</span>
            <div className="quick-strip-info">
              <span className="quick-strip-label">Average Response Time</span>
              <span className="quick-strip-val highlight-val">&lt; 15 Minutes</span>
            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT GRID (FORM + INFO) ── */}
        <div className="contact-content-grid">
          {/* Left Column: Direct Message Form */}
          <section className="contact-form-section" aria-labelledby="form-heading">
            <div className="form-section-header">
              <h2 id="form-heading" className="form-title">Send Us A Direct Message</h2>
              <p className="form-subtitle">
                Fill out your details below and our Multan support desk will connect with you promptly.
              </p>
            </div>

            {isSubmitted && (
              <div className="contact-alert success" role="alert">
                <span className="alert-icon">✓</span>
                <div>
                  <strong>Thank you! Your message has been received.</strong>
                  <p>Our Multan technical support team will contact you within 15 minutes.</p>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="contact-alert error" role="alert">
                <span className="alert-icon">⚠️</span>
                <div>
                  <strong>Incomplete Information</strong>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row-two">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="e.g. Tariq Mehmood"
                    className="form-input"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    aria-required="true"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="e.g. 0300-1234567"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row-two">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="e.g. tariq@gmail.com"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="locality">Multan Sector / Locality</label>
                  <select
                    id="locality"
                    name="locality"
                    className="form-select"
                    value={formData.locality}
                    onChange={handleChange}
                  >
                    <option value="Bosan Road">Bosan Road</option>
                    <option value="Multan Cantt">Multan Cantt</option>
                    <option value="Gulgasht Colony">Gulgasht Colony</option>
                    <option value="Shah Rukn-e-Alam">Shah Rukn-e-Alam</option>
                    <option value="Model Town">Model Town</option>
                    <option value="Mumtazabad">Mumtazabad</option>
                    <option value="Northern Bypass">Northern Bypass</option>
                    <option value="Suraj Miani">Suraj Miani</option>
                    <option value="New Multan">New Multan</option>
                    <option value="Other Area">Other Multan Area</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Service Category / Inquiry Type</label>
                <select
                  id="subject"
                  name="subject"
                  className="form-select"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="electrical">Electrician &amp; Inverter Troubleshooting</option>
                  <option value="plumbing">Plumbing &amp; Concealed Leak Detection</option>
                  <option value="ac-hvac">Air Conditioner Repair &amp; Chemical Wash</option>
                  <option value="carpentry">Carpentry &amp; Doorstep Furniture Fitting</option>
                  <option value="cleaning">Home Deep Cleaning &amp; Sanitization</option>
                  <option value="emergency">Emergency Midnight Technical Breakdown</option>
                  <option value="corporate">Corporate &amp; Commercial Maintenance</option>
                  <option value="general">General Inquiry &amp; Feedback</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message &amp; Issue Details *</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Describe your requirement, issue symptoms, or preferred visit timing..."
                  className="form-textarea"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-required="true"
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="btn-spinner-wrap">
                    <span className="btn-spinner"></span>
                    <span>Sending Your Message...</span>
                  </span>
                ) : (
                  <span>Send Direct Message →</span>
                )}
              </button>
            </form>
          </section>

          {/* Right Column: Contact Cards & Locality Coverage */}
          <aside className="contact-info-section" aria-label="Direct Contact Channels">
            <h2 className="info-section-title">Multan Central Help Desks</h2>

            <article className="contact-card">
              <div className="card-top-row">
                <span className="card-icon">📞</span>
                <span className="card-tag">24/7 Direct</span>
              </div>
              <h3 className="card-title">Helpline &amp; WhatsApp</h3>
              <p className="card-description">
                Reach our emergency dispatch coordinators anytime for immediate technician assignment.
              </p>
              <div className="contact-links-group">
                <a href="tel:+92614587700" className="card-link">
                  ☎ 061-4587700
                </a>
                <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="card-link whatsapp-link">
                  💬 +92 300 1234567 (WhatsApp)
                </a>
              </div>
            </article>

            <article className="contact-card">
              <div className="card-top-row">
                <span className="card-icon">📧</span>
                <span className="card-tag">Official Desk</span>
              </div>
              <h3 className="card-title">Official Inquiries &amp; Billing</h3>
              <p className="card-description">
                For corporate service proposals, verified invoices, and provider onboarding inquiries.
              </p>
              <a href="mailto:support@muxservices.pk" className="card-link">
                ✉ support@muxservices.pk
              </a>
            </article>

            <article className="contact-card">
              <div className="card-top-row">
                <span className="card-icon">📍</span>
                <span className="card-tag">Headquarters</span>
              </div>
              <h3 className="card-title">Multan Operations Hub</h3>
              <address className="contact-address">
                <p>Plot 42-B, Commercial Avenue, Bosan Road,</p>
                <p>Near Chungi No. 9, Multan, Punjab, Pakistan.</p>
              </address>
              <div className="operations-chip">
                <span className="chip-dot"></span>
                <span>Operating Hours: Mon – Sun, 8:00 AM – 11:00 PM</span>
              </div>
            </article>

            <div className="locality-coverage-box">
              <h3 className="coverage-title">Full Locality Coverage</h3>
              <p className="coverage-text">
                Cantt • Bosan Road • Gulgasht • Shah Rukn-e-Alam • Model Town • Suraj Miani • New Multan • Mumtazabad • Northern Bypass
              </p>
            </div>
          </aside>
        </div>

        {/* ── INTERACTIVE FAQ SECTION ── */}
        <section className="faq-section" aria-labelledby="faq-heading">
          <div className="faq-header-center">
            <span className="faq-badge">INSTANT CLARITY</span>
            <h2 id="faq-heading" className="faq-title">Frequently Asked Questions</h2>
            <p className="faq-subtitle">
              Quick answers to help you navigate doorstep bookings, verified technician credentials, and payment processes.
            </p>
          </div>

          <div className="faq-accordion-list">
            {faqList.map((faq, index) => {
              const isOpen = openFaqIndex === index
              return (
                <div
                  key={index}
                  className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-q-text">{faq.q}</span>
                    <span className="faq-chevron" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer-pane">
                      <p className="faq-answer-text">{faq.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="faq-cta-wrap">
            <p className="faq-cta-text">Have a specific technical requirement or need instant assistance?</p>
            <button
              type="button"
              className="faq-action-btn"
              onClick={handleServicesNav}
            >
              Explore All Verified Services →
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Contact