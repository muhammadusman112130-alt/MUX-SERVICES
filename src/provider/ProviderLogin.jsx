import { useState, useEffect } from 'react'
import { providerAPI } from '../services/api'
import './ProviderLogin.css'

function ProviderLogin({ setCurrentPage, onProviderLogin }) {
  const [loginMethod, setLoginMethod] = useState('mobile') // 'mobile' | 'cnic'
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [cnic, setCnic] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [countdown, setCountdown] = useState(0)

  // Countdown timer for resending OTP
  useEffect(() => {
    let timer
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const handleSendOtp = () => {
    const cleanedMobile = mobile.replace(/[^0-9]/g, '')
    if (!cleanedMobile || cleanedMobile.length < 10) {
      setErrorMsg('Please enter a valid 11-digit Pakistani mobile number (e.g. 0300-1234567).')
      return
    }
    setErrorMsg('')
    setOtpSent(true)
    setCountdown(60)
    // Auto populate sample code for quick testing convenience
    if (!otp) {
      setOtp('786110')
    }
  }

  const handleLogin = async (e) => {
    if (e && e.preventDefault) e.preventDefault()
    setErrorMsg('')

    if (loginMethod === 'mobile') {
      const cleaned = mobile.replace(/[^0-9]/g, '')
      if (!cleaned || cleaned.length < 10) {
        setErrorMsg('Please enter a valid registered mobile number.')
        return
      }
      if (!otp) {
        setErrorMsg('Please enter the 6-digit OTP passcode dispatched to your SIM.')
        return
      }
    } else {
      const cleanedCnic = cnic.replace(/[^0-9]/g, '')
      if (!cleanedCnic || cleanedCnic.length !== 13) {
        setErrorMsg('Please enter your valid 13-digit CNIC number.')
        return
      }
      if (!password) {
        setErrorMsg('Please enter your account password.')
        return
      }
    }

    setLoading(true)

    try {
      await providerAPI.login({
        method: loginMethod,
        mobile,
        otp,
        cnic,
        password
      })

      if (typeof onProviderLogin === 'function') {
        onProviderLogin()
      } else if (typeof setCurrentPage === 'function') {
        setCurrentPage('provider-dashboard')
      }
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please verify your credentials or contact dispatch helpline.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = () => {
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('provider-verification')
    }
  }

  const handleBackHome = () => {
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('home')
    }
  }

  return (
    <div className="provider-login-page">
      {/* Top Breadcrumb & Live Network Bar */}
      <div className="pl-top-bar">
        <div className="pl-tb-left">
          <button type="button" className="pl-back-home-btn" onClick={handleBackHome}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to Home</span>
          </button>
          <div className="pl-network-indicator">
            <span className="pl-net-pulse"></span>
            <span className="pl-net-text">Multan Dispatch Network: <strong>Online</strong> (88 Pros Active)</span>
          </div>
        </div>

        <div className="pl-tb-right">
          <span className="pl-reg-hint">New Technician or Workshop Owner?</span>
          <button type="button" className="pl-reg-btn" onClick={handleSignup}>
            <span>Register as Verified Pro</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Dual-Column Login Container */}
      <div className="pl-main-container">
        {/* Left Column: Pro Hub Information & Multan Stats */}
        <section className="pl-showcase-card animated-shadow-aura">
          <div className="pl-showcase-badge">
            <span className="pl-badge-icon">⚡</span>
            <span>MUX SERVICES PARTNER PORTAL • ملتان پورٹل</span>
          </div>

          <h1 className="pl-showcase-heading">
            Welcome Back to<br />
            <span className="pl-glow-text">Your Work Hub</span>
          </h1>

          <p className="pl-urdu-subtitle">اپنے روزگار، تصدیق شدہ لیڈز اور والٹ پورٹل میں لاگ ان کریں</p>

          <p className="pl-showcase-desc">
            Directly access incoming doorstep repair jobs, live dispatched emergency requests, transparent escrow payouts, and live client chat across Multan Cantt, Bosan Road, Gulgasht Colony, and Shah Rukn-e-Alam.
          </p>

          {/* Key Metrics Row */}
          <div className="pl-metrics-grid">
            <div className="pl-metric-card">
              <div className="pl-metric-top">
                <span className="pl-metric-icon">💰</span>
                <span className="pl-metric-tag">+32% MoM</span>
              </div>
              <div className="pl-metric-value">
                PKR 48,500 <span className="pl-metric-plus">+</span>
              </div>
              <p className="pl-metric-title">Weekly Avg. Earnings</p>
              <p className="pl-metric-sub">Top electricians, AC mechanics & plumbers</p>
            </div>

            <div className="pl-metric-card">
              <div className="pl-metric-top">
                <span className="pl-metric-icon">📍</span>
                <span className="pl-live-pill">
                  <span className="pl-live-dot"></span> LIVE
                </span>
              </div>
              <div className="pl-metric-value">18 Leads</div>
              <p className="pl-metric-title">Multan Area Demand</p>
              <p className="pl-metric-sub">Direct unassigned customer bookings</p>
            </div>
          </div>

          {/* Multan Priority Localities */}
          <div className="pl-localities-box">
            <span className="pl-loc-label">Active Multan Dispatch Localities:</span>
            <div className="pl-loc-tags">
              <span className="pl-loc-tag">Multan Cantt</span>
              <span className="pl-loc-tag">Bosan Road</span>
              <span className="pl-loc-tag">Gulgasht Colony</span>
              <span className="pl-loc-tag">Shah Rukn-e-Alam</span>
              <span className="pl-loc-tag">Wapda Town</span>
              <span className="pl-loc-tag">MDA Chowk</span>
            </div>
          </div>

          {/* Guarantee & Escrow Section */}
          <div className="pl-guarantee-box">
            <div className="pl-g-header">
              <div className="pl-g-check">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h4>Direct Escrow Protection &amp; Zero Commission First Month</h4>
            </div>
            <p className="pl-g-desc">
              All customer payments are held securely in advance. Payouts transfer instantly via State Bank Raast P2G, JazzCash Pro, or direct IBAN with zero delays.
            </p>
            <div className="pl-badges-row">
              <div className="pl-trust-badge">
                <span className="pl-tb-dot"></span> State Bank Raast P2G
              </div>
              <div className="pl-trust-badge">
                <span className="pl-tb-dot"></span> JazzCash Business
              </div>
              <div className="pl-trust-badge">
                <span className="pl-tb-dot"></span> NADRA Verified
              </div>
              <div className="pl-trust-badge">
                <span className="pl-tb-dot"></span> Instant Disbursal
              </div>
            </div>
          </div>

          {/* 24/7 Helpline Box */}
          <div className="pl-helpline-box">
            <div className="pl-hl-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div className="pl-hl-info">
              <span className="pl-hl-title">24/7 Multan Pro Dispatch Hotline</span>
              <strong className="pl-hl-number">061-652-MUX1 (0300-6896891)</strong>
              <span className="pl-hl-sub">Khidmat Desk: MDA Chowk &amp; Multan Cantt</span>
            </div>
            <a href="tel:03006896891" className="pl-hl-btn">
              <span>Call Pro Desk</span>
            </a>
          </div>
        </section>

        {/* Right Column: Secure Provider Login Form */}
        <section className="pl-login-card animated-shadow-aura">
          <div className="pl-lc-header">
            <div className="pl-auth-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>AUTHORIZED TECHNICIAN PORTAL</span>
            </div>
            <h2 className="pl-lc-title">Provider Account Login</h2>
            <p className="pl-lc-subtitle">
              Enter your verified credentials to access your daily job queue, customer calls, and wallet balance.
            </p>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="pl-error-banner" role="alert">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Login Method Selector */}
          <div className="pl-method-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={loginMethod === 'mobile'}
              className={`pl-method-tab ${loginMethod === 'mobile' ? 'active' : ''}`}
              onClick={() => { setLoginMethod('mobile'); setErrorMsg('') }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
              <span>Mobile &amp; SMS OTP</span>
              <span className="pl-tab-rec">Fast</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={loginMethod === 'cnic'}
              className={`pl-method-tab ${loginMethod === 'cnic' ? 'active' : ''}`}
              onClick={() => { setLoginMethod('cnic'); setErrorMsg('') }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                <circle cx="9" cy="10" r="2"></circle>
                <line x1="15" y1="8" x2="17" y2="8"></line>
                <line x1="15" y1="12" x2="17" y2="12"></line>
              </svg>
              <span>CNIC &amp; Password</span>
            </button>
          </div>

          <form onSubmit={handleLogin} className="pl-login-form">
            {/* Mobile & OTP Form */}
            {loginMethod === 'mobile' && (
              <div className="pl-fields-group">
                <div className="pl-field">
                  <label htmlFor="pl-mobile-input" className="pl-label">
                    <span>Registered Mobile Number</span>
                    <span className="pl-label-urdu">رجسٹرڈ موبائل نمبر</span>
                  </label>
                  <div className="pl-input-wrap">
                    <span className="pl-input-prefix">🇵🇰 +92</span>
                    <input
                      id="pl-mobile-input"
                      type="tel"
                      className="pl-input pl-has-prefix"
                      placeholder="0300-1234567"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      autoComplete="tel"
                    />
                  </div>
                  <span className="pl-field-hint">
                    Enter the phone number linked with your MUX Services pro account.
                  </span>
                </div>

                <div className="pl-field">
                  <label htmlFor="pl-otp-input" className="pl-label">
                    <span>6-Digit Verification Code (او ٹی پی)</span>
                    {otpSent && <span className="pl-otp-sent-badge">✓ OTP Dispatched</span>}
                  </label>
                  <div className="pl-otp-row">
                    <input
                      id="pl-otp-input"
                      type="text"
                      maxLength={6}
                      className="pl-input pl-otp-input"
                      placeholder="e.g. 786110"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                    />
                    <button
                      type="button"
                      className={`pl-send-otp-btn ${countdown > 0 ? 'disabled' : ''}`}
                      onClick={handleSendOtp}
                      disabled={countdown > 0}
                    >
                      {countdown > 0 ? `Resend (${countdown}s)` : otpSent ? 'Resend Code' : 'Send Code'}
                    </button>
                  </div>
                  <div className="pl-otp-helpers">
                    <span className="pl-field-hint">Dispatched via secure NADRA/MUX SMS gateway.</span>
                    <button
                      type="button"
                      className="pl-changed-sim-btn"
                      onClick={() => alert('To update your registered SIM number, visit the Multan Khidmat Desk at MDA Chowk or call 061-652-MUX1.')}
                    >
                      Changed SIM / Phone?
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* CNIC & Password Form */}
            {loginMethod === 'cnic' && (
              <div className="pl-fields-group">
                <div className="pl-field">
                  <label htmlFor="pl-cnic-input" className="pl-label">
                    <span>CNIC Number (13 Digits)</span>
                    <span className="pl-label-urdu">شناختی کارڈ نمبر</span>
                  </label>
                  <div className="pl-input-wrap">
                    <input
                      id="pl-cnic-input"
                      type="text"
                      maxLength={15}
                      className="pl-input"
                      placeholder="36302-XXXXXXX-X"
                      value={cnic}
                      onChange={(e) => {
                        let val = e.target.value.replace(/[^0-9]/g, '')
                        if (val.length > 5 && val.length <= 12) {
                          val = `${val.slice(0, 5)}-${val.slice(5)}`
                        } else if (val.length > 12) {
                          val = `${val.slice(0, 5)}-${val.slice(5, 12)}-${val.slice(12, 13)}`
                        }
                        setCnic(val)
                      }}
                      autoComplete="username"
                    />
                  </div>
                  <span className="pl-field-hint">National Identity Card registered during your onboarding.</span>
                </div>

                <div className="pl-field">
                  <div className="pl-label-row">
                    <label htmlFor="pl-password-input" className="pl-label">
                      <span>Account Password</span>
                      <span className="pl-label-urdu">پاس ورڈ</span>
                    </label>
                    <button
                      type="button"
                      className="pl-forgot-btn"
                      onClick={() => {
                        setLoginMethod('mobile')
                        setErrorMsg('Tip: Use Mobile & SMS OTP login for instant passwordless access.')
                      }}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="pl-input-wrap">
                    <input
                      id="pl-password-input"
                      type={showPassword ? 'text' : 'password'}
                      className="pl-input pl-has-eye"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="pl-eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="pl-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="pl-btn-spinner"></span>
                  <span>Authenticating Pro Account...</span>
                </>
              ) : (
                <>
                  <span>Login to Provider Dashboard</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Biometric Re-Audit Notice Box */}
          <div className="pl-audit-box">
            <div className="pl-audit-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"></path>
              </svg>
            </div>
            <div>
              <strong className="pl-audit-title">Biometric or Annual Police Audit Due?</strong>
              <p className="pl-audit-desc">
                If your account requires annual Khidmat Markaz clearance or biometric re-validation, visit the MUX Services Pro Desk at MDA Chowk or Multan Cantt with your original CNIC.
              </p>
            </div>
          </div>

          {/* Switch to Registration */}
          <div className="pl-signup-prompt">
            <span className="pl-prompt-text">Not a registered MUX partner yet?</span>
            <button
              type="button"
              className="pl-prompt-btn"
              onClick={handleSignup}
            >
              <span>Join as Verified Pro (رجسٹریشن فارم)</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </section>
      </div>

      {/* Multan Live Dispatch Surge Alert Banner */}
      <aside className="pl-dispatch-surge animated-shadow-aura">
        <div className="pl-ds-left">
          <div className="pl-ds-badge">
            <span className="pl-ds-icon">⚡</span>
            <span>Urgent Dispatch Surge Active in Multan</span>
            <span className="pl-ds-incentive">+25% Payout Incentive</span>
          </div>
          <p className="pl-ds-text">
            High customer call frequency detected in <strong>Multan Cantt, Bosan Road, Gulgasht Colony, and Shah Rukn-e-Alam</strong> for HVAC gas refills, tripping circuit breakers, and water motor repairs.
          </p>
        </div>
        <div className="pl-ds-stats">
          <div className="pl-dstat">
            <span className="pl-dstat-val">88</span>
            <span className="pl-dstat-lbl">Active Pros Online</span>
          </div>
          <div className="pl-ds-divider"></div>
          <div className="pl-dstat">
            <span className="pl-dstat-val">18m</span>
            <span className="pl-dstat-lbl">Avg Arrival Window</span>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default ProviderLogin
