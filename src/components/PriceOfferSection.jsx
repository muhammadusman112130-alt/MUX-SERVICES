import { useState, useEffect, useRef } from 'react'
import './PriceOfferSection.css'
import joinBannerImg from '../assets/join-pro-banner.jpg'

function PriceOfferSection({ setCurrentPage }) {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleScrollObserver = (entries) => {
      entries.forEach((entry) => {
        // Toggle in-view state so whenever user scrolls into it from top OR bottom,
        // it triggers the smooth opening animation flow every time.
        if (entry.isIntersecting) {
          setIsInView(true)
        } else {
          setIsInView(false)
        }
      })
    }

    const observer = new IntersectionObserver(handleScrollObserver, {
      threshold: 0.15,
      rootMargin: '-30px 0px -30px 0px'
    })

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
      className={`pro-join-section ${isInView ? 'is-in-view' : 'is-out-view'}`} 
      aria-label="Join as a Service Provider"
    >
      {/* Laser Light Beams: Expand from center on scroll open */}
      <div className="pro-laser-beam beam-top" aria-hidden="true"></div>
      <div className="pro-laser-beam beam-bottom" aria-hidden="true"></div>

      {/* Generated Custom Background Image Layer (Crisp, High-Res, NOT from Public folder) */}
      <div 
        className="pro-join-bg-layer"
        style={{ backgroundImage: `url("${joinBannerImg}")` }}
        aria-hidden="true"
      ></div>
      <div className="pro-join-overlay" aria-hidden="true"></div>

      {/* Ambient glowing background accent orbs */}
      <div className="pro-join-orb orb-left" aria-hidden="true"></div>
      <div className="pro-join-orb orb-right" aria-hidden="true"></div>

      <div className="container">
        <div className="pro-join-content">
          {/* Left Column: Unfolds and expands into view */}
          <div className="pro-join-text-col">
            <div className="pro-pill-badge anim-open anim-delay-1">
              <span className="pro-pill-pulse"></span>
              <span>MULTAN'S PREMIER PROVIDER NETWORK</span>
            </div>

            <h2 className="pro-join-title anim-open anim-delay-2">
              Empower Your Trade — <span className="highlight-cyan">Join as a Verified Service Professional</span>
            </h2>

            <p className="pro-join-description anim-open anim-delay-3">
              Are you a certified electrician, plumber, carpenter, AC &amp; HVAC specialist, painter, or home repair expert? 
              Partner with Multan's fastest-growing on-demand network. Get direct daily bookings from trusted homeowners, 
              earn upfront with zero hidden cuts, and scale your trade with verified professional credibility.
            </p>

            {/* 4 Benefit Cards: Accordion-style unfold flow */}
            <div className="pro-benefits-grid">
              <div className="pro-benefit-item anim-card-unfold anim-delay-4">
                <div className="benefit-icon-box">⚡</div>
                <div className="benefit-text-wrap">
                  <h4 className="benefit-title">Instant Job Leads</h4>
                  <p className="benefit-desc">Receive real-time customer requests across Multan straight to your device.</p>
                </div>
              </div>

              <div className="pro-benefit-item anim-card-unfold anim-delay-5">
                <div className="benefit-icon-box">💰</div>
                <div className="benefit-text-wrap">
                  <h4 className="benefit-title">Transparent Earnings</h4>
                  <p className="benefit-desc">Set competitive rates, bid fairly, and retain 100% of your agreed price.</p>
                </div>
              </div>

              <div className="pro-benefit-item anim-card-unfold anim-delay-6">
                <div className="benefit-icon-box">🛡️</div>
                <div className="benefit-text-wrap">
                  <h4 className="benefit-title">Verified Pro Badge</h4>
                  <p className="benefit-desc">Build trust with police-verified badges and authenticated customer reviews.</p>
                </div>
              </div>

              <div className="pro-benefit-item anim-card-unfold anim-delay-7">
                <div className="benefit-icon-box">📱</div>
                <div className="benefit-text-wrap">
                  <h4 className="benefit-title">Smart Digital Hub</h4>
                  <p className="benefit-desc">Manage schedules, active bookings, and customer chats all in one portal.</p>
                </div>
              </div>
            </div>

            <div className="pro-cta-actions anim-open anim-delay-8">
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

          {/* Right Column: 3D Door / Portal Open Animation */}
          <div className="pro-join-visual-col">
            <div className="pro-stats-card anim-3d-door-open">
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
