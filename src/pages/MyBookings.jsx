import { useState, useEffect } from 'react'
import { bookingsAPI } from '../services/api'
import './MyBookings.css'

// Default verified Multan bookings for initial experience
const DEFAULT_INITIAL_BOOKINGS = [
  {
    id: 'MUX-849201',
    refNumber: 'MUX-849201',
    service: 'AC Diagnostic & Cooling Overhaul',
    provider: 'Mary Johnson',
    price: 'Rs. 2,500',
    status: 'active',
    date: 'Today',
    time: '10:30 AM',
    location: 'Cantt & Bosan Road, Multan',
    address: 'House 14, Sector B, Cantt, Multan',
    warranty: '14-Day Free Workmanship Guarantee',
    phone: '+92 300 1234567',
    technicianETA: '< 25 Mins Doorstep Arrival',
    step: 2, // 1: Agreed, 2: Dispatched, 3: At Doorstep, 4: Completed
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
    step: 4,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
]

function MyBookings({ setCurrentPage }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTab, setSelectedTab] = useState('all') // 'all' | 'active' | 'completed' | 'cancelled'
  const [activeTrackingStep, setActiveTrackingStep] = useState(2)
  const [showCallModal, setShowCallModal] = useState(false)
  const [callModalData, setCallModalData] = useState(null)
  const [showReceiptModal, setShowReceiptModal] = useState(false)
  const [selectedReceiptBooking, setSelectedReceiptBooking] = useState(null)

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
      console.error('Error reading bookings from localStorage:', e)
    }
    return DEFAULT_INITIAL_BOOKINGS
  })

  // Sync bookings from standalone MongoDB backend
  useEffect(() => {
    bookingsAPI.getAll().then(res => {
      if (res && res.success && Array.isArray(res.bookings) && res.bookings.length > 0) {
        setBookings(prev => {
          const map = new Map()
          // First add server bookings
          res.bookings.forEach(b => {
            const key = b.refNumber || b._id
            map.set(key, { ...b, id: b.id || b._id })
          })
          // Then overlay or add local bookings
          prev.forEach(b => {
            const key = b.refNumber || b.id
            if (!map.has(key)) {
              map.set(key, b)
            }
          })
          const merged = Array.from(map.values())
          try {
            localStorage.setItem('servicehub_bookings', JSON.stringify(merged))
          } catch (e) {}
          return merged
        })
      }
    }).catch(err => {
      console.warn('[MyBookings] Backend sync note:', err.message)
    })
  }, [])

  // Update status (e.g. mark completed or cancelled)
  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      await bookingsAPI.updateStatus(bookingId, newStatus)
    } catch (err) {
      console.warn('[MyBookings] Status update API notice:', err.message)
    }

    setBookings(prev => {
      const updated = prev.map(b => (b.refNumber === bookingId || b.id === bookingId) ? { ...b, status: newStatus } : b)
      try {
        localStorage.setItem('servicehub_bookings', JSON.stringify(updated))
      } catch (e) {}
      return updated
    })
  }

  // Open Direct Chat with provider from booking
  const handleChatWithProvider = (booking) => {
    const chatPayload = {
      id: booking.provider.toLowerCase().replace(/\s+/g, '-'),
      name: booking.provider,
      service: booking.service,
      price: booking.price,
      verified: true
    }
    try {
      localStorage.setItem('active_chat_provider', JSON.stringify(chatPayload))
    } catch (e) {}
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('messages')
    }
  }

  // Find the most relevant active/live booking for top tracking banner
  const liveActiveBooking = bookings.find(b => b.status === 'active' || b.status === 'scheduled')

  // Filter bookings list
  const filteredBookings = bookings.filter(booking => {
    const sTerm = searchTerm.toLowerCase()
    const matchesSearch = (booking.service || '').toLowerCase().includes(sTerm) ||
                          (booking.provider || '').toLowerCase().includes(sTerm) ||
                          (booking.refNumber || '').toLowerCase().includes(sTerm) ||
                          (booking.location || '').toLowerCase().includes(sTerm)

    const matchesCategory = selectedCategory === 'all' || 
                            (booking.service || '').toLowerCase().includes(selectedCategory.toLowerCase())

    const matchesTab = selectedTab === 'all' || 
                      (selectedTab === 'active' && (booking.status === 'active' || booking.status === 'scheduled')) ||
                      (selectedTab === 'completed' && booking.status === 'completed') ||
                      (selectedTab === 'cancelled' && booking.status === 'cancelled')

    return matchesSearch && matchesCategory && matchesTab
  })

  const activeCount = bookings.filter(b => b.status === 'active' || b.status === 'scheduled').length
  const completedCount = bookings.filter(b => b.status === 'completed').length

  const getServiceIcon = (service = '') => {
    const s = service.toLowerCase()
    if (s.includes('electric') || s.includes('wiring') || s.includes('breaker')) return '⚡'
    if (s.includes('plumb') || s.includes('pipe') || s.includes('leak')) return '🔧'
    if (s.includes('ac') || s.includes('hvac') || s.includes('cooling')) return '❄️'
    if (s.includes('clean')) return '🧹'
    if (s.includes('carpent') || s.includes('wood') || s.includes('furniture')) return '🪚'
    if (s.includes('paint')) return '🎨'
    if (s.includes('appliance') || s.includes('fridge') || s.includes('washing')) return '🔌'
    return '🛠️'
  }

  return (
    <div className="my-bookings-page">
      <div className="bookings-page-container">

        {/* ══════════════════════════════════════════════════
            TOP HEADER & STATS BAR
        ══════════════════════════════════════════════════ */}
        <header className="bookings-hero-header">
          <div className="bhh-left">
            <span className="bhh-badge">✦ OFFICIAL CLIENT DASHBOARD</span>
            <h1 className="bhh-title">My Doorstep Bookings &amp; Orders</h1>
            <p className="bhh-subtitle">
              Live GPS technician coordinates, upfront PKR rate cards, and verified workmanship guarantees across Multan localities.
            </p>
          </div>
          <div className="bhh-right">
            {setCurrentPage && (
              <button 
                type="button" 
                className="bhh-book-btn"
                onClick={() => setCurrentPage('services')}
              >
                <span>+ Book New Service</span>
              </button>
            )}
          </div>
        </header>

        {/* Quick Stats Grid */}
        <div className="bookings-stats-strip">
          <div className={`bss-card ${activeCount > 0 ? 'highlight-active' : ''}`}>
            <div className="bss-icon live-pulse">⚡</div>
            <div className="bss-text">
              <span className="bss-label">Active &amp; Live</span>
              <strong className="bss-val">{activeCount} Jobs In Progress</strong>
            </div>
          </div>

          <div className="bss-card">
            <div className="bss-icon completed">✓</div>
            <div className="bss-text">
              <span className="bss-label">Completed Jobs</span>
              <strong className="bss-val">{completedCount} Verified Closed</strong>
            </div>
          </div>

          <div className="bss-card">
            <div className="bss-icon escrow">🔒</div>
            <div className="bss-text">
              <span className="bss-label">Escrow Safeguard</span>
              <strong className="bss-val">100% Protected Funds</strong>
            </div>
          </div>

          <div className="bss-card">
            <div className="bss-icon warranty">🛡️</div>
            <div className="bss-text">
              <span className="bss-label">Certified Warranty</span>
              <strong className="bss-val">14-Day Free Coverage</strong>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            FEATURED: LIVE ACTIVE SERVICE & DOORSTEP TRACKER
            (jab ma accept kro tu service start liv jo ha wo honi chiay haa booking screen ma)
        ══════════════════════════════════════════════════ */}
        {liveActiveBooking && (
          <section className="live-service-tracker-panel" aria-label="Live Active Service Dispatch Tracker">
            <div className="lst-header">
              <div className="lst-header-badge-row">
                <div className="lst-live-pill">
                  <span className="live-emerald-pulse"></span>
                  <span>SERVICE IN PROGRESS • TECHNICIAN DISPATCHED</span>
                </div>
                <span className="lst-ref-pill">Ref: {liveActiveBooking.refNumber}</span>
              </div>
              <div className="lst-eta-box">
                <span className="lst-eta-label">Guaranteed Arrival</span>
                <strong className="lst-eta-time">{liveActiveBooking.technicianETA || '< 25 Mins Doorstep'}</strong>
              </div>
            </div>

            {/* Specialist Profile Details Inside Live Tracker */}
            <div className="lst-specialist-row">
              <div className="lst-spec-info">
                <div className="lst-spec-avatar">
                  <span className="lst-spec-icon">{getServiceIcon(liveActiveBooking.service)}</span>
                  <span className="lst-spec-status-dot"></span>
                </div>
                <div className="lst-spec-text">
                  <div className="lst-spec-name-line">
                    <h3 className="lst-spec-name">{liveActiveBooking.provider}</h3>
                    <span className="lst-spec-vtag">✓ CNIC &amp; Police Vetted</span>
                  </div>
                  <span className="lst-spec-trade">{liveActiveBooking.service}</span>
                  <span className="lst-spec-loc">📍 {liveActiveBooking.location || 'Multan Delivery Zone'}</span>
                </div>
              </div>

              <div className="lst-rate-and-actions">
                <div className="lst-price-tag">
                  <span className="lst-pt-label">Agreed Upfront PKR</span>
                  <strong className="lst-pt-val">{liveActiveBooking.price}</strong>
                </div>

                <div className="lst-action-buttons">
                  <button 
                    type="button" 
                    className="lst-call-btn"
                    onClick={() => {
                      setCallModalData(liveActiveBooking)
                      setShowCallModal(true)
                    }}
                  >
                    <span>📞 Call Specialist</span>
                  </button>
                  <button 
                    type="button" 
                    className="lst-chat-btn"
                    onClick={() => handleChatWithProvider(liveActiveBooking)}
                  >
                    <span>💬 Direct Chat</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 4-Step Visual Doorstep Tracker */}
            <div className="lst-stepper-wrap">
              <div className="lst-stepper-title-row">
                <span className="lst-st-heading">Live Doorstep Dispatch Progress Across Multan</span>
                <span className="lst-st-live-hint">Auto-synced with specialist mobile app</span>
              </div>

              <div className="lst-stepper">
                <div className="lst-step completed">
                  <div className="lst-step-circle">✓</div>
                  <span className="lst-step-title">Rate Agreed</span>
                  <span className="lst-step-sub">{liveActiveBooking.price} Fixed</span>
                </div>

                <div className="lst-step-line completed"></div>

                <div className={`lst-step ${activeTrackingStep >= 2 ? 'active' : ''}`}>
                  <div className="lst-step-circle">2</div>
                  <span className="lst-step-title">Dispatched</span>
                  <span className="lst-step-sub">En Route Multan</span>
                </div>

                <div className={`lst-step-line ${activeTrackingStep >= 3 ? 'completed' : ''}`}></div>

                <div className={`lst-step ${activeTrackingStep >= 3 ? 'active' : ''}`}>
                  <div className="lst-step-circle">3</div>
                  <span className="lst-step-title">At Doorstep</span>
                  <span className="lst-step-sub">Tools &amp; Inspection</span>
                </div>

                <div className={`lst-step-line ${activeTrackingStep >= 4 ? 'completed' : ''}`}></div>

                <div className={`lst-step ${activeTrackingStep >= 4 ? 'completed' : ''}`}>
                  <div className="lst-step-circle">4</div>
                  <span className="lst-step-title">Job Done</span>
                  <span className="lst-step-sub">Warranty Issued</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions for Live Tracker */}
            <div className="lst-bottom-bar">
              <span className="lst-safeguard-text">
                🔒 Escrow Protected: Payment is held safe until you inspect the work and confirm satisfaction.
              </span>
              <div className="lst-bb-actions">
                <button 
                  type="button"
                  className="lst-complete-job-btn"
                  onClick={() => handleUpdateStatus(liveActiveBooking.refNumber, 'completed')}
                >
                  ✓ Complete Job &amp; Release
                </button>
                <button 
                  type="button"
                  className="lst-dispute-btn"
                  onClick={() => alert(`Dispute Support for #${liveActiveBooking.refNumber}: Our 24/7 Multan hotline (+92 300 1234567) is notified.`)}
                >
                  Dispute Support
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════
            BOOKINGS MANAGEMENT SECTION (Filter & Search)
        ══════════════════════════════════════════════════ */}
        <section className="bookings-management-section">
          {/* Controls Bar */}
          <div className="bmc-controls-bar">
            {/* Tabs */}
            <div className="bmc-tabs">
              <button 
                type="button" 
                className={`bmc-tab-btn ${selectedTab === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedTab('all')}
              >
                All Bookings ({bookings.length})
              </button>
              <button 
                type="button" 
                className={`bmc-tab-btn ${selectedTab === 'active' ? 'active' : ''}`}
                onClick={() => setSelectedTab('active')}
              >
                Active &amp; Live ({activeCount})
              </button>
              <button 
                type="button" 
                className={`bmc-tab-btn ${selectedTab === 'completed' ? 'active' : ''}`}
                onClick={() => setSelectedTab('completed')}
              >
                Completed ({completedCount})
              </button>
              <button 
                type="button" 
                className={`bmc-tab-btn ${selectedTab === 'cancelled' ? 'active' : ''}`}
                onClick={() => setSelectedTab('cancelled')}
              >
                Cancelled
              </button>
            </div>

            {/* Search and Category Filter */}
            <div className="bmc-search-filter-row">
              <div className="bmc-search-wrap">
                <svg className="bmc-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input 
                  type="text" 
                  className="bmc-search-input"
                  placeholder="Search by ref, technician or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select 
                className="bmc-category-select"
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Service Categories</option>
                <option value="ac">AC &amp; HVAC Technicians</option>
                <option value="electrician">Electricians</option>
                <option value="plumb">Plumbers</option>
                <option value="carpent">Carpenters</option>
                <option value="clean">Deep Cleaning</option>
                <option value="paint">Painters</option>
                <option value="appliance">Appliance Repair</option>
              </select>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════
              BOOKINGS CARDS GRID
          ══════════════════════════════════════════════════ */}
          <div className="bookings-grid">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((b) => {
                const isActive = b.status === 'active' || b.status === 'scheduled'
                const isCompleted = b.status === 'completed'

                return (
                  <div key={b.id || b.refNumber} className={`booking-luxury-card ${isActive ? 'is-active-card' : ''}`}>
                    {/* Top Row: Service Icon, Title, Status */}
                    <div className="blc-top-row">
                      <div className="blc-service-badge-wrap">
                        <span className="blc-svc-icon">{getServiceIcon(b.service)}</span>
                        <div>
                          <h4 className="blc-svc-title">{b.service}</h4>
                          <span className="blc-ref-id">Ref: #{b.refNumber}</span>
                        </div>
                      </div>

                      <span className={`blc-status-pill ${b.status}`}>
                        {isActive && '⚡ In Progress'}
                        {isCompleted && '✓ Completed'}
                        {b.status === 'cancelled' && '✕ Cancelled'}
                      </span>
                    </div>

                    {/* Middle Details */}
                    <div className="blc-details-grid">
                      <div className="blc-detail-item">
                        <span className="bdi-label">Specialist</span>
                        <strong className="bdi-val">{b.provider} <span className="bdi-tick">✓</span></strong>
                      </div>
                      <div className="blc-detail-item">
                        <span className="bdi-label">Agreed Rate</span>
                        <strong className="bdi-val price-highlight">{b.price}</strong>
                      </div>
                      <div className="blc-detail-item">
                        <span className="bdi-label">Date &amp; Arrival</span>
                        <strong className="bdi-val">{b.date} • {b.time}</strong>
                      </div>
                      <div className="blc-detail-item">
                        <span className="bdi-label">Location</span>
                        <strong className="bdi-val">{b.location || 'Multan, Pakistan'}</strong>
                      </div>
                    </div>

                    {/* Guarantee Tag */}
                    <div className="blc-guarantee-strip">
                      <span>🛡️ {b.warranty || '14-Day Free Workmanship Guarantee'}</span>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="blc-actions-row">
                      <button 
                        type="button" 
                        className="blc-chat-btn"
                        onClick={() => handleChatWithProvider(b)}
                        title="Open chat with specialist"
                      >
                        <span>💬 Chat</span>
                      </button>

                      <button 
                        type="button" 
                        className="blc-receipt-btn"
                        onClick={() => {
                          setSelectedReceiptBooking(b)
                          setShowReceiptModal(true)
                        }}
                      >
                        <span>📄 Receipt</span>
                      </button>

                      {isActive && (
                        <button 
                          type="button" 
                          className="blc-complete-btn"
                          onClick={() => handleUpdateStatus(b.refNumber, 'completed')}
                        >
                          <span>✓ Complete</span>
                        </button>
                      )}

                      {isActive && (
                        <button 
                          type="button" 
                          className="blc-cancel-btn"
                          onClick={() => handleUpdateStatus(b.refNumber, 'cancelled')}
                        >
                          <span>Cancel</span>
                        </button>
                      )}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="bookings-empty-card">
                <div className="bec-icon">📋</div>
                <h3 className="bec-title">No Bookings Found</h3>
                <p className="bec-desc">
                  No service bookings match your current search or tab filters. Book verified technicians across Multan with guaranteed upfront rates.
                </p>
                {setCurrentPage && (
                  <button 
                    type="button" 
                    className="bec-cta-btn"
                    onClick={() => setCurrentPage('services')}
                  >
                    Browse Verified Multan Services →
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            SECURITY & ESCROW NOTICE FOOTER
        ══════════════════════════════════════════════════ */}
        <footer className="bookings-escrow-security-banner">
          <div className="besb-icon">🛡️</div>
          <div className="besb-content">
            <h4 className="besb-title">Official MUX Escrow Guarantee &amp; Customer Safety</h4>
            <p className="besb-text">
              Every booking processed through MUX SERVICES is protected under digital escrow. Upfront PKR rate cards are standardized across Cantt, Bosan Road, Gulgasht, Model Town, and all Multan localities. Technicians carry verified CNIC badges and genuine vendor purchase receipts.
            </p>
            <div className="besb-points">
              <span>✓ 100% Escrow Vault Security</span>
              <span>✓ CNIC &amp; Police Verified Independent Pros</span>
              <span>✓ 14-Day Free Rework Workmanship Guarantee</span>
            </div>
          </div>
        </footer>

      </div>

      {/* ══════════════════════════════════════════════════
          CALL SPECIALIST POPUP MODAL
      ══════════════════════════════════════════════════ */}
      {showCallModal && callModalData && (
        <div className="booking-modal-backdrop" onClick={() => setShowCallModal(false)}>
          <div className="booking-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="bmb-header">
              <h3>Direct Specialist Contact</h3>
              <button type="button" className="bmb-close" onClick={() => setShowCallModal(false)}>✕</button>
            </div>
            <div className="bmb-body">
              <div className="bmb-avatar-ring">
                <span>{getServiceIcon(callModalData.service)}</span>
              </div>
              <h4>{callModalData.provider}</h4>
              <p className="bmb-sub">{callModalData.service}</p>
              <div className="bmb-phone-card">
                <span className="bmb-phone-label">Verified Contact Number</span>
                <strong className="bmb-phone-number">{callModalData.phone || '+92 300 1234567'}</strong>
              </div>
              <p className="bmb-hint">Doorstep arrival window: {callModalData.technicianETA || '< 25 mins across Multan'}.</p>
              <div className="bmb-actions">
                <a href={`tel:${callModalData.phone || '+923001234567'}`} className="bmb-call-now-btn">
                  📞 Call Now
                </a>
                <button type="button" className="bmb-cancel-btn" onClick={() => setShowCallModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          RECEIPT / INVOICE MODAL
      ══════════════════════════════════════════════════ */}
      {showReceiptModal && selectedReceiptBooking && (
        <div className="booking-modal-backdrop" onClick={() => setShowReceiptModal(false)}>
          <div className="booking-modal-box receipt-box" onClick={(e) => e.stopPropagation()}>
            <div className="bmb-header">
              <h3>Official MUX Booking Invoice</h3>
              <button type="button" className="bmb-close" onClick={() => setShowReceiptModal(false)}>✕</button>
            </div>
            <div className="receipt-content">
              <div className="receipt-brand-row">
                <strong>MUX SERVICES MULTAN</strong>
                <span className="receipt-status-tag">{selectedReceiptBooking.status.toUpperCase()}</span>
              </div>
              <div className="receipt-details-list">
                <div className="rd-row">
                  <span>Booking Reference:</span>
                  <strong>#{selectedReceiptBooking.refNumber}</strong>
                </div>
                <div className="rd-row">
                  <span>Specialist Name:</span>
                  <strong>{selectedReceiptBooking.provider}</strong>
                </div>
                <div className="rd-row">
                  <span>Service Title:</span>
                  <strong>{selectedReceiptBooking.service}</strong>
                </div>
                <div className="rd-row">
                  <span>Date &amp; Time:</span>
                  <strong>{selectedReceiptBooking.date} at {selectedReceiptBooking.time}</strong>
                </div>
                <div className="rd-row">
                  <span>Delivery Location:</span>
                  <strong>{selectedReceiptBooking.location}</strong>
                </div>
                <div className="rd-row highlight-pkr">
                  <span>Total Amount Paid (PKR):</span>
                  <strong>{selectedReceiptBooking.price}</strong>
                </div>
              </div>
              <div className="receipt-guarantee-note">
                <span>🛡️ Covered by 14-Day Free Workmanship Guarantee. Zero Doorstep Surcharges.</span>
              </div>
              <button type="button" className="receipt-print-btn" onClick={() => window.print()}>
                🖨️ Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyBookings
