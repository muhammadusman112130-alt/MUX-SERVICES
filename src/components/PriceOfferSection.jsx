import { useState, useEffect, useRef } from 'react'
import './PriceOfferSection.css'
import proBannerImg from '../Public/home repair services .png'

function PriceOfferSection({ setCurrentPage }) {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.12 }
    )

    const currentElem = sectionRef.current
    if (currentElem) {
      observer.observe(currentElem)
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem)
      }
    }
  }, [])

  const handleJoinClick = () => {
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('provider-login')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleLearnMore = () => {
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('about')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className={`pro-join-section ${isInView ? 'is-in-view' : ''}`} 
      aria-label="Join as a Service Provider"
    >
      {/* Background visual image — now crisp & clearly visible */}
      <div 
        className="pro-join-bg-layer"
        style={{ backgroundImage: `url("${proBannerImg}")` }}
        aria-hidden="true"
      ></div>
      <div className="pro-join-overlay" aria-hidden="true"></div>

      {/* Ambient background glowing orbs */}
      <div className="pro-join-orb orb-left" aria-hidden="true"></div>
      <div className="pro-join-orb orb-right" aria-hidden="true"></div>

      <div className="container">
        <div className="pro-join-content">
          {/* Left Column: Information & Call to Action (Animated flow) */}
          <div className="pro-join-text-col">
            <div className="pro-pill-badge flow-item flow-delay-1">
              <span className="pro-pill-pulse"></span>
              <span>MULTAN'S PREMIER PROVIDER NETWORK</span>
            </div>

            <h2 className="pro-join-title flow-item flow-delay-2">
              Empower Your Trade — <span className="highlight-cyan">Join as a Verified Service Professional</span>
            </h2>

            <p className="pro-join-description flow-item flow-delay-3">
              Are you a certified electrician, plumber, carpenter, AC &amp; HVAC specialist, painter, or home repair expert? 
              Partner with Multan's fastest-growing on-demand network. Get direct daily bookings from trusted homeowners, 
              earn upfront with zero hidden cuts, and scale your trade with verified professional credibility.
            </p>

            <div className="pro-benefits-grid">
              <div className="pro-benefit-item flow-item flow-delay-4">
                <div className="benefit-icon-box">⚡</div>
                <div className="benefit-text-wrap">
                  <h4 className="benefit-title">Instant Job Leads</h4>
                  <p className="benefit-desc">Receive real-time customer requests across Multan straight to your device.</p>
                </div>
              </div>

              <div className="pro-benefit-item flow-item flow-delay-5">
                <div className="benefit-icon-box">💰</div>
                <div className="benefit-text-wrap">
                  <h4 className="benefit-title">Transparent Earnings</h4>
                  <p className="benefit-desc">Set competitive rates, bid fairly, and retain 100% of your agreed price.</p>
                </div>
              </div>

              <div className="pro-benefit-item flow-item flow-delay-6">
                <div className="benefit-icon-box">🛡️</div>
                <div className="benefit-text-wrap">
                  <h4 className="benefit-title">Verified Pro Badge</h4>
                  <p className="benefit-desc">Build trust with police-verified badges and authenticated customer reviews.</p>
                </div>
              </div>

              <div className="pro-benefit-item flow-item flow-delay-7">
                <div className="benefit-icon-box">📱</div>
                <div className="benefit-text-wrap">
                  <h4 className="benefit-title">Smart Digital Hub</h4>
                  <p className="benefit-desc">Manage schedules, active bookings, and customer chats all in one portal.</p>
                </div>
              </div>
            </div>

            <div className="pro-cta-actions flow-item flow-delay-8">
              <button 
                type="button" 
                className="pro-primary-btn"
                onClick={handleJoinClick}
              >
                <span>Join as Professional</span>
                <span className="btn-arrow">→</span>
              </button>

              <button 
                type="button" 
                className="pro-secondary-btn"
                onClick={handleLearnMore}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Column: Animated Stats Showcase Card (Opens with 3D perspective unfold) */}
          <div className="pro-join-visual-col">
            <div className="pro-stats-card flow-item flow-card">
              <div className="pro-card-header">
                <span className="badge-tag">Service Provider Portal</span>
                <div className="live-pulse-chip">
                  <span className="live-dot"></span>
                  <span>Registrations Open</span>
                </div>
              </div>

              <div className="pro-stat-metrics">
                <div className="metric-box">
                  <span className="metric-num">PKR 75,000+</span>
                  <span className="metric-label">Average Monthly Pro Earnings</span>
                </div>

                <div className="metric-box">
                  <span className="metric-num">4,800+</span>
                  <span className="metric-label">Verified Jobs Dispatched Monthly</span>
                </div>

                <div className="metric-box highlight">
                  <span className="metric-num">4.9 / 5.0</span>
                  <span className="metric-label">Technician Satisfaction Rating</span>
                </div>
              </div>

              <div className="pro-card-quote">
                <p>
                  &ldquo;Joining MUX SERVICES helped me get daily bookings without middleman commissions. 
                  My weekly income doubled in just two months!&rdquo;
                </p>
                <div className="quote-author">
                  <span className="author-avatar">🔧</span>
                  <div className="author-details">
                    <strong>Muhammad Rafiq</strong>
                    <span>Master Electrician • Multan Cantt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PriceOfferSection
