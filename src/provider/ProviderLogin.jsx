import { useState } from 'react'
import { providerAPI } from '../services/api'
import './ProviderLogin.css'

function ProviderLogin({ setCurrentPage, onProviderLogin }) {
  const [loginMethod, setLoginMethod] = useState('mobile')
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [cnic, setCnic] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogin = async (e) => {
    if (e && e.preventDefault) e.preventDefault()
    setErrorMsg('')
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
      setErrorMsg(err.message || 'Login failed. Please verify your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = () => {
    setCurrentPage('provider-verification')
  }

  return (
    <div className="provider-login">
      <div className="login-header">
        <h1 className="header-title">Technician & Partner Portal (لاگ ان)</h1>
        <div className="live-network-box">
          <span className="network-text">Live Dispatch Network: Online</span>
          <span className="network-dot"></span>
        </div>
      </div>

      <div className="login-container">
        <div className="main-card">
          <div className="card-header">
            <div className="service-icon">⚡</div>
            <h2 className="service-title">Service HUB Pro Partner</h2>
          </div>
          <h3 className="welcome-text">Welcome Back to<br />Your Work Hub</h3>
          <p className="urdu-text">اپنے پورٹل میں خوش آمدید</p>
          <p className="description">
            Access your daily leads, live dispatched jobs, escrow earnings, and client messages in your localized territory instantly.
          </p>

          <div className="stats-row">
            <div className="stat-box">
              <p className="stat-label">Weekly Avg Earnings</p>
              <p className="stat-value">PKR 45,000 <span className="stat-plus">+</span></p>
              <p className="stat-sub">Top mechanics & electricians</p>
            </div>
            <div className="stat-box">
              <p className="stat-label">Multan Area Demand</p>
              <p className="stat-value">14 Leads</p>
              <p className="stat-sub live">Live</p>
              <p className="stat-sub">Unassigned jobs ready for pickup</p>
            </div>
          </div>

          <div className="helpline-box">
            <div className="helpline-icon">📞</div>
            <div className="helpline-content">
              <p className="helpline-title">24/7 Pro Dispatch Helpline</p>
              <p className="helpline-number">042-111-HUB-PRO (482-776)</p>
            </div>
            <button className="call-now-btn">Call Now</button>
          </div>

          <div className="guarantee-section">
            <div className="guarantee-badge">
              <span className="badge-icon">✓</span>
              <span className="guarantee-text">Secure Platform Guarantee</span>
            </div>
            <p className="guarantee-description">
              Escrow Protected Client Payments | Guaranteed zero service fee deduction on first 5 jobs every calendar month. Direct instant deposits via State Bank Raast and JazzCash Business.
            </p>
          </div>

          <div className="features-row">
            <div className="feature-box">Raast P2G</div>
            <div className="feature-box">JazzCash Pro</div>
            <div className="feature-box">NADRA Verified</div>
            <div className="feature-box">Instant Disbursal</div>
          </div>
        </div>

        <div className="login-card">
          <p className="authorized-text">Authorized Personnel Only</p>
          <h2 className="login-title">Provider Account Login</h2>
          <p className="login-description">
            Enter your verified credentials to access incoming jobs, client calls, and wallet transfers.
          </p>

          {errorMsg && (
            <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px', border: '1px solid #f87171' }}>
              ⚠️ {errorMsg}
            </div>
          )}

          <div className="method-selector">
            <div 
              className={`method-option ${loginMethod === 'mobile' ? 'active' : ''}`}
              onClick={() => setLoginMethod('mobile')}
            >
              Mobile & OTP (Recommended)
            </div>
            <div 
              className={`method-option ${loginMethod === 'cnic' ? 'active' : ''}`}
              onClick={() => setLoginMethod('cnic')}
            >
              CNIC & Password
            </div>
          </div>

          {loginMethod === 'mobile' && (
            <div className="login-form">
              <p className="form-label">Registered Mobile Number</p>
              <input 
                type="text" 
                className="form-input" 
                placeholder="0300-1234567" 
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <p className="form-hint">We will dispatch an SMS authentication passcode to this SIM.</p>
              
              <p className="form-label">6-Digit Verification Code (او ٹی پی)</p>
              <div className="otp-row">
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter 6-digit OTP (e.g. 123456)" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button 
                  type="button"
                  className="send-otp-btn"
                  onClick={() => alert('Verification OTP sent to ' + (mobile || 'your mobile number'))}
                >
                  Send OTP via SMS
                </button>
              </div>
              <button type="button" className="changed-sim-btn">Changed mobile SIM</button>
              
              <button className="login-btn" onClick={handleLogin} disabled={loading}>
                {loading ? 'Authenticating...' : 'Login to Provider Dashboard →'}
              </button>
            </div>
          )}

          {loginMethod === 'cnic' && (
            <div className="login-form">
              <p className="form-label">CNIC Number</p>
              <input 
                type="text" 
                className="form-input" 
                placeholder="36302-XXXXXXX-X" 
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
              />
              
              <p className="form-label">Password</p>
              <input 
                type="password" 
                className="form-input" 
                placeholder="Enter password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <button className="login-btn" onClick={handleLogin} disabled={loading}>
                {loading ? 'Authenticating...' : 'Login to Provider Dashboard →'}
              </button>
            </div>
          )}

          <div className="biometric-section">
            <div className="biometric-icon">👆</div>
            <p className="biometric-title">Biometric Re-verification Needed?</p>
            <p className="biometric-description">
              If your account status is flagged for annual re-audit, visit any designated Service HUB Khidmat Desk across Lahore, Karachi, or Islamabad with your original CNIC.
            </p>
          </div>

          <div className="signup-prompt">
            <span className="signup-text">Not a registered partner yet?</span>
            <button className="signup-btn" onClick={handleSignup}>Join as Verified</button>
          </div>
        </div>
      </div>

      <div className="dispatch-alert-box">
        <div className="alert-header">
          <div className="alert-icon-circle">
            <span className="alert-icon">⚡</span>
          </div>
          <h3 className="alert-title">Urgent Dispatch Surge Active</h3>
          <div className="incentive-badge">+25% Incentive</div>
        </div>
        <div className="alert-content">
          <div className="alert-description-row">
            <p className="alert-description">
              High volume of HVAC maintenance and residential electrical calls logged in Gulberg, DHA, and Bahria Town in the past 45 minutes.
            </p>
            <div className="alert-stats">
              <span className="available-tech">Available Technicians: 88</span>
              <span className="blue-dot">●</span>
              <span className="avg-arrival">Avg arrival window: 18m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProviderLogin
