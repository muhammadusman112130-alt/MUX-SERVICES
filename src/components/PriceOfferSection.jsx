import { useState, useEffect, useRef } from 'react'
import './PriceOfferSection.css'
import joinBannerImg from '../assets/join-pro-banner.webp'

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
      <style>{`
        [data-theme="warm-stone"] .pro-join-section,
        .theme-warm-stone .pro-join-section {
          background: #FFFFF0 !important;
        }
        [data-theme="warm-stone"] .pro-join-section .pro-join-overlay,
        .theme-warm-stone .pro-join-section .pro-join-overlay {
          display: none !important;
        }
        [data-theme="warm-stone"] .pro-join-section .pro-join-orb,
        .theme-warm-stone .pro-join-section .pro-join-orb {
          display: none !important;
        }
        [data-theme="warm-stone"] .pro-join-section .pro-join-bg-layer,
        .theme-warm-stone .pro-join-section .pro-join-bg-layer {
          opacity: 1 !important;
          filter: brightness(1.02) contrast(1.06) saturate(1.1) !important;
        }
        [data-theme="warm-stone"] .pro-join-section .pro-pill-badge,
        .theme-warm-stone .pro-join-section .pro-pill-badge {
          background: rgba(255, 255, 240, 0.6) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          border: 1.5px solid rgba(10, 10, 10, 0.35) !important;
          color: #0A0A0A !important;
        }
        [data-theme="warm-stone"] .pro-join-section .pro-pill-pulse,
        .theme-warm-stone .pro-join-section .pro-pill-pulse {
          background: #0A0A0A !important;
          box-shadow: 0 0 8px #0A0A0A !important;
        }
        [data-theme="warm-stone"] .pro-join-section .pro-join-title,
        .theme-warm-stone .pro-join-section .pro-join-title,
        [data-theme="warm-stone"] .pro-join-section .highlight-cyan,
        .theme-warm-stone .pro-join-section .highlight-cyan {
          color: #0A0A0A !important;
          text-shadow: 0 0 16px #FFFFF0, 0 0 28px #FFFFF0, 0 2px 4px #FFFFF0 !important;
          font-weight: 900 !important;
        }
        [data-theme="warm-stone"] .pro-join-section .pro-join-description,
        .theme-warm-stone .pro-join-section .pro-join-description {
          color: #0A0A0A !important;
          opacity: 1 !important;
          font-weight: 700 !important;
          text-shadow: 0 0 12px #FFFFF0, 0 0 22px #FFFFF0, 0 1px 4px #FFFFF0 !important;
        }
        [data-theme="warm-stone"] .pro-join-section .pro-benefit-item,
        .theme-warm-stone .pro-join-section .pro-benefit-item {
          background: rgba(255, 255, 240, 0.45) !important;
          backdrop-filter: blur(14px) !important;
          -webkit-backdrop-filter: blur(14px) !important;
          border: 1.5px solid rgba(10, 10, 10, 0.35) !important;
          box-shadow: 0 8px 30px rgba(10, 10, 10, 0.1) !important;
        }
        [data-theme="warm-stone"] .pro-join-section .pro-benefit-item:hover,
        .theme-warm-stone .pro-join-section .pro-benefit-item:hover {
          background: rgba(255, 255, 240, 0.72) !important;
          border-color: #0A0A0A !important;
          box-shadow: 0 12px 36px rgba(10, 10, 10, 0.2) !important;
        }
        [data-theme="warm-stone"] .pro-join-section .benefit-icon-box,
        .theme-warm-stone .pro-join-section .benefit-icon-box {
          background: rgba(255, 255, 240, 0.65) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          border: 1.5px solid rgba(10, 10, 10, 0.35) !important;
          color: #0A0A0A !important;
        }
        [data-theme="warm-stone"] .pro-join-section .benefit-icon-box svg,
        .theme-warm-stone .pro-join-section .benefit-icon-box svg {
          stroke: #0A0A0A !important;
        }
        [data-theme="warm-stone"] .pro-join-section .pro-benefit-item:hover .benefit-icon-box,
        .theme-warm-stone .pro-join-section .pro-benefit-item:hover .benefit-icon-box {
          background: #0A0A0A !important;
          border-color: #0A0A0A !important;
          color: #FFFFF0 !important;
        }
        [data-theme="warm-stone"] .pro-join-section .pro-benefit-item:hover .benefit-icon-box svg,
        .theme-warm-stone .pro-join-section .pro-benefit-item:hover .benefit-icon-box svg {
          stroke: #FFFFF0 !important;
        }
        [data-theme="warm-stone"] .pro-join-section .benefit-title,
        .theme-warm-stone .pro-join-section .benefit-title {
          color: #0A0A0A !important;
          font-weight: 800 !important;
        }
        [data-theme="warm-stone"] .pro-join-section .benefit-desc,
        .theme-warm-stone .pro-join-section .benefit-desc {
          color: #0A0A0A !important;
          opacity: 0.9 !important;
          font-weight: 600 !important;
        }
        [data-theme="warm-stone"] .pro-join-section .pro-primary-btn,
        .theme-warm-stone .pro-join-section .pro-primary-btn {
          background: #0A0A0A !important;
          color: #FFFFF0 !important;
          border: none !important;
          box-shadow: 0 6px 20px rgba(10, 10, 10, 0.25) !important;
        }
        [data-theme="warm-stone"] .pro-join-section .pro-primary-btn:hover,
        .theme-warm-stone .pro-join-section .pro-primary-btn:hover {
          background: #222222 !important;
          color: #FFFFF0 !important;
        }
        [data-theme="warm-stone"] .pro-join-section .pro-secondary-btn,
        .theme-warm-stone .pro-join-section .pro-secondary-btn {
          background: rgba(255, 255, 240, 0.5) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          border: 1.5px solid rgba(10, 10, 10, 0.35) !important;
          color: #0A0A0A !important;
        }
        [data-theme="warm-stone"] .pro-join-section .pro-secondary-btn:hover,
        .theme-warm-stone .pro-join-section .pro-secondary-btn:hover {
          background: #0A0A0A !important;
          color: #FFFFF0 !important;
          border-color: #0A0A0A !important;
        }
        [data-theme="warm-stone"] .pro-join-section .pro-stats-card,
        .theme-warm-stone .pro-join-section .pro-stats-card {
          background: rgba(255, 255, 240, 0.45) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          border: 2px solid rgba(10, 10, 10, 0.35) !important;
          box-shadow: 0 14px 45px rgba(10, 10, 10, 0.14) !important;
        }
        [data-theme="warm-stone"] .pro-join-section .pro-stats-card::before,
        .theme-warm-stone .pro-join-section .pro-stats-card::before {
          background: #0A0A0A !important;
        }
        [data-theme="warm-stone"] .pro-join-section .badge-tag,
        .theme-warm-stone .pro-join-section .badge-tag {
          color: #0A0A0A !important;
          font-weight: 800 !important;
        }
        [data-theme="warm-stone"] .pro-join-section .live-pulse-chip,
        .theme-warm-stone .pro-join-section .live-pulse-chip {
          background: rgba(255, 255, 240, 0.7) !important;
          backdrop-filter: blur(8px) !important;
          border: 1px solid rgba(10, 10, 10, 0.35) !important;
          color: #0A0A0A !important;
          font-weight: 800 !important;
        }
        [data-theme="warm-stone"] .pro-join-section .live-dot,
        .theme-warm-stone .pro-join-section .live-dot {
          background: #0A0A0A !important;
          box-shadow: 0 0 6px #0A0A0A !important;
        }
        [data-theme="warm-stone"] .pro-join-section .metric-box,
        .theme-warm-stone .pro-join-section .metric-box {
          background: rgba(255, 255, 240, 0.55) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          border: 1.5px solid rgba(10, 10, 10, 0.3) !important;
        }
        [data-theme="warm-stone"] .pro-join-section .metric-box:hover,
        .theme-warm-stone .pro-join-section .metric-box:hover {
          background: rgba(255, 255, 240, 0.85) !important;
          border-color: #0A0A0A !important;
        }
        [data-theme="warm-stone"] .pro-join-section .metric-box.highlight,
        .theme-warm-stone .pro-join-section .metric-box.highlight {
          background: rgba(10, 10, 10, 0.08) !important;
          border: 1.5px solid #0A0A0A !important;
        }
        [data-theme="warm-stone"] .pro-join-section .metric-num,
        .theme-warm-stone .pro-join-section .metric-num {
          color: #0A0A0A !important;
          font-weight: 900 !important;
          text-shadow: none !important;
        }
        [data-theme="warm-stone"] .pro-join-section .metric-label,
        .theme-warm-stone .pro-join-section .metric-label {
          color: #0A0A0A !important;
          opacity: 0.9 !important;
          font-weight: 600 !important;
        }
        [data-theme="warm-stone"] .pro-join-section .pro-card-quote,
        .theme-warm-stone .pro-join-section .pro-card-quote {
          border-top: 1px solid rgba(10, 10, 10, 0.2) !important;
        }
        [data-theme="warm-stone"] .pro-join-section .pro-card-quote p,
        .theme-warm-stone .pro-join-section .pro-card-quote p {
          color: #0A0A0A !important;
          opacity: 0.95 !important;
          font-weight: 500 !important;
        }
        [data-theme="warm-stone"] .pro-join-section .author-avatar,
        .theme-warm-stone .pro-join-section .author-avatar {
          background: rgba(255, 255, 240, 0.7) !important;
          backdrop-filter: blur(8px) !important;
          border: 1px solid rgba(10, 10, 10, 0.35) !important;
          color: #0A0A0A !important;
        }
        [data-theme="warm-stone"] .pro-join-section .author-details strong,
        .theme-warm-stone .pro-join-section .author-details strong {
          color: #0A0A0A !important;
        }
        [data-theme="warm-stone"] .pro-join-section .author-details span,
        .theme-warm-stone .pro-join-section .author-details span {
          color: #0A0A0A !important;
          opacity: 0.85 !important;
          font-weight: 600 !important;
        }
      `}</style>
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
                <div className="benefit-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div className="benefit-text-wrap">
                  <h3 className="benefit-title">Instant Job Leads</h3>
                  <p className="benefit-desc">Receive real-time customer requests across Multan straight to your device.</p>
                </div>
              </div>

              <div className="pro-benefit-item anim-card-unfold anim-delay-5">
                <div className="benefit-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="benefit-text-wrap">
                  <h3 className="benefit-title">Transparent Earnings</h3>
                  <p className="benefit-desc">Set competitive rates, bid fairly, and retain 100% of your agreed price.</p>
                </div>
              </div>

              <div className="pro-benefit-item anim-card-unfold anim-delay-6">
                <div className="benefit-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <div className="benefit-text-wrap">
                  <h3 className="benefit-title">Verified Pro Badge</h3>
                  <p className="benefit-desc">Build trust with police-verified badges and authenticated customer reviews.</p>
                </div>
              </div>

              <div className="pro-benefit-item anim-card-unfold anim-delay-7">
                <div className="benefit-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </div>
                <div className="benefit-text-wrap">
                  <h3 className="benefit-title">Smart Digital Hub</h3>
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
