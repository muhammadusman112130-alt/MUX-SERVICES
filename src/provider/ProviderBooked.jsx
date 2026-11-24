import { useState, useEffect } from 'react'
import '../pages/MyBookings.css'

const DEFAULT_PROVIDER_MISSION = {
  id: 'MUX-9042',
  refNumber: 'MUX-9042',
  customer: 'Malik Farhan',
  phone: '0301-7654321',
  service: '3-Phase DB Panel Short Circuit & Load Balancing',
  price: 'PKR 6,500',
  status: 'active',
  date: 'Today',
  time: '10:22 AM',
  location: 'Officers Colony, Bosan Road, Multan',
  address: 'House 42, Officers Colony, Bosan Road, Multan',
  bikePlate: 'MN-24-7890 (Honda CD-70)',
  currentLocality: 'Crossing Bosan Road towards Officers Colony',
  speed: '34 km/h',
  distance: '1.8 km remaining',
  initialSeconds: 885 // ~14 mins 45 secs countdown
}

const INITIAL_COMPLETED_MISSIONS = [
  {
    id: 'MUX-8831',
    refNumber: 'MUX-8831',
    customer: 'Dr. Tariq Mahmood',
    service: 'Commercial DB Panel & Wiring Overhaul',
    price: 'PKR 6,500',
    status: 'completed',
    date: 'Yesterday',
    time: '04:15 PM',
    location: 'Sector A, Gulgasht Colony, Multan',
    phone: '0300-4567890'
  },
  {
    id: 'MUX-7419',
    refNumber: 'MUX-7419',
    customer: 'Dr. Asim',
    service: 'Solar Inverter Diagnostic & Earthing Leakage',
    price: 'PKR 4,000',
    status: 'completed',
    date: '2 days ago',
    time: '11:30 AM',
    location: 'Bosan Road, Multan',
    phone: '0300-8765432'
  }
]

function ProviderBooked({ setCurrentPage }) {
  const [activeTab, setActiveTab] = useState('live') // 'live' | 'completed'
  const [liveMission, setLiveMission] = useState(() => {
    try {
      const stored = localStorage.getItem('provider_live_booking')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed && (parsed.customer || parsed.service)) {
          return {
            ...DEFAULT_PROVIDER_MISSION,
            ...parsed,
            initialSeconds: parsed.initialSeconds || 885
          }
        }
      }
    } catch (e) {}
    return DEFAULT_PROVIDER_MISSION
  })

  const [completedMissions, setCompletedMissions] = useState(INITIAL_COMPLETED_MISSIONS)
  const [countdownSeconds, setCountdownSeconds] = useState(liveMission?.initialSeconds || 885)
  const [currentStep, setCurrentStep] = useState(2) // 1: Confirmed, 2: En Route, 3: At Site, 4: OTP Released
  const [otpInput, setOtpInput] = useState('')
  const [otpVerified, setOtpVerified] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
  }

  // Arrival countdown
  useEffect(() => {
    if (countdownSeconds <= 0 || currentStep >= 3) return
    const interval = setInterval(() => {
      setCountdownSeconds(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [countdownSeconds, currentStep])

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // Handle OTP verification to complete mission
  const handleVerifyOtp = (e) => {
    e.preventDefault()
    if (!otpInput || otpInput.trim().length < 4) {
      triggerToast('Please enter the 4-digit completion code provided by the client.')
      return
    }

    setOtpVerified(true)
    setCurrentStep(4)
    triggerToast(`OTP Verified! Direct Raast transfer of ${liveMission.price} released instantly.`)

    // Add to completed missions
    const completedEntry = {
      ...liveMission,
      status: 'completed',
      date: 'Just now'
    }
    setCompletedMissions(prev => [completedEntry, ...prev])
  }

  return (
    <div className="booked-page">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="messages-toast-pill" role="status">
          <span className="toast-icon">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="booked-container">
        {/* ══════════════════════════════════════════════════
            HEADER (PROVIDER DISPATCH CONSOLE)
        ══════════════════════════════════════════════════ */}
        <header className="booked-header">
          <div className="bh-left">
            <span className="bh-badge">✦ MUX SERVICES PROVIDER MISSION CONTROL</span>
            <h1 className="bh-title">Booked Service Missions</h1>
            <p className="bh-subtitle">
              Live Multan GPS telematics, transit navigation to client doorstep, and verified direct Raast payout.
            </p>
          </div>

          <div className="bh-right">
            {setCurrentPage && (
              <button 
                type="button" 
                className="bh-new-book-btn"
                onClick={() => setCurrentPage('services')}
              >
                <span>+ View Incoming Requests</span>
              </button>
            )}
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="booked-tabs-bar" aria-label="Provider Missions Navigation">
          <button 
            type="button" 
            className={`bt-tab-btn ${activeTab === 'live' ? 'active' : ''}`}
            onClick={() => setActiveTab('live')}
          >
            <span className="tab-icon">⚡</span>
            <span>Live Mission (Active)</span>
            {liveMission && !otpVerified && <span className="tab-live-dot"></span>}
          </button>

          <button 
            type="button" 
            className={`bt-tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            <span className="tab-icon">✓</span>
            <span>Completed Missions ({completedMissions.length})</span>
          </button>
        </nav>

        {/* ══════════════════════════════════════════════════
            TAB 1: LIVE ACTIVE MISSION
        ══════════════════════════════════════════════════ */}
        {activeTab === 'live' && (
          <div className="booked-live-section">
            {liveMission ? (
              <div className="live-dashboard-modular-wrap">

                {/* ── CARD 1: LIVE STATUS & COUNTDOWN ── */}
                <div className="live-mod-card live-status-timer-card">
                  <div className="lst-left-status">
                    <div className="lst-radar-beacon">
                      <span className="lst-beacon-core"></span>
                      <span className="lst-beacon-wave"></span>
                    </div>
                    <div className="lst-status-text">
                      <div className="lst-badge-row">
                        <span className="lst-pill-live">
                          <span className="lst-live-dot"></span>
                          LIVE DISPATCH ACTIVE
                        </span>
                        <span className="lst-pill-ref">REF #{liveMission.refNumber}</span>
                        <span className="lst-pill-vehicle">🏍️ {liveMission.bikePlate}</span>
                      </div>
                      <h2 className="lst-headline">
                        {otpVerified
                          ? 'Mission Completed • Payment Cleared via Raast'
                          : currentStep === 3
                          ? 'At Client Doorstep • Performing Technical Repairs'
                          : 'En Route to Client Doorstep in Multan'}
                      </h2>
                      <p className="lst-subtext">
                        Client: <strong>{liveMission.customer}</strong> • Destination: <strong>{liveMission.location}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Real-time Countdown Timer */}
                  <div className="lst-right-timer">
                    <span className="cd-hero-label">Target Doorstep Arrival</span>
                    <div className="cd-hero-timer-display">
                      <span className="cd-hero-icon">⏱️</span>
                      <strong className="cd-hero-digits">
                        {otpVerified ? '00:00' : formatTime(countdownSeconds)}
                      </strong>
                      <span className="cd-hero-unit">MINS REMAINING</span>
                    </div>
                    <span className="cd-hero-guarantee">⚡ Multan Hyperlocal Rapid Dispatch</span>
                  </div>
                </div>

                {/* ── CARD 2: FULL-WIDTH EDGE-TO-EDGE MULTAN GPS MAP RADAR ── */}
                <div className="live-mod-card live-multan-map-card">
                  <div className="lmc-header-bar">
                    <div className="lmc-left-title">
                      <span className="lmc-radar-sweep-icon"></span>
                      <strong>MULTAN VECTOR SATELLITE RADAR — LIVE TRANSIT TO CLIENT</strong>
                    </div>
                    <div className="lmc-traffic-pill">
                      <span className="lmc-traffic-dot"></span>
                      <span>Corridor: {liveMission.currentLocality} (Fast Flow)</span>
                    </div>
                  </div>

                  <div className="multan-gps-map-container">
                    <div className="map-radar-sweep-line"></div>

                    <svg className="multan-vector-map" viewBox="0 0 1200 420" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="mapBgFull" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#08181b" />
                          <stop offset="50%" stopColor="#0a2126" />
                          <stop offset="100%" stopColor="#061316" />
                        </linearGradient>

                        <filter id="neonPulseGlow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="3" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      <rect className="map-base-canvas" width="1200" height="420" fill="url(#mapBgFull)" />

                      {/* River Chenab Vector */}
                      <path
                        className="map-river-path"
                        d="M -20,120 Q 80,180 140,240 T 260,380 T 320,440"
                        fill="none"
                        stroke="#0d3138"
                        strokeWidth="38"
                        strokeLinecap="round"
                        opacity="0.8"
                      />

                      {/* City Grid Network */}
                      <g className="map-grid-network" opacity="0.14" stroke="#8FD3E8" strokeWidth="1">
                        <line x1="100" y1="0" x2="100" y2="420" />
                        <line x1="250" y1="0" x2="250" y2="420" />
                        <line x1="400" y1="0" x2="400" y2="420" />
                        <line x1="550" y1="0" x2="550" y2="420" />
                        <line x1="700" y1="0" x2="700" y2="420" />
                        <line x1="850" y1="0" x2="850" y2="420" />
                        <line x1="1000" y1="0" x2="1000" y2="420" />
                        <line x1="1150" y1="0" x2="1150" y2="420" />
                        <line x1="0" y1="80" x2="1200" y2="80" />
                        <line x1="0" y1="160" x2="1200" y2="160" />
                        <line x1="0" y1="240" x2="1200" y2="240" />
                        <line x1="0" y1="320" x2="1200" y2="320" />
                        <line x1="0" y1="400" x2="1200" y2="400" />
                      </g>

                      {/* Major Multan Arteries */}
                      <path className="map-major-road" d="M 0 65 Q 400 80, 800 60 T 1200 70" fill="none" stroke="#12353c" strokeWidth="16" strokeLinecap="round" />
                      <path className="map-road-dash" d="M 0 65 Q 400 80, 800 60 T 1200 70" fill="none" stroke="rgba(143, 211, 232, 0.3)" strokeWidth="2.5" strokeDasharray="8 6" />

                      <path className="map-major-road" d="M 180 0 Q 320 180 520 230 T 900 290" fill="none" stroke="#12353c" strokeWidth="18" strokeLinecap="round" />
                      <path className="map-road-dash" d="M 180 0 Q 320 180 520 230 T 900 290" fill="none" stroke="rgba(143, 211, 232, 0.3)" strokeWidth="3" strokeDasharray="8 6" />

                      <path className="map-major-road" d="M 0 280 Q 350 240 700 200 T 1200 180" fill="none" stroke="#12353c" strokeWidth="16" strokeLinecap="round" />
                      <path className="map-road-dash" d="M 0 280 Q 350 240 700 200 T 1200 180" fill="none" stroke="rgba(143, 211, 232, 0.25)" strokeWidth="2.5" strokeDasharray="7 5" />

                      {/* Landmarks */}
                      <g className="map-landmarks-labels" fill="rgba(238, 244, 244, 0.5)" fontSize="11" fontWeight="800" fontFamily="sans-serif">
                        <text x="320" y="55">NORTHERN BYPASS</text>
                        <text x="820" y="50">BOSAN ROAD CORRIDOR</text>
                        <text x="460" y="195">GULGASHT COLONY</text>
                        <text x="960" y="160">OFFICERS COLONY</text>
                        <text x="210" y="325">MULTAN CANTT</text>
                        <text x="690" y="340">SHAH RUKN-E-ALAM</text>
                        <text x="940" y="375">WAPDA TOWN</text>
                      </g>

                      {/* Active Transit Path to Client Doorstep */}
                      <path
                        className="map-route-base"
                        d="M 320,215 Q 480,180 640,210 T 960,205"
                        fill="none"
                        stroke="#13383e"
                        strokeWidth="10"
                        strokeLinecap="round"
                      />
                      <path
                        className="map-route-glowing-wire"
                        d="M 320,215 Q 480,180 640,210 T 960,205"
                        fill="none"
                        stroke="#17f7f7"
                        strokeWidth="3.5"
                        strokeDasharray="9 6"
                        filter="url(#neonPulseGlow)"
                      />

                      {/* Destination Pin: Client Doorstep */}
                      <g className="map-pin-group map-dest-group" transform="translate(960, 205)">
                        <circle r="40" fill="none" stroke="#17f7f7" strokeWidth="1" className="radar-wave-cust-1 map-radar-circle" />
                        <circle r="25" fill="none" stroke="#17f7f7" strokeWidth="1.5" className="radar-wave-cust-2 map-radar-circle" />
                        <circle r="12" fill="#17f7f7" filter="url(#neonPulseGlow)" className="map-pin-core" />
                        <circle r="5" fill="#0E2E33" className="map-pin-inner" />
                        
                        <g className="map-hud-label-group">
                          <rect className="map-hud-box" x="-95" y="-58" width="190" height="38" rx="10" fill="#0E2E33" stroke="#17f7f7" strokeWidth="1.8" filter="url(#neonPulseGlow)" />
                          <text className="map-hud-title" x="0" y="-39" fill="#17f7f7" fontSize="11" fontWeight="900" textAnchor="middle">📍 CLIENT DOORSTEP</text>
                          <text className="map-hud-sub" x="0" y="-24" fill="#EEF4F4" fontSize="9.5" fontWeight="700" textAnchor="middle">{liveMission.location}</text>
                        </g>
                      </g>

                      {/* Origin Pin: You (The Technician) */}
                      <g className="map-pin-group map-origin-group" transform="translate(320, 215)">
                        <circle r="30" fill="none" stroke="#10b981" strokeWidth="1.5" className="radar-wave-tech map-radar-circle" />
                        <circle r="16" fill="#10b981" filter="url(#neonPulseGlow)" className="map-pin-core" />
                        <text x="0" y="5" fill="#08181b" fontSize="11" fontWeight="900" textAnchor="middle">🏍️</text>

                        <g className="map-hud-label-group">
                          <rect className="map-hud-box" x="-110" y="-58" width="220" height="38" rx="10" fill="#0E2E33" stroke="#10b981" strokeWidth="1.8" />
                          <text className="map-hud-title" x="0" y="-39" fill="#10b981" fontSize="11" fontWeight="900" textAnchor="middle">
                            YOU (EN ROUTE • {liveMission.speed})
                          </text>
                          <text className="map-hud-sub" x="0" y="-24" fill="#EEF4F4" fontSize="9.5" fontWeight="700" textAnchor="middle">
                            {liveMission.currentLocality}
                          </text>
                        </g>
                      </g>
                    </svg>
                  </div>

                  {/* Telemetry Status Strip */}
                  <div className="live-telemetry-status-strip">
                    <div className="lts-item">
                      <span className="lts-lbl">LIVE SPEED</span>
                      <strong className="lts-val highlight">{liveMission.speed}</strong>
                    </div>
                    <div className="lts-item">
                      <span className="lts-lbl">TRANSIT DISTANCE</span>
                      <strong className="lts-val">{liveMission.distance}</strong>
                    </div>
                    <div className="lts-item">
                      <span className="lts-lbl">ESTIMATED ETA</span>
                      <strong className="lts-val highlight">{formatTime(countdownSeconds)} MINS</strong>
                    </div>
                    <div className="lts-item">
                      <span className="lts-lbl">GUARANTEED PAYOUT</span>
                      <strong className="lts-val highlight">{liveMission.price} DIRECT RAAST</strong>
                    </div>
                  </div>
                </div>

                {/* ── CARD 3: CLIENT & MISSION CONTROL CENTER ── */}
                <div className="live-mod-card live-unit-operation-card">
                  <div className="uoc-specialist-row">
                    <div className="uoc-specialist-left">
                      <div className="uoc-avatar">
                        <span className="uoc-avatar-text">
                          {liveMission.customer ? liveMission.customer.split(' ').map(n => n[0]).slice(0, 2).join('') : 'CL'}
                        </span>
                        <span className="uoc-live-dot"></span>
                      </div>

                      <div className="uoc-info">
                        <div className="uoc-tag-row">
                          <span className="uoc-section-tag">VERIFIED CLIENT ORDER</span>
                          <span className="uoc-vetted-pill">Multan Verified Doorstep</span>
                        </div>
                        <h3 className="uoc-name">{liveMission.customer}</h3>
                        <p className="uoc-service">{liveMission.service}</p>
                        <div className="uoc-rate-line">
                          <span>Agreed Compensation:</span>
                          <strong>{liveMission.price}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Direct Comms Group */}
                    <div className="uoc-comms-group">
                      <button 
                        type="button" 
                        className="uoc-btn-call"
                        onClick={() => triggerToast(`Dialing client directly: ${liveMission.customer} (${liveMission.phone})...`)}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span>Direct Call</span>
                      </button>

                      <button 
                        type="button" 
                        className="uoc-btn-chat"
                        onClick={() => {
                          try {
                            localStorage.setItem('provider_active_chat_customer', JSON.stringify({
                              customer: liveMission.customer,
                              service: liveMission.service,
                              location: liveMission.location,
                              budget: liveMission.price
                            }))
                          } catch {}
                          if (typeof setCurrentPage === 'function') {
                            setCurrentPage('messages')
                          }
                        }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span>Open Chat</span>
                      </button>
                    </div>
                  </div>

                  <div className="uoc-divider"></div>

                  {/* 4-STEP CONNECTED SERVICE TRACKER */}
                  <div className="uoc-stepper-wrap">
                    <div className="uoc-stepper-header">
                      <span className="uoc-stepper-title">MISSION DISPATCH PROGRESS</span>
                      <span className="uoc-stage-indicator">
                        {currentStep === 4 ? 'Mission Completed ✓' : `Stage ${currentStep} of 4 Active`}
                      </span>
                    </div>

                    <div className="connected-stepper-track">
                      <div className="stepper-track-line">
                        <div 
                          className="stepper-track-fill" 
                          style={{ width: currentStep === 4 ? '100%' : currentStep === 3 ? '66%' : '38%' }}
                        ></div>
                      </div>

                      {/* STEP 1: Confirmed */}
                      <div className="cs-node completed">
                        <div className="cs-marker">
                          <span className="cs-marker-inner">✓</span>
                        </div>
                        <div className="cs-text">
                          <strong className="cs-title">Job Confirmed</strong>
                          <span className="cs-sub">Compensation: {liveMission.price}</span>
                        </div>
                      </div>

                      {/* STEP 2: En Route */}
                      <div className={`cs-node ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : 'pending'}`}>
                        <div className="cs-marker">
                          <span className="cs-marker-inner">{currentStep > 2 ? '✓' : '2'}</span>
                          {currentStep === 2 && <span className="cs-active-halo"></span>}
                        </div>
                        <div className="cs-text">
                          <strong className="cs-title">En Route to Site</strong>
                          <span className="cs-sub highlight">{liveMission.speed} • Moving through Multan</span>
                        </div>
                      </div>

                      {/* STEP 3: Doorstep Arrival */}
                      <div className={`cs-node ${currentStep === 3 ? 'active' : currentStep > 3 ? 'completed' : 'pending'}`}>
                        <div className="cs-marker">
                          <span className="cs-marker-inner">{currentStep > 3 ? '✓' : '3'}</span>
                          {currentStep === 3 && <span className="cs-active-halo"></span>}
                        </div>
                        <div className="cs-text">
                          <strong className="cs-title">At Client Site</strong>
                          <span className="cs-sub">Diagnostics &amp; Repair</span>
                        </div>
                      </div>

                      {/* STEP 4: OTP Sign-off */}
                      <div className={`cs-node ${currentStep === 4 ? 'active' : 'pending'}`}>
                        <div className="cs-marker">
                          <span className="cs-marker-inner">{currentStep === 4 ? '✓' : '4'}</span>
                          {currentStep === 4 && <span className="cs-active-halo"></span>}
                        </div>
                        <div className="cs-text">
                          <strong className="cs-title">OTP Verified &amp; Paid</strong>
                          <span className="cs-sub">Direct Raast instant transfer</span>
                        </div>
                      </div>
                    </div>

                    {/* Step Action Buttons */}
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                      {currentStep === 2 && (
                        <button
                          type="button"
                          className="req-accept-action-btn"
                          onClick={() => {
                            setCurrentStep(3)
                            triggerToast('Status updated: Arrived at client doorstep!')
                          }}
                        >
                          ✓ Confirm Doorstep Arrival
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="uoc-divider"></div>

                  {/* OTP SIGN-OFF & INSTANT RAAST PAYOUT BOX */}
                  <div className="uoc-actions-row">
                    <div className="uoc-actions-desc">
                      <span className="uoc-actions-lamp"></span>
                      <div>
                        <h4 className="uoc-actions-heading">Client OTP Instant Payout Verification</h4>
                        <p className="uoc-actions-sub">
                          Ask the client for their 4-digit completion code to trigger instant Raast payout directly to your bank account.
                        </p>
                      </div>
                    </div>

                    {!otpVerified ? (
                      <form onSubmit={handleVerifyOtp} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <input
                          type="text"
                          maxLength={4}
                          placeholder="e.g. 7419"
                          value={otpInput}
                          onChange={(e) => setOtpInput(e.target.value)}
                          style={{
                            background: '#0E2E33',
                            border: '1.5px solid #17f7f7',
                            color: '#EEF4F4',
                            padding: '0.65rem 1rem',
                            borderRadius: '8px',
                            fontSize: '1.1rem',
                            fontWeight: '800',
                            width: '120px',
                            textAlign: 'center',
                            letterSpacing: '0.15em'
                          }}
                        />
                        <button
                          type="submit"
                          className="req-accept-action-btn"
                        >
                          Verify &amp; Release {liveMission.price}
                        </button>
                      </form>
                    ) : (
                      <div style={{ background: '#10b981', color: '#0E2E33', padding: '0.65rem 1.4rem', borderRadius: '8px', fontWeight: '900' }}>
                        ✓ {liveMission.price} Cleared via SBP Raast Direct Payout
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ) : (
              <div className="messages-empty-state">
                <div className="empty-state-card">
                  <div className="empty-icon-circle">⚡</div>
                  <h3 className="empty-title">No Active Missions In-Flight</h3>
                  <p className="empty-subtitle">
                    You currently have no active service missions. Head to the incoming requests feed to accept customer jobs.
                  </p>
                  {setCurrentPage && (
                    <button
                      type="button"
                      className="empty-action-btn"
                      onClick={() => setCurrentPage('services')}
                    >
                      View Customer Requests Feed →
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            TAB 2: COMPLETED MISSIONS
        ══════════════════════════════════════════════════ */}
        {activeTab === 'completed' && (
          <div className="completed-services-feed">
            {completedMissions.map(m => (
              <div key={m.id} className="completed-service-card" style={{ marginBottom: '1.25rem' }}>
                <div className="csc-header-row">
                  <div>
                    <span className="csc-ref">REF #{m.refNumber}</span>
                    <h3 className="csc-service-title">{m.service}</h3>
                    <p className="csc-provider-line">Client: <strong>{m.customer}</strong> • {m.location}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#8FD3E8' }}>Cleared via Raast</span>
                    <strong style={{ fontSize: '1.35rem', color: '#17f7f7', fontWeight: '900' }}>{m.price}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default ProviderBooked
