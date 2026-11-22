import './About.css'
import aboutTeamImg from '../assets/about-team-mission.webp'
import aboutCraftImg from '../assets/about-service-craft.webp'

function About({ setCurrentPage }) {
  const coreValues = [
    {
      icon: '🛡️',
      title: 'Absolute Trust & Security',
      description:
        'We strictly screen every technician through National Identity Card (CNIC) authentication, criminal background clearance, and certified trade assessment before they ever step into your home. Your family’s personal privacy, property safety, and peace of mind are non-negotiable fundamentals of our service ecosystem.'
    },
    {
      icon: '🏆',
      title: 'Engineering Excellence',
      description:
        'We refuse temporary quick fixes or unreliable patch-ups. Every technician on MUX Services operates specialized digital testing tools, high-precision multimeters, and acoustic leak detectors, ensuring that root causes are solved permanently with manufacturer-approved spare components and certified craftsmanship.'
    },
    {
      icon: '🤝',
      title: 'Empowering Local Craftsmen',
      description:
        'We believe in elevating Multan’s hardworking technical artisans. By removing exploitative intermediaries and informal day-labor uncertainty, we provide technicians with verified digital identity, fair living income, performance merit, and continuous safety training across every neighborhood.'
    },
    {
      icon: '⏱️',
      title: 'Punctual Doorstep Arrival',
      description:
        'Your time is invaluable. Our intelligent locality dispatch routes technicians across Cantt, Bosan Road, Gulgasht, Shah Rukn-e-Alam, and surrounding sectors to guarantee prompt arrival within 30 minutes, fully geared with the exact specialized tools needed for instant diagnosis and execution.'
    }
  ]

  const handleServicesClick = () => {
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('services')
    }
  }

  const handleJoinProClick = () => {
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('provider-login')
    }
  }

  return (
    <div className="about-page">
      {/* ── HERO SECTION ── */}
      <section className="about-hero">
        <div className="hero-content">
          <div className="about-badge">
            <span className="about-badge-dot"></span>
            <span>MULTAN'S PREMIER VERIFIED SERVICE PLATFORM</span>
          </div>

          <h1 className="hero-title">
            Empowering Multan Homes With{' '}
            <span className="about-title-mint-shine">Certified Technical Craftsmanship.</span>
          </h1>

          <p className="hero-description">
            MUX SERVICES was founded in Multan with a clear vision: to eliminate the stress, uncertainty, and safety concerns of traditional home maintenance. By creating a strictly vetted digital service ecosystem, we bridge the gap between Multan’s most skilled independent technicians and households seeking dependable, transparent doorstep care. Every service booked through our platform is backed by thorough background screening, guaranteed punctual arrival, and fair PKR pricing.
          </p>

          <div className="hero-actions">
            <button type="button" className="hero-primary-btn" onClick={handleServicesClick}>
              Explore Verified Services →
            </button>
            <button type="button" className="hero-secondary-btn" onClick={handleJoinProClick}>
              Join as a Technician
            </button>
          </div>

          {/* Quick Hero Proof Stats */}
          <div className="hero-proof-strip">
            <div className="proof-item">
              <span className="proof-num">12,500+</span>
              <span className="proof-lbl">Jobs Completed</span>
            </div>
            <div className="proof-div"></div>
            <div className="proof-item">
              <span className="proof-num">4.93 / 5</span>
              <span className="proof-lbl">Customer Rating</span>
            </div>
            <div className="proof-div"></div>
            <div className="proof-item">
              <span className="proof-num">100%</span>
              <span className="proof-lbl">Police Vetted</span>
            </div>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="about-image-card main-team-card">
            <img
              src={aboutTeamImg}
              alt="MUX Services Multan Technical Operations Team"
              className="about-feature-img"
            />
            <div className="about-img-overlay">
              <span className="about-img-badge">
                👥 Multan Operations &amp; Certified Technical Leads
              </span>
            </div>
            <div className="floating-trust-pill pill-top-right">
              <span className="pill-pulse"></span>
              <span>⭐ Multan’s #1 Verified Network</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPLETE SERVICE ECOSYSTEM SECTION ── */}
      <section className="har-service-section">
        <div className="section-content">
          <div className="text-content">
            <span className="section-eyebrow">WHY MUX SERVICES</span>
            <h2 className="section-title">Complete Home &amp; Technical Solutions In One Trusted Hub</h2>
            <p className="section-description">
              From emergency midnight electrical short-circuits and complex inverter PCB troubleshooting to concealed plumbing leak detection, carpentry fittings, and sanitizing deep cleans — MUX SERVICES centralizes every residential and commercial maintenance solution into a single, unified digital experience. We remove the uncertainty of unverified street contractors and deliver factory-grade doorstep craftsmanship with standard safety protocols across all Multan localities.
            </p>

            <div className="about-stats-grid">
              <div className="about-stat-box">
                <span className="about-stat-number">12,500+</span>
                <span className="about-stat-label">Verified Jobs Completed</span>
              </div>
              <div className="about-stat-box">
                <span className="about-stat-number">&lt; 30 Mins</span>
                <span className="about-stat-label">Average Multan Arrival</span>
              </div>
              <div className="about-stat-box">
                <span className="about-stat-number">99.2%</span>
                <span className="about-stat-label">On-Time Performance</span>
              </div>
            </div>
          </div>

          <div className="images-grid">
            <div className="about-image-card craft-card">
              <img
                src={aboutCraftImg}
                alt="Doorstep Technical Craftsmanship and Diagnostic Tools"
                className="about-feature-img"
              />
              <div className="about-img-overlay">
                <span className="about-img-badge">
                  🔧 Precision Digital Diagnostic Equipment &amp; Genuine Spares
                </span>
              </div>
              <div className="floating-trust-pill pill-bottom-left">
                <span>✓ 7-Day Satisfaction Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES SECTION ── */}
      <section className="core-values-section">
        <div className="values-header">
          <span className="section-eyebrow">OUR FOUNDATION</span>
          <h2 className="values-title">Core Values That Guide Every Doorstep Visit</h2>
          <p className="values-subtitle">
            The principles upholding customer peace of mind and technician dignity across Multan.
          </p>
        </div>

        <div className="values-grid">
          {coreValues.map((value, index) => (
            <div key={index} className="value-card">
              <div className="value-icon-box">{value.icon}</div>
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAIR PRICING & BIDDING INNOVATION SECTION ── */}
      <section className="fair-pricing-section">
        <div className="pricing-content">
          <div className="pricing-text">
            <span className="pricing-label">TRANSPARENCY GUARANTEED</span>
            <h2 className="pricing-title">Fair Pricing Through Smart Bidding &amp; Agreed Estimates</h2>
            <p className="pricing-description">
              Say goodbye to unexpected add-ons and unreasonable street contractor bargaining. MUX SERVICES empowers you to post your exact repair requirement, receive transparent competitive quotes from certified technicians, compare verified ratings and verified credentials, and hire with total financial confidence.
            </p>
            <ul className="pricing-features">
              <li>
                <span className="feat-check">✓</span>
                <span>Direct upfront pricing with zero hidden doorstep surcharges</span>
              </li>
              <li>
                <span className="feat-check">✓</span>
                <span>Genuine spare parts backed by verified vendor receipts</span>
              </li>
              <li>
                <span className="feat-check">✓</span>
                <span>Free inspection warranty if any issue occurs within 7 days</span>
              </li>
            </ul>
          </div>

          <div className="pricing-visual">
            <div className="bid-card">
              <div className="bid-badge-row">
                <span className="bid-live-pill">
                  <span className="live-pulse-dot"></span> Live Verified Quote
                </span>
                <span className="bid-area-tag">📍 Bosan Road, Multan</span>
              </div>

              <div className="bid-header">
                <div className="bid-avatar">⚡</div>
                <div className="bid-info">
                  <div className="bid-name-row">
                    <h4 className="bid-name">Muhammad Akram</h4>
                    <span className="bid-verified-mark">✓ Vetted</span>
                  </div>
                  <div className="bid-rating">
                    <span className="stars">⭐ 4.95</span>
                    <span className="rating-score">(340 authentic reviews)</span>
                  </div>
                </div>
              </div>

              <div className="bid-body">
                <div className="bid-job-tag">Electrician &amp; Inverter Lead</div>
                <p className="bid-description">
                  Short-circuit diagnosis, DB board circuit breaker replacement &amp; UPS inverter wiring overhaul with digital load testing.
                </p>
                <div className="bid-price-box">
                  <span className="bid-price-lbl">Agreed Estimate:</span>
                  <span className="bid-price">PKR 1,500</span>
                </div>
              </div>

              <button
                type="button"
                className="bid-button"
                onClick={handleServicesClick}
              >
                Hire Verified Professional →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
