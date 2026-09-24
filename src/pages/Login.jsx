import { useState } from 'react'
import './Login.css'
import loginScr from '../Public/login scr.png'

function Login({ onSignupClick, onBackClick, onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically validate and submit the form
    // For now, just call onLogin
    onLogin()
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Panel */}
        <div className="auth-left-panel">
          <img src={loginScr} alt="Login Background" className="auth-left-image" />
          <div className="auth-left-content">
            <div className="auth-logo">
              <h1>SERVICES HUB</h1>
              <p className="auth-tagline" style={{ color: '#ffffff' }}>Professional excellence on demand</p>
            </div>
            <div className="auth-testimonial">
              <div className="testimonial-avatar">
                <span className="avatar-emoji">👩</span>
              </div>
              <p className="testimonial-text" style={{ color: '#ffffff' }}>
                "The easiest way to find trusted professionals for any task."
              </p>
              <div className="testimonial-author" style={{ color: '#ffffff' }}>
                <span className="author-name" style={{ color: '#ffffff' }}>Sarah Jenkins</span>
                <span className="author-role" style={{ color: '#ffffff' }}>Verified Customer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="auth-right-panel">
          <div className="auth-form-container">
            <button className="back-button" onClick={onBackClick}>← Back</button>
            <h2 className="auth-title">Welcome back</h2>
            <p className="auth-subtitle">Please enter your details to sign in</p>
            
            <form className="auth-form" onSubmit={handleSubmit}>
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
                    placeholder="Enter your email or username"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
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
                    placeholder="Enter your password"
                    className="form-input"
                    value={formData.password}
                    onChange={handleChange}
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
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="forgot-password" onClick={(e) => { e.preventDefault(); alert('Password reset is not configured for this demo.'); }}>Forgot password?</a>
              </div>

              <button type="submit" className="auth-button">Login</button>

              <div className="auth-divider">
                <span>OR CONTINUE WITH</span>
              </div>

              <div className="social-buttons">
                <button type="button" className="social-button google">
                  <span className="social-icon">G</span>
                  <span>Google</span>
                </button>
                <button type="button" className="social-button facebook">
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
      </div>
    </div>
  )
}

export default Login
