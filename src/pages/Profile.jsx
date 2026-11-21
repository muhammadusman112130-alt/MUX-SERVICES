import { useState, useEffect, useRef } from 'react'
import './Profile.css'
import { authAPI } from '../services/api'

function Profile({ onLogout, setCurrentPage, user }) {
  const [selectedMenu, setSelectedMenu] = useState('personal')
  const [isEditMode, setIsEditMode] = useState(false)
  const [profileData, setProfileData] = useState({
    username: user?.fullName || 'User Name',
    email: user?.email || 'user@example.com',
    phone: user?.phone || '',
    emergencyNumber: '',
    emergencyRelation: '',
    primaryArea: user?.city || '',
    postalCode: ''
  })

  // User DP photo upload & persistence
  const userDPInputRef = useRef(null)
  const [userDP, setUserDP] = useState(() => {
    try {
      return localStorage.getItem('servicehub_user_dp') || null
    } catch {
      return null
    }
  })

  const handleUserDPUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const dataUrl = event.target.result
        setUserDP(dataUrl)
        try {
          localStorage.setItem('servicehub_user_dp', dataUrl)
        } catch (err) {
          console.warn('Failed to save user DP to localStorage', err)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveDP = () => {
    setUserDP(null)
    try {
      localStorage.removeItem('servicehub_user_dp')
    } catch (err) {
      console.warn('Failed to remove user DP from localStorage', err)
    }
  }

  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        username: user.fullName || prev.username,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        primaryArea: user.city || prev.primaryArea
      }))
    }
  }, [user])

  const handleLogoutClick = () => {
    if (typeof onLogout === 'function') {
      onLogout()
    } else if (typeof setCurrentPage === 'function') {
      setCurrentPage('home')
    }
  }

  const handleSave = async () => {
    setIsEditMode(false)
    try {
      await authAPI.updateProfile({
        fullName: profileData.username,
        phone: profileData.phone,
        city: profileData.primaryArea
      })
    } catch (err) {
      console.warn('Profile update error:', err.message)
    }
  }

  const handleEdit = () => {
    setIsEditMode(true)
  }

  const handleChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="profile-page">
      <div className="profile-top-section">
        <div className="profile-top-left">
          <button 
            type="button" 
            className="profile-back-header-btn" 
            onClick={() => setCurrentPage ? setCurrentPage('home') : window.history.back()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0.45rem 1.1rem',
              borderRadius: '25px',
              border: '1.5px solid #2563eb',
              background: 'rgba(37, 99, 235, 0.08)',
              color: '#2563eb',
              fontWeight: 700,
              cursor: 'pointer',
              marginBottom: '1rem',
              fontSize: '0.92rem',
              transition: 'all 0.25s ease'
            }}
          >
            <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>←</span>
            <span>Back</span>
          </button>
          <h1 className="profile-top-title">Personal Information & Account Profile</h1>
          <p className="profile-top-description">Manage your personal details, verified contact information, national identity, and communication preferences.</p>
        </div>
        <div className="profile-top-right">
          <div className="profile-completeness-box">
            <div className="completeness-header">
              <div className="completeness-circle">
                <span>80%</span>
              </div>
              <div className="completeness-text-group">
                <span className="completeness-title">Profile Completeness</span>
                <span className="completeness-tick">✓</span>
                <p className="completeness-tier">Tier 2 Verified Account</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-main-content">
        <div className="profile-sidebar">
          <div className="account-card new-sidebar-style">
            <h2 className="card-title sidebar-title">ACCOUNT CENTRAL</h2>
            <div className="account-menu">
              <div className={`account-item ${selectedMenu === 'personal' ? 'active' : ''}`} onClick={() => setSelectedMenu('personal')}>
                <div className="ai-left"><span className="ai-icon">👤</span> <span>Personal Information</span></div>
                <span className="ai-arrow">›</span>
              </div>
              <div className={`account-item ${selectedMenu === 'payment' ? 'active' : ''}`} onClick={() => setSelectedMenu('payment')}>
                <div className="ai-left"><span className="ai-icon">💳</span> <span>Payment Methods & Vault</span></div>
                <span className="ai-arrow">›</span>
              </div>
              <div className={`account-item ${selectedMenu === 'notifications' ? 'active' : ''}`} onClick={() => setSelectedMenu('notifications')}>
                <div className="ai-left"><span className="ai-icon">🛡️</span> <span>Notifications & Security</span></div>
                <span className="ai-arrow">›</span>
              </div>
              <div className={`account-item ${selectedMenu === 'help' ? 'active' : ''}`} onClick={() => setSelectedMenu('help')}>
                <div className="ai-left"><span className="ai-icon">📄</span> <span>Help & Support</span></div>
                <span className="ai-arrow">›</span>
              </div>
              <div className="account-item logout-item" onClick={handleLogoutClick} style={{ cursor: 'pointer', marginTop: '0.6rem', borderTop: '1px solid #fee2e2' }}>
                <div className="ai-left"><span className="ai-icon">🚪</span> <span style={{ color: '#dc2626', fontWeight: 600 }}>Logout</span></div>
                <span className="ai-arrow" style={{ color: '#dc2626' }}>➔</span>
              </div>
            </div>
          </div>
          
          {selectedMenu !== 'payment' && (
            <div className="service-guarantee-card">
              <div className="sg-header">
                <span className="sg-icon">🛡️</span>
                <h3 className="sg-title">Service Guarantee</h3>
              </div>
              <p className="sg-text">PKR 100,000 cover against accidental damage & 100% re-work protection when payments stay inside MUX SERVICES.</p>
              <div className="sg-footer">
                <span className="sg-lock">🔒 In-App Escrow</span>
                <span className="sg-link">Learn more ➔</span>
              </div>
            </div>
          )}

          {selectedMenu === 'payment' && (
            <div className="saved-channels-card">
              <div className="scc-header">
                <h3 className="scc-title">Saved Channels <span className="scc-badge">4</span></h3>
                <span className="scc-subtitle">ڈجیٹل اپنے محفوظ طریقے</span>
              </div>

              <div className="scc-list">
                <div className="scc-item active">
                  <div className="scc-item-left">
                    <div className="scc-icon visa">
                      <span>💳</span>
                    </div>
                    <div className="scc-details">
                      <h4 className="scc-name">Visa Platinum <span className="scc-status-badge blue">🛡️ Default / ڈیفالٹ</span></h4>
                      <p className="scc-number">**** 4921</p>
                      <p className="scc-meta">Alex Rivera • Exp: 08/28 • Meezan Bank</p>
                    </div>
                  </div>
                  <div className="scc-actions">
                    <button className="scc-btn outline">Edit</button>
                    <button className="scc-btn icon">🗑️</button>
                  </div>
                  <div className="scc-footer-note">
                    <span className="scc-note-left">⚡ 1-Click Instant / SBP 3D-Secure Enabled</span>
                    <span className="scc-note-right">Auto-renew active</span>
                  </div>
                </div>

                <div className="scc-item">
                  <div className="scc-item-left">
                    <div className="scc-icon jazzcash">
                      <span className="text-icon">JC</span>
                    </div>
                    <div className="scc-details">
                      <h4 className="scc-name">JazzCash Wallet <span className="scc-status-badge outline">Verified</span></h4>
                      <p className="scc-number">+92 300 ••••67</p>
                      <p className="scc-meta">Linked & Auto-debit ready</p>
                    </div>
                  </div>
                  <div className="scc-actions">
                    <button className="scc-btn text">Make Default</button>
                    <button className="scc-btn text">Unlink</button>
                  </div>
                </div>

                <div className="scc-item">
                  <div className="scc-item-left">
                    <div className="scc-icon easypaisa">
                      <span className="text-icon">EP</span>
                    </div>
                    <div className="scc-details">
                      <h4 className="scc-name">EasyPaisa Mobile Account</h4>
                      <p className="scc-number">+92 333 ••••52</p>
                      <p className="scc-meta">Direct wallet deduction</p>
                    </div>
                  </div>
                  <div className="scc-actions">
                    <span className="scc-status-badge solid-blue">Active</span>
                    <button className="scc-btn text">Make Default</button>
                    <button className="scc-btn text">Unlink</button>
                  </div>
                </div>

                <div className="scc-item">
                  <div className="scc-item-left">
                    <div className="scc-icon raast">
                      <span className="text-icon">R</span>
                    </div>
                    <div className="scc-details">
                      <h4 className="scc-name">Raast Instant P2M <span className="scc-status-badge blue">0% Fees</span></h4>
                      <p className="scc-meta strong">alexrivera@raast</p>
                      <p className="scc-meta tiny">IBAN: PK89MEZN000000000000000</p>
                      <p className="scc-meta">Direct instant refunds & vendor payouts</p>
                    </div>
                  </div>
                  <div className="scc-actions">
                    <button className="scc-btn text">Make Default</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="profile-content-area" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', minWidth: 0 }}>
        {selectedMenu === 'personal' && (
          <div className="customer-profile-card">
            <div className="customer-profile-left">
              <div 
                className="customer-dp-container" 
                onClick={() => userDPInputRef.current?.click()}
                title="Click to upload / change photo"
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                <div className="customer-dp" style={{ overflow: 'hidden' }}>
                  {userDP ? (
                    <img src={userDP} alt="Profile DP" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span className="dp-initial">{profileData.username?.charAt(0) || 'U'}</span>
                  )}
                </div>
                <div className="camera-icon" title="Change photo">📷</div>
                <input 
                  type="file" 
                  ref={userDPInputRef} 
                  style={{ display: 'none' }} 
                  accept="image/*" 
                  onChange={handleUserDPUpload} 
                />
              </div>
              <div className="customer-info">
                <h3 className="customer-name">
                  {profileData.username}
                </h3>
                <div className="customer-details">
                  <span className="calendar-icon">📅</span>
                  <span className="black-tick">✓</span>
                  <span className="member-since">Active Member Since 24.</span>
                  <span className="dot">•</span>
                  <span className="client-ref">Client Ref: #2356</span>
                </div>
              </div>
            </div>
            <div className="customer-profile-right">
              <button className="change-photo-btn" onClick={() => userDPInputRef.current?.click()}>Change Photo</button>
              <button className="remove-btn" onClick={handleRemoveDP}>Remove</button>
              <button 
                className="profile-logout-btn" 
                onClick={handleLogoutClick}
                style={{
                  background: 'rgba(220, 38, 38, 0.1)',
                  color: '#dc2626',
                  border: '1.5px solid rgba(220, 38, 38, 0.35)',
                  padding: '0.55rem 1.25rem',
                  borderRadius: '20px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                🚪 Logout
              </button>
            </div>
          </div>
        )}

      {selectedMenu === 'personal' && (
        <div className="core-details-card">
          <div className="card-header">
            <h3 className="core-details-title">Core Personal Details</h3>
            <button className="edit-card-btn" onClick={handleEdit}>✏️ Edit</button>
          </div>
          <div className="core-details-form">
            <div className="form-row">
              <div className="form-field">
                <label>Name <span className="required">*</span></label>
                <input type="text" className="form-input" placeholder="ENTER YOUR FIRST NAME " />
              </div>
              <div className="form-field">
                <label>Last Name <span className="required">*</span></label>
                <input type="text" className="form-input" placeholder="ENTER YOUR LAST NAME " />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Nickname</label>
                <input type="text" className="form-input" placeholder="ENTER NICK NAME" />
              </div>
              <div className="form-field">
                <label>CNIC <span className="required">*</span></label>
                <input type="text" className="form-input" placeholder="ENTER YOUR CNIC NUMBER" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Gender <span className="required">*</span></label>
                <select className="form-input">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-field">
                <label>Date of Birth <span className="required">*</span></label>
                <input type="text" className="form-input" placeholder="ENTER YOUR DATE OF BIRTH" />
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedMenu === 'personal' && (
        <div className="contact-info-card">
          <h3 className="contact-info-title">Contact and Information</h3>
          <div className="contact-info-row">
            <div className="email-box">
              <p className="email-label">Primary Email</p>
              <p className="email-address">{profileData.email}</p>
              <p className="email-description">Used for dispatch confirmations, invoices, and guarantee certificates.</p>
              <div className="change-email-link">
                <span className="change-email-text">Change Email Address</span>
                <span className="change-email-arrow">→</span>
              </div>
            </div>
            <div className="mobile-box">
              <p className="mobile-label">Mobile Number</p>
              <p className="mobile-number">{profileData.phone || '+92 300 1234567'}</p>
              <p className="mobile-description">Direct channel for arrival alerts and doorstep security PIN.</p>
              <div className="update-number-link">
                <span className="update-number-text">Update Number via OTP</span>
                <span className="update-number-arrow">→</span>
              </div>
            </div>
          </div>
          <div className="emergency-contact-row">
            <div className="emergency-contact-box">
              <p className="emergency-label">Secondary / Emergency Contact</p>
              <p className="emergency-description">In case you are unreachable during service delivery.</p>
              <div className="emergency-inputs">
                <input type="text" className="emergency-input" placeholder="Enter Number" />
                <select className="relation-select">
                  <option value="">Select Relation</option>
                  <option value="mother">Mother</option>
                  <option value="father">Father</option>
                  <option value="brother">Brother</option>
                  <option value="sister">Sister</option>
                  <option value="cousin">Cousin</option>
                  <option value="spouse">Spouse</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedMenu === 'personal' && (
        <div className="location-info-card">
          <div className="location-header">
            <span className="location-icon">📍</span>
            <h3 className="location-title">In case you are unreachable during service delivery.</h3>
          </div>
          <label>primary Area <span className="required">*</span></label>
          <input
            type="text"
            placeholder="Enter Area / Sector"
            className="location-input"
            value={profileData.primaryArea}
            onChange={(e) => handleChange('primaryArea', e.target.value)}
            disabled={!isEditMode}
          />
          <label>postal/zip code <span className="required">*</span></label>
          <input
            type="text"
            placeholder="Postal / Zip Code"
            className="location-input"
            value={profileData.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            disabled={!isEditMode}
          />
        </div>
      )}

      {selectedMenu === 'personal' && isEditMode && (
        <div className="profile-footer">
          <button className="save-location-btn" onClick={handleSave}>Save</button>
        </div>
      )}

      <div className="selected-menu-section">
        <div className="selected-menu-card">
          {selectedMenu === 'settings' && (
            <div className="settings-card">
              <h2 className="card-title">Account Settings</h2>
              <div className="settings-list">
                <div className="setting-item">
                  <span>Change Password</span>
                  <button>Change</button>
                </div>
                <div className="setting-item">
                  <span>Two-Factor Authentication</span>
                  <button>Enable</button>
                </div>
                <div className="setting-item">
                  <span>Email Verification</span>
                  <button>Verify</button>
                </div>
                <div className="setting-item">
                  <span>Account Deletion</span>
                  <button className="danger">Delete</button>
                </div>
              </div>
            </div>
          )}

          {selectedMenu === 'addresses' && (
            <div className="addresses-card">
              <div className="addresses-header">
                <h2 className="card-title">Saved Addresses</h2>
                <button className="add-address-btn">+ Add New Address</button>
              </div>
              <div className="addresses-list">
                <div className="address-card">
                  <div className="address-icon">🏠</div>
                  <div className="address-info">
                    <h4>Home</h4>
                    <p>123 Main Street, Lahore, Pakistan</p>
                    <p>+92 300 1234567</p>
                  </div>
                  <button className="edit-address-btn">Edit</button>
                </div>
                <div className="address-card">
                  <div className="address-icon">🏢</div>
                  <div className="address-info">
                    <h4>Office</h4>
                    <p>456 Business Avenue, Lahore, Pakistan</p>
                    <p>+92 300 1234567</p>
                  </div>
                  <button className="edit-address-btn">Edit</button>
                </div>
                <div className="address-card">
                  <div className="address-icon">📍</div>
                  <div className="address-info">
                    <h4>Other</h4>
                    <p>789 Other Road, Lahore, Pakistan</p>
                    <p>+92 300 1234567</p>
                  </div>
                  <button className="edit-address-btn">Edit</button>
                </div>
              </div>
            </div>
          )}

          {selectedMenu === 'privacy' && (
            <div className="settings-card">
              <h2 className="card-title">Settings</h2>
              <div className="settings-list">
                <div className="setting-item">
                  <span>Privacy Settings</span>
                  <button>Manage</button>
                </div>
                <div className="setting-item">
                  <span>Security Settings</span>
                  <button>Manage</button>
                </div>
                <div className="setting-item">
                  <span>Data Sharing</span>
                  <button>Manage</button>
                </div>
                <div className="setting-item">
                  <span>Blocked Users</span>
                  <button>View</button>
                </div>
              </div>
            </div>
          )}

          {selectedMenu === 'payment' && (
            <div className="payment-channel-form">
              <div className="pcf-header">
                <div>
                  <h2 className="pcf-title">Add New Payment Channel</h2>
                  <p className="pcf-subtitle">Select your preferred transaction mechanism to authorize seamless checkout.</p>
                </div>
                <div className="pci-vault-badge">
                  <span className="pci-icon">🛡️</span> PCI-DSS Level 1 Vault
                </div>
              </div>

              <div className="pcf-tabs">
                <div className="pcf-tab active">
                  <span className="tab-icon">💳</span>
                  Card (Visa/MC)
                </div>
                <div className="pcf-tab">
                  <span className="tab-icon text-icon">JC</span>
                  JazzCash
                </div>
                <div className="pcf-tab">
                  <span className="tab-icon text-icon">EP</span>
                  EasyPaisa
                </div>
                <div className="pcf-tab">
                  <span className="tab-icon text-icon">R</span>
                  Raast Direct
                </div>
              </div>

              <div className="pcf-supported-brands">
                <span className="pcf-support-text">🛡️ Supported in Pakistan & International</span>
                <div className="pcf-brands">
                  <span className="brand-badge">VISA</span>
                  <span className="brand-badge">mastercard</span>
                  <span className="brand-badge">PayPal</span>
                  <span className="brand-badge">UnionPay</span>
                </div>
              </div>

              <div className="pcf-form-fields">
                <div className="pcf-field">
                  <div className="pcf-label-row">
                    <label>Cardholder Full Name</label>
                    <span className="pcf-hint">As printed on front</span>
                  </div>
                  <div className="pcf-input-wrapper">
                    <span className="pcf-input-icon">👤</span>
                    <input type="text" placeholder="Alex Rivera" defaultValue="Alex Rivera" className="pcf-input" />
                  </div>
                </div>

                <div className="pcf-field">
                  <div className="pcf-label-row">
                    <label>16-Digit Card Number</label>
                    <span className="pcf-hint">3D-Secure 2.0 Ready</span>
                  </div>
                  <div className="pcf-input-wrapper with-button">
                    <span className="pcf-input-icon">💳</span>
                    <input type="text" placeholder="4242 **** **** 4242" className="pcf-input" />
                    <button className="pcf-auto-detect-btn">Auto Detect</button>
                  </div>
                </div>

                <div className="pcf-row">
                  <div className="pcf-field half">
                    <label>Expiry Date</label>
                    <div className="pcf-input-wrapper">
                      <span className="pcf-input-icon">📅</span>
                      <input type="text" placeholder="MM / YY" className="pcf-input" />
                    </div>
                  </div>
                  <div className="pcf-field half">
                    <div className="pcf-label-row">
                      <label>CVV / CVC</label>
                      <span className="pcf-hint">3 digits on back</span>
                    </div>
                    <div className="pcf-input-wrapper">
                      <span className="pcf-input-icon">🔒</span>
                      <input type="password" placeholder="•••" className="pcf-input" />
                    </div>
                  </div>
                </div>

                <div className="pcf-field">
                  <div className="pcf-label-row">
                    <label>Billing Address & Postal Code</label>
                    <span className="pcf-hint">Profile synced</span>
                  </div>
                  <div className="pcf-input-wrapper">
                    <span className="pcf-input-icon">📍</span>
                    <input type="text" defaultValue="House 42-B, Gulberg III, Lahore, 54000, Punjab, PK" className="pcf-input" />
                  </div>
                </div>
              </div>

              <div className="pcf-checkboxes">
                <label className="pcf-checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span className="custom-checkbox"></span>
                  <div className="cb-text-group">
                    <span className="cb-title">Set as default payment method</span>
                    <span className="cb-desc">Direct all future instant bookings, renewals, and on-demand maintenance to this card.</span>
                  </div>
                </label>

                <label className="pcf-checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span className="custom-checkbox"></span>
                  <div className="cb-text-group">
                    <span className="cb-title">Enable 1-Click Fast Checkout <span className="pcf-badge-blue">SBP-3DS</span></span>
                    <span className="cb-desc">Tokenized via State Bank of Pakistan compliant micro-deposit / biometric authorization without storing raw card credentials.</span>
                  </div>
                </label>
              </div>

              <div className="pcf-actions">
                <button className="pcf-btn-primary">🔒 Save & Authorize Payment Method</button>
                <button className="pcf-btn-cancel">Cancel</button>
              </div>
            </div>
          )}

          {selectedMenu === 'notifications' && (
            <div className="notifications-security-view">
              <div className="ns-header">
                <div>
                  <h2 className="ns-title">Notifications & Security</h2>
                  <p className="ns-subtitle">Control how you receive system alerts, booking updates, and protect your account.</p>
                </div>
                <div className="ns-score-badge">
                  <span className="ns-shield-icon">🛡️</span> Security Score: 98% (Optimal)
                </div>
              </div>

              <div className="ns-card">
                <div className="ns-card-header">
                  <div className="ns-card-title-group">
                    <span className="ns-icon">🛡️</span>
                    <div>
                      <h3 className="ns-card-title">Account Security & Access</h3>
                      <p className="ns-card-subtitle">Manage authentication credentials, verified devices, and safety protocols</p>
                    </div>
                  </div>
                  <div className="ns-active-shield">
                    <span className="ns-dot"></span> 2FA Shield Active
                  </div>
                </div>

                <div className="ns-item-box">
                  <div className="ns-item-left">
                    <span className="ns-item-icon">📱</span>
                    <div>
                      <h4 className="ns-item-title">Two-Factor Authentication (2FA) <span className="ns-badge blue">Enabled</span></h4>
                      <p className="ns-item-desc">Protected via SMS to +92 300 1234567 for all login & wallet transactions.</p>
                    </div>
                  </div>
                  <div className="ns-item-right">
                    <label className="ns-toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="ns-slider"></span>
                    </label>
                    <button className="ns-btn-outline">✏️ Change Phone</button>
                  </div>
                </div>

                <div className="ns-item-box">
                  <div className="ns-item-left">
                    <span className="ns-item-icon">🔑</span>
                    <div>
                      <h4 className="ns-item-title">Master Password</h4>
                      <p className="ns-item-desc">Last changed <strong>45 days ago</strong> - Strong rating (14 characters with special symbols)</p>
                    </div>
                  </div>
                  <div className="ns-item-right">
                    <button className="ns-btn-outline">🔑 Update Password</button>
                  </div>
                </div>

                <div className="ns-login-activity">
                  <div className="ns-la-header">
                    <h4 className="ns-la-title">LOGIN ACTIVITY & ACTIVE SESSIONS</h4>
                    <span className="ns-la-count">2 recognized devices</span>
                  </div>
                  
                  <div className="ns-device-item">
                    <div className="ns-device-left">
                      <span className="ns-device-icon">💻</span>
                      <div>
                        <h5 className="ns-device-name">Chrome on Windows 11 <span className="ns-badge green">Active now</span></h5>
                        <p className="ns-device-detail">Lahore, PK - IP: 110.39.241.xx (Current Session)</p>
                      </div>
                    </div>
                    <div className="ns-device-right">
                      <span className="ns-trusted">✓ Trusted Station</span>
                    </div>
                  </div>

                  <div className="ns-device-item">
                    <div className="ns-device-left">
                      <span className="ns-device-icon">📱</span>
                      <div>
                        <h5 className="ns-device-name">Mobile App - Apple iPhone 14</h5>
                        <p className="ns-device-detail">Lahore, PK - Logged in 2 hrs ago (Build v4.8.2)</p>
                      </div>
                    </div>
                    <div className="ns-device-right">
                      <button className="ns-btn-text-danger">[- Revoke]</button>
                    </div>
                  </div>
                </div>

                <div className="ns-safety-box">
                  <h4 className="ns-safety-title">✓ PLATFORM SAFETY & IN-CHAT ESCROW RULE</h4>
                  <p className="ns-safety-text"><strong>Security Safety Notice:</strong> Always communicate and transact through MUX SERVICES In-chat custom offers. External cash or direct outside payments void platform guarantees, background insurance, and customer dispute assistance.</p>
                  <p className="ns-safety-text urdu" dir="rtl">حفاظتی نوٹس: ہمیشہ مکس سروسز ان چیٹ کسٹم آفرز کے ذریعے بات چیت اور لین دین کریں۔ بیرونی نقد یا براہ راست بیرونی ادائیگیاں پلیٹ فارم کی گارنٹی، پس منظر کی انشورنس، اور کسٹمر تنازعات میں مدد کو باطل کر دیتی ہیں۔</p>
                </div>
              </div>

              <div className="ns-card">
                <div className="ns-card-header no-border">
                  <div className="ns-card-title-group">
                    <span className="ns-icon">🔔</span>
                    <div>
                      <h3 className="ns-card-title">Notification Preferences</h3>
                      <p className="ns-card-subtitle">Select customized channels for delivery, messaging, and promotional alerts</p>
                    </div>
                  </div>
                  <div className="ns-pref-headers">
                    <span>Email</span>
                    <span>SMS</span>
                    <span>WhatsApp</span>
                    <span>Push</span>
                  </div>
                </div>

                <div className="ns-pref-row">
                  <div className="ns-pref-left">
                    <h5 className="ns-pref-title">📍 Booking Status & Live Tracking</h5>
                    <p className="ns-pref-desc">Real-time technician en-route dispatch, arrival milestones, and job sign-off OTP confirmations.</p>
                  </div>
                  <div className="ns-pref-checks">
                    <input type="checkbox" defaultChecked />
                    <input type="checkbox" defaultChecked />
                    <input type="checkbox" defaultChecked />
                    <input type="checkbox" defaultChecked />
                  </div>
                </div>

                <div className="ns-pref-row">
                  <div className="ns-pref-left">
                    <h5 className="ns-pref-title">💬 Provider Direct In-Chat Messages</h5>
                    <p className="ns-pref-desc">Direct communication with verified service pros regarding scope clarifications and custom quotes.</p>
                  </div>
                  <div className="ns-pref-checks">
                    <input type="checkbox" />
                    <input type="checkbox" />
                    <input type="checkbox" defaultChecked />
                    <input type="checkbox" defaultChecked />
                  </div>
                </div>

                <div className="ns-pref-row">
                  <div className="ns-pref-left">
                    <h5 className="ns-pref-title">🏷️ Seasonal Promos & Discount Offers <span className="ns-badge light">15% Off AC Maintenance</span></h5>
                    <p className="ns-pref-desc">Exclusive seasonal vouchers, weekend deep clean specials, and appliance tune-up flash credits.</p>
                  </div>
                  <div className="ns-pref-checks">
                    <input type="checkbox" defaultChecked />
                    <input type="checkbox" />
                    <input type="checkbox" />
                    <input type="checkbox" />
                  </div>
                </div>

                <div className="ns-pref-row highlight-blue">
                  <div className="ns-pref-left">
                    <h5 className="ns-pref-title">⚠️ Urgent Service Safety & Technician Arrival Alerts <span className="ns-badge dark">Critical/Mandatory</span></h5>
                    <p className="ns-pref-desc">Safety PIN verification codes, doorstep identity validation, and critical dispatch emergency alerts.</p>
                  </div>
                  <div className="ns-pref-checks-text">
                    <span className="ns-always-on">⚡ Always On (Instant SMS & Auto-Call)</span>
                  </div>
                </div>

                <div className="ns-footer-actions">
                  <button className="ns-btn-text">Reset to Defaults</button>
                  <button className="ns-btn-primary">✓ Save Preferences</button>
                </div>
              </div>
            </div>
          )}

          {selectedMenu === 'help' && (
            <div className="help-support-view">
              <div className="hs-header">
                <div>
                  <h2 className="ns-title">Help & Customer Support</h2>
                  <p className="ns-subtitle">Get instant 24/7 assistance for your bookings, technician queries, and warranty claims.</p>
                </div>
                <div className="hs-header-badge">
                  <span className="ns-badge light blue-text">FAQ & TICKETS</span>
                </div>
              </div>

              <div className="hs-cards-grid">
                <div className="hs-contact-card">
                  <div className="hs-card-icon-header">
                    <span className="hs-contact-icon">💬</span>
                    <span className="ns-badge green">Online</span>
                  </div>
                  <h4 className="hs-contact-title">Live Chat Support</h4>
                  <p className="hs-contact-desc">Average response is &lt; 2 mins. Instant routing to non-robot dispatchers.</p>
                  <button className="hs-btn-primary full-width">💬 Start Live Chat</button>
                </div>

                <div className="hs-contact-card">
                  <div className="hs-card-icon-header">
                    <span className="hs-contact-icon green-icon">📱</span>
                    <span className="ns-badge outline">Verified Channel</span>
                  </div>
                  <h4 className="hs-contact-title">WhatsApp Helpline</h4>
                  <p className="hs-contact-desc">Direct official helpline for multimedia sharing: <br/><strong>+92 300-SERVICE (7378423)</strong></p>
                  <button className="hs-btn-outline-blue full-width">📱 Message on WhatsApp</button>
                </div>

                <div className="hs-contact-card">
                  <div className="hs-card-icon-header">
                    <span className="hs-contact-icon red-icon">📞</span>
                    <span className="ns-badge red">Emergency</span>
                  </div>
                  <h4 className="hs-contact-title">Call Dispatch Desk</h4>
                  <p className="hs-contact-desc">Emergency resolution desk for on-site urgent issues, delay interventions, and SOS.</p>
                  <button className="hs-btn-dark full-width">Toll-Free Call</button>
                </div>
              </div>

              <div className="ns-card hs-ticket-form">
                <div className="hs-ticket-header">
                  <div>
                    <span className="hs-small-label">EASY ESCALATION PROTOCOL</span>
                    <h3 className="ns-card-title">Open a Support Ticket / Report an Issue</h3>
                    <p className="ns-card-subtitle">Tickets are immediately synchronized with field supervisors for swift resolution.</p>
                  </div>
                  <div className="hs-ticket-badge">
                    <span className="ns-badge light blue-text">SLA: 15 Minute Response</span>
                  </div>
                </div>

                <div className="hs-form-row">
                  <div className="hs-form-group">
                    <label>Select Related Booking <span className="req">*</span> <span className="hs-hint">Recent 30 Days</span></label>
                    <select className="hs-select">
                      <option>Choose a booking record...</option>
                      <option>BK-1088 (Jan AC)</option>
                      <option>BK-1014 (Electrician)</option>
                    </select>
                  </div>
                  <div className="hs-form-group">
                    <label>Issue Category <span className="req">*</span></label>
                    <select className="hs-select">
                      <option>Select issue severity or type...</option>
                      <option>Service Quality</option>
                      <option>Payment Dispute</option>
                      <option>Delay/No-Show</option>
                    </select>
                  </div>
                </div>

                <div className="hs-form-group">
                  <label>Detailed Description <span className="req">*</span> <span className="hs-hint-right">0 / 500 chars</span></label>
                  <textarea className="hs-textarea" placeholder="Describe your concern in detail. Our safety supervisor will review immediately..."></textarea>
                </div>

                <div className="hs-form-group">
                  <label>Attach Photos, Videos, or Receipts <span className="hs-optional">(Optional)</span></label>
                  <div className="hs-drag-drop">
                    <span className="hs-upload-icon" style={{ display: 'flex', justifyContent: 'center' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>
                    </span>
                    <p><strong>Drag & drop inspection photos or <span className="hs-link-color">browse files</span></strong></p>
                    <p className="hs-upload-hint">Supports JPG, PNG, PDF up to 15MB each (helpful for warranty review)</p>
                  </div>
                </div>

                <div className="hs-form-footer">
                  <span className="hs-confidential">Confidential supervisor escalation channel</span>
                  <button className="hs-btn-primary">Submit Request</button>
                </div>
              </div>

              <div className="ns-card hs-recent-tickets">
                <div className="hs-table-header">
                  <div>
                    <h3 className="ns-card-title">Recent Support Requests & Dispute History</h3>
                    <p className="ns-card-subtitle">Track ongoing tickets, previous claims, and resolution transcripts.</p>
                  </div>
                  <div className="hs-table-count">Showing 2 records</div>
                </div>

                <div className="hs-table-container">
                  <table className="hs-table">
                    <thead>
                      <tr>
                        <th>TICKET NO & TITLE</th>
                        <th>BOOKING REFERENCE</th>
                        <th>DATE RAISED</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>#TKT-44521</strong><br/>
                          <span className="hs-ticket-desc">AC Cooling Check post-serv...</span>
                        </td>
                        <td>📄 BK-1088 (Jan AC)</td>
                        <td>Aug 12, 2024</td>
                        <td><span className="ns-badge green">✓ Resolved</span></td>
                        <td><button className="hs-btn-text">View Details</button></td>
                      </tr>
                      <tr>
                        <td>
                          <strong>#TKT-3909</strong><br/>
                          <span className="hs-ticket-desc">Invoice clarification for DB...</span>
                        </td>
                        <td>📄 BK-1014 (Electrician)</td>
                        <td>Jun 28, 2024</td>
                        <td><span className="ns-badge green">✓ Resolved</span></td>
                        <td><button className="hs-btn-text">View Details</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="ns-card hs-faq-section">
                <span className="hs-small-label">YOUR SERVICE KNOWLEDGEBASE</span>
                <h3 className="ns-card-title">Frequently Asked Questions (FAQs)</h3>
                <p className="ns-card-subtitle">Find answers regarding buyer guarantee, technician compliance, and warranty processes.</p>
                
                <div className="hs-faq-list">
                  <div className="hs-faq-item">
                    <span className="hs-faq-q">1. How does MUX SERVICES Guarantee protect my home and appliances?</span>
                    <span className="hs-faq-arrow">▼</span>
                  </div>
                  <div className="hs-faq-item">
                    <span className="hs-faq-q">2. What happens if a technician damages parts or arrives late?</span>
                    <span className="hs-faq-arrow">▼</span>
                  </div>
                  <div className="hs-faq-item">
                    <span className="hs-faq-q">3. Can I pay the technician in cash outside the app?</span>
                    <span className="hs-faq-arrow">▼</span>
                  </div>
                  <div className="hs-faq-item">
                    <span className="hs-faq-q">4. How do I claim warranty on completed jobs?</span>
                    <span className="hs-faq-arrow">▼</span>
                  </div>
                </div>
              </div>

              <div className="hs-enterprise-banner">
                <div className="hs-ent-left">
                  <span className="hs-ent-icon" style={{ display: 'flex', alignItems: 'center' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22.01"></line><line x1="15" y1="22" x2="15" y2="22.01"></line><line x1="8" y1="6" x2="8.01" y2="6"></line><line x1="16" y1="6" x2="16.01" y2="6"></line><line x1="8" y1="10" x2="8.01" y2="10"></line><line x1="16" y1="10" x2="16.01" y2="10"></line><line x1="8" y1="14" x2="8.01" y2="14"></line><line x1="16" y1="14" x2="16.01" y2="14"></line><line x1="8" y1="18" x2="8.01" y2="18"></line><line x1="16" y1="18" x2="16.01" y2="18"></line></svg>
                  </span>
                  <div>
                    <h5 className="hs-ent-title">Need specialized enterprise help?</h5>
                    <p className="hs-ent-desc">Corporate accounts & commercial facility managers can email <strong>enterprise@muxservices.com</strong></p>
                  </div>
                </div>
                <button className="hs-btn-outline bg-white dark-text">Email Commercial Desk</button>
              </div>

            </div>
          )}

          {selectedMenu === 'payment' && (
            <div className="payment-guarantee-banner">
              <div className="pgb-header">
                <span className="pgb-shield-icon" style={{ display: 'flex', alignItems: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </span>
                <h3 className="pgb-title">MUX SERVICES Escrow & Payment Guarantee</h3>
                <span className="pgb-subtitle">مکس سروسز کی محفوظ ضمانت</span>
              </div>
              <div className="pgb-features">
                <div className="pgb-feature">
                  <div className="pgb-feature-icon-container">
                    <span className="pgb-feature-icon" style={{ display: 'flex', alignItems: 'center' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                    </span>
                  </div>
                  <div className="pgb-feature-content">
                    <h4>100% Escrow Protection</h4>
                    <p>Payments are securely held and only released to verified technicians after you inspect and confirm satisfactory completion of the job.</p>
                  </div>
                </div>
                
                <div className="pgb-feature">
                  <div className="pgb-feature-icon-container">
                    <span className="pgb-feature-icon" style={{ display: 'flex', alignItems: 'center' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </span>
                  </div>
                  <div className="pgb-feature-content">
                    <h4>Instant Refund Policy</h4>
                    <p>Any canceled, unfulfilled, or disputed order is refunded back to your original source account, card, or wallet in under 24 hours.</p>
                  </div>
                </div>

                <div className="pgb-feature">
                  <div className="pgb-feature-icon-container">
                    <span className="pgb-feature-icon" style={{ display: 'flex', alignItems: 'center' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </span>
                  </div>
                  <div className="pgb-feature-content">
                    <h4>24/7 Dispute & Billing Desk</h4>
                    <p>Direct phone support for payment reconciliation and transaction disputes. Call anytime at:</p>
                    <div className="pgb-phone-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      <span>042 111 HUB PRO (482 776)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}
export default Profile
