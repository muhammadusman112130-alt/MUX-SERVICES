import { useState } from 'react'
import './MyBookings.css'

function MyBookings({ setCurrentPage }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDateRange, setSelectedDateRange] = useState('7')
  const [selectedTab, setSelectedTab] = useState('all')

  const [bookings] = useState(() => {
    try {
      const saved = localStorage.getItem('servicehub_bookings')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          return parsed
        }
      }
    } catch (e) {
      console.error('Error reading bookings from localStorage:', e)
    }
    return []
  })

  const filteredBookings = bookings.filter(booking => {
    const sTerm = searchTerm.toLowerCase()
    const matchesSearch = (booking.service || '').toLowerCase().includes(sTerm) ||
                         (booking.provider || '').toLowerCase().includes(sTerm) ||
                         (booking.refNumber || '').toLowerCase().includes(sTerm) ||
                         (booking.location || '').toLowerCase().includes(sTerm)
    const matchesCategory = selectedCategory === 'all' || (booking.service || '').toLowerCase().includes(selectedCategory.toLowerCase())
    const matchesTab = selectedTab === 'all' || 
                      (selectedTab === 'active' && (booking.status === 'active' || booking.status === 'scheduled')) ||
                      (selectedTab === 'scheduled' && booking.status === 'scheduled') ||
                      (selectedTab === 'completed' && booking.status === 'completed') ||
                      (selectedTab === 'cancelled' && booking.status === 'cancelled')
    return matchesSearch && matchesCategory && matchesTab
  })

  const activeCount = bookings.filter(b => b.status === 'active' || b.status === 'scheduled').length
  const completedCount = bookings.filter(b => b.status === 'completed').length

  return (
    <div className="my-bookings-page">
      <div className="top-gradient-section">
        <div className="bookings-header">
          <div className="header-content">
            <h1>My Bookings & Orders</h1>
            <p className="header-description">
              Manage, track live technician coordinates, review verified invoices, and trigger instant warranty re-services across your home and digital jobs in Multan, Pakistan.
            </p>
          </div>
          <button 
            className="book-new-services-btn"
            onClick={() => typeof setCurrentPage === 'function' && setCurrentPage('services')}
          >
            Book New Services
          </button>
        </div>

        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon active">📋</div>
            <div className="stat-info">
              <h3>Active Bookings</h3>
              <p>{activeCount} Active</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon completed">✅</div>
            <div className="stat-info">
              <h3>Completed Jobs</h3>
              <p>{completedCount} Completed</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon escrow">🔒</div>
            <div className="stat-info">
              <h3>Escrow Protected</h3>
              <p>{bookings.length} Protected</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon warranty">🛡️</div>
            <div className="stat-info">
              <h3>Warranty Coverage</h3>
              <p>{bookings.length} Covered</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bookings-management-card">
        <div className="card-tabs">
          <button className={`tab-btn ${selectedTab === 'all' ? 'active' : ''}`} onClick={() => setSelectedTab('all')}>
            All Bookings
          </button>
          <button className={`tab-btn ${selectedTab === 'active' ? 'active' : ''}`} onClick={() => setSelectedTab('active')}>
            In Progress & Live
          </button>
          <button className={`tab-btn ${selectedTab === 'scheduled' ? 'active' : ''}`} onClick={() => setSelectedTab('scheduled')}>
            Upcoming & Schedule
          </button>
          <button className={`tab-btn ${selectedTab === 'completed' ? 'active' : ''}`} onClick={() => setSelectedTab('completed')}>
            Completed
          </button>
          <button className={`tab-btn ${selectedTab === 'cancelled' ? 'active' : ''}`} onClick={() => setSelectedTab('cancelled')}>
            Cancelled / Disputed
          </button>
        </div>

        <div className="card-controls">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search bookings..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
          <div className="filter-dropdown">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              <option value="electrician">Electrician</option>
              <option value="plumber">Plumber</option>
              <option value="ac">AC Repair</option>
              <option value="cleaning">Cleaning</option>
            </select>
          </div>
          <div className="date-filter">
            <select 
              value={selectedDateRange} 
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="date-select"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
          </div>
        </div>
      </div>

      <div className="booking-ref-section">
        <h2>Booking Reference Number</h2>
      </div>

      <div className="bookings-list">
        {filteredBookings.length > 0 ? (
          filteredBookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <div className="booking-left">
                <div className="booking-service-icon">
                  {booking.service.includes('Electrician') ? '⚡' :
                   booking.service.includes('Plumber') ? '🔧' :
                   booking.service.includes('AC') ? '❄️' :
                   booking.service.includes('Cleaning') ? '🧹' :
                   booking.service.includes('Doctor') ? '🩺' :
                   booking.service.includes('Developer') ? '💻' :
                   booking.service.includes('Designer') ? '🎨' : '🛠️'}
                </div>
                <div className="booking-details">
                  <h4>{booking.service}</h4>
                  <p>{booking.provider}</p>
                  <p className="booking-location">📍 {booking.location}</p>
                  <p className="booking-datetime">📅 {booking.date} at {booking.time}</p>
                  <p className="booking-ref">🔖 {booking.refNumber}</p>
                </div>
              </div>
              <div className="booking-right">
                <span className={`booking-status ${booking.status}`}>
                  {booking.status === 'active' && 'In Progress'}
                  {booking.status === 'scheduled' && 'Scheduled'}
                  {booking.status === 'completed' && 'Completed'}
                  {booking.status === 'cancelled' && 'Cancelled'}
                </span>
                <p className="booking-price">{booking.price}</p>
                <div className="booking-actions">
                  <button className="view-btn">View Details</button>
                  {booking.status === 'active' && <button className="cancel-btn">Cancel</button>}
                  {booking.status === 'completed' && <button className="review-btn">Review</button>}
                </div>
              </div>
            </div>
          ))
        ) : bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666', background: '#fff', borderRadius: '12px', margin: '20px 0', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📋</div>
            <h3 style={{ fontSize: '1.25rem', color: '#071A3D', marginBottom: '8px' }}>No Bookings Yet</h3>
            <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '20px', maxWidth: '420px', margin: '0 auto 20px' }}>
              You don't have any bookings yet. Find and book verified professionals for home repairs and tech services in Multan, Pakistan.
            </p>
            <button 
              onClick={() => typeof setCurrentPage === 'function' && setCurrentPage('services')}
              style={{ background: '#071A3D', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem' }}
            >
              Book New Services
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666', background: '#fff', borderRadius: '12px', margin: '20px 0', border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '1.05rem', color: '#071A3D', marginBottom: '12px' }}>No bookings found matching your search or filters.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSelectedTab('all'); }}
              style={{ background: '#071A3D', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <div className="security-note">
        <div className="security-note-icon">🛡️</div>
        <div className="security-note-text">
          <p className="security-note-amount">$2,500 Complete Peace-of-Mind</p>
          <p className="security-note-protection">Protection</p>
          <p className="security-note-title">Official Protection Notice: All bookings and payments processed through</p>
          <p className="security-note-title">Service HUB in-app custom offers are 100% safeguarded in escrow. Funds</p>
          <p className="security-note-title">are never released to technicians until you supply the completion OTP code.</p>
          <p className="security-note-urdu">تمام ادائیگیاں اور کسٹم آفرز سروس ہب ایپ کے اندر مکمل محفوظ ہیں اور تسلی کے بغیر رقم جاری نہیں ہوتی۔</p>
          
          <div className="security-note-features">
            <div className="security-feature">
              <span className="security-tick">✓</span>
              <span className="feature-text">"100% Escrow Protection Vault"</span>
            </div>
            <div className="security-feature">
              <span className="security-tick">✓</span>
              <span className="feature-text">“Service HUB Verified”</span>
            </div>
            <div className="security-feature">
              <span className="security-tick">✓</span>
              <span className="feature-text">"Underwritten by Service HUB Escrow Policy"</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyBookings