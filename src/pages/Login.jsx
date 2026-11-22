import { useState } from 'react'
import './Login.css'
import loginScr from '../Public/login scr.webp'
import { authAPI } from '../services/api'

function Login({ onSignupClick, onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!formData.email.trim() || !formData.password) {
      setError('Please enter both email and password.')
      return
    }

    setLoading(true)
    try {
      const res = await authAPI.login({
        email: formData.email.trim(),
        password: formData.password
      })

      if (typeof onLogin === 'function') {
        onLogin(res.user)
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  return (
    <div className="auth-page login-page">
      {/* Full-screen background image */}
      <img src={loginScr} alt="Login Background" className="auth-fullscreen-bg" />
      <div className="auth-bg-overlay" aria-hidden="true"></div>

      {/* Centered Direct Form on Clear Background Image (NO CARDS & BROWSER-BACK READY) */}
      <div className="auth-direct-form">
        <div className="auth-header-brand">
          <h1 className="auth-brand-title">MUX SERVICES</h1>
          <p className="auth-brand-tagline">Multan's Premier Home Services on Demand</p>
        </div>

        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Please enter your credentials to sign in</p>
        
        {error && (
          <div className="auth-error-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <span>{error}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
          {/* Chrome autofill isolation trap: prevents browser from autofilling saved MDA credentials */}
          <input 
            type="text" 
            name="fake_autofill_user_trap" 
            style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none' }} 
            tabIndex="-1" 
            autoComplete="off" 
          />
          <input 
            type="password" 
            name="fake_autofill_pwd_trap" 
            style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none' }} 
            tabIndex="-1" 
            autoComplete="new-password" 
          />

          <div className="form-group">
            <label htmlFor="email">Email or Username</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </span>
              <input
                type="text"
                id="email"
                name="mux_portal_user_id"
                placeholder="Enter your email or username"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="mux_portal_auth_key"
                placeholder="Enter your password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                    <line x1="2" x2="22" y1="2" y2="22"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" defaultChecked />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="forgot-password" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your registered email.'); }}>Forgot password?</a>
          </div>

          <button type="submit" className="auth-button" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Logging in...' : 'Sign In'}
          </button>

          <div className="auth-divider">
            <span>OR CONTINUE WITH</span>
          </div>

          <div className="social-buttons">
            <button type="button" className="social-button google" onClick={() => setFormData({ email: 'client@muxservices.pk', password: 'password123' })}>
              <span className="social-icon">G</span>
              <span>Google</span>
            </button>
            <button type="button" className="social-button facebook" onClick={() => alert('Mobile OTP verification available in partner portal.')}>
              <span className="social-icon">f</span>
              <span>Facebook</span>
            </button>
          </div>

          <div className="auth-switch">
            <span>Don't have an account?</span>
            <button type="button" className="switch-link" onClick={onSignupClick}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
