import './CallToActionSection.css'

function CallToActionSection({ setCurrentPage }) {
  const handleProviderDashboardClick = () => {
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('provider-login')
    }
  }

  const handleLearnMoreClick = () => {
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('about')
    }
  }

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Are You a Skilled Professional?</h2>
          <p className="cta-description">
            Join our platform and connect with thousands of customers looking for your services.
            Grow your business and increase your earnings today.
          </p>
          <div className="cta-buttons">
            <button className="cta-primary" onClick={handleProviderDashboardClick}>Join as Professional</button>
            <button className="cta-secondary" onClick={handleLearnMoreClick}>Learn More</button>
          </div>
          <div className="cta-stats">
            <div className="cta-stat">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Active Professionals</span>
            </div>
            <div className="cta-stat">
              <span className="stat-number">$5M+</span>
              <span className="stat-label">Earned Monthly</span>
            </div>
            <div className="cta-stat">
              <span className="stat-number">95%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToActionSection
