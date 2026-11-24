import { useState, useEffect } from 'react'
import { providerAPI } from '../services/api'
import loginScr from '../Public/login scr.webp'
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

  return (
    <div className="auth-page provider-login-page">
      {/* Fullscreen Background Image — Same as Customer Login */}
      <img
        src={loginScr}
        alt="MUX SERVICES Provider Login Background"
        className="auth-fullscreen-bg"
      />
      <div className="auth-bg-overlay" aria-hidden="true"></div>

      {/* Centered Direct Form on Clear Background Image (NO CARDS) */}
      <div className="auth-direct-form provider-direct-form">
        <div className="auth-header-brand">
          <h1 className="auth-brand-title">MUX SERVICES</h1>
          <p className="auth-brand-tagline">Multan's Premier Technician &amp; Partner Portal</p>
        </div>

        <h2 className="auth-title">Provider Sign In</h2>
        <p className="auth-subtitle">Enter your verified credentials to access jobs &amp; payouts</p>

        {errorMsg && (
          <div className="auth-error-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Method Selector Tabs directly over background */}
        <div className="provider-method-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={loginMethod === 'mobile'}
            className={`method-tab-btn ${loginMethod === 'mobile' ? 'active' : ''}`}
            onClick={() => { setLoginMethod('mobile'); setErrorMsg('') }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
            <span>Mobile &amp; SMS OTP</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={loginMethod === 'cnic'}
            className={`method-tab-btn ${loginMethod === 'cnic' ? 'active' : ''}`}
            onClick={() => { setLoginMethod('cnic'); setErrorMsg('') }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="3" y="4" width="18" height="16" rx="2"></rect>
              <circle cx="9" cy="10" r="2"></circle>
              <line x1="15" y1="8" x2="17" y2="8"></line>
              <line x1="15" y1="12" x2="17" y2="12"></line>
            </svg>
            <span>CNIC &amp; Password</span>
          </button>
        </div>

        <form className="auth-form" onSubmit={handleLogin} autoComplete="off">
          {/* Mobile & OTP Form */}
          {loginMethod === 'mobile' && (
            <>
              <div className="form-group">
                <label htmlFor="pl-mobile">Registered Mobile Number (موبائل نمبر)</label>
                <div className="input-wrapper">
                  <span className="input-icon">🇵🇰 +92</span>
                  <input
                    type="tel"
                    id="pl-mobile"
                    name="mux_provider_mobile"
                    placeholder="0300-1234567"
                    className="form-input has-prefix"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="label-split-row">
                  <label htmlFor="pl-otp">6-Digit OTP Code (او ٹی پی)</label>
                  {otpSent && <span className="otp-dispatched-text">✓ Code Dispatched</span>}
                </div>
                <div className="otp-action-row">
                  <div className="input-wrapper" style={{ flex: 1 }}>
                    <span className="input-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </span>
                    <input
                      type="text"
                      id="pl-otp"
                      maxLength={6}
                      placeholder="e.g. 786110"
                      className="form-input otp-input-field"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </div>
                  <button
                    type="button"
                    className={`otp-send-button ${countdown > 0 ? 'disabled' : ''}`}
                    onClick={handleSendOtp}
                    disabled={countdown > 0}
                  >
                    {countdown > 0 ? `${countdown}s` : otpSent ? 'Resend' : 'Send Code'}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* CNIC & Password Form */}
          {loginMethod === 'cnic' && (
            <>
              <div className="form-group">
                <label htmlFor="pl-cnic">CNIC Number (13 Digits / شناختی کارڈ)</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                      <circle cx="9" cy="10" r="2"></circle>
                      <line x1="15" y1="8" x2="17" y2="8"></line>
                      <line x1="15" y1="12" x2="17" y2="12"></line>
                    </svg>
                  </span>
                  <input
                    type="text"
                    id="pl-cnic"
                    maxLength={15}
                    placeholder="36302-XXXXXXX-X"
                    className="form-input"
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
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="label-split-row">
                  <label htmlFor="pl-password">Password (پاس ورڈ)</label>
                  <a
                    href="#forgot"
                    className="forgot-password"
                    onClick={(e) => {
                      e.preventDefault()
                      setLoginMethod('mobile')
                      setErrorMsg('Tip: Use Mobile & SMS OTP for instant sign in.')
                    }}
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="pl-password"
                    placeholder="Enter your password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                        <line x1="2" y1="2" x2="22" y2="22"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Authenticating Pro Account...' : 'Sign In to Provider Portal'}
          </button>

          <div className="auth-switch">
            <span>New technician or workshop owner?</span>
            <button type="button" className="switch-link" onClick={handleSignup}>
              Register as Verified Pro
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProviderLogin
