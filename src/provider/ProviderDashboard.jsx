import { useState, useEffect, useRef } from 'react'
import './ProviderDashboard.css'

const HERO_SLIDES = [
  {
    id: 1,
    image: '/provider-hero-1.jpg',
    tag: '⚡ Precision Diagnostic Station',
    title: 'Multan High-Precision Electrical & Solar Grid Operations',
    description: 'Real-time telemetry, digital multimeter diagnostics, and smart distribution panel calibrations across Bosan Road, Gulgasht, and Cantt.',
    highlight: '100% Escrow Protected via SBP Raast',
    badgeClass: 'badge-cyan'
  },
  {
    id: 2,
    image: '/provider-hero-2.jpg',
    tag: '❄️ Industrial HVAC & Climate Station',
    title: 'Advanced Commercial Cooling & Refrigerant Diagnostics',
    description: 'Precision digital manifold pressure telemetry, high-vacuum evacuation, and inverter compressor troubleshooting across Multan.',
    highlight: 'Direct Customer OTP Sign-Off',
    badgeClass: 'badge-mint'
  },
  {
    id: 3,
    image: '/provider-hero-3.jpg',
    tag: '🛠️ Master Woodcraft & Precision Tools',
    title: 'Architectural Joinery, Laser Fitment & Hardware Engineering',
    description: 'Sub-millimeter laser guide leveling, heavy-duty cordless installation, and structural woodworking across Multan commercial zones.',
    highlight: 'Police Verified Master Pro Status',
    badgeClass: 'badge-gold'
  }
]

function ProviderDashboard({ setCurrentPage, onLogout }) {
  // Slider State
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  
  // Provider Operations State
  const [isOnline, setIsOnline] = useState(true)
  const [toastMessage, setToastMessage] = useState('')
  
  // Active Mission Steps
  const [activeMissionStep, setActiveMissionStep] = useState(2) // 1: Confirmed, 2: En Route, 3: At Site, 4: In Progress, 5: OTP Sign-Off
  const [otpInput, setOtpInput] = useState('')
  const [isOtpSuccess, setIsOtpSuccess] = useState(false)
  const [diagnosticUploaded, setDiagnosticUploaded] = useState(false)
  const fileInputRef = useRef(null)

  // Wallet State
  const [withdrawableBalance, setWithdrawableBalance] = useState(48500)
  const [escrowLocked, setEscrowLocked] = useState(14000)

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

  const handleOtpVerify = (e) => {
    e.preventDefault()
    if (otpInput.trim().length === 4) {
      setIsOtpSuccess(true)
      setActiveMissionStep(5)
      setWithdrawableBalance((prev) => prev + 5500)
      setEscrowLocked((prev) => Math.max(0, prev - 5500))
      showToast('🎉 Customer OTP Verified! PKR 5,500 transferred to Raast balance.')
      setOtpInput('')
    } else {
      showToast('⚠️ Please enter a valid 4-digit client OTP')
    }
  }

  const handleDiagnosticUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setDiagnosticUploaded(true)
      showToast(`📸 Diagnostic telemetry proof uploaded: ${e.target.files[0].name}`)
    }
  }

  const handleWithdrawal = () => {
    if (withdrawableBalance <= 0) {
      showToast('⚠️ No withdrawable balance available at this time.')
      return
    }
    const amount = withdrawableBalance
    setWithdrawableBalance(0)
    showToast(`💸 State Bank Raast transfer initiated: PKR ${amount.toLocaleString()} dispatched to your account!`)
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

      {/* Hidden File Input for Diagnostic Proof */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleDiagnosticUpload} 
        style={{ display: 'none' }} 
        accept="image/*,.pdf"
      />

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
                    showToast(next ? '🟢 Dispatch radar active: Receiving Multan leads' : '⚪ Dispatch paused: Offline mode')
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
      {/* FULL-WIDTH HERO SLIDER CAROUSEL (NOT BOXED IN A CARD)     */}
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
              <div className="slide-gradient-overlay"></div>
              <div className="slide-content-container">
                <div className="slide-content-glass">
                  <div className="slide-badge-wrapper">
                    <span className={`slide-tag-pill ${slide.badgeClass}`}>{slide.tag}</span>
                    <span className="slide-guarantee-pill">
                      <span className="pulse-spark">✦</span> {slide.highlight}
                    </span>
                  </div>
                  <h2 className="slide-title">{slide.title}</h2>
                  <p className="slide-description">{slide.description}</p>
                  
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
                      <span className="radar-echo-icon">◎</span> View Customer Requests in Services
                    </button>
                    <button 
                      type="button" 
                      className="slide-secondary-btn"
                      onClick={() => {
                        const el = document.getElementById('provider-active-mission')
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      <span>Active Mission Radar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation Arrows */}
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

        {/* Carousel Dots Indicator */}
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

        {/* Slide Counter HUD */}
        <div className="carousel-hud-counter">
          <span className="active-idx">0{activeSlide + 1}</span>
          <span className="separator">/</span>
          <span className="total-idx">0{HERO_SLIDES.length}</span>
        </div>
      </section>

      {/* Main Container */}
      <main className="provider-main-content">
        {/* ========================================================= */}
        {/* REAL-TIME OPERATIONS STATS STRIP WITH GLOWING ACCENTS     */}
        {/* ========================================================= */}
        <section className="provider-stats-strip">
          <div className="stat-glow-card">
            <div className="stat-card-header">
              <span className="stat-title">Net Verified Earnings</span>
              <span className="stat-trend-tag positive">+18.4%</span>
            </div>
            <div className="stat-main-figure">PKR 148,500</div>
            <div className="stat-meta-note">
              <span className="check-bullet">✓</span> State Bank Raast cleared
            </div>
          </div>

          <div className="stat-glow-card highlight-card">
            <div className="stat-card-header">
              <span className="stat-title">Escrow Protected In-Flight</span>
              <span className="stat-trend-tag live">LIVE</span>
            </div>
            <div className="stat-main-figure">PKR {escrowLocked.toLocaleString()}</div>
            <div className="stat-meta-note">
              <span className="radar-pulse-tiny"></span> 1 Mission currently active
            </div>
          </div>

          <div className="stat-glow-card">
            <div className="stat-card-header">
              <span className="stat-title">Customer Requests Portal</span>
              <span className="stat-trend-tag neutral">Services Tab</span>
            </div>
            <div className="stat-main-figure">14 Inquiries</div>
            <div className="stat-meta-note">
              <span className="pin-bullet">📍</span> Managed in Services screen
            </div>
          </div>

          <div className="stat-glow-card">
            <div className="stat-card-header">
              <span className="stat-title">Master Pro Trust Rating</span>
              <span className="stat-trend-tag rating">★ 4.98</span>
            </div>
            <div className="stat-main-figure">99.4%</div>
            <div className="stat-meta-note">
              <span className="shield-bullet">🛡️</span> 62 Completed with Zero Disputes
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* DUAL COLUMN WORKSPACE: IN-FLIGHT MISSION & OPERATIONS HUB */}
        {/* ========================================================= */}
        <div className="provider-workspace-grid">
          {/* LEFT COLUMN: ACTIVE IN-FLIGHT MISSION TRACKER & SERVICES DISPATCH SHORTCUT */}
          <div className="workspace-column-left">
            {/* SERVICES INCOMING REQUESTS NOTIFICATION CARD */}
            <div className="services-request-dispatch-banner">
              <div className="srd-left">
                <div className="srd-radar-icon">
                  <span className="srd-pulse-ring"></span>
                  <span className="srd-dot">📡</span>
                </div>
                <div>
                  <h4 className="srd-title">Customer Requests Are Live in "Services"</h4>
                  <p className="srd-desc">
                    All incoming customer service requests, emergency calls, and verified quote inquiries are organized inside the <strong>Services</strong> tab.
                  </p>
                </div>
              </div>
              <button 
                type="button" 
                className="srd-navigate-btn"
                onClick={() => {
                  if (typeof setCurrentPage === 'function') {
                    setCurrentPage('services')
                  }
                }}
              >
                Go to Customer Requests →
              </button>
            </div>

            {/* LIVE IN-FLIGHT MISSION COMMANDER */}
            <div className="mission-commander-card" id="provider-active-mission">
              <div className="mission-commander-header">
                <div className="mission-badge-group">
                  <span className="mission-pulse-badge">LIVE IN-FLIGHT MISSION</span>
                  <span className="mission-id-pill">#MUX-9042</span>
                </div>
                <div className="mission-escrow-pill">
                  <span className="shield-lock">🔒</span> Escrow Secured: PKR 5,500
                </div>
              </div>

              <div className="mission-body">
                <div className="mission-priority-row">
                  <span className="priority-tag-urgent">EMERGENCY DISPATCH</span>
                  <span className="assigned-time-tag">Assigned 18 mins ago</span>
                </div>

                <h3 className="mission-heading">
                  3-Phase DB Panel Short Circuit & Inverter Load Balancing
                </h3>
                <p className="mission-client-meta">
                  <strong>Client:</strong> Malik Farhan • <span>House 42, Officers Colony, Bosan Road, Multan</span>
                </p>

                {/* Milestone Progress Bar */}
                <div className="mission-milestones-tracker">
                  <div className={`milestone-step ${activeMissionStep >= 1 ? 'step-done' : ''}`}>
                    <div className="milestone-bubble" onClick={() => setActiveMissionStep(1)}>
                      {activeMissionStep >= 1 ? '✓' : '1'}
                    </div>
                    <span className="milestone-label">Confirmed</span>
                  </div>

                  <div className={`milestone-step-connector ${activeMissionStep >= 2 ? 'connector-done' : ''}`}></div>

                  <div className={`milestone-step ${activeMissionStep === 2 ? 'step-current' : activeMissionStep > 2 ? 'step-done' : ''}`}>
                    <div className="milestone-bubble" onClick={() => setActiveMissionStep(2)}>
                      {activeMissionStep > 2 ? '✓' : '2'}
                    </div>
                    <span className="milestone-label">En Route</span>
                  </div>

                  <div className={`milestone-step-connector ${activeMissionStep >= 3 ? 'connector-done' : ''}`}></div>

                  <div className={`milestone-step ${activeMissionStep === 3 ? 'step-current' : activeMissionStep > 3 ? 'step-done' : ''}`}>
                    <div className="milestone-bubble" onClick={() => setActiveMissionStep(3)}>
                      {activeMissionStep > 3 ? '✓' : '3'}
                    </div>
                    <span className="milestone-label">At Site</span>
                  </div>

                  <div className={`milestone-step-connector ${activeMissionStep >= 4 ? 'connector-done' : ''}`}></div>

                  <div className={`milestone-step ${activeMissionStep === 4 ? 'step-current' : activeMissionStep > 4 ? 'step-done' : ''}`}>
                    <div className="milestone-bubble" onClick={() => setActiveMissionStep(4)}>
                      {activeMissionStep > 4 ? '✓' : '4'}
                    </div>
                    <span className="milestone-label">Repairs</span>
                  </div>

                  <div className={`milestone-step-connector ${activeMissionStep >= 5 ? 'connector-done' : ''}`}></div>

                  <div className={`milestone-step ${activeMissionStep >= 5 ? 'step-done' : ''}`}>
                    <div className="milestone-bubble" onClick={() => setActiveMissionStep(5)}>
                      {activeMissionStep >= 5 ? '✓' : '5'}
                    </div>
                    <span className="milestone-label">OTP Sign-Off</span>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="mission-action-bar">
                  <button 
                    type="button" 
                    className="action-pill-btn"
                    onClick={() => showToast('💬 Opening encrypted direct message with Malik Farhan...')}
                  >
                    <span className="btn-icon">💬</span> In-App Chat
                  </button>
                  
                  <button 
                    type="button" 
                    className="action-pill-btn"
                    onClick={() => showToast('📞 Connecting to Client phone: 0301-XXXXXXX...')}
                  >
                    <span className="btn-icon">📞</span> Direct Call
                  </button>

                  <button 
                    type="button" 
                    className={`action-pill-btn ${diagnosticUploaded ? 'btn-uploaded' : ''}`}
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  >
                    <span className="btn-icon">📸</span> {diagnosticUploaded ? 'Proof Uploaded ✓' : 'Diagnostic Proof'}
                  </button>

                  <button 
                    type="button" 
                    className="action-pill-btn btn-step-advance"
                    onClick={() => {
                      const next = Math.min(5, activeMissionStep + 1)
                      setActiveMissionStep(next)
                      showToast(`Milestone updated to Step ${next}`)
                    }}
                  >
                    <span className="btn-icon">⚡</span> Next Stage
                  </button>
                </div>

                {/* OTP Sign-Off Box */}
                <div className="otp-verification-box">
                  <div className="otp-box-header">
                    <span className="lock-glyph">🔑</span>
                    <div>
                      <h4 className="otp-title">Client OTP Instant Escrow Release</h4>
                      <p className="otp-sub">Ask the customer for their 4-digit completion code to trigger instant Raast payout</p>
                    </div>
                  </div>

                  {isOtpSuccess ? (
                    <div className="otp-success-alert">
                      <span className="success-icon">🎉</span>
                      <div>
                        <strong>Mission Successfully Completed & Signed Off!</strong>
                        <p>PKR 5,500 has been transferred into your withdrawable SBP Raast balance.</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleOtpVerify} className="otp-input-form">
                      <div className="otp-field-wrapper">
                        <input 
                          type="text" 
                          maxLength="4" 
                          placeholder="e.g. 7419" 
                          value={otpInput}
                          onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                          className="otp-code-input"
                        />
                        <button type="submit" className="otp-verify-submit-btn">
                          Verify & Release PKR 5,500
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* HIGH-TECH DIAGNOSTIC PROTOCOLS CARD */}
            <div className="provider-diagnostic-hub-card">
              <div className="diagnostic-hub-header">
                <span className="hub-tag">MUX SERVICES PROTOCOL</span>
                <h4>Technical Dispatch Standards</h4>
              </div>
              <div className="diagnostic-items-grid">
                <div className="diag-item">
                  <span className="diag-icon">⚡</span>
                  <h5>Phase & Voltage Test</h5>
                  <p>Check balanced line voltage (220V - 240V) before closing DB panel.</p>
                </div>
                <div className="diag-item">
                  <span className="diag-icon">🛡️</span>
                  <h5>Earthing Leakage Protection</h5>
                  <p>Measure earth resistance (&lt; 5 Ohms) with digital megger tester.</p>
                </div>
                <div className="diag-item">
                  <span className="diag-icon">📸</span>
                  <h5>Telemetry Proof Capture</h5>
                  <p>Upload clean photo of multimeter and circuit breaker wiring.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: WALLET, SCHEDULE & DISPATCH HOTLINE */}
          <div className="workspace-column-right">
            {/* ESCROW WALLET & RAAST PAYOUT CARD */}
            <div className="provider-wallet-card">
              <div className="wallet-card-header">
                <div className="wallet-header-title">
                  <span className="wallet-icon">💳</span>
                  <h4>Raast Instant Payout Wallet</h4>
                </div>
                <span className="raast-badge">SBP Raast Enabled</span>
              </div>

              <div className="wallet-balances-grid">
                <div className="balance-block withdrawable">
                  <span className="balance-caption">Withdrawable Balance</span>
                  <span className="balance-amount">PKR {withdrawableBalance.toLocaleString()}</span>
                  <span className="balance-sub">Zero Clearance Delay</span>
                </div>
                <div className="balance-block locked">
                  <span className="balance-caption">Locked In-Flight Escrow</span>
                  <span className="balance-amount">PKR {escrowLocked.toLocaleString()}</span>
                  <span className="balance-sub">1 Mission Active</span>
                </div>
              </div>

              <button 
                type="button" 
                className="wallet-payout-cta-btn"
                onClick={handleWithdrawal}
              >
                Instant Transfer via Raast (0% Fee)
              </button>

              <div className="recent-clearance-history">
                <div className="history-header">
                  <span>Recent Escrow Clearances</span>
                  <span className="history-count">Multan Hub</span>
                </div>
                <div className="history-item">
                  <div className="history-left">
                    <span className="clear-arrow">↗</span>
                    <div>
                      <p className="history-client">Tariq Mahmood</p>
                      <span className="history-loc">Gulgasht Colony</span>
                    </div>
                  </div>
                  <div className="history-right">
                    <span className="history-amt">PKR 6,500</span>
                    <span className="history-status cleared">Cleared</span>
                  </div>
                </div>

                <div className="history-item">
                  <div className="history-left">
                    <span className="clear-arrow">↗</span>
                    <div>
                      <p className="history-client">Dr. Asim</p>
                      <span className="history-loc">Bosan Road</span>
                    </div>
                  </div>
                  <div className="history-right">
                    <span className="history-amt">PKR 4,000</span>
                    <span className="history-status cleared">Cleared</span>
                  </div>
                </div>

                <div className="history-item">
                  <div className="history-left">
                    <span className="clear-arrow">⏳</span>
                    <div>
                      <p className="history-client">Haji Riaz</p>
                      <span className="history-loc">Cantt Sadar</span>
                    </div>
                  </div>
                  <div className="history-right">
                    <span className="history-amt">PKR 5,500</span>
                    <span className="history-status locked">In Escrow</span>
                  </div>
                </div>
              </div>
            </div>

            {/* TODAY'S SCHEDULE CARD */}
            <div className="provider-schedule-card">
              <div className="schedule-card-header">
                <h4>Today's Dispatch Schedule</h4>
                <span className="schedule-date-pill">Multan Sector</span>
              </div>

              <div className="schedule-timeline">
                <div className="timeline-entry entry-active">
                  <div className="entry-time-col">
                    <span className="time-text">10:30 AM</span>
                    <span className="entry-status-badge">Active</span>
                  </div>
                  <div className="entry-content">
                    <h5>Emergency 3-Phase DB Panel Inspection</h5>
                    <p>Officers Colony, Bosan Road • Malik Farhan</p>
                  </div>
                </div>

                <div className="timeline-entry entry-upcoming">
                  <div className="entry-time-col">
                    <span className="time-text">02:00 PM</span>
                    <span className="entry-status-badge">Upcoming</span>
                  </div>
                  <div className="entry-content">
                    <h5>Solar Inverter Diagnostics & Earthing</h5>
                    <p>Wapda Town Phase 1 • Engr. Bilal</p>
                  </div>
                </div>

                <div className="timeline-entry entry-scheduled">
                  <div className="entry-time-col">
                    <span className="time-text">04:30 PM</span>
                    <span className="entry-status-badge">Scheduled</span>
                  </div>
                  <div className="entry-content">
                    <h5>Commercial AC Chemical Wash</h5>
                    <p>Gulgasht Gol Bagh Market • Clinic 3</p>
                  </div>
                </div>
              </div>
            </div>

            {/* MUX VERIFICATION CREDENTIALS & HOTLINE CARD */}
            <div className="provider-credentials-card">
              <div className="credentials-badge-row">
                <div className="gov-seal">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div>
                  <h5>Verified Ustad Professional</h5>
                  <p>CNIC & Multan Police Khidmat Markaz Cleared</p>
                </div>
              </div>
              <div className="hotline-box">
                <div className="hotline-icon">🚨</div>
                <div>
                  <span className="hotline-label">24/7 Dispatch Control Room</span>
                  <span className="hotline-number">0800-MUX-PRO (689-776)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProviderDashboard
