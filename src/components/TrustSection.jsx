import './TrustSection.css'

function TrustSection() {
  const services = [
    { icon: '🛡️', title: 'Verified Professionals', description: 'All professionals are background checked and verified' },
    { icon: '💰', title: 'Fair Pricing', description: 'Transparent pricing with no hidden charges' },
    { icon: '⏰', title: '24/7 Support', description: 'Round the clock customer support for all your needs' },
    { icon: '✅', title: 'Satisfaction Guaranteed', description: '100% satisfaction guarantee or your money back' },
  ]

  return (
    <section className="trust-section">
      <div className="container">
        <h2 className="section-title">Services You Can Trust</h2>
        <p className="section-subtitle">Why choose us for your service needs</p>
        <div className="trust-grid">
          {services.map((service, index) => (
            <div key={index} className="trust-card">
              <div className="trust-icon">{service.icon}</div>
              <h3 className="trust-title">{service.title}</h3>
              <p className="trust-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustSection
