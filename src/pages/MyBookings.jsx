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
            TAB 1: LIVE TRACKED (ACTIVE SERVICE & MULTAN GPS MAP)
            (or iss ma sirf wohi service show honi chiay jo liv track ho rahi ha sath maa map bi hona chia)
        ══════════════════════════════════════════════════ */}
        {activeTab === 'live' && (
          <div className="booked-live-section">
            {liveBooking ? (
              <div className="live-tracking-master-card">
                
                {/* Status Bar with Live Countdown Timer */}
                <div className="ltm-top-status-bar">
                  <div className="ltm-badge-group">
                    <span className="ltm-live-beacon"></span>
                    <span className="ltm-live-title">LIVE GPS TRACKING • TECHNICIAN EN ROUTE</span>
                    <span className="ltm-ref-pill">#{liveBooking.refNumber}</span>
                  </div>

                  {/* ⏱️ REAL-TIME COUNTDOWN TIMER */}
                  <div className="ltm-countdown-box">
                    <span className="cd-label">Estimated Doorstep Arrival</span>
                    <div className="cd-timer-row">
                      <span className="cd-icon">⏱️</span>
                      <strong className="cd-time">{formatTime(countdownSeconds)}</strong>
                      <span className="cd-mins">Mins Remaining</span>
                    </div>
                  </div>
                </div>

                {/* ══════════════════════════════════════════════════
                    INTERACTIVE MULTAN GPS MAP WIDGET
                ══════════════════════════════════════════════════ */}
                <div className="multan-gps-map-container">
                  <svg className="multan-vector-map" viewBox="0 0 800 360" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <linearGradient id="mapBg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0a1d22" />
                        <stop offset="100%" stopColor="#08171a" />
                      </linearGradient>
                      <linearGradient id="roadGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#17f7f7" />
                      </linearGradient>
                      <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Dark Canvas */}
                    <rect width="800" height="360" fill="url(#mapBg)" />

                    {/* Background City Street Grid (Multan Roads Network) */}
                    <g opacity="0.18" stroke="#8FD3E8" strokeWidth="1.2">
                      <line x1="0" y1="60" x2="800" y2="60" />
                      <line x1="0" y1="130" x2="800" y2="130" />
                      <line x1="0" y1="200" x2="800" y2="200" />
                      <line x1="0" y1="270" x2="800" y2="270" />
                      <line x1="0" y1="330" x2="800" y2="330" />

                      <line x1="120" y1="0" x2="120" y2="360" />
                      <line x1="260" y1="0" x2="260" y2="360" />
                      <line x1="420" y1="0" x2="420" y2="360" />
                      <line x1="580" y1="0" x2="580" y2="360" />
                      <line x1="720" y1="0" x2="720" y2="360" />
                    </g>

                    {/* Main Multan Arteries (Curved Highways) */}
                    <path d="M 50 320 Q 240 240 450 210 T 780 120" fill="none" stroke="#13383e" strokeWidth="18" strokeLinecap="round" />
                    <path d="M 50 320 Q 240 240 450 210 T 780 120" fill="none" stroke="rgba(143, 211, 232, 0.35)" strokeWidth="3" strokeDasharray="6 6" />

                    <path d="M 220 30 Q 320 180 620 320" fill="none" stroke="#13383e" strokeWidth="14" strokeLinecap="round" />
                    <path d="M 220 30 Q 320 180 620 320" fill="none" stroke="rgba(143, 211, 232, 0.25)" strokeWidth="2" strokeDasharray="5 5" />

                    {/* Multan Locality Sector Labels */}
                    <g fill="rgba(238, 244, 244, 0.55)" fontSize="11" fontWeight="700" fontFamily="sans-serif">
                      <text x="70" y="90">GULGASHT COLONY</text>
                      <text x="280" y="70">MDA CHOWK</text>
                      <text x="600" y="80">BOSAN ROAD</text>
                      <text x="140" y="270">KUTCHERY ROAD</text>
                      <text x="460" y="320">MODEL TOWN</text>
                      <text x="630" y="290">MULTAN CANTT</text>
                    </g>

                    {/* LIVE DISPATCH TRAJECTORY PATH (Green to Cyan Glowing Line) */}
                    <path 
                      id="dispatchRoute"
                      d="M 180 160 Q 340 190 480 140 T 640 220" 
                      fill="none" 
                      stroke="url(#roadGlow)" 
                      strokeWidth="5" 
                      strokeLinecap="round"
                      filter="url(#neonGlow)"
                      className="animated-gps-route"
                    />

                    {/* DESTINATION: Customer Doorstep (Multan Cantt) */}
                    <g transform="translate(640, 220)">
                      <circle r="32" fill="none" stroke="#17f7f7" strokeWidth="1.5" className="customer-pulse-ring-1" />
                      <circle r="20" fill="none" stroke="#17f7f7" strokeWidth="2" className="customer-pulse-ring-2" />
                      <circle r="10" fill="#17f7f7" filter="url(#neonGlow)" />
                      <circle r="5" fill="#0E2E33" />
                      
                      {/* Destination Label Box */}
                      <rect x="-85" y="-55" width="170" height="34" rx="8" fill="#0E2E33" stroke="#17f7f7" strokeWidth="1.5" />
                      <text x="0" y="-38" fill="#17f7f7" fontSize="11" fontWeight="800" textAnchor="middle">📍 YOUR DOORSTEP</text>
                      <text x="0" y="-25" fill="#EEF4F4" fontSize="9" fontWeight="600" textAnchor="middle">{liveBooking.location || 'Cantt, Multan'}</text>
                    </g>

                    {/* ORIGIN / TECHNICIAN REAL-TIME POSITION PIN */}
                    <g transform="translate(240, 172)">
                      <circle r="22" fill="none" stroke="#10b981" strokeWidth="2" className="tech-pulse-ring" />
                      <circle r="14" fill="#10b981" filter="url(#neonGlow)" />
                      <text x="0" y="5" fontSize="12" textAnchor="middle" fill="#ffffff">🛵</text>

                      {/* Specialist Live HUD Pin */}
                      <rect x="-100" y="-52" width="200" height="32" rx="8" fill="#0E2E33" stroke="#10b981" strokeWidth="1.5" />
                      <text x="0" y="-36" fill="#10b981" fontSize="10.5" fontWeight="900" textAnchor="middle">
                        🟢 {liveBooking.provider} (Moving)
                      </text>
                      <text x="0" y="-23" fill="#EEF4F4" fontSize="8.5" fontWeight="600" textAnchor="middle">
                        {liveBooking.speed} • {liveBooking.distance}
                      </text>
                    </g>
                  </svg>

                  {/* Floating Telematics Bar Over Map */}
                  <div className="map-floating-telemetry">
                    <div className="mft-col">
                      <span className="mft-lbl">Current Location</span>
                      <strong className="mft-val">📍 {liveBooking.currentLocality}</strong>
                    </div>
                    <div className="mft-col">
                      <span className="mft-lbl">GPS Telemetry</span>
                      <strong className="mft-val highlight">🛵 {liveBooking.speed} • {liveBooking.distance}</strong>
                    </div>
                    <div className="mft-col">
                      <span className="mft-lbl">Delivery Destination</span>
                      <strong className="mft-val">🏠 {liveBooking.address}</strong>
                    </div>
                  </div>
                </div>

                {/* ══════════════════════════════════════════════════
                    SPECIALIST PROFILE & LIVE ACTION CONTROLS
                ══════════════════════════════════════════════════ */}
                <div className="ltm-specialist-info-bar">
                  <div className="si-profile">
                    <div className="si-avatar-ring">
                      <span className="si-avatar-icon">🛠️</span>
                      <span className="si-live-dot"></span>
                    </div>
                    <div className="si-name-box">
                      <div className="si-name-row">
                        <h3>{liveBooking.provider}</h3>
                        <span className="si-vbadge">✓ Police &amp; CNIC Vetted</span>
                      </div>
                      <span className="si-trade">{liveBooking.service}</span>
                      <span className="si-rate-tag">Agreed Fixed Rate: <strong>{liveBooking.price}</strong></span>
                    </div>
                  </div>

                  {/* Actions: Call Specialist, Chat Specialist */}
                  <div className="si-comms-buttons">
                    <button 
                      type="button" 
                      className="si-call-btn"
                      onClick={() => setShowCallModal(true)}
                    >
                      <span>📞 Call Specialist</span>
                    </button>
                    <button 
                      type="button" 
                      className="si-chat-btn"
                      onClick={() => handleChatWithProvider(liveBooking)}
                    >
                      <span>💬 Direct Chat</span>
                    </button>
                  </div>
                </div>

                {/* ══════════════════════════════════════════════════
                    LIVE CUSTOMER ACTIONS:
                    1. COMPLETE WORK & REVIEW
                    2. CANCEL SERVICE (IF TAKING TOO LONG)
                    3. FILE COMPLAINT
                ══════════════════════════════════════════════════ */}
                <div className="ltm-customer-actions-footer">
                  <div className="caf-left">
                    <span className="caf-escrow-hint">
                      🔒 <strong>Escrow Protected:</strong> Funds are safeguarded. Only release payment after inspecting completed work.
                    </span>
                  </div>

                  <div className="caf-right-buttons">
                    {/* COMPLETE WORK & GIVE REVIEW */}
                    <button 
                      type="button" 
                      className="caf-complete-btn"
                      onClick={() => handleOpenReviewModal(liveBooking)}
                    >
                      <span className="btn-icon">✓</span>
                      <span>Mark Work Completed &amp; Give Review</span>
                    </button>

                    {/* CANCEL SERVICE BUTTON (Customer can cancel if delayed) */}
                    <button 
                      type="button" 
                      className="caf-cancel-btn"
                      onClick={() => setShowCancelModal(true)}
                    >
                      <span>✕ Cancel Service</span>
                    </button>

                    {/* FILE COMPLAINT */}
                    <button 
                      type="button" 
                      className="caf-complaint-btn"
                      onClick={() => setShowComplaintModal(true)}
                    >
                      <span>⚠️ Report Issue</span>
                    </button>
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
                        <strong>{b.provider} <span style={{ color: '#10b981' }}>✓</span></strong>
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
