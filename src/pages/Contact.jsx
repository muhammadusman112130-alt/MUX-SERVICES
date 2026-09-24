import { useState } from 'react'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'general',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
    if (errorMessage) setErrorMessage('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.')
      return
    }
    setErrorMessage('')
    setIsSubmitted(true)
    setFormData({
      fullName: '',
      email: '',
      subject: 'general',
      message: ''
    })
  }

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-description">
            We're here to help. Reach out to our support team for any inquiries, 
            partnership requests, or technical assistance.
          </p>
        </div>

        {/* Main Content */}
        <div className="contact-content">
          {/* Left Column - Form */}
          <div className="contact-form-section">
            <h2 className="form-title">Send us a message</h2>
            {isSubmitted && (
              <div style={{ padding: '0.85rem 1rem', marginBottom: '1.25rem', background: '#ecfdf5', color: '#065f46', borderRadius: '10px', border: '1px solid #a7f3d0', fontSize: '0.9rem', fontWeight: 600 }}>
                ✓ Thank you! Your message was validated locally for this demo. No email was sent.
              </div>
            )}
            {errorMessage && (
              <div style={{ padding: '0.75rem 1rem', marginBottom: '1.25rem', background: '#fef2f2', color: '#991b1b', borderRadius: '10px', border: '1px solid #fecaca', fontSize: '0.88rem' }}>
                ⚠️ {errorMessage}
              </div>
            )}
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input 
                  type="text" 
                  id="fullName" 
                  placeholder="John Doe" 
                  className="form-input"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="john@example.com" 
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select id="subject" className="form-select" value={formData.subject} onChange={handleChange}>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  placeholder="How can we help you today?" 
                  className="form-textarea"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>

          {/* Right Column - Contact Info */}
          <div className="contact-info-section">
            <div className="contact-card">
              <div className="card-icon">📧</div>
              <h3 className="card-title">Email Us</h3>
              <p className="card-description">For general inquiries</p>
              <a href="mailto:support@servicehub.com" className="card-link">
                support@servicehub.com
              </a>
            </div>

            <div className="contact-card">
              <div className="card-icon">📞</div>
              <h3 className="card-title">Call Us</h3>
              <p className="card-description">Mon-Fri, 9am-6pm</p>
              <a href="tel:+1234567890" className="card-link">
                +1 (234) 567-890
              </a>
            </div>

            <div className="contact-card">
              <div className="card-icon">📍</div>
              <h3 className="card-title">Headquarters</h3>
              <p className="card-description">123 Tech Boulevard</p>
              <p className="card-description">Innovation Park</p>
              <p className="card-description">Multan, Pakistan</p>
              <div className="map-placeholder">
                <span className="map-icon">🗺️</span>
                <span className="map-text">Map View</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <div className="faq-content">
            <h2 className="faq-title">Looking for quick answers?</h2>
            <p className="faq-description">
              Check our detailed Help Center and FAQs for instant solutions.
            </p>
            <button className="faq-button">Visit FAQ</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
