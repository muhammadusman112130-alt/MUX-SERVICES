import { useState } from 'react'
import './ProviderDashboard.css'

function ProviderDashboard({ setCurrentPage, onLogout }) {
  const [isOnline, setIsOnline] = useState(true)

  const handleLogoutClick = () => {
    if (typeof onLogout === 'function') {
      onLogout()
    } else if (typeof setCurrentPage === 'function') {
      setCurrentPage('home')
    }
  }

  return (
    <div className="provider-dashboard">

      <div className="dashboard-container">
        <div className="header-card">
          <div className="header-left">
            <div className="provider-dp">
              <span className="dp-initial">M</span>
            </div>
            <div className="provider-info">
              <h3 className="provider-name">M. USMAN</h3>
              <p className="provider-category">Electrician</p>
              <div className="tier-badge">One Tier Master Pro</div>
              <div className="rating-section">
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <span className="completed-jobs">(45 Completed)</span>
              </div>
              <div className="location-info">📍 Gulberg II, Lahore</div>
            </div>
          </div>
          <div className="header-right">
            <div className="online-toggle">
              <label className="toggle-switch">
                <input type="checkbox" checked={isOnline} onChange={() => setIsOnline(!isOnline)} />
                <span className="toggle-slider"></span>
              </label>
              <span className="toggle-text">Online & Receiving Leads</span>
            </div>
            <button 
              type="button" 
              className="provider-header-logout-btn" 
              onClick={handleLogoutClick}
            >
              🚪 Logout
            </button>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <p className="stat-label">Net Earnings</p>
            <p className="stat-value">PKR 125,000</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Active Jobs In Progress</p>
            <p className="stat-value">8</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Pending Leads</p>
            <p className="stat-value">12</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Trust & Escrow Completion</p>
            <p className="stat-value">95%</p>
          </div>
        </div>

        <div className="mission-section">
          <div className="live-mission-card">
            <div className="mission-header-bar">
              <div className="mission-title">LIVE IN-FLIGHT MISSION #SH-88219</div>
              <div className="escrow-status">Escrow Protected PKR 4500</div>
            </div>
            <div className="mission-priority">
              <span className="high-priority">High Priority</span>
              <span className="assigned-time">Assigned 24 mins ago</span>
            </div>
            <h2 className="mission-title-text">Emergency DB Panel Spark & Wiring Inspection</h2>
            <p className="client-location">Client: Ahmed Khan - DHA Phase 5, Lahore</p>

            <div className="status-progress">
              <div className="status-item completed">
                <div className="status-circle">
                  <span className="status-tick">✓</span>
                </div>
                <span className="status-text">Confirmed</span>
              </div>
              <div className="status-item">
                <div className="status-circle"></div>
                <span className="status-text">On the Way</span>
              </div>
              <div className="status-item">
                <div className="status-circle"></div>
                <span className="status-text">At Location</span>
              </div>
              <div className="status-item">
                <div className="status-circle"></div>
                <span className="status-text">In Progress</span>
              </div>
              <div className="status-item">
                <div className="status-circle"></div>
                <span className="status-text">OTP Sign Off</span>
              </div>
            </div>

            <div className="mission-actions">
              <div className="action-box">
                <span className="action-icon">💬</span>
                <span className="action-text">In App Chat</span>
              </div>
              <div className="action-box">
                <span className="action-icon">📞</span>
                <span className="action-text">Call</span>
              </div>
              <div className="action-box">
                <span className="action-icon">📸</span>
                <span className="action-text">Diagnostic Proof</span>
              </div>
              <button className="otp-button">Enter Client OTP to Close</button>
            </div>

            <div className="incoming-leads-section">
              <div className="leads-header">
                <h3 className="leads-title">Incoming Customer Leads</h3>
                <div className="leads-filter">
                  <span className="leads-info">Verified quotes requested in your matched service radius (8 km)</span>
                  <div className="filter-buttons">
                    <button className="filter-btn active">All</button>
                    <button className="filter-btn">Nearby</button>
                  </div>
                </div>
              </div>

              <div className="lead-card">
                <div className="lead-header">
                  <div className="urgent-badge">
                    <span className="urgent-text">URGENT</span>
                    <span className="request-time">request 8 min ago</span>
                    <span className="verified-dot">●</span>
                    <span className="verified-text">verified escrow ready</span>
                  </div>
                </div>
                <h4 className="lead-service">Full Home Rewiring Estimate (2,200 sq. ft)</h4>
                <p className="lead-address">House # 123, Street 5, DHA Phase 6<br />Lahore, Punjab</p>
                <div className="lead-details">
                  <div className="lead-budget">
                    <span className="budget-label">Client Budget:</span>
                    <span className="budget-amount">PKR 3500</span>
                  </div>
                  <span className="lead-distance">3.4 km away</span>
                </div>
                <div className="lead-actions">
                  <button className="send-offer-btn">Send Custom Offer</button>
                  <button className="decline-btn">Decline Lead</button>
                </div>
              </div>

              <div className="lead-card">
                <div className="lead-header">
                  <div className="urgent-badge">
                    <span className="urgent-text">NORMAL</span>
                    <span className="request-time">request 25 min ago</span>
                    <span className="verified-dot">●</span>
                    <span className="verified-text">verified escrow ready</span>
                  </div>
                </div>
                <h4 className="lead-service">AC Installation & Gas Filling</h4>
                <p className="lead-address">Apartment 4B, Block A, Gulberg III<br />Lahore, Punjab</p>
                <div className="lead-details">
                  <div className="lead-budget">
                    <span className="budget-label">Client Budget:</span>
                    <span className="budget-amount">PKR 5000</span>
                  </div>
                  <span className="lead-distance">5.2 km away</span>
                </div>
                <div className="lead-actions">
                  <button className="send-offer-btn">Send Custom Offer</button>
                  <button className="decline-btn">Decline Lead</button>
                </div>
              </div>

              <div className="lead-card">
                <div className="lead-header">
                  <div className="urgent-badge">
                    <span className="urgent-text">URGENT</span>
                    <span className="request-time">request 45 min ago</span>
                    <span className="verified-dot">●</span>
                    <span className="verified-text">verified escrow ready</span>
                  </div>
                </div>
                <h4 className="lead-service">Electrical Panel Upgrade</h4>
                <p className="lead-address">Office 12, 2nd Floor, Plaza Mall<br />Johar Town, Lahore</p>
                <div className="lead-details">
                  <div className="lead-budget">
                    <span className="budget-label">Client Budget:</span>
                    <span className="budget-amount">PKR 8000</span>
                  </div>
                  <span className="lead-distance">7.8 km away</span>
                </div>
                <div className="lead-actions">
                  <button className="send-offer-btn">Send Custom Offer</button>
                  <button className="decline-btn">Decline Lead</button>
                </div>
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="schedule-card">
              <div className="schedule-header">
                <h3 className="schedule-title">Today's Schedule</h3>
                <span className="schedule-date">Thursday 10</span>
              </div>
              <div className="schedule-item active">
                <div className="schedule-icon">
                  <span className="icon-circle">🔵</span>
                  <span className="icon-text">Now Active</span>
                </div>
                <div className="schedule-info">
                  <p className="schedule-service">Emergency DB Panel Spark & Wiring Inspection</p>
                  <p className="schedule-time">10:30 AM - 12:30 PM</p>
                  <p className="schedule-location">DHA Phase 5, Lahore</p>
                </div>
              </div>
              <div className="schedule-item pending">
                <div className="schedule-icon">
                  <span className="icon-circle">⏳</span>
                  <span className="icon-text">Pending</span>
                </div>
                <div className="schedule-info">
                  <p className="schedule-service">AC Maintenance Check</p>
                  <p className="schedule-time">2:00 PM - 3:30 PM</p>
                  <p className="schedule-location">Gulberg II, Lahore</p>
                </div>
              </div>
              <div className="schedule-item upcoming">
                <div className="schedule-icon">
                  <span className="icon-circle">📅</span>
                  <span className="icon-text">Upcoming</span>
                </div>
                <div className="schedule-info">
                  <p className="schedule-service">Electrical Wiring for New Office</p>
                  <p className="schedule-time">5:00 PM - 7:00 PM</p>
                  <p className="schedule-location">Johar Town, Lahore</p>
                </div>
              </div>
            </div>

            <div className="payout-card">
              <div className="payout-header">
                <span className="lock-icon">🔒</span>
                <h3 className="payout-title">Emergency DB Panel Spark & Wiring Inspection</h3>
              </div>
              <div className="instant-raast-badge">Instant Raast Ready</div>
              <div className="payout-section">
                <div className="payout-row">
                  <p className="payout-label">Available Payout</p>
                  <p className="escrow-label">In Escrow Locked</p>
                </div>
                <div className="payout-row">
                  <p className="payout-amount">PKR 4500</p>
                  <p className="escrow-amount">PKR 4500</p>
                </div>
                <p className="instant-withdraw">Instant Withdraw</p>
                <p className="payment-pending">Pending 3 OTPs</p>
              </div>
              <button className="transfer-button">Transfer via Raast / JazzCash</button>
              <button className="bank-wire-button">Direct Bank Wire (HBL / Meezan)</button>
              <div className="recent-clearances">
                <span className="clearances-text">Recent Escrow Clearances</span>
                <button className="view-all-button">View All</button>
              </div>
              <div className="clearance-list">
                <div className="clearance-item">
                  <span className="arrow-left">←</span>
                  <span className="clearance-name">Tahir</span>
                  <span className="clearance-location">DHA</span>
                  <div className="clearance-right">
                    <span className="clearance-amount">PKR 3500</span>
                    <span className="clearance-status">Escrow Locked</span>
                  </div>
                </div>
                <div className="clearance-item">
                  <span className="arrow-left">←</span>
                  <span className="clearance-name">Ahmed</span>
                  <span className="clearance-location">Gulberg</span>
                  <div className="clearance-right">
                    <span className="clearance-amount">PKR 2800</span>
                    <span className="clearance-status">Cleared OTP</span>
                  </div>
                </div>
                <div className="clearance-item">
                  <span className="arrow-left">←</span>
                  <span className="clearance-name">Sara</span>
                  <span className="clearance-location">Johar Town</span>
                  <div className="clearance-right">
                    <span className="clearance-amount">PKR 4200</span>
                    <span className="clearance-status">Cleared OTP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProviderDashboard
