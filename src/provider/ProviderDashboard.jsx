import { useState, useEffect } from 'react'
import './ProviderDashboard.css'

const HERO_SLIDES = [
  {
    id: 1,
    image: '/provider-hero-1.jpg',
    tag: '⚡ Precision Diagnostic Station',
    title: 'Multan High-Precision Electrical & Solar Grid Operations',
    description: 'Real-time telemetry, digital multimeter diagnostics, and smart distribution panel calibrations across Bosan Road, Gulgasht, and Cantt.',
    highlight: 'Direct SBP Raast Clearance',
    badgeClass: 'badge-ivory'
  },
  {
    id: 2,
    image: '/provider-hero-2.jpg',
    tag: '❄️ Industrial HVAC & Climate Station',
    title: 'Advanced Commercial Cooling & Refrigerant Diagnostics',
    description: 'Precision digital manifold pressure telemetry, high-vacuum evacuation, and inverter compressor troubleshooting across Multan.',
    highlight: 'Direct Customer OTP Sign-Off',
    badgeClass: 'badge-ivory'
  },
  {
    id: 3,
    image: '/provider-hero-3.jpg',
    tag: '🛠️ Master Woodcraft & Precision Tools',
    title: 'Architectural Joinery, Laser Fitment & Hardware Engineering',
    description: 'Sub-millimeter laser guide leveling, heavy-duty cordless installation, and structural woodworking across Multan commercial zones.',
    highlight: 'Police Verified Master Pro Status',
    badgeClass: 'badge-ivory'
  }
]

// Strip 1: Core Platform Guarantees & Features for Providers (Left-to-Right)
const STRIP_1_ITEMS = [
  { icon: '⚡', title: 'Direct Instant SBP Raast Payouts', desc: 'Instant transfer upon client sign-off.' },
  { icon: '✓', title: 'Zero Payment Delay', desc: 'Direct verification directly to your account.' },
  { icon: '📍', title: 'Hyperlocal Multan Dispatch', desc: 'Matches within Cantt, Bosan Road & Gulgasht.' },
  { icon: '🔍', title: 'Police & NADRA Verified', desc: 'Certified Ustad status boosts client trust.' },
  { icon: '💰', title: 'Custom Price Offer System', desc: 'Negotiate fair technical rates directly.' },
  { icon: '📱', title: 'Direct In-App Customer Chat', desc: 'Fast communication with clear scope of work.' },
  { icon: '🏆', title: 'Level-1 Verified Pro Badging', desc: "Stand out as Multan's top certified technician." },
  { icon: '📞', title: '24/7 Dispatch Control Room', desc: 'Direct technical & safety assistance helpline.' }
]

// Strip 2: Specialized Trades & Technical Standards (Right-to-Left)
const STRIP_2_ITEMS = [
  { icon: '⚡', title: 'Certified Electricians & Solar', desc: '3-Phase panels, earthing & inverter sync.' },
  { icon: '❄️', title: 'Inverter AC & HVAC Technicians', desc: 'Digital manifold vacuum & chemical jet wash.' },
  { icon: '🚰', title: 'Master Plumbers & Sanitary', desc: 'Acoustic leak detection & PPRC piping.' },
  { icon: '🪵', title: 'Artisan Woodcraft & Joinery', desc: 'Laser leveled modular cabinets & smart locks.' },
  { icon: '🎨', title: 'Architectural Painting Experts', desc: 'Weather-shield & dampness protection.' },
  { icon: '✨', title: 'Deep Cleaning & Sanitization', desc: 'Industrial floor buffing & upholstery wash.' },
  { icon: '🚪', title: 'Glass & Double-Glazed Aluminum', desc: 'Soundproof sliding doors & windows.' },
  { icon: '🔥', title: 'Precision Structural Welding', desc: 'Heavy steel sheds, iron grills & gates.' }
]

const MUX_PILLARS = [
  {
    tag: 'FINANCIAL INTEGRITY',
    title: 'Guaranteed Direct Payment',
    description: 'Every job on MUX SERVICES ensures transparent, guaranteed compensation. No middleman deductions, no delayed wages — payments clear directly to your bank account or instant cash upon verified completion.'
  },
  {
    tag: 'HYPERLOCAL RADIUS',
    title: 'Smart Multan GPS Matching',
    description: 'Our automated dispatch algorithm stations you exclusively in your preferred Multan zones — Cantt, Bosan Road, Gulgasht, Officers Colony, Wapda Town, or Shah Rukn-e-Alam — minimizing transit and maximizing your billable hours.'
  },
  {
    tag: 'GOVERNMENT BACKED',
    title: 'Police & NADRA Verified Credibility',
    description: 'MUX SERVICES certifies your ustad credentials through official Government CNIC verification and Multan Police Khidmat Markaz clearance, positioning you as an elite master professional who commands premium service rates.'
  },
  {
    tag: 'FAIR GROWTH',
    title: 'Direct Negotiation & Zero Traps',
    description: 'We believe skilled labor deserves respect and fair wages. You communicate directly with clients via secure in-app chat, inspect the site, and propose custom quotes tailored to actual technical requirements.'
  }
]

const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    badge: 'DISCOVERY',
    title: 'Review Customer Inquiries',
    desc: 'Browse incoming service requests in the Services screen, filter by trade and locality, and inspect customer budget and problem details.'
  },
  {
    step: '02',
    badge: 'AGREEMENT',
    title: 'Confirm Schedule & Send Proposal',
    desc: 'Accept the customer request with 1-click or send a tailored custom quote. The customer confirms timing and job location.'
  },
  {
    step: '03',
    badge: 'EXECUTION',
    title: 'Deliver High-Standard Service',
    desc: 'Arrive at the customer doorstep, carry out precision technical diagnostic testing, complete the repair, and take telemetry proof.'
  },
  {
    step: '04',
    badge: 'INSTANT TRANSFER',
    title: 'Direct Client Verification & Sign-Off',
    desc: 'Customer verifies the completed work with their 4-digit completion code. 100% payment is transferred directly via Raast or cash on site.'
  }
]

function ProviderDashboard({ setCurrentPage, onLogout }) {
  // Slider State
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  
  // Provider Operations State
  const [isOnline, setIsOnline] = useState(true)
  const [toastMessage, setToastMessage] = useState('')

  // Slider Autoplay Effect
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isPaused])

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage('')
    }, 3500)
  }

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }

  const handleLogoutClick = () => {
    if (typeof onLogout === 'function') {
      onLogout()
    } else if (typeof setCurrentPage === 'function') {
      setCurrentPage('home')
    }
  }

  return (
    <div className="provider-home-wrapper">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="provider-floating-toast">
          <span className="toast-icon">⚡</span>
          <span className="toast-text">{toastMessage}</span>
        </div>
      )}

      {/* Top Operations Header Bar */}
      <header className="provider-ops-header">
        <div className="provider-ops-container">
          <div className="header-pro-meta">
            <div className="pro-avatar-pulse">
              <span className="pro-avatar-text">MU</span>
              <span className="pro-active-dot"></span>
            </div>
            <div className="pro-details-text">
              <div className="pro-name-row">
                <h1 className="pro-display-name">M. USMAN</h1>
                <span className="pro-verification-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Verified Ustad Pro
                </span>
                <span className="pro-id-badge">ID: #MUX-7741</span>
              </div>
              <p className="pro-zone-sub">
                <span className="map-pin-icon">📍</span> Multan Operations: Cantt • Bosan Road • Gulgasht • Shah Rukn-e-Alam • Wapda Town
              </p>
            </div>
          </div>

          <div className="header-pro-actions">
            <div className="online-radar-widget">
              <label className="radar-switch">
                <input 
                  type="checkbox" 
                  checked={isOnline} 
                  onChange={() => {
                    const next = !isOnline
                    setIsOnline(next)
                    showToast(next ? 'Dispatch radar active: Receiving Multan leads' : 'Dispatch paused: Offline mode')
                  }} 
                />
                <span className="radar-slider"></span>
              </label>
              <div className="radar-status-text">
                <span className={`status-led ${isOnline ? 'led-online' : 'led-offline'}`}></span>
                <span className="status-label">{isOnline ? 'Online & Receiving Leads' : 'Offline (Paused)'}</span>
              </div>
            </div>

            <button 
              type="button" 
              className="provider-logout-action-btn"
              onClick={handleLogoutClick}
              title="Sign Out of Provider Portal"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* FULL-WIDTH HERO SLIDER CAROUSEL (IMAGES CLEARLY VISIBLE)  */}
      {/* ========================================================= */}
      <section 
        className="provider-hero-carousel-section full-width-banner"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="carousel-viewport">
          {HERO_SLIDES.map((slide, idx) => (
            <div 
              key={slide.id}
              className={`carousel-slide ${idx === activeSlide ? 'slide-active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Subtle scrim overlay so background photo remains crisp, bright and clear */}
              <div className="slide-gradient-overlay"></div>
              <div className="slide-content-container">
                <div className="slide-hero-direct-content">
                  <div className="slide-badge-wrapper">
                    <span className="slide-tag-pill">{slide.tag}</span>
                    <span className="slide-guarantee-pill">
                      <span className="pulse-spark">✦</span> {slide.highlight}
                    </span>
                  </div>
                  <h1 className="provider-slide-hero-title">
                    <span className="provider-slide-title-animated">{slide.title}</span>
                  </h1>
                  <p className="provider-slide-hero-desc">{slide.description}</p>
                  
                  <div className="slide-cta-row">
                    <button 
                      type="button" 
                      className="slide-primary-btn"
                      onClick={() => {
                        if (typeof setCurrentPage === 'function') {
                          setCurrentPage('services')
                        }
                      }}
                    >
                      <span>View Customer Requests in Services</span>
                    </button>
                    <button 
                      type="button" 
                      className="slide-secondary-btn"
                      onClick={() => {
                        const el = document.getElementById('about-mux-provider-section')
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      <span>About MUX SERVICES Ecosystem ↓</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation Arrows in Jet Black & Ivory */}
        <button 
          type="button" 
          className="carousel-control-arrow arrow-prev" 
          onClick={prevSlide}
          aria-label="Previous Slide"
        >
          &#8249;
        </button>
        <button 
          type="button" 
          className="carousel-control-arrow arrow-next" 
          onClick={nextSlide}
          aria-label="Next Slide"
        >
          &#8250;
        </button>

        {/* Carousel Dots Indicator in Jet Black & Ivory */}
        <div className="carousel-pagination-dots">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              className={`pagination-dot ${idx === activeSlide ? 'dot-active' : ''}`}
              onClick={() => setActiveSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <span className="dot-inner"></span>
            </button>
          ))}
        </div>

        {/* Slide Counter HUD in Jet Black & Ivory */}
        <div className="carousel-hud-counter">
          <span className="active-idx">0{activeSlide + 1}</span>
          <span className="separator">/</span>
          <span className="total-idx">0{HERO_SLIDES.length}</span>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2 ANIMATED TICKER STRIPS (JET BLACK & IVORY PATTI)        */}
      {/* ========================================================= */}
      <section className="mux-dual-ticker-section provider-ticker-theme" aria-label="MUX SERVICES Provider Guarantees and Trades">
        {/* Patti 1: Left-to-Right Animation */}
        <div className="mux-ticker-track-wrapper strip-1-theme">
          <div className="mux-ticker-inner mux-ticker-ltr">
            {STRIP_1_ITEMS.map((item, idx) => (
              <div key={`p1-${idx}`} className="mux-ticker-item">
                <span className="ticker-badge-icon" aria-hidden="true">{item.icon}</span>
                <div className="ticker-text-wrap">
                  <span className="ticker-title">{item.title}.</span>
                  <span className="ticker-dot-sep">•</span>
                  <span className="ticker-desc">{item.desc}</span>
                </div>
              </div>
            ))}
            {STRIP_1_ITEMS.map((item, idx) => (
              <div key={`p1-dup-${idx}`} className="mux-ticker-item" aria-hidden="true">
                <span className="ticker-badge-icon">{item.icon}</span>
                <div className="ticker-text-wrap">
                  <span className="ticker-title">{item.title}.</span>
                  <span className="ticker-dot-sep">•</span>
                  <span className="ticker-desc">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patti 2: Right-to-Left Animation */}
        <div className="mux-ticker-track-wrapper strip-2-theme">
          <div className="mux-ticker-inner mux-ticker-rtl">
            {STRIP_2_ITEMS.map((item, idx) => (
              <div key={`p2-${idx}`} className="mux-ticker-item">
                <span className="ticker-badge-icon" aria-hidden="true">{item.icon}</span>
                <div className="ticker-text-wrap">
                  <span className="ticker-title">{item.title}.</span>
                  <span className="ticker-dot-sep">•</span>
                  <span className="ticker-desc">{item.desc}</span>
                </div>
              </div>
            ))}
            {STRIP_2_ITEMS.map((item, idx) => (
              <div key={`p2-dup-${idx}`} className="mux-ticker-item" aria-hidden="true">
                <span className="ticker-badge-icon">{item.icon}</span>
                <div className="ticker-text-wrap">
                  <span className="ticker-title">{item.title}.</span>
                  <span className="ticker-dot-sep">•</span>
                  <span className="ticker-desc">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ABOUT MUX SERVICES ECOSYSTEM & 4 CONNECTED WORKFLOW CARDS */}
      {/* ========================================================= */}
      <main className="provider-about-mux-main" id="about-mux-provider-section">
        <div className="provider-about-container">
          {/* Header Story Intro */}
          <div className="about-hero-block">
            <div className="about-tag-badge">
              <span className="tag-spark">✦</span>
              <span>MULTAN'S PREMIER SMART ON-DEMAND PLATFORM</span>
            </div>
            <h2 className="about-main-heading">
              Built Specifically for Multan's Elite Technicians & Master Ustads
            </h2>
            <p className="about-lead-para">
              <strong>MUX SERVICES</strong> is transforming skilled doorstep maintenance across Multan. We provide verified electricians, HVAC mechanics, master plumbers, joinery carpenters, and technicians with guaranteed instant payments, direct client negotiations, and continuous job dispatches across Multan Cantt, Bosan Road, Gulgasht Colony, and Wapda Town.
            </p>
          </div>

          {/* 4 Core Pillars of MUX SERVICES Connected with Jet Black Line (No Icons) */}
          <div className="about-pillars-connected-wrapper">
            <div className="pillars-jet-pipeline-line" aria-hidden="true"></div>
            <div className="about-pillars-grid">
              {MUX_PILLARS.map((pillar, idx) => (
                <div key={idx} className={`pillar-glow-card pillar-card-${idx}`}>
                  <div className="pillar-joint-node" aria-hidden="true">
                    <span className="pillar-node-dot"></span>
                  </div>
                  <div className="pillar-header-row">
                    <span className="pillar-tag">{pillar.tag}</span>
                    <span className="pillar-seq-num">0{idx + 1}</span>
                  </div>
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-desc">{pillar.description}</p>
                  <div className="pillar-footer-accent">
                    <span className="accent-bar"></span>
                    <span className="accent-text">MUX SERVICES Guaranteed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How MUX SERVICES Works for Providers (Open Section, 4 Cards Connected with Black Line & Animated) */}
          <div className="how-it-works-section">
            <div className="how-header-row">
              <div>
                <span className="how-badge">CONNECTED WORKFLOW</span>
                <h3 className="how-title">How MUX SERVICES Works For Professionals</h3>
                <p className="how-sub">Transparent, fast, and 100% dispute-free doorstep servicing process.</p>
              </div>
              <button 
                type="button" 
                className="how-services-link-btn"
                onClick={() => {
                  if (typeof setCurrentPage === 'function') {
                    setCurrentPage('services')
                  }
                }}
              >
                Go to Services Tab →
              </button>
            </div>

            {/* Connected Journey Pipeline with Black Line Linking All 4 Cards (Clean & Static) */}
            <div className="how-connected-flow-wrapper">
              <div className="how-pipeline-line" aria-hidden="true"></div>
              <div className="how-steps-connected-grid">
                {HOW_IT_WORKS_STEPS.map((step, idx) => (
                  <div key={idx} className="how-step-connected-card">
                    <div className="step-joint-node">
                      <span className="node-core"></span>
                    </div>
                    <div className="step-card-header-row">
                      <div className="step-number-pill">{step.step}</div>
                      {idx < HOW_IT_WORKS_STEPS.length - 1 && (
                        <span className="step-flow-arrow" aria-hidden="true">→</span>
                      )}
                    </div>
                    <span className="step-badge">{step.badge}</span>
                    <h4 className="step-title">{step.title}</h4>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProviderDashboard
