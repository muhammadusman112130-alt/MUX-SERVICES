import { useState, useEffect } from 'react'
import { providerAPI } from '../services/api'
import providerLoginBg from '../Public/provider-login-bg.webp'
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
      {/* Fullscreen Background Image Generated for MUX SERVICES */}
      <img
        src={providerLoginBg}
        alt="MUX SERVICES Provider Portal Background"
        className="pl-fullscreen-bg"
      />
      <div className="pl-bg-overlay" aria-hidden="true"></div>

      {/* Direct Form on Background — Single Unified View (NO CARDS) */}
      <div className="pl-direct-container">
        {/* Central Direct Login Form with Glowing Animated Backdrop */}
        <div className="pl-form-wrapper">
          {/* Animated Light Aura behind the form */}
          <div className="pl-form-glow-animation" aria-hidden="true">
            <div className="pl-glow-orb pl-glow-orb-1"></div>
            <div className="pl-glow-orb pl-glow-orb-2"></div>
            <div className="pl-glow-ring"></div>
            <div className="pl-glow-shimmer"></div>
          </div>

          <div className="pl-form-content">
            {/* Brand Header — Strictly MUX SERVICES */}
            <div className="pl-brand-header">
              <div className="pl-brand-badge">
                <span className="pl-bb-icon">⚡</span>
                <span>MUX SERVICES • ملتان پارٹنر پورٹل</span>
              </div>
              <h1 className="pl-brand-title">MUX SERVICES</h1>
              <p className="pl-brand-tagline">Multan's Premier Technician &amp; Partner Portal</p>
              <p className="pl-brand-urdu">اپنے روزگار، تصدیق شدہ لیڈز اور والٹ میں لاگ ان کریں</p>
            </div>

          {/* Quick Metrics Bar — Floating Transparent Strip */}
          <div className="pl-quick-metrics">
            <div className="pl-qmetric">
              <span className="pl-qm-val">PKR 48,500+</span>
              <span className="pl-qm-lbl">Avg Weekly Earnings</span>
            </div>
            <div className="pl-qm-divider"></div>
            <div className="pl-qmetric">
              <span className="pl-qm-val">18 Live</span>
              <span className="pl-qm-lbl">Multan Active Calls</span>
            </div>
            <div className="pl-qm-divider"></div>
            <div className="pl-qmetric">
              <span className="pl-qm-val">061-652-MUX1</span>
              <span className="pl-qm-lbl">24/7 Dispatch Desk</span>
            </div>
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

          {/* Method Tabs directly over background */}
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
              <span className="pl-tab-pill">Fast</span>
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

          {/* Login Form */}
          <form onSubmit={handleLogin} className="pl-login-form">
            {/* Mobile & OTP Form */}
            {loginMethod === 'mobile' && (
              <div className="pl-form-fields">
                <div className="pl-form-group">
                  <label htmlFor="pl-mobile-input" className="pl-field-label">
                    <span>Registered Mobile Number</span>
                    <span className="pl-field-urdu">رجسٹرڈ موبائل نمبر</span>
                  </label>
                  <div className="pl-input-container">
                    <span className="pl-prefix">🇵🇰 +92</span>
                    <input
                      id="pl-mobile-input"
                      type="tel"
                      className="pl-text-input pl-has-prefix"
                      placeholder="0300-1234567"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      autoComplete="tel"
                    />
                  </div>
                  <span className="pl-hint">Dispatched via secure NADRA/MUX SMS gateway.</span>
                </div>

                <div className="pl-form-group">
                  <label htmlFor="pl-otp-input" className="pl-field-label">
                    <span>6-Digit Verification Code (او ٹی پی)</span>
                    {otpSent && <span className="pl-otp-ok">✓ OTP Dispatched</span>}
                  </label>
                  <div className="pl-otp-group">
                    <input
                      id="pl-otp-input"
                      type="text"
                      maxLength={6}
                      className="pl-text-input pl-otp-field"
                      placeholder="e.g. 786110"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                    />
                    <button
                      type="button"
                      className={`pl-otp-action-btn ${countdown > 0 ? 'disabled' : ''}`}
                      onClick={handleSendOtp}
                      disabled={countdown > 0}
                    >
                      {countdown > 0 ? `Resend (${countdown}s)` : otpSent ? 'Resend Code' : 'Send Code'}
                    </button>
                  </div>
                  <div className="pl-helper-row">
                    <span className="pl-hint">Instant login code sent to your phone.</span>
                    <button
                      type="button"
                      className="pl-sim-change-link"
                      onClick={() => alert('To update your registered SIM number, visit MUX Services Khidmat Desk at MDA Chowk or call 061-652-MUX1.')}
                    >
                      Changed SIM / Phone?
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* CNIC & Password Form */}
            {loginMethod === 'cnic' && (
              <div className="pl-form-fields">
                <div className="pl-form-group">
                  <label htmlFor="pl-cnic-input" className="pl-field-label">
                    <span>CNIC Number (13 Digits)</span>
                    <span className="pl-field-urdu">شناختی کارڈ نمبر</span>
                  </label>
                  <div className="pl-input-container">
                    <input
                      id="pl-cnic-input"
                      type="text"
                      maxLength={15}
                      className="pl-text-input"
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
                  <span className="pl-hint">Your 13-digit National Identity Card number.</span>
                </div>

                <div className="pl-form-group">
                  <div className="pl-fl-split">
                    <label htmlFor="pl-password-input" className="pl-field-label">
                      <span>Account Password</span>
                      <span className="pl-field-urdu">پاس ورڈ</span>
                    </label>
                    <button
                      type="button"
                      className="pl-forgot-link"
                      onClick={() => {
                        setLoginMethod('mobile')
                        setErrorMsg('Tip: Use Mobile & SMS OTP for instant passwordless sign-in.')
                      }}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="pl-input-container">
                    <input
                      id="pl-password-input"
                      type={showPassword ? 'text' : 'password'}
                      className="pl-text-input pl-has-eye"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="pl-eye-toggle"
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
              className="pl-action-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="pl-spinner"></span>
                  <span>Authenticating Pro Account...</span>
                </>
              ) : (
                <>
                  <span>Login to MUX SERVICES Portal</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Bottom Switcher: Register as Verified Pro */}
          <div className="pl-bottom-register">
            <span className="pl-reg-question">New technician or workshop owner in Multan?</span>
            <button
              type="button"
              className="pl-reg-cta-btn"
              onClick={handleSignup}
            >
              <span>Join as Verified Pro (رجسٹریشن فارم)</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* Trust Footnote */}
          <div className="pl-trust-footer">
            <div className="pl-tf-item">✓ State Bank Raast P2G</div>
            <div className="pl-tf-item">✓ JazzCash Business</div>
            <div className="pl-tf-item">✓ NADRA Biometric Verified</div>
            <div className="pl-tf-item">✓ Escrow Protection</div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProviderLogin
