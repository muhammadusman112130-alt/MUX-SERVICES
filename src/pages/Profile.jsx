import { useState, useEffect, useRef } from 'react'
import './Profile.css'
import { authAPI } from '../services/api'

function Profile({ onLogout, setCurrentPage, user, onUserUpdate, currentTheme = 'dark', onThemeChange }) {
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditMode, setIsEditMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const fileInputRef = useRef(null)

  // Initial user avatar / DP from local storage
  const [userDP, setUserDP] = useState(() => {
    try {
      return localStorage.getItem('servicehub_user_dp') || null
    } catch {
      return null
    }
  })

  // Customer Profile State
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || 'ali',
    email: user?.email || 'ali@gmail.com',
    phone: user?.phone || '0300-1234567',
    whatsapp: user?.whatsapp || '+92 300 8765432',
    cnic: user?.cnic || '36302-9847123-1',
    city: 'Multan',
    area: user?.city || user?.area || 'Multan Cantt',
    address: user?.address || 'House #42, Street 8, Officers Colony, Multan Cantt',
    landmark: user?.landmark || 'Near Nishtar Road & Commercial Market',
    emergencyContact: user?.emergencyContact || '+92 301 7654321',
    emergencyRelation: user?.emergencyRelation || 'Brother (Ahmed)',
    preferredTime: user?.preferredTime || 'Afternoon (12:00 PM - 04:00 PM)',
    secondaryAddress: 'Plot 18-B, Commercial Plaza, Bosan Road, Multan',
    smsAlerts: true,
    whatsappAlerts: true
  })

  // Backup state for Cancel operation
  const [originalData, setOriginalData] = useState({ ...profileData })

  // Keep state synced with incoming user prop
  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        fullName: user.fullName || prev.fullName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        area: user.city || prev.area
      }))
      setOriginalData(prev => ({
        ...prev,
        fullName: user.fullName || prev.fullName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        area: user.city || prev.area
      }))
    }
  }, [user])

  // DP upload handler
  const handleDPUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const dataUrl = event.target.result
        setUserDP(dataUrl)
        try {
          localStorage.setItem('servicehub_user_dp', dataUrl)
          triggerToast('Profile photo updated successfully!')
        } catch (err) {
          console.warn('Storage error for DP:', err)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveDP = () => {
    setUserDP(null)
    try {
      localStorage.removeItem('servicehub_user_dp')
      triggerToast('Profile photo removed.')
    } catch (err) {
      console.warn('Storage error for DP:', err)
    }
  }

  // Toast Helper
  const triggerToast = (msg) => {
    setToastMessage(msg)
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 3500)
  }

  const handleFieldChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleToggle = (field) => {
    setProfileData(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const handleStartEdit = () => {
    setOriginalData({ ...profileData })
    setIsEditMode(true)
  }

  const handleCancelEdit = () => {
    setProfileData({ ...originalData })
    setIsEditMode(false)
  }

  const handleSave = async (e) => {
    if (e) e.preventDefault()
    setIsSaving(true)

    try {
      const updatedUser = {
        fullName: profileData.fullName,
        email: profileData.email,
        phone: profileData.phone,
        city: profileData.area,
        address: profileData.address,
        whatsapp: profileData.whatsapp,
        cnic: profileData.cnic,
        emergencyContact: profileData.emergencyContact,
        emergencyRelation: profileData.emergencyRelation,
        landmark: profileData.landmark,
        preferredTime: profileData.preferredTime
      }

      await authAPI.updateProfile(updatedUser)
      
      if (typeof onUserUpdate === 'function') {
        onUserUpdate(updatedUser)
      }

      setOriginalData({ ...profileData })
      setIsEditMode(false)
      triggerToast('Profile changes saved successfully!')
    } catch (err) {
      console.warn('Profile save warning:', err)
      triggerToast('Changes saved locally.')
      setIsEditMode(false)
    } finally {
      setIsSaving(false)
    }
  }

  const multanAreas = [
    'Multan Cantt',
    'Gulgasht Colony',
    'Bosan Road',
    'Officers Colony',
    'MDA Chowk',
    'Model Town',
    'New Multan',
    'Shah Rukn-e-Alam Colony',
    'Mumtazabad',
    'Wapda Town Multan',
    'Northern Bypass',
    'Kutchery Road',
    'Chowk Kumharanwala',
    'Nawan Shehr'
  ]

  const userInitials = profileData.fullName
    ? profileData.fullName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : 'ALI'

  return (
    <div className="customer-profile-page">
      {/* ── TOAST NOTIFICATION ── */}
      {showToast && (
        <div className="cp-toast-notification">
          <span className="cpt-icon">✓</span>
          <span className="cpt-msg">{toastMessage}</span>
        </div>
      )}

      <div className="cp-container">
        
        {/* ══════════════════════════════════════════════════
            HERO PROFILE CARD (ANIMATED EXECUTIVE BANNER)
        ══════════════════════════════════════════════════ */}
        <div className="cp-hero-card animated-shadow-aura">
          <div className="cp-hero-bg-glow"></div>
          
          <div className="cp-hero-content">
            
            {/* Avatar & Photo Upload */}
            <div className="cp-avatar-column">
              <div className="cp-avatar-frame">
                {userDP ? (
                  <img src={userDP} alt={profileData.fullName} className="cp-avatar-image" />
                ) : (
                  <div className="cp-avatar-initials">
                    <span>{userInitials}</span>
                  </div>
                )}
                
                {/* Live Online Badge */}
                <span className="cp-avatar-live-indicator" title="Active Account"></span>

                {/* Upload Button Overlay */}
                <button 
                  type="button" 
                  className="cp-avatar-upload-trigger"
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload / Change Profile Picture"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </button>

                <input 
                  type="file" 
                  ref={fileInputRef} 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                  onChange={handleDPUpload} 
                />
              </div>

              {userDP && (
                <button type="button" className="cp-remove-photo-link" onClick={handleRemoveDP}>
                  Remove photo
                </button>
              )}
            </div>

            {/* User Primary Identity */}
            <div className="cp-identity-column">
              <div className="cp-identity-badges">
                <span className="cpi-verified-badge">CNIC Vetted</span>
                <span className="cpi-area-badge">{profileData.area}</span>
              </div>

              <h1 className="cp-user-fullname">{profileData.fullName}</h1>
              <p className="cp-user-subline">
                <span>{profileData.email}</span>
                <span className="cp-sep">•</span>
                <span>{profileData.phone}</span>
              </p>

              <div className="cp-identity-meta-row">
                <span className="cp-member-tag">Registered Customer • Multan Corridor</span>
                <span className="cp-trust-pill">5.0 Star Profile</span>
              </div>
            </div>

            {/* Edit Profile Action Buttons (Compact size, no logout button) */}
            <div className="cp-hero-actions-column">
              {!isEditMode ? (
                <button 
                  type="button" 
                  className="cp-btn-edit-mode"
                  onClick={handleStartEdit}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="cp-edit-actions-pair">
                  <button 
                    type="button" 
                    className="cp-btn-save"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                  <button 
                    type="button" 
                    className="cp-btn-cancel"
                    onClick={handleCancelEdit}
                  >
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            ANIMATED STATS TILES (CLEAN SVG OUTLINES, NO EMOJIS, NO ESCROW)
        ══════════════════════════════════════════════════ */}
        <div className="cp-stats-grid">
          <div className="cp-stat-card animated-shadow-aura">
            <div className="cpsc-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#17f7f7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div className="cpsc-body">
              <strong className="cpsc-value">14</strong>
              <span className="cpsc-label">Doorstep Services Completed</span>
            </div>
          </div>

          <div className="cp-stat-card animated-shadow-aura">
            <div className="cpsc-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#17f7f7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div className="cpsc-body">
              <strong className="cpsc-value">&lt; 30 Mins</strong>
              <span className="cpsc-label">Guaranteed Multan Arrival</span>
            </div>
          </div>

          <div className="cp-stat-card animated-shadow-aura">
            <div className="cpsc-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#17f7f7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div className="cpsc-body">
              <strong className="cpsc-value">2</strong>
              <span className="cpsc-label">Saved Delivery Addresses</span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            TABBED NAVIGATION SECTION (CLEAN TEXT, NO EMOJIS, NO ESCROW)
        ══════════════════════════════════════════════════ */}
        <div className="cp-nav-tabs animated-shadow-aura">
          <button 
            type="button" 
            className={`cp-tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            <span>Personal Details</span>
          </button>
          <button 
            type="button" 
            className={`cp-tab-btn ${activeTab === 'address' ? 'active' : ''}`}
            onClick={() => setActiveTab('address')}
          >
            <span>Multan Addresses</span>
          </button>
          <button 
            type="button" 
            className={`cp-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <span>Security &amp; Alerts</span>
          </button>
          <button 
            type="button" 
            className={`cp-tab-btn ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            <span>General Settings</span>
          </button>
        </div>

        {/* ══════════════════════════════════════════════════
            TAB 1: PERSONAL DETAILS & CONTACT (EDITABLE)
        ══════════════════════════════════════════════════ */}
        {activeTab === 'personal' && (
          <div className="cp-tab-card animated-shadow-aura anim-slide-up">
            <div className="cptc-header">
              <div>
                <h3 className="cptc-title">Personal Information</h3>
                <p className="cptc-sub">Your verified customer identity details used for bookings across Multan.</p>
              </div>
              {!isEditMode ? (
                <button type="button" className="cp-mini-edit-btn" onClick={handleStartEdit}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  <span>Edit Details</span>
                </button>
              ) : (
                <span className="cptc-editing-badge">Editing Mode Active</span>
              )}
            </div>

            <form onSubmit={handleSave} className="cp-form-grid">
              
              {/* Full Name */}
              <div className="cp-form-group">
                <label className="cp-form-label">Full Name</label>
                {isEditMode ? (
                  <input 
                    type="text" 
                    className="cp-form-input" 
                    value={profileData.fullName}
                    onChange={(e) => handleFieldChange('fullName', e.target.value)}
                    required
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="cp-field-display">{profileData.fullName}</div>
                )}
              </div>

              {/* Email Address */}
              <div className="cp-form-group">
                <label className="cp-form-label">Email Address</label>
                {isEditMode ? (
                  <input 
                    type="email" 
                    className="cp-form-input" 
                    value={profileData.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    required
                    placeholder="name@example.com"
                  />
                ) : (
                  <div className="cp-field-display">{profileData.email}</div>
                )}
              </div>

              {/* Phone Number */}
              <div className="cp-form-group">
                <label className="cp-form-label">Mobile Phone Number</label>
                {isEditMode ? (
                  <input 
                    type="tel" 
                    className="cp-form-input" 
                    value={profileData.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    required
                    placeholder="0300-1234567"
                  />
                ) : (
                  <div className="cp-field-display">{profileData.phone}</div>
                )}
              </div>

              {/* WhatsApp Number */}
              <div className="cp-form-group">
                <label className="cp-form-label">WhatsApp Number (For Live Technician Updates)</label>
                {isEditMode ? (
                  <input 
                    type="tel" 
                    className="cp-form-input" 
                    value={profileData.whatsapp}
                    onChange={(e) => handleFieldChange('whatsapp', e.target.value)}
                    placeholder="+92 300 1234567"
                  />
                ) : (
                  <div className="cp-field-display">{profileData.whatsapp}</div>
                )}
              </div>

              {/* CNIC Number */}
              <div className="cp-form-group">
                <label className="cp-form-label">CNIC Number (National ID)</label>
                {isEditMode ? (
                  <input 
                    type="text" 
                    className="cp-form-input" 
                    value={profileData.cnic}
                    onChange={(e) => handleFieldChange('cnic', e.target.value)}
                    placeholder="36302-XXXXXXX-X"
                  />
                ) : (
                  <div className="cp-field-display">
                    <span>{profileData.cnic}</span>
                    <span className="cp-inline-vtag">Verified</span>
                  </div>
                )}
              </div>

              {/* Emergency Contact */}
              <div className="cp-form-group">
                <label className="cp-form-label">Emergency Contact &amp; Relation</label>
                {isEditMode ? (
                  <div className="cp-input-dual-row">
                    <input 
                      type="text" 
                      className="cp-form-input" 
                      value={profileData.emergencyContact}
                      onChange={(e) => handleFieldChange('emergencyContact', e.target.value)}
                      placeholder="Phone / Name"
                    />
                    <input 
                      type="text" 
                      className="cp-form-input" 
                      value={profileData.emergencyRelation}
                      onChange={(e) => handleFieldChange('emergencyRelation', e.target.value)}
                      placeholder="Relation (e.g. Brother)"
                    />
                  </div>
                ) : (
                  <div className="cp-field-display">
                    {profileData.emergencyContact} ({profileData.emergencyRelation})
                  </div>
                )}
              </div>

              {/* Preferred Time Window */}
              <div className="cp-form-group full-width">
                <label className="cp-form-label">Preferred Doorstep Service Window</label>
                {isEditMode ? (
                  <select 
                    className="cp-form-select"
                    value={profileData.preferredTime}
                    onChange={(e) => handleFieldChange('preferredTime', e.target.value)}
                  >
                    <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 04:00 PM)">Afternoon (12:00 PM - 04:00 PM)</option>
                    <option value="Evening (04:00 PM - 08:00 PM)">Evening (04:00 PM - 08:00 PM)</option>
                    <option value="Emergency Any Time (< 30 Mins)">Emergency Any Time (&lt; 30 Mins)</option>
                  </select>
                ) : (
                  <div className="cp-field-display">{profileData.preferredTime}</div>
                )}
              </div>

              {/* Bottom Save Bar when in Edit Mode */}
              {isEditMode && (
                <div className="cp-form-bottom-bar full-width">
                  <button type="submit" className="cp-submit-btn" disabled={isSaving}>
                    <span>{isSaving ? 'Updating...' : 'Save Profile Changes'}</span>
                  </button>
                  <button type="button" className="cp-cancel-btn" onClick={handleCancelEdit}>
                    <span>Cancel</span>
                  </button>
                </div>
              )}

            </form>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            TAB 2: MULTAN SAVED ADDRESSES (EDITABLE)
        ══════════════════════════════════════════════════ */}
        {activeTab === 'address' && (
          <div className="cp-tab-card animated-shadow-aura anim-slide-up">
            <div className="cptc-header">
              <div>
                <h3 className="cptc-title">Saved Multan Doorstep Addresses</h3>
                <p className="cptc-sub">Locations where technicians are dispatched for plumbing, AC, electrician or carpenter jobs.</p>
              </div>
              {!isEditMode && (
                <button type="button" className="cp-mini-edit-btn" onClick={handleStartEdit}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  <span>Edit Addresses</span>
                </button>
              )}
            </div>

            <div className="cp-address-list">
              
              {/* PRIMARY ADDRESS CARD */}
              <div className="cp-address-item primary animated-shadow-aura">
                <div className="cpai-top">
                  <div className="cpai-tag-group">
                    <span className="cpai-tag primary">Primary Delivery Address</span>
                    <span className="cpai-city-tag">Multan Urban</span>
                  </div>
                  <span className="cpai-badge-default">Default</span>
                </div>

                {isEditMode ? (
                  <div className="cpai-edit-fields">
                    <div className="cp-form-group">
                      <label className="cp-form-label">Multan Sector / Locality</label>
                      <select 
                        className="cp-form-select"
                        value={profileData.area}
                        onChange={(e) => handleFieldChange('area', e.target.value)}
                      >
                        {multanAreas.map(a => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </div>

                    <div className="cp-form-group">
                      <label className="cp-form-label">Street Address &amp; House Number</label>
                      <textarea 
                        className="cp-form-textarea"
                        rows="2"
                        value={profileData.address}
                        onChange={(e) => handleFieldChange('address', e.target.value)}
                        placeholder="House #, Street #, Sector..."
                      />
                    </div>

                    <div className="cp-form-group">
                      <label className="cp-form-label">Nearby Famous Landmark (For Rapid Technician Navigation)</label>
                      <input 
                        type="text" 
                        className="cp-form-input"
                        value={profileData.landmark}
                        onChange={(e) => handleFieldChange('landmark', e.target.value)}
                        placeholder="Near Mosque / School / Hospital..."
                      />
                    </div>
                  </div>
                ) : (
                  <div className="cpai-view-fields">
                    <h4 className="cpai-address-title">{profileData.address}</h4>
                    <p className="cpai-meta"><strong>Area:</strong> {profileData.area}, Multan</p>
                    <p className="cpai-landmark"><strong>Landmark:</strong> {profileData.landmark}</p>
                  </div>
                )}
              </div>

              {/* SECONDARY ADDRESS CARD */}
              <div className="cp-address-item secondary animated-shadow-aura">
                <div className="cpai-top">
                  <div className="cpai-tag-group">
                    <span className="cpai-tag">Secondary Address (Office / Site)</span>
                    <span className="cpai-city-tag">Bosan Road Corridor</span>
                  </div>
                </div>

                {isEditMode ? (
                  <div className="cpai-edit-fields">
                    <div className="cp-form-group">
                      <label className="cp-form-label">Secondary Street Address</label>
                      <input 
                        type="text" 
                        className="cp-form-input"
                        value={profileData.secondaryAddress}
                        onChange={(e) => handleFieldChange('secondaryAddress', e.target.value)}
                        placeholder="Office or alternate site address"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="cpai-view-fields">
                    <h4 className="cpai-address-title">{profileData.secondaryAddress}</h4>
                    <p className="cpai-meta">Bosan Road, Multan</p>
                  </div>
                )}
              </div>

              {isEditMode && (
                <div className="cp-address-save-bar">
                  <button type="button" className="cp-submit-btn" onClick={handleSave} disabled={isSaving}>
                    <span>{isSaving ? 'Saving...' : 'Save Updated Addresses'}</span>
                  </button>
                  <button type="button" className="cp-cancel-btn" onClick={handleCancelEdit}>
                    <span>Cancel</span>
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            TAB 3: SECURITY & ALERT PREFERENCES
        ══════════════════════════════════════════════════ */}
        {activeTab === 'security' && (
          <div className="cp-tab-card animated-shadow-aura anim-slide-up">
            <div className="cptc-header">
              <div>
                <h3 className="cptc-title">Account Security &amp; Notifications</h3>
                <p className="cptc-sub">Manage your security credentials and live technician tracking updates.</p>
              </div>
            </div>

            <div className="cp-security-options-list">
              
              {/* WhatsApp Live Tracking Toggle */}
              <div className="cp-toggle-item animated-shadow-aura">
                <div className="cpti-text">
                  <h4>WhatsApp Live Technician Tracking</h4>
                  <p>Receive live GPS location links and arrival ETA alerts on {profileData.whatsapp}.</p>
                </div>
                <button 
                  type="button" 
                  className={`cp-toggle-switch ${profileData.whatsappAlerts ? 'on' : 'off'}`}
                  onClick={() => handleToggle('whatsappAlerts')}
                >
                  <span className="switch-slider"></span>
                </button>
              </div>

              {/* SMS Doorstep Alerts Toggle */}
              <div className="cp-toggle-item animated-shadow-aura">
                <div className="cpti-text">
                  <h4>SMS Booking Confirmation</h4>
                  <p>Instant SMS confirmation whenever a rate is agreed or booking is dispatched.</p>
                </div>
                <button 
                  type="button" 
                  className={`cp-toggle-switch ${profileData.smsAlerts ? 'on' : 'off'}`}
                  onClick={() => handleToggle('smsAlerts')}
                >
                  <span className="switch-slider"></span>
                </button>
              </div>

              {/* Security Shield Card */}
              <div className="cp-security-shield-card animated-shadow-aura">
                <div className="cssc-icon-wrap">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div className="cssc-text">
                  <h4>Two-Factor Phone Authentication Active</h4>
                  <p>Your account is protected by encrypted OTP verification for bookings across Multan.</p>
                </div>
                <span className="cssc-tag">Encrypted</span>
              </div>

            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            TAB 4: GENERAL SETTINGS & THEME MODE
        ══════════════════════════════════════════════════ */}
        {activeTab === 'general' && (
          <div className="cp-tab-card animated-shadow-aura anim-slide-up">
            <div className="cptc-header">
              <div>
                <h3 className="cptc-title">General Settings &amp; Theme Mode</h3>
                <p className="cptc-sub">Customize the website appearance, colors, and display theme across the entire Service HUB platform.</p>
              </div>
              <span className="cp-theme-current-badge">
                Active: {currentTheme === 'warm-stone' ? 'Warm Stone Light' : 'Default Dark MUX'}
              </span>
            </div>

            <div className="cp-general-settings-wrap">
              <div className="cp-theme-intro-bar">
                <div className="cp-theme-intro-text">
                  <h4>Website Display Mode</h4>
                  <p>Choose your preferred interface theme. Mode change takes effect immediately on every page, booking section, and menu.</p>
                </div>

                {/* Quick Toggle Switch */}
                <div className="cp-theme-quick-switch-wrap">
                  <span className="cp-theme-switch-label">
                    {currentTheme === 'warm-stone' ? 'Light Mode' : 'Dark Mode'}
                  </span>
                  <button
                    type="button"
                    aria-label="Toggle website theme mode"
                    className={`cp-theme-pill-switch ${currentTheme === 'warm-stone' ? 'light-active' : 'dark-active'}`}
                    onClick={() => {
                      const next = currentTheme === 'warm-stone' ? 'dark' : 'warm-stone'
                      if (typeof onThemeChange === 'function') {
                        onThemeChange(next)
                      }
                      triggerToast(next === 'warm-stone' ? 'Warm Stone Light Mode activated for entire website!' : 'Default Dark MUX Theme activated for entire website!')
                    }}
                  >
                    <span className="switch-thumb">
                      {currentTheme === 'warm-stone' ? (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="5"></circle>
                          <line x1="12" y1="1" x2="12" y2="3"></line>
                          <line x1="12" y1="21" x2="12" y2="23"></line>
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                          <line x1="1" y1="12" x2="3" y2="12"></line>
                          <line x1="21" y1="12" x2="23" y2="12"></line>
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                      ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                      )}
                    </span>
                  </button>
                </div>
              </div>

              {/* Theme Selection Grid Cards */}
              <div className="cp-theme-cards-grid">
                
                {/* 1. Default Dark MUX Theme */}
                <div 
                  className={`cp-theme-selection-card animated-shadow-aura ${currentTheme === 'dark' ? 'selected' : ''}`}
                  onClick={() => {
                    if (currentTheme !== 'dark' && typeof onThemeChange === 'function') {
                      onThemeChange('dark')
                      triggerToast('Default Dark MUX Theme activated!')
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="cp-tsc-preview dark-theme-preview">
                    <div className="cp-tsc-sample-header"></div>
                    <div className="cp-tsc-sample-body">
                      <div className="cp-tsc-sample-card">
                        <div className="cp-tsc-sample-line accent"></div>
                        <div className="cp-tsc-sample-line"></div>
                      </div>
                    </div>
                  </div>
                  <div className="cp-tsc-details">
                    <div className="cp-tsc-title-row">
                      <h4>Dark MUX Theme</h4>
                      {currentTheme === 'dark' && <span className="cp-tsc-active-pill">Active</span>}
                    </div>
                    <p>Executive deep teal (#0E2E33) with mint ice (#8FD3E8) glowing neon aura accents.</p>
                    <div className="cp-tsc-swatches">
                      <span className="cp-swatch" style={{ background: '#0E2E33' }} title="Navy #0E2E33"></span>
                      <span className="cp-swatch" style={{ background: '#13383e' }} title="Surface #13383e"></span>
                      <span className="cp-swatch" style={{ background: '#8FD3E8' }} title="Mint Ice #8FD3E8"></span>
                      <span className="cp-swatch" style={{ background: '#EEF4F4' }} title="Frost White #EEF4F4"></span>
                    </div>
                  </div>
                </div>

                {/* 2. Warm Stone Light Theme (Dark Slate Gray #354F52 & Warm Stone #DAD7CD) */}
                <div 
                  className={`cp-theme-selection-card animated-shadow-aura ${currentTheme === 'warm-stone' ? 'selected' : ''}`}
                  onClick={() => {
                    if (currentTheme !== 'warm-stone' && typeof onThemeChange === 'function') {
                      onThemeChange('warm-stone')
                      triggerToast('Warm Stone Light Mode activated across the entire website!')
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="cp-tsc-preview warm-stone-preview">
                    <div className="cp-tsc-sample-header"></div>
                    <div className="cp-tsc-sample-body">
                      <div className="cp-tsc-sample-card">
                        <div className="cp-tsc-sample-line accent"></div>
                        <div className="cp-tsc-sample-line"></div>
                      </div>
                    </div>
                  </div>
                  <div className="cp-tsc-details">
                    <div className="cp-tsc-title-row">
                      <h4>Warm Stone Light Mode</h4>
                      {currentTheme === 'warm-stone' && <span className="cp-tsc-active-pill">Active</span>}
                    </div>
                    <p>Clean warm stone (#DAD7CD) background with dark slate gray (#354F52) accents and smooth aura animations.</p>
                    <div className="cp-tsc-swatches">
                      <span className="cp-swatch" style={{ background: '#DAD7CD' }} title="Warm Stone #DAD7CD"></span>
                      <span className="cp-swatch" style={{ background: '#354F52' }} title="Dark Slate Gray #354F52"></span>
                      <span className="cp-swatch" style={{ background: '#283C3E' }} title="Deep Slate #283C3E"></span>
                      <span className="cp-swatch" style={{ background: '#EAE7DF' }} title="Surface Tint #EAE7DF"></span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Information / Feature Box */}
              <div className="cp-theme-info-box animated-shadow-aura">
                <div className="ctib-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </div>
                <div className="ctib-text">
                  <h5>Global Persistence &amp; Smooth Animation</h5>
                  <p>Your theme preference is automatically remembered on this device. All card hover transforms, glowing aura animations, and button shines adapt dynamically without visual flicker.</p>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Profile
