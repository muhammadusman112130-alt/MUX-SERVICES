import './TrustSection.css'

function TrustSection() {
  const services = [
    { 
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <polyline points="9 12 11 14 15 10"></polyline>
        </svg>
      ),
      title: 'Verified Professionals', 
      description: 'All Multan technicians are police background checked and CNIC verified.' 
    },
    { 
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
          <line x1="2" y1="10" x2="22" y2="10"></line>
          <circle cx="12" cy="15" r="2"></circle>
        </svg>
      ),
      title: 'Fair Pricing', 
      description: 'Transparent pricing in PKR with zero hidden surprise charges.' 
    },
    { 
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
      title: '24/7 Support', 
      description: 'Round the clock dedicated customer support for all household needs.' 
    },
    { 
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
      ),
      title: 'Satisfaction Guaranteed', 
      description: '100% service satisfaction guarantee or free inspection resolution.' 
    },
  ]

  return (
    <section className="trust-section">
      <div className="container">
        <h2 className="section-title">Multan Home Services You Can Trust</h2>
        <p className="section-subtitle">Why Multan homeowners choose MUX Services for home repairs &amp; maintenance</p>
        <div className="trust-grid">
          {services.map((service, index) => (
            <div key={index} className="trust-card">
              <div className="trust-icon" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '54px' }}>
                {service.icon}
              </div>
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
