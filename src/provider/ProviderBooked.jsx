import { useState, useEffect, useRef } from 'react'
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
  sector: 'Officers Colony (Bosan Road Corridor)',
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
    phone: '0300-4567890',
    ratingGiven: 5,
    photosCount: 2,
    reviewNote: 'Cooperative client, easy site access and instant Raast payment.'
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
    phone: '0300-8765432',
    ratingGiven: 5,
    photosCount: 1,
    reviewNote: 'Accurate technical fault description provided prior to arrival.'
  }
]

const QUICK_FEEDBACK_TAGS = [
  '⚡ Instant SBP Raast Payout',
  '📍 Accurate Location & Gate Guidance',
  '🤝 Respectful & Cooperative',
  '🛡️ Safe Work Environment',
  '💬 Clear Job Requirements'
]

const STAR_LABELS = {
  1: '★☆☆☆☆ (1.0) - Difficult experience / Unclear site',
  2: '★★☆☆☆ (2.0) - Delays encountered / Payment holdup',
  3: '★★★☆☆ (3.0) - Satisfactory client encounter',
  4: '★★★★☆ (4.0) - Very good client / Clear instructions',
  5: '★★★★★ (5.0) - Outstanding client! Instant payment & respectful'
}

function ProviderBooked({ setCurrentPage }) {
  const [activeTab, setActiveTab] = useState('live') // 'live' | 'completed'
  const fileInputRef = useRef(null)

  // Load live mission
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

  // Load completed missions
  const [completedMissions, setCompletedMissions] = useState(() => {
    try {
      const stored = localStorage.getItem('provider_completed_missions')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch (e) {}
    return INITIAL_COMPLETED_MISSIONS
  })

  const [countdownSeconds, setCountdownSeconds] = useState(liveMission?.initialSeconds || 885)
  const [currentStep, setCurrentStep] = useState(2) // 1: Confirmed, 2: En Route, 3: At Site, 4: Rate Customer
  const [isMissionFinalized, setIsMissionFinalized] = useState(false)

  // Work photo proof state
  const [uploadedPhotos, setUploadedPhotos] = useState([])
  const [otpInput, setOtpInput] = useState('')
  const [otpVerified, setOtpVerified] = useState(false)

  // Customer Star Rating & Review state
  const [customerRating, setCustomerRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [selectedTags, setSelectedTags] = useState([QUICK_FEEDBACK_TAGS[0], QUICK_FEEDBACK_TAGS[2]])
  const [reviewNote, setReviewNote] = useState('')

  const [toastMessage, setToastMessage] = useState('')

  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3800)
  }

  // Arrival countdown interval
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

  // Handle work photos file upload via input
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (uploadEvent) => {
        const newPhoto = {
          id: 'photo_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
          name: file.name,
          url: uploadEvent.target.result,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setUploadedPhotos(prev => [newPhoto, ...prev])
      }
      reader.readAsDataURL(file)
    })

    triggerToast(`Added ${files.length} work completion photo(s)!`)
    // Reset file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Add sample multimeter diagnostic photo for quick testing
  const handleAddSamplePhoto = () => {
    const samplePhoto = {
      id: 'sample_' + Date.now(),
      name: 'Multimeter_Diagnostic_Proof.jpg',
      url: '/provider-hero-1.jpg',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setUploadedPhotos(prev => [samplePhoto, ...prev])
    triggerToast('Sample multimeter diagnostic photo added!')
  }

  // Remove photo from proof gallery
  const handleRemovePhoto = (photoId) => {
    setUploadedPhotos(prev => prev.filter(p => p.id !== photoId))
    triggerToast('Photo removed from submission.')
  }

  // Toggle feedback tags
  const handleToggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  // Step 3 Completion: Requires at least 1 photo + 4-digit OTP
  const handleCompleteWorkAndVerify = (e) => {
    if (e) e.preventDefault()

    if (uploadedPhotos.length === 0) {
      triggerToast('Bhai, pehle kaam ki tasweer (work proof) upload karein, phir complete hogi service!')
      return
    }

    if (!otpInput || otpInput.trim().length < 4) {
      triggerToast('Please enter the 4-digit client completion OTP provided by the customer.')
      return
    }

    setOtpVerified(true)
    setCurrentStep(4)
    triggerToast('Work photos verified & OTP confirmed! Ab customer ko review and stars dain.')
  }

  // Step 4: Submit Customer Star Rating and Finalize Mission
  const handleSubmitCustomerReview = (e) => {
    if (e) e.preventDefault()

    setIsMissionFinalized(true)
    triggerToast(`Customer review saved! ${liveMission.price} released via SBP Raast.`)

    // Save into completed missions
    const newCompletedEntry = {
      ...liveMission,
      id: 'COMP-' + liveMission.refNumber,
      status: 'completed',
      date: 'Just now',
      ratingGiven: customerRating,
      photosCount: uploadedPhotos.length,
      reviewNote: reviewNote || selectedTags.join(', ') || 'Satisfactory client encounter.'
    }

    const updatedList = [newCompletedEntry, ...completedMissions]
    setCompletedMissions(updatedList)

    try {
      localStorage.setItem('provider_completed_missions', JSON.stringify(updatedList))
      localStorage.removeItem('provider_live_booking')
    } catch (err) {}
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
              Live Multan GPS telematics, doorstep transit, diagnostic photo proof verification, and instant Raast payout.
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
            {liveMission && !isMissionFinalized && <span className="tab-live-dot"></span>}
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
                        {isMissionFinalized
                          ? 'Mission Completed • Cleared via SBP Raast'
                          : currentStep === 4
                          ? 'Work Verified • Rate Customer Experience'
                          : currentStep === 3
                          ? 'At Client Doorstep • Upload Work Proof & Enter OTP'
                          : 'En Route to Client Doorstep in Multan'}
                      </h2>
                      <p className="lst-subtext">
                        Client: <strong>{liveMission.customer}</strong> • Sector: <strong>{liveMission.location}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Real-time Countdown Timer */}
                  <div className="lst-right-timer">
                    <span className="cd-hero-label">Target Doorstep Arrival</span>
                    <div className="cd-hero-timer-display">
                      <span className="cd-hero-icon">⏱️</span>
                      <strong className="cd-hero-digits">
                        {currentStep >= 3 ? 'ARRIVED' : formatTime(countdownSeconds)}
                      </strong>
                      <span className="cd-hero-unit">
                        {currentStep >= 3 ? 'AT SITE' : 'MINS REMAINING'}
                      </span>
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
                            YOU ({currentStep >= 3 ? 'AT SITE' : `EN ROUTE • ${liveMission.speed}`})
                          </text>
                          <text className="map-hud-sub" x="0" y="-24" fill="#EEF4F4" fontSize="9.5" fontWeight="700" textAnchor="middle">
                            {liveMission.currentLocality}
                          </text>
                        </g>
                      </g>
                    </svg>
                  </div>

                  {/* ── 4-COLUMN STRUCTURED TELEMETRY STATUS STRIP ── */}
                  <div className="live-telemetry-status-strip">
                    <div className="lts-item">
                      <span className="lts-lbl">⚡ LIVE SPEED</span>
                      <strong className="lts-val highlight">{currentStep >= 3 ? '0 km/h (At Site)' : liveMission.speed}</strong>
                    </div>

                    <div className="lts-item">
                      <span className="lts-lbl">📍 TRANSIT DISTANCE</span>
                      <strong className="lts-val">{currentStep >= 3 ? '0 km (Arrived)' : liveMission.distance}</strong>
                    </div>

                    <div className="lts-item">
                      <span className="lts-lbl">⏱️ ESTIMATED ETA</span>
                      <strong className="lts-val highlight">
                        {currentStep >= 3 ? '00:00 (At Doorstep)' : `${formatTime(countdownSeconds)} MINS`}
                      </strong>
                    </div>

                    <div className="lts-item">
                      <span className="lts-lbl">💳 GUARANTEED PAYOUT</span>
                      <strong className="lts-val highlight">{liveMission.price} DIRECT RAAST</strong>
                    </div>
                  </div>
                </div>

                {/* ── CARD 3: CLIENT DOSSIER, PROGRESS & COMPLETION WORKFLOW ── */}
                <div className="provider-dossier-card">
                  
                  {/* Top Dossier Header: Client Meta & Direct Comms */}
                  <div className="pdc-header-row">
                    <div className="pdc-client-meta">
                      <div className="pdc-avatar">
                        <span className="pdc-avatar-text">
                          {liveMission.customer ? liveMission.customer.split(' ').map(n => n[0]).slice(0, 2).join('') : 'CL'}
                        </span>
                        <span className="pdc-avatar-dot"></span>
                      </div>

                      <div className="pdc-name-wrap">
                        <div className="pdc-badges-row">
                          <span className="pdc-badge-pill">✦ Multan Verified Client</span>
                          <span className="pdc-rating-pill">★ 4.98 (18 Orders)</span>
                        </div>
                        <h3 className="pdc-client-name">{liveMission.customer}</h3>
                      </div>
                    </div>

                    {/* Direct Contact & Navigation Actions */}
                    <div className="pdc-comms-actions">
                      <a 
                        href={`tel:${liveMission.phone}`}
                        className="pdc-btn-call"
                        onClick={(e) => {
                          triggerToast(`Calling client: ${liveMission.customer} (${liveMission.phone})...`)
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span>Direct Call ({liveMission.phone})</span>
                      </a>

                      <button 
                        type="button" 
                        className="pdc-btn-chat"
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
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span>In-App Messages</span>
                      </button>

                      <button
                        type="button"
                        className="pdc-btn-map"
                        onClick={() => triggerToast(`Copied doorstep address: ${liveMission.address}`)}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                          <line x1="8" y1="2" x2="8" y2="18"></line>
                          <line x1="16" y1="6" x2="16" y2="22"></line>
                        </svg>
                        <span>Directions</span>
                      </button>
                    </div>
                  </div>

                  {/* Structured 6-Grid Client Dossier Information */}
                  <div className="pdc-details-grid">
                    <div className="pdc-detail-item">
                      <span className="pdc-detail-label">🔧 Service Requested</span>
                      <strong className="pdc-detail-value">{liveMission.service}</strong>
                      <span className="pdc-detail-sub">Technical Dispatch Code: #{liveMission.refNumber}</span>
                    </div>

                    <div className="pdc-detail-item">
                      <span className="pdc-detail-label">📞 Client Phone</span>
                      <strong className="pdc-detail-value">{liveMission.phone}</strong>
                      <span className="pdc-detail-sub">Customer Name: {liveMission.customer}</span>
                    </div>

                    <div className="pdc-detail-item">
                      <span className="pdc-detail-label">📍 Exact Doorstep Address</span>
                      <strong className="pdc-detail-value">{liveMission.address}</strong>
                      <span className="pdc-detail-sub">Sector: {liveMission.sector || liveMission.location}</span>
                    </div>

                    <div className="pdc-detail-item">
                      <span className="pdc-detail-label">💰 Guaranteed Direct Payout</span>
                      <strong className="pdc-detail-value highlight-cyan">{liveMission.price}</strong>
                      <span className="pdc-detail-sub">Direct SBP Raast Transfer • 0% Commission</span>
                    </div>

                    <div className="pdc-detail-item">
                      <span className="pdc-detail-label">⏱️ Dispatch Scheduled</span>
                      <strong className="pdc-detail-value">{liveMission.date} at {liveMission.time}</strong>
                      <span className="pdc-detail-sub">Rapid Emergency Dispatch Status</span>
                    </div>

                    <div className="pdc-detail-item">
                      <span className="pdc-detail-label">🛡️ Settlement Status</span>
                      <strong className="pdc-detail-value">
                        {isMissionFinalized 
                          ? '✓ Raast Payout Cleared' 
                          : otpVerified 
                          ? '✓ OTP Verified' 
                          : 'Pending Work Proof & OTP'}
                      </strong>
                      <span className="pdc-detail-sub">State Bank of Pakistan Raast Protocol</span>
                    </div>
                  </div>

                  {/* 4-Stage Connected Stepper */}
                  <div className="pdc-stepper-section">
                    <div className="uoc-stepper-wrap">
                      <div className="uoc-stepper-header">
                        <span className="uoc-stepper-title">MISSION DISPATCH &amp; COMPLETION PIPELINE</span>
                        <span className="uoc-stage-indicator">
                          {isMissionFinalized 
                            ? 'Mission Completed & Paid ✓' 
                            : currentStep === 4 
                            ? 'Stage 4: Client Rating Active' 
                            : currentStep === 3 
                            ? 'Stage 3: Work Proof & OTP' 
                            : 'Stage 2: En Route in Transit'}
                        </span>
                      </div>

                      <div className="connected-stepper-track">
                        <div className="stepper-track-line">
                          <div 
                            className="stepper-track-fill" 
                            style={{ 
                              width: isMissionFinalized || currentStep === 4 
                                ? '100%' 
                                : currentStep === 3 
                                ? '66%' 
                                : '38%' 
                            }}
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
                            <span className="cs-sub highlight">{liveMission.speed} • Multan GPS</span>
                          </div>
                        </div>

                        {/* STEP 3: Doorstep Arrival & Proof */}
                        <div className={`cs-node ${currentStep === 3 ? 'active' : currentStep > 3 ? 'completed' : 'pending'}`}>
                          <div className="cs-marker">
                            <span className="cs-marker-inner">{currentStep > 3 ? '✓' : '3'}</span>
                            {currentStep === 3 && <span className="cs-active-halo"></span>}
                          </div>
                          <div className="cs-text">
                            <strong className="cs-title">At Site &amp; Proof Photos</strong>
                            <span className="cs-sub">Work Pics &amp; Client OTP</span>
                          </div>
                        </div>

                        {/* STEP 4: Review Customer & Payout */}
                        <div className={`cs-node ${currentStep === 4 || isMissionFinalized ? 'active' : 'pending'}`}>
                          <div className="cs-marker">
                            <span className="cs-marker-inner">{isMissionFinalized ? '✓' : '4'}</span>
                            {currentStep === 4 && !isMissionFinalized && <span className="cs-active-halo"></span>}
                          </div>
                          <div className="cs-text">
                            <strong className="cs-title">Customer Stars &amp; Payout</strong>
                            <span className="cs-sub">Rate Client &amp; Clear Raast</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── STAGE-AWARE ACTION CONTAINER ── */}
                  <div className="pdc-stage-action-box">

                    {/* FINALIZED STATE: Payout Cleared Banner */}
                    {isMissionFinalized ? (
                      <div className="provider-finalized-banner">
                        <div className="pfb-top-row">
                          <div className="pfb-title-group">
                            <h4>
                              <span>✓</span>
                              <span>Mission Successfully Completed &amp; Verified</span>
                            </h4>
                            <p>
                              Technician proof photos verified and client completion OTP matched. Payout has cleared directly.
                            </p>
                          </div>
                          <div className="pfb-payout-badge">
                            ✓ {liveMission.price} Deposited via Raast
                          </div>
                        </div>

                        <div className="pfb-review-summary">
                          <span>⭐ <strong>You Rated Customer {liveMission.customer}:</strong></span>
                          <span>★ {customerRating}.0 — {STAR_LABELS[customerRating]}</span>
                        </div>

                        {uploadedPhotos.length > 0 && (
                          <div className="pwp-preview-grid" style={{ marginTop: '0.25rem' }}>
                            {uploadedPhotos.map(p => (
                              <div key={p.id} className="pwp-preview-item">
                                <img src={p.url} alt="Proof" />
                                <span className="pwp-preview-caption">Proof Verified</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="pfb-actions-row">
                          <button
                            type="button"
                            className="pfb-view-completed-btn"
                            onClick={() => setActiveTab('completed')}
                          >
                            <span>View in Completed Missions ({completedMissions.length}) →</span>
                          </button>

                          {setCurrentPage && (
                            <button
                              type="button"
                              className="pfb-next-jobs-btn"
                              onClick={() => setCurrentPage('services')}
                            >
                              <span>+ Accept Next Available Customer Job</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ) : currentStep === 4 ? (
                      /* ── STAGE 4: RATE & REVIEW CUSTOMER ── */
                      <div className="provider-review-customer-card">
                        <div className="prc-header">
                          <h4>⭐ Rate &amp; Review Customer: {liveMission.customer}</h4>
                          <p>
                            Work photos verified and OTP matched! Please share your experience with this client to maintain community trust in Multan.
                          </p>
                        </div>

                        {/* Interactive Stars Selector */}
                        <div className="prc-stars-container">
                          <div className="prc-stars-row">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                className={`prc-star-btn ${(hoverRating || customerRating) >= star ? 'active' : ''}`}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setCustomerRating(star)}
                                title={`Rate ${star} Stars`}
                                aria-label={`Rate ${star} Stars`}
                              >
                                ★
                              </button>
                            ))}
                          </div>
                          <span className="prc-star-label">
                            {STAR_LABELS[hoverRating || customerRating]}
                          </span>
                        </div>

                        {/* Quick Experience Feedback Tags */}
                        <div className="prc-tags-section">
                          <span className="prc-tags-label">Select Client Experience Badges:</span>
                          <div className="prc-tags-grid">
                            {QUICK_FEEDBACK_TAGS.map(tag => {
                              const isSelected = selectedTags.includes(tag)
                              return (
                                <button
                                  key={tag}
                                  type="button"
                                  className={`prc-tag-pill ${isSelected ? 'active' : ''}`}
                                  onClick={() => handleToggleTag(tag)}
                                >
                                  {tag}
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        {/* Review Notes Textarea */}
                        <textarea
                          className="prc-textarea"
                          placeholder="Optional review notes (e.g. Malik Farhan had clear electrical requirements, safe site access, and paid right away)..."
                          value={reviewNote}
                          onChange={(e) => setReviewNote(e.target.value)}
                        />

                        {/* Submit Review Button */}
                        <button
                          type="button"
                          className="prc-submit-btn"
                          onClick={handleSubmitCustomerReview}
                        >
                          Submit Customer Review &amp; Release {liveMission.price} via Raast ✓
                        </button>
                      </div>
                    ) : currentStep === 3 ? (
                      /* ── STAGE 3: AT SITE - UPLOAD WORK PROOF PHOTOS & OTP ── */
                      <div className="provider-work-proof-card">
                        <div className="pwp-header">
                          <h4>📸 Work Completion Proof &amp; Diagnostic Photos (Required)</h4>
                          <p>
                            Jasy hi aapka technical kaam mukammal ho jaye, finished repair ya multimeter reading ki tasweer capture/upload karein. Kaam ki photos ke baghair service complete nahi hogi.
                          </p>
                        </div>

                        {/* Hidden File Input */}
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: 'none' }}
                          multiple
                          accept="image/*"
                          onChange={handleFileUpload}
                        />

                        {/* Upload Controls Row */}
                        <div className="pwp-upload-controls">
                          <button
                            type="button"
                            className="pwp-file-btn"
                            onClick={() => fileInputRef.current && fileInputRef.current.click()}
                          >
                            <span>📷 Take / Upload Work Photos</span>
                          </button>

                          <button
                            type="button"
                            className="pwp-sample-btn"
                            onClick={handleAddSamplePhoto}
                          >
                            <span>+ Add Multimeter Telemetry Sample</span>
                          </button>

                          <span className="pwp-photo-counter">
                            {uploadedPhotos.length} Photo(s) Attached {uploadedPhotos.length > 0 ? '✓' : '(Min. 1 Required)'}
                          </span>
                        </div>

                        {/* Uploaded Photos Preview Gallery */}
                        {uploadedPhotos.length > 0 && (
                          <div className="pwp-preview-grid">
                            {uploadedPhotos.map((photo) => (
                              <div key={photo.id} className="pwp-preview-item">
                                <img src={photo.url} alt={photo.name} />
                                <button
                                  type="button"
                                  className="pwp-preview-remove"
                                  onClick={() => handleRemovePhoto(photo.id)}
                                  title="Delete photo"
                                >
                                  ✕
                                </button>
                                <span className="pwp-preview-caption">{photo.name}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Client OTP Input & Verification Form */}
                        <div className="pwp-otp-box">
                          <div className="pwp-otp-info">
                            <h5>Client 4-Digit Completion OTP</h5>
                            <p>Ask Malik Farhan for their 4-digit code to release instant payment.</p>
                          </div>

                          <form onSubmit={handleCompleteWorkAndVerify} className="pwp-otp-form">
                            <input
                              type="text"
                              maxLength={4}
                              placeholder="e.g. 7419"
                              value={otpInput}
                              onChange={(e) => setOtpInput(e.target.value)}
                              className="pwp-otp-input"
                            />
                            <button
                              type="submit"
                              className="pwp-submit-proof-btn"
                            >
                              Verify Work &amp; Rate Customer →
                            </button>
                          </form>
                        </div>
                      </div>
                    ) : (
                      /* ── STAGE 2: EN ROUTE BANNER ── */
                      <div className="stage-enroute-banner">
                        <div className="seb-text">
                          <h4>🏍️ En Route to Client Site: {liveMission.address}</h4>
                          <p>Multan GPS Navigation Active • Current Speed: {liveMission.speed} • ETA: {formatTime(countdownSeconds)}</p>
                        </div>

                        <button
                          type="button"
                          className="seb-arrive-btn"
                          onClick={() => {
                            setCurrentStep(3)
                            triggerToast('Status updated: Arrived at client doorstep! Diagnostic & repair work active.')
                          }}
                        >
                          ✓ I Have Arrived at Client Doorstep
                        </button>
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
            TAB 2: COMPLETED MISSIONS ARCHIVE
        ══════════════════════════════════════════════════ */}
        {activeTab === 'completed' && (
          <div className="completed-services-feed">
            {completedMissions.map(m => (
              <div key={m.id} className="completed-service-card" style={{ marginBottom: '1.25rem' }}>
                <div className="csc-header-row">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                      <span className="csc-ref">REF #{m.refNumber}</span>
                      <span style={{ fontSize: '0.72rem', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '0.2rem 0.6rem', borderRadius: '20px', fontWeight: '800' }}>
                        ✓ Cleared via Raast
                      </span>
                      {m.ratingGiven && (
                        <span style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: '800' }}>
                          Client Rated: {'★'.repeat(m.ratingGiven)} ({m.ratingGiven}.0)
                        </span>
                      )}
                    </div>
                    <h3 className="csc-service-title">{m.service}</h3>
                    <p className="csc-provider-line">Client: <strong>{m.customer}</strong> • {m.location}</p>
                    {m.reviewNote && (
                      <p style={{ fontSize: '0.8rem', color: 'rgba(238, 244, 244, 0.7)', fontStyle: 'italic', margin: '0.35rem 0 0 0' }}>
                        "{m.reviewNote}"
                      </p>
                    )}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#8FD3E8' }}>Cleared Compensation</span>
                    <strong style={{ fontSize: '1.4rem', color: '#17f7f7', fontWeight: '900' }}>{m.price}</strong>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(238, 244, 244, 0.5)', marginTop: '0.2rem' }}>
                      {m.date} {m.time ? `• ${m.time}` : ''}
                    </span>
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
