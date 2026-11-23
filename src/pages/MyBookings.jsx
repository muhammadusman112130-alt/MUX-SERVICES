import { useState, useEffect } from 'react'
import { bookingsAPI } from '../services/api'
import './MyBookings.css'

// Initial mock data if storage is clean
const INITIAL_BOOKINGS = [
  {
    id: 'MUX-849201',
    refNumber: 'MUX-849201',
    service: 'AC Diagnostic & Cooling Overhaul',
    provider: 'Mary Johnson',
    price: 'Rs. 2,500',
    status: 'active', // 'active' | 'completed' | 'cancelled'
    date: 'Today',
    time: '10:30 AM',
    location: 'Cantt & Bosan Road, Multan',
    address: 'House 14, Sector B, Cantt, Multan',
    warranty: '14-Day Free Workmanship Guarantee',
    phone: '+92 300 1234567',
    technicianETA: '< 20 Mins',
    initialSeconds: 1125, // ~18 mins 45 secs countdown
    currentLocality: 'Crossing Bosan Road toward Cantt',
    speed: '34 km/h',
    distance: '2.1 km remaining',
    createdAt: new Date().toISOString()
  },
  {
    id: 'MUX-739104',
    refNumber: 'MUX-739104',
    service: 'Main Circuit Breaker & Load Balancing',
    provider: 'Muhammad Akram',
    price: 'Rs. 1,800',
    status: 'completed',
    date: 'Yesterday',
    time: '04:15 PM',
    location: 'Gulgasht Colony, Multan',
    address: 'Street 3, Block C, Gulgasht, Multan',
    warranty: '14-Day Free Workmanship Guarantee',
    phone: '+92 300 7654321',
    rating: 5,
    reviewText: 'Akram arrived right on time, replaced the main breaker swiftly, and tested all circuits. Very polite and professional!',
    reviewTags: ['Punctual Arrival', 'Expert Diagnostic', 'Cleaned Work Area'],
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
]

const INITIAL_COMPLAINTS = [
  {
    id: 'CMP-7482',
    bookingRef: 'MUX-739104',
    provider: 'Muhammad Akram',
    service: 'Main Circuit Breaker & Load Balancing',
    category: 'Technician Delay in Arrival',
    details: 'Technician reached 20 minutes later than promised due to Bosan Road traffic congestion.',
    status: 'Resolved by Multan Support',
    resolutionNote: 'Rs. 300 courtesy credit added to customer account. Specialist notified for punctual compliance.',
    date: 'Yesterday at 05:30 PM'
  }
]

function MyBookings({ setCurrentPage }) {
  // Tabs: 'live' (default active tracked), 'completed', 'complaints'
  const [activeTab, setActiveTab] = useState('live')

  // Bookings list state
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('servicehub_bookings')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch (e) {
      console.error('Error reading bookings:', e)
    }
    return INITIAL_BOOKINGS
  })

  // Complaints list state
  const [complaints, setComplaints] = useState(() => {
    try {
      const saved = localStorage.getItem('servicehub_complaints')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch (e) {}
    return INITIAL_COMPLAINTS
  })

  // Live active booking
  const liveBooking = bookings.find(b => b.status === 'active') || null

  // Active countdown timer (counts down seconds continuously)
  const [countdownSeconds, setCountdownSeconds] = useState(liveBooking?.initialSeconds || 1125)

  useEffect(() => {
    if (!liveBooking) return
    const timer = setInterval(() => {
      setCountdownSeconds(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [liveBooking])

  // Sync with MongoDB backend
  useEffect(() => {
    bookingsAPI.getAll().then(res => {
      if (res && res.success && Array.isArray(res.bookings) && res.bookings.length > 0) {
        setBookings(prev => {
          const map = new Map()
          res.bookings.forEach(b => {
            const key = b.refNumber || b._id
            map.set(key, { ...b, id: b.id || b._id })
          })
          prev.forEach(b => {
            const key = b.refNumber || b.id
            if (!map.has(key)) map.set(key, b)
          })
          const merged = Array.from(map.values())
          try {
            localStorage.setItem('servicehub_bookings', JSON.stringify(merged))
          } catch (e) {}
          return merged
        })
      }
    }).catch(err => {
      console.warn('[Booked] Backend sync notice:', err.message)
    })
  }, [])

  // Modals state
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [cancelReason, setCancelReason] = useState('Technician is taking too long to arrive')
  const [cancelNotes, setCancelNotes] = useState('')

  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewBooking, setReviewBooking] = useState(null)
  const [selectedStars, setSelectedStars] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [selectedTags, setSelectedTags] = useState(['Punctual Arrival', 'Polite & Clean'])

  const [showComplaintModal, setShowComplaintModal] = useState(false)
  const [complaintCategory, setComplaintCategory] = useState('Overcharging / Rate Dispute')
  const [complaintDetails, setComplaintDetails] = useState('')

  const [showCallModal, setShowCallModal] = useState(false)

  // Format countdown mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // 1. CANCEL SERVICE (Customer cancels if taking too long)
  const handleConfirmCancelService = () => {
    if (!liveBooking) return
    const updated = bookings.map(b => b.id === liveBooking.id || b.refNumber === liveBooking.refNumber ? {
      ...b,
      status: 'cancelled',
      cancelReason,
      cancelledAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } : b)

    setBookings(updated)
    try {
      localStorage.setItem('servicehub_bookings', JSON.stringify(updated))
    } catch (e) {}

    setShowCancelModal(false)
    alert(`Service #${liveBooking.refNumber} has been successfully cancelled. Your 100% Escrow deposit has been refunded.`)
  }

  // 2. COMPLETE WORK & REVIEW SERVICE
  const handleOpenReviewModal = (booking) => {
    setReviewBooking(booking || liveBooking)
    setSelectedStars(5)
    setReviewComment('')
    setShowReviewModal(true)
  }

  const handleSubmitReviewAndComplete = (e) => {
    e.preventDefault()
    const target = reviewBooking || liveBooking
    if (!target) return

    const updated = bookings.map(b => b.id === target.id || b.refNumber === target.refNumber ? {
      ...b,
      status: 'completed',
      rating: selectedStars,
      reviewText: reviewComment.trim() || 'Work completed satisfactorily with verified craftsmanship.',
      reviewTags: selectedTags,
      completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } : b)

    setBookings(updated)
    try {
      localStorage.setItem('servicehub_bookings', JSON.stringify(updated))
    } catch (e) {}

    setShowReviewModal(false)
    // Switch to completed tab so user immediately sees their completed service
    setActiveTab('completed')
    alert(`Thank you! Work marked as completed. Your verified review for ${target.provider} has been published.`)
  }

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  // 3. FILE COMPLAINT
  const handleSubmitComplaint = (e) => {
    e.preventDefault()
    const target = liveBooking || bookings[0]
    if (!target) return

    const newComplaint = {
      id: `CMP-${Date.now().toString().slice(-4)}`,
      bookingRef: target.refNumber,
      provider: target.provider,
      service: target.service,
      category: complaintCategory,
      details: complaintDetails.trim() || 'Customer reported an issue regarding doorstep service.',
      status: 'Under Investigation • Multan Support Dispatched',
      resolutionNote: 'MUX SERVICES Customer Ombudsman is actively reviewing technician telematics.',
      date: 'Just now'
    }

    const updatedComplaints = [newComplaint, ...complaints]
    setComplaints(updatedComplaints)
    try {
      localStorage.setItem('servicehub_complaints', JSON.stringify(updatedComplaints))
    } catch (e) {}

    setShowComplaintModal(false)
    setComplaintDetails('')
    // Switch to complaints tab so user sees their registered complaint
    setActiveTab('complaints')
    alert(`Complaint #${newComplaint.id} registered! Our Multan Resolution Officer is investigating. Escalation hotline: +92 300 1234567.`)
  }

  // Open Direct Chat
  const handleChatWithProvider = (b) => {
    const chatPayload = {
      id: b.provider.toLowerCase().replace(/\s+/g, '-'),
      name: b.provider,
      service: b.service,
      price: b.price,
      verified: true
    }
    try {
      localStorage.setItem('active_chat_provider', JSON.stringify(chatPayload))
    } catch (e) {}
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('messages')
    }
  }

  const completedBookings = bookings.filter(b => b.status === 'completed')

  return (
    <div className="booked-page">
      <div className="booked-container">

        {/* ══════════════════════════════════════════════════
            HEADER & TOP NAVIGATION TABS (BOOKED)
        ══════════════════════════════════════════════════ */}
        <header className="booked-header">
          <div className="bh-left">
            <span className="bh-badge">✦ MUX SERVICES CLIENT PORTAL</span>
            <h1 className="bh-title">Booked Services</h1>
            <p className="bh-subtitle">
              Live doorstep technician GPS tracking, arrival countdown, and verified job completion across Multan.
            </p>
          </div>

          <div className="bh-right">
            {liveBooking && (
              <button 
                type="button" 
                className="bh-complaint-quick-btn"
                onClick={() => setShowComplaintModal(true)}
              >
                <span>⚠️ Lodge Complaint</span>
              </button>
            )}
            {setCurrentPage && (
              <button 
                type="button" 
                className="bh-new-book-btn"
                onClick={() => setCurrentPage('services')}
              >
                <span>+ Hire New Specialist</span>
              </button>
            )}
          </div>
        </header>

        {/* 3 Main View Tabs */}
        <nav className="booked-tabs-bar" aria-label="Booked Navigation">
          <button 
            type="button" 
            className={`bt-tab-btn ${activeTab === 'live' ? 'active' : ''}`}
            onClick={() => setActiveTab('live')}
          >
            <span className="tab-icon">⚡</span>
            <span>Live Tracked (Active)</span>
            {liveBooking && <span className="tab-live-dot"></span>}
          </button>

          <button 
            type="button" 
            className={`bt-tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            <span className="tab-icon">✓</span>
            <span>Completed Services ({completedBookings.length})</span>
          </button>

          <button 
            type="button" 
            className={`bt-tab-btn ${activeTab === 'complaints' ? 'active' : ''}`}
            onClick={() => setActiveTab('complaints')}
          >
            <span className="tab-icon">⚠️</span>
            <span>Complaints &amp; Disputes ({complaints.length})</span>
          </button>
        </nav>

        {/* ══════════════════════════════════════════════════
            TAB 1: LIVE TRACKED (MODULAR EXECUTIVE DASHBOARD & MULTAN GPS RADAR)
        ══════════════════════════════════════════════════ */}
        {activeTab === 'live' && (
          <div className="booked-live-section">
            {liveBooking ? (
              <div className="live-dashboard-modular-wrap">
                
                {/* ── CARD 1: LIVE DISPATCH STATUS & DIGITAL COUNTDOWN ── */}
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
                          LIVE SATELLITE RADAR
                        </span>
                        <span className="lst-pill-ref">REF #{liveBooking.refNumber}</span>
                        <span className="lst-pill-vehicle">🏍️ {liveBooking.bikePlate || 'MN-24-7890 (Honda CD-70)'}</span>
                      </div>
                      <h2 className="lst-headline">Technician En Route to Your Doorstep</h2>
                      <p className="lst-subtext">Real-time GPS telematics active across Multan • Direct transit route assigned</p>
                    </div>
                  </div>

                  {/* ⏱️ REAL-TIME COUNTDOWN TIMER (EXPANDED & ILLUMINATED) */}
                  <div className="lst-right-timer">
                    <span className="cd-hero-label">Estimated Doorstep Arrival</span>
                    <div className="cd-hero-timer-display">
                      <span className="cd-hero-icon">⏱️</span>
                      <strong className="cd-hero-digits">{formatTime(countdownSeconds)}</strong>
                      <span className="cd-hero-unit">MINS REMAINING</span>
                    </div>
                    <span className="cd-hero-guarantee">⚡ Multan Rapid Doorstep Arrival Protocol</span>
                  </div>
                </div>

                {/* ── CARD 2: FULL-WIDTH EDGE-TO-EDGE MULTAN GPS MAP RADAR ── */}
                <div className="live-mod-card live-multan-map-card">
                  <div className="lmc-header-bar">
                    <div className="lmc-left-title">
                      <span className="lmc-radar-sweep-icon"></span>
                      <strong>MULTAN VECTOR SATELLITE RADAR — 100% LIVE COVERAGE</strong>
                    </div>
                    <div className="lmc-traffic-pill">
                      <span className="lmc-traffic-dot"></span>
                      <span>Corridor: Bosan Road → MDA → Cantt (Normal Flow)</span>
                    </div>
                  </div>

                  <div className="multan-gps-map-container">
                    {/* Animated Radar Scanning Line */}
                    <div className="map-radar-sweep-line"></div>

                    <svg className="multan-vector-map" viewBox="0 0 1200 420" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="mapBgFull" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#08181b" />
                          <stop offset="50%" stopColor="#0a2126" />
                          <stop offset="100%" stopColor="#061214" />
                        </linearGradient>

                        <linearGradient id="roadGlowLine" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="50%" stopColor="#17f7f7" />
                          <stop offset="100%" stopColor="#8FD3E8" />
                        </linearGradient>

                        <linearGradient id="riverStream" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(23, 247, 247, 0.04)" />
                          <stop offset="100%" stopColor="rgba(143, 211, 232, 0.12)" />
                        </linearGradient>

                        <filter id="neonPulseGlow" x="-30%" y="-30%" width="160%" height="160%">
                          <feGaussianBlur stdDeviation="5" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      {/* Full-width 1200x420 Dark Tech Canvas */}
                      <rect width="1200" height="420" fill="url(#mapBgFull)" />

                      {/* City Canal / Water Accent */}
                      <path 
                        d="M 0 350 C 300 330, 600 390, 1200 340 L 1200 420 L 0 420 Z" 
                        fill="url(#riverStream)" 
                      />

                      {/* Background City Street Grid (Multan Coordinate Network spanning 0 to 1200) */}
                      <g opacity="0.14" stroke="#8FD3E8" strokeWidth="1">
                        <line x1="0" y1="50" x2="1200" y2="50" />
                        <line x1="0" y1="110" x2="1200" y2="110" />
                        <line x1="0" y1="170" x2="1200" y2="170" />
                        <line x1="0" y1="230" x2="1200" y2="230" />
                        <line x1="0" y1="290" x2="1200" y2="290" />
                        <line x1="0" y1="350" x2="1200" y2="350" />

                        <line x1="100" y1="0" x2="100" y2="420" />
                        <line x1="220" y1="0" x2="220" y2="420" />
                        <line x1="340" y1="0" x2="340" y2="420" />
                        <line x1="460" y1="0" x2="460" y2="420" />
                        <line x1="580" y1="0" x2="580" y2="420" />
                        <line x1="700" y1="0" x2="700" y2="420" />
                        <line x1="820" y1="0" x2="820" y2="420" />
                        <line x1="940" y1="0" x2="940" y2="420" />
                        <line x1="1060" y1="0" x2="1060" y2="420" />
                        <line x1="1180" y1="0" x2="1180" y2="420" />
                      </g>

                      {/* Major Multan Highways & Thoroughfares (Spanning edge to edge) */}
                      {/* Northern Bypass */}
                      <path d="M 0 65 Q 400 80, 800 60 T 1200 70" fill="none" stroke="#12353c" strokeWidth="16" strokeLinecap="round" />
                      <path d="M 0 65 Q 400 80, 800 60 T 1200 70" fill="none" stroke="rgba(143, 211, 232, 0.3)" strokeWidth="2.5" strokeDasharray="8 6" />

                      {/* Bosan Road into City Center */}
                      <path d="M 180 0 Q 320 180 520 230 T 900 290" fill="none" stroke="#12353c" strokeWidth="18" strokeLinecap="round" />
                      <path d="M 180 0 Q 320 180 520 230 T 900 290" fill="none" stroke="rgba(143, 211, 232, 0.3)" strokeWidth="3" strokeDasharray="8 6" />

                      {/* Khanewal Road to Cantt Mall Road */}
                      <path d="M 0 280 Q 350 240 700 200 T 1200 180" fill="none" stroke="#12353c" strokeWidth="16" strokeLinecap="round" />
                      <path d="M 0 280 Q 350 240 700 200 T 1200 180" fill="none" stroke="rgba(143, 211, 232, 0.25)" strokeWidth="2.5" strokeDasharray="7 5" />

                      {/* Multan City Sector & Landmark Labels */}
                      <g fill="rgba(238, 244, 244, 0.5)" fontSize="11" fontWeight="800" fontFamily="sans-serif">
                        <text x="70" y="45">NORTHERN BYPASS</text>
                        <text x="190" y="100">GULGASHT COLONY</text>
                        <text x="390" y="85">BOSAN ROAD</text>
                        <text x="250" y="320">CHOWK KUMHARAN</text>
                        <text x="490" y="165">MDA CHOWK</text>
                        <text x="540" y="270">NAWAN SHEHR</text>
                        <text x="710" y="330">KUTCHERY ROAD</text>
                        <text x="820" y="130">OFFICERS COLONY</text>
                        <text x="970" y="315">MULTAN CANTT</text>
                        <text x="1080" y="160">SHERSHAH ROAD</text>
                      </g>

                      {/* ═══ REAL-TIME DISPATCH TRAJECTORY PATH (Glowing Neon) ═══ */}
                      {/* Base Glow Line */}
                      <path 
                        d="M 320 215 C 450 230, 580 160, 720 180 S 860 215, 960 205" 
                        fill="none" 
                        stroke="rgba(23, 247, 247, 0.25)" 
                        strokeWidth="10" 
                        strokeLinecap="round"
                      />
                      {/* Active Flowing Neon Dash Line */}
                      <path 
                        id="multanDispatchRoute"
                        d="M 320 215 C 450 230, 580 160, 720 180 S 860 215, 960 205" 
                        fill="none" 
                        stroke="url(#roadGlowLine)" 
                        strokeWidth="5" 
                        strokeLinecap="round"
                        filter="url(#neonPulseGlow)"
                        className="animated-gps-route-flow"
                      />

                      {/* ═══ DESTINATION: CUSTOMER DOORSTEP PIN (at x=960, y=205) ═══ */}
                      <g transform="translate(960, 205)">
                        {/* Radar wave ripples */}
                        <circle r="40" fill="none" stroke="#17f7f7" strokeWidth="1" className="radar-wave-cust-1" />
                        <circle r="25" fill="none" stroke="#17f7f7" strokeWidth="1.5" className="radar-wave-cust-2" />
                        <circle r="12" fill="#17f7f7" filter="url(#neonPulseGlow)" />
                        <circle r="5" fill="#0E2E33" />
                        
                        {/* Destination HUD Marker Box */}
                        <g className="hud-pin-float">
                          <rect x="-95" y="-58" width="190" height="38" rx="10" fill="#0E2E33" stroke="#17f7f7" strokeWidth="1.8" filter="url(#neonPulseGlow)" />
                          <text x="0" y="-39" fill="#17f7f7" fontSize="11" fontWeight="900" textAnchor="middle">📍 YOUR DOORSTEP</text>
                          <text x="0" y="-24" fill="#EEF4F4" fontSize="9.5" fontWeight="700" textAnchor="middle">{liveBooking.location || 'Cantt, Multan'}</text>
                        </g>
                      </g>

                      {/* ═══ ORIGIN: TECHNICIAN REAL-TIME POSITION PIN (at x=320, y=215) ═══ */}
                      <g transform="translate(320, 215)">
                        {/* Moving Radar Waves */}
                        <circle r="30" fill="none" stroke="#10b981" strokeWidth="1.5" className="radar-wave-tech" />
                        <circle r="16" fill="#10b981" filter="url(#neonPulseGlow)" />
                        
                        {/* Floating Motorcycle Icon with vibration */}
                        <g className="tech-bike-vibration">
                          <text x="0" y="6" fontSize="14" textAnchor="middle" fill="#ffffff">🛵</text>
                        </g>

                        {/* Specialist Live HUD Pin */}
                        <g className="hud-pin-float">
                          <rect x="-110" y="-58" width="220" height="38" rx="10" fill="#0E2E33" stroke="#10b981" strokeWidth="1.8" filter="url(#neonPulseGlow)" />
                          <text x="0" y="-39" fill="#10b981" fontSize="11" fontWeight="900" textAnchor="middle">
                            🟢 {liveBooking.provider} (En Route)
                          </text>
                          <text x="0" y="-24" fill="#EEF4F4" fontSize="9.5" fontWeight="700" textAnchor="middle">
                            {liveBooking.speed} • {liveBooking.distance} remaining
                          </text>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>

                {/* ── CARD 3: UNIFIED SPECIALIST, CONNECTED STEPPER & ACTIONS CARD ── */}
                <div className="live-mod-card live-unified-ops-card">
                  
                  {/* TOP TIER: ASSIGNED SPECIALIST PROFILE & COMMS */}
                  <div className="uoc-specialist-row">
                    <div className="uoc-specialist-left">
                      <div className="uoc-avatar">
                        <span className="uoc-avatar-text">
                          {liveBooking.provider ? liveBooking.provider.split(' ').map(n => n[0]).slice(0, 2).join('') : 'PRO'}
                        </span>
                        <span className="uoc-live-dot"></span>
                      </div>

                      <div className="uoc-info">
                        <div className="uoc-tag-row">
                          <span className="uoc-section-tag">ASSIGNED MULTAN SPECIALIST</span>
                          <span className="uoc-vetted-pill">Police &amp; CNIC Vetted</span>
                        </div>
                        <h3 className="uoc-name">{liveBooking.provider}</h3>
                        <p className="uoc-service">{liveBooking.service}</p>
                        <div className="uoc-rate-line">
                          <span>Agreed Fixed Rate:</span>
                          <strong>{liveBooking.price}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Compact Comms Buttons (Sleek, small, clean SVG) */}
                    <div className="uoc-comms-group">
                      <button 
                        type="button" 
                        className="uoc-btn-call"
                        onClick={() => setShowCallModal(true)}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span>Call Specialist</span>
                      </button>

                      <button 
                        type="button" 
                        className="uoc-btn-chat"
                        onClick={() => handleChatWithProvider(liveBooking)}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span>Open Direct Chat</span>
                      </button>
                    </div>
                  </div>

                  <div className="uoc-divider"></div>

                  {/* MIDDLE TIER: 4-STEP CONNECTED SERVICE TRACKER */}
                  <div className="uoc-stepper-wrap">
                    <div className="uoc-stepper-header">
                      <span className="uoc-stepper-title">SERVICE PROGRESS STEPPER</span>
                      <span className="uoc-stage-indicator">Stage 2 of 4 Active</span>
                    </div>

                    {/* Continuous Connected Stepper Track */}
                    <div className="connected-stepper-track">
                      {/* Connecting Line between steps */}
                      <div className="stepper-track-line">
                        <div className="stepper-track-fill" style={{ width: '38%' }}></div>
                      </div>

                      {/* STEP 1: Completed */}
                      <div className="cs-node completed">
                        <div className="cs-marker">
                          <span className="cs-marker-inner">✓</span>
                        </div>
                        <div className="cs-text">
                          <strong className="cs-title">Rate Agreed &amp; Scheduled</strong>
                          <span className="cs-sub">Locked price at {liveBooking.price}</span>
                        </div>
                      </div>

                      {/* STEP 2: Active */}
                      <div className="cs-node active">
                        <div className="cs-marker">
                          <span className="cs-marker-inner">2</span>
                          <span className="cs-active-halo"></span>
                        </div>
                        <div className="cs-text">
                          <strong className="cs-title">Technician Dispatched &amp; En Route</strong>
                          <span className="cs-sub highlight">Moving through Multan ({liveBooking.speed})</span>
                        </div>
                      </div>

                      {/* STEP 3: Pending */}
                      <div className="cs-node pending">
                        <div className="cs-marker">
                          <span className="cs-marker-inner">3</span>
                        </div>
                        <div className="cs-text">
                          <strong className="cs-title">Doorstep Arrival &amp; Diagnostic</strong>
                          <span className="cs-sub">Estimated in approx {formatTime(countdownSeconds)} mins</span>
                        </div>
                      </div>

                      {/* STEP 4: Pending */}
                      <div className="cs-node pending">
                        <div className="cs-marker">
                          <span className="cs-marker-inner">4</span>
                        </div>
                        <div className="cs-text">
                          <strong className="cs-title">Work Inspection &amp; Review</strong>
                          <span className="cs-sub">Escrow funds released upon approval</span>
                        </div>
                      </div>
                    </div>

                    {/* Escrow Safeguard strip (clean, professional) */}
                    <div className="uoc-escrow-strip">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#17f7f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      <span>
                        <strong>100% Escrow Safeguard:</strong> Your PKR funds remain locked in escrow until you personally inspect and approve the completed job.
                      </span>
                    </div>
                  </div>

                  <div className="uoc-divider"></div>

                  {/* BOTTOM TIER: COMPACT CUSTOMER ACTION CENTER */}
                  <div className="uoc-actions-row">
                    <div className="uoc-actions-desc">
                      <span className="uoc-actions-lamp"></span>
                      <div>
                        <h4 className="uoc-actions-heading">Customer Action Center</h4>
                        <p className="uoc-actions-caption">
                          Mark job completed to submit your review, or cancel immediately if technician takes too long.
                        </p>
                      </div>
                    </div>

                    {/* Compact, sleek, proportional buttons */}
                    <div className="uoc-compact-buttons">
                      {/* 1. Mark Work Completed */}
                      <button 
                        type="button" 
                        className="uoc-btn-complete"
                        onClick={() => handleOpenReviewModal(liveBooking)}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Mark Work Completed &amp; Rate</span>
                      </button>

                      {/* 2. Cancel Service */}
                      <button 
                        type="button" 
                        className="uoc-btn-cancel"
                        onClick={() => setShowCancelModal(true)}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        <span>Cancel Service</span>
                      </button>

                      {/* 3. Report Issue */}
                      <button 
                        type="button" 
                        className="uoc-btn-complaint"
                        onClick={() => setShowComplaintModal(true)}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <span>Report Issue</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              <div className="no-live-service-card">
                <div className="nlsc-icon">🛵</div>
                <h3>No Live Service Being Tracked Right Now</h3>
                <p>
                  You do not have any active doorstep service in transit. Book verified electricians, plumbers, carpenters or AC engineers across Multan with guaranteed arrival.
                </p>
                <div className="nlsc-buttons">
                  {setCurrentPage && (
                    <button type="button" className="nlsc-hire-btn" onClick={() => setCurrentPage('services')}>
                      Browse Multan Services →
                    </button>
                  )}
                  <button type="button" className="nlsc-view-past-btn" onClick={() => setActiveTab('completed')}>
                    View Completed Services ({completedBookings.length})
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            TAB 2: COMPLETED SERVICES
            (or jab ya complete work ho ja tu yaa providr ak tab maa jaha completed kam krway hoy bandy show hon gyn)
        ══════════════════════════════════════════════════ */}
        {activeTab === 'completed' && (
          <div className="booked-completed-section">
            <div className="section-title-strip">
              <div>
                <h2>Completed Doorstep Jobs</h2>
                <p>History of completed jobs with customer verified ratings, reviews, and warranty certificates.</p>
              </div>
              <span className="completed-counter-badge">{completedBookings.length} Verified Jobs</span>
            </div>

            {completedBookings.length > 0 ? (
              <div className="completed-cards-grid">
                {completedBookings.map((b) => (
                  <div key={b.id || b.refNumber} className="completed-job-card">
                    <div className="cjc-header">
                      <div className="cjc-svc-info">
                        <span className="cjc-icon">🛠️</span>
                        <div>
                          <h4 className="cjc-title">{b.service}</h4>
                          <span className="cjc-ref">Ref: #{b.refNumber}</span>
                        </div>
                      </div>
                      <span className="cjc-status-pill">✓ Work Completed</span>
                    </div>

                    <div className="cjc-body-details">
                      <div className="cbd-row">
                        <span>Technician:</span>
                        <strong>{b.provider} <span className="cjc-check-icon">✓</span></strong>
                      </div>
                      <div className="cbd-row">
                        <span>Paid Amount:</span>
                        <strong className="cjc-price">{b.price}</strong>
                      </div>
                      <div className="cbd-row">
                        <span>Date &amp; Time:</span>
                        <strong>{b.date} • {b.time}</strong>
                      </div>
                      <div className="cbd-row">
                        <span>Location:</span>
                        <strong>{b.location}</strong>
                      </div>
                    </div>

                    {/* Customer Review Display */}
                    <div className="cjc-review-box">
                      <div className="crb-top">
                        <span className="crb-stars">{'★'.repeat(b.rating || 5)}{'☆'.repeat(5 - (b.rating || 5))}</span>
                        <span className="crb-label">Verified Customer Review</span>
                      </div>
                      <p className="crb-comment">&ldquo;{b.reviewText || 'Excellent doorstep service and high-quality craftsmanship.'}&rdquo;</p>
                      {b.reviewTags && b.reviewTags.length > 0 && (
                        <div className="crb-tags">
                          {b.reviewTags.map((tag, i) => (
                            <span key={i} className="crb-tag-pill">✓ {tag}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="cjc-actions">
                      <button 
                        type="button" 
                        className="cjc-chat-again-btn"
                        onClick={() => handleChatWithProvider(b)}
                      >
                        <span>💬 Message Specialist</span>
                      </button>
                      <button 
                        type="button" 
                        className="cjc-book-again-btn"
                        onClick={() => setCurrentPage && setCurrentPage('services')}
                      >
                        <span>Re-book Service</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-subtab-card">
                <span className="esc-icon">✓</span>
                <h3>No Completed Jobs Yet</h3>
                <p>When an active doorstep technician finishes your work, you can rate and complete the service here.</p>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            TAB 3: COMPLAINTS & DISPUTES
            (and issi screen ma complaint ka bi option rakho... jinki complaints ki ho hon gi wo bi show hon)
        ══════════════════════════════════════════════════ */}
        {activeTab === 'complaints' && (
          <div className="booked-complaints-section">
            <div className="section-title-strip">
              <div>
                <h2>Customer Complaints &amp; Disputes Hub</h2>
                <p>Official records of reported issues under active investigation by MUX SERVICES Multan Ombudsman.</p>
              </div>
              <button 
                type="button" 
                className="lodge-new-complaint-btn"
                onClick={() => setShowComplaintModal(true)}
              >
                <span>+ Lodge New Complaint</span>
              </button>
            </div>

            <div className="complaints-cards-list">
              {complaints.length > 0 ? (
                complaints.map((c) => (
                  <div key={c.id} className="complaint-card">
                    <div className="cmp-header">
                      <div className="cmp-header-left">
                        <span className="cmp-ticket-badge">Ticket #{c.id}</span>
                        <h4 className="cmp-category-title">{c.category}</h4>
                      </div>
                      <span className="cmp-status-badge">{c.status}</span>
                    </div>

                    <div className="cmp-meta-grid">
                      <div>
                        <span className="cmp-meta-label">Accused Specialist</span>
                        <strong className="cmp-meta-val">{c.provider} ({c.service})</strong>
                      </div>
                      <div>
                        <span className="cmp-meta-label">Booking Reference</span>
                        <strong className="cmp-meta-val">#{c.bookingRef}</strong>
                      </div>
                      <div>
                        <span className="cmp-meta-label">Filed On</span>
                        <strong className="cmp-meta-val">{c.date}</strong>
                      </div>
                    </div>

                    <div className="cmp-details-quote">
                      <span className="cdq-title">Customer Complaint Description:</span>
                      <p>&ldquo;{c.details}&rdquo;</p>
                    </div>

                    <div className="cmp-support-resolution-box">
                      <span className="srb-title">🛡️ MUX SERVICES Multan Ombudsman Action:</span>
                      <p>{c.resolutionNote}</p>
                      <span className="srb-hotline">24/7 Priority Resolution Desk: +92 300 1234567</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-subtab-card">
                  <span className="esc-icon">🛡️</span>
                  <h3>No Complaints on Record</h3>
                  <p>All your service bookings have operated smoothly with zero disputes.</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* ══════════════════════════════════════════════════
          MODAL 1: CANCEL SERVICE CONFIRMATION
          (agr ziada time laga raha tu service customer khud cancel kr saky)
      ══════════════════════════════════════════════════ */}
      {showCancelModal && liveBooking && (
        <div className="booked-modal-backdrop" onClick={() => setShowCancelModal(false)}>
          <div className="booked-modal-box cancel-box" onClick={(e) => e.stopPropagation()}>
            <div className="bmb-top">
              <h3>Cancel Live Doorstep Service</h3>
              <button type="button" className="bmb-x-btn" onClick={() => setShowCancelModal(false)}>✕</button>
            </div>

            <div className="bmb-content">
              <div className="cancel-warning-banner">
                <span className="cwb-icon">⏱️</span>
                <div>
                  <strong>Taking too long? You have full right to cancel.</strong>
                  <p>Your 100% Escrow deposit of {liveBooking.price} will be refunded with zero deduction.</p>
                </div>
              </div>

              <div className="cancel-form-group">
                <label className="cfg-label">Select Reason for Cancellation:</label>
                <select 
                  className="cfg-select"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                >
                  <option value="Technician is taking too long to arrive">Technician is taking too long to arrive</option>
                  <option value="Specialist is unresponsive on call">Specialist is unresponsive on call / chat</option>
                  <option value="Emergency reschedule needed">Personal emergency / need to reschedule</option>
                  <option value="Booked wrong category by mistake">Booked wrong category by mistake</option>
                  <option value="Other reason">Other reason</option>
                </select>
              </div>

              <div className="cancel-form-group">
                <label className="cfg-label">Additional Feedback (Optional):</label>
                <textarea 
                  className="cfg-textarea"
                  placeholder="Tell us what went wrong so we improve Multan technician punctuality..."
                  rows="2"
                  value={cancelNotes}
                  onChange={(e) => setCancelNotes(e.target.value)}
                />
              </div>

              <div className="bmb-actions-row">
                <button 
                  type="button" 
                  className="bmb-cancel-action-btn"
                  onClick={handleConfirmCancelService}
                >
                  Confirm Instant Cancellation &amp; Refund
                </button>
                <button 
                  type="button" 
                  className="bmb-keep-btn"
                  onClick={() => setShowCancelModal(false)}
                >
                  Keep Service Active
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          MODAL 2: COMPLETE WORK & SUBMIT REVIEW
          (jab kam kr ly banda tu yaa customer apna review dy service provider ko or complete work kr dy)
      ══════════════════════════════════════════════════ */}
      {showReviewModal && reviewBooking && (
        <div className="booked-modal-backdrop" onClick={() => setShowReviewModal(false)}>
          <div className="booked-modal-box review-box" onClick={(e) => e.stopPropagation()}>
            <div className="bmb-top">
              <h3>Complete Work &amp; Rate Specialist</h3>
              <button type="button" className="bmb-x-btn" onClick={() => setShowReviewModal(false)}>✕</button>
            </div>

            <form className="bmb-content" onSubmit={handleSubmitReviewAndComplete}>
              <div className="review-spec-card">
                <div className="rsc-avatar">🛠️</div>
                <div>
                  <h4 className="rsc-name">{reviewBooking.provider}</h4>
                  <span className="rsc-service">{reviewBooking.service} • {reviewBooking.price}</span>
                </div>
              </div>

              {/* Star Rating Selector */}
              <div className="review-rating-selector">
                <span className="rrs-label">Select Your Rating:</span>
                <div className="rrs-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-select-btn ${star <= selectedStars ? 'selected' : ''}`}
                      onClick={() => setSelectedStars(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <span className="rrs-score-text">
                  {selectedStars === 5 && '5.0 Stars - Exceptional Craftsmanship!'}
                  {selectedStars === 4 && '4.0 Stars - Great Work & Professional'}
                  {selectedStars === 3 && '3.0 Stars - Satisfactory'}
                  {selectedStars === 2 && '2.0 Stars - Below Expectations'}
                  {selectedStars === 1 && '1.0 Star - Very Poor'}
                </span>
              </div>

              {/* Quick Feedback Tags */}
              <div className="review-tags-picker">
                <span className="rtp-label">Quick Highlights:</span>
                <div className="rtp-tags-row">
                  {['Punctual Arrival', 'Polite & Clean', 'Expert Diagnostic', 'Genuine Parts', 'Zero Mess'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className={`rtp-tag-pill ${selectedTags.includes(tag) ? 'active' : ''}`}
                      onClick={() => toggleTag(tag)}
                    >
                      {selectedTags.includes(tag) ? '✓ ' : '+ '}{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Comment Textarea */}
              <div className="review-comment-group">
                <label className="rcg-label">Write Your Review:</label>
                <textarea 
                  className="rcg-textarea"
                  placeholder={`Write your experience with ${reviewBooking.provider} in Multan...`}
                  rows="3"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                />
              </div>

              <div className="bmb-actions-row">
                <button type="submit" className="bmb-submit-review-btn">
                  ✓ Submit Review &amp; Release Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          MODAL 3: FILE COMPLAINT / REPORT ISSUE
          (issi screen ma complaint ka bi option rakho customer provider ki complaint bi kr saky)
      ══════════════════════════════════════════════════ */}
      {showComplaintModal && (
        <div className="booked-modal-backdrop" onClick={() => setShowComplaintModal(false)}>
          <div className="booked-modal-box complaint-box" onClick={(e) => e.stopPropagation()}>
            <div className="bmb-top">
              <h3>File Official Specialist Complaint</h3>
              <button type="button" className="bmb-x-btn" onClick={() => setShowComplaintModal(false)}>✕</button>
            </div>

            <form className="bmb-content" onSubmit={handleSubmitComplaint}>
              <div className="complaint-warning-banner">
                <span className="cwb-icon">🛡️</span>
                <div>
                  <strong>MUX SERVICES Customer Ombudsman</strong>
                  <p>All complaints are investigated within 30 minutes by our dedicated Multan field officer.</p>
                </div>
              </div>

              <div className="cancel-form-group">
                <label className="cfg-label">Complaint Nature:</label>
                <select 
                  className="cfg-select"
                  value={complaintCategory}
                  onChange={(e) => setComplaintCategory(e.target.value)}
                >
                  <option value="Overcharging / Rate Dispute">Demanding Extra Charges Beyond Agreed PKR Rate</option>
                  <option value="Unprofessional / Rude Behavior">Unprofessional, Late, or Rude Behavior</option>
                  <option value="Poor Workmanship / Incomplete Job">Poor Workmanship / Incomplete Work</option>
                  <option value="Property Damage / Misuse">Damage to Property or Home Appliances</option>
                  <option value="Technician No Show">Technician Marked Arrived Without Coming</option>
                </select>
              </div>

              <div className="cancel-form-group">
                <label className="cfg-label">Describe the Issue in Detail:</label>
                <textarea 
                  className="cfg-textarea"
                  placeholder="Provide details about what happened..."
                  rows="3"
                  required
                  value={complaintDetails}
                  onChange={(e) => setComplaintDetails(e.target.value)}
                />
              </div>

              <div className="complaint-hotline-strip">
                <span>Immediate Multan Escalation Hotline: <strong>+92 300 1234567</strong></span>
              </div>

              <div className="bmb-actions-row">
                <button type="submit" className="bmb-submit-complaint-btn">
                  Submit Complaint Ticket
                </button>
                <button type="button" className="bmb-keep-btn" onClick={() => setShowComplaintModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          MODAL 4: CALL SPECIALIST PHONE MODAL
      ══════════════════════════════════════════════════ */}
      {showCallModal && liveBooking && (
        <div className="booked-modal-backdrop" onClick={() => setShowCallModal(false)}>
          <div className="booked-modal-box call-box" onClick={(e) => e.stopPropagation()}>
            <div className="bmb-top">
              <h3>Call Assigned Specialist</h3>
              <button type="button" className="bmb-x-btn" onClick={() => setShowCallModal(false)}>✕</button>
            </div>
            <div className="bmb-content text-center">
              <div className="call-avatar">🛵</div>
              <h4>{liveBooking.provider}</h4>
              <p className="call-sub">{liveBooking.service}</p>
              
              <div className="call-number-box">
                <span className="cnb-label">Verified Contact Phone</span>
                <strong className="cnb-val">{liveBooking.phone || '+92 300 1234567'}</strong>
              </div>

              <div className="bmb-actions-row">
                <a href={`tel:${liveBooking.phone || '+923001234567'}`} className="call-now-btn">
                  📞 Call Specialist Now
                </a>
                <button type="button" className="bmb-keep-btn" onClick={() => setShowCallModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default MyBookings
