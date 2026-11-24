import { useState } from 'react'
import loginScr from '../Public/login scr.webp'
import './ProviderVerification.css'

function ProviderVerification({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    cnic: '',
    profession: '',
    zone: 'Multan Cantt & Sadar',
    experience: '4-7 Years',
    qualification: 'TEVTA / PBTE Diploma',
    payoutChannel: 'State Bank Raast ID',
    accountNumber: '',
    agreedToOath: false
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)

    if (!formData.fullName.trim() || !formData.mobile.trim() || !formData.cnic.trim()) {
      setError('Please provide your Full Name, Mobile Number, and CNIC.')
      return
    }

    if (!formData.profession) {
      setError('Please select your trade / profession from the dropdown list.')
      return
    }

    const cnicClean = formData.cnic.replace(/[^0-9]/g, '')
    if (cnicClean.length !== 13) {
      setError('Please enter a valid 13-digit CNIC number.')
      return
    }

    if (!formData.agreedToOath) {
      setError('Please confirm the integrity oath and police clearance declaration.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 800)
  }

  return (
    <div className="auth-page provider-verification-page">
      {/* Fullscreen Background Image — Same as Customer Login */}
      <img
        src={loginScr}
        alt="MUX SERVICES Provider Registration Background"
        className="auth-fullscreen-bg"
      />
      <div className="auth-bg-overlay" aria-hidden="true"></div>

      {/* Centered Direct Form on Clear Background Image (NO CARDS) */}
      <div className="auth-direct-form provider-signup-direct-form">
        <div className="auth-header-brand">
          <h1 className="auth-brand-title">MUX SERVICES</h1>
          <p className="auth-brand-tagline">Multan's Premier Verified Technician Registration</p>
        </div>

        {submitted ? (
          <div className="pv-success-direct">
            <div className="pv-success-icon-wrap">✓</div>
            <h2 className="auth-title">Application Submitted!</h2>
            <p className="auth-subtitle">
              آپ کی رجسٹریشن درخواست موصول ہو چکی ہے۔
            </p>
            <div className="pv-success-info">
              <p>
                Welcome to <strong>MUX SERVICES</strong>, <strong>{formData.fullName}</strong>.
                Your profile for <strong>{formData.profession}</strong> in <strong>{formData.zone}</strong> has been assigned to our Multan Onboarding Desk (MDA Chowk &amp; Cantt).
              </p>
              <p>NADRA &amp; Police clearance verification will complete within 24 hours.</p>
            </div>
            <button
              type="button"
              className="auth-button"
              onClick={() => setCurrentPage && setCurrentPage('provider-login')}
            >
              Proceed to Provider Login Portal →
            </button>
          </div>
        ) : (
          <>
            <h2 className="auth-title">Register as Verified Pro</h2>
            <p className="auth-subtitle">
              اپنے ہنر کو رجسٹر کریں اور روزانہ کی بنیاد پر باوقار روزگار حاصل کریں
            </p>

            {error && (
              <div className="auth-error-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="fullName">Full Name (شناختی کارڈ کے مطابق پورا نام) *</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="e.g. Muhammad Asif"
                    className="form-input"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div className="form-group">
                <label htmlFor="mobile">Mobile Number (WhatsApp Enabled / موبائل نمبر) *</label>
                <div className="input-wrapper">
                  <span className="input-icon">🇵🇰 +92</span>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    placeholder="0300-1234567"
                    className="form-input has-prefix"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* CNIC */}
              <div className="form-group">
                <label htmlFor="cnic">CNIC Number (13 Digits / شناختی کارڈ نمبر) *</label>
                <div className="input-wrapper">
                  <span className="input-icon">🪪</span>
                  <input
                    type="text"
                    id="cnic"
                    name="cnic"
                    maxLength={15}
                    placeholder="36302-XXXXXXX-X"
                    className="form-input"
                    value={formData.cnic}
                    onChange={(e) => {
                      let val = e.target.value.replace(/[^0-9]/g, '')
                      if (val.length > 5 && val.length <= 12) {
                        val = `${val.slice(0, 5)}-${val.slice(5)}`
                      } else if (val.length > 12) {
                        val = `${val.slice(0, 5)}-${val.slice(5, 12)}-${val.slice(12, 13)}`
                      }
                      setFormData((prev) => ({ ...prev, cnic: val }))
                    }}
                    required
                  />
                </div>
              </div>

              {/* Profession Category Dropdown List (No Boxes as per user requirement) */}
              <div className="form-group">
                <label htmlFor="profession">Select Profession / Category (پیشہ منتخب کریں) *</label>
                <div className="input-wrapper">
                  <span className="input-icon">🛠️</span>
                  <select
                    id="profession"
                    name="profession"
                    className="form-input form-select"
                    value={formData.profession}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Choose Your Trade / Profession --</option>
                    <option value="Electrical & Solar">⚡ Electrical &amp; Solar (بجلی و سولر وائرنگ)</option>
                    <option value="Plumbing & Sanitary">🔧 Plumbing &amp; Sanitary (پلمبنگ و سینیٹری)</option>
                    <option value="AC & HVAC Cooling">❄️ AC &amp; HVAC Cooling (اے سی و کولنگ سروس)</option>
                    <option value="Carpentry & Woodwork">🪚 Carpentry &amp; Woodwork (بڑھئی و لکڑی کا کام)</option>
                    <option value="Appliance Repair">🧺 Appliance Repair (گھریلو آلات ریپئر)</option>
                    <option value="Painting & Polishing">🎨 Painting &amp; Polishing (پینٹر و پالش سروس)</option>
                    <option value="Deep Home Cleaning">✨ Deep Home Cleaning (ڈیپ ہوم کلیننگ)</option>
                    <option value="Welding & Fabrication">🔥 Welding &amp; Fabrication (ویلڈنگ و فیبریکیشن)</option>
                    <option value="Gardening & Lawn">🌱 Gardening &amp; Lawn (باغبانی و لان کیئر)</option>
                  </select>
                </div>
              </div>

              {/* Multan Locality */}
              <div className="form-group">
                <label htmlFor="zone">Multan Locality / Work Zone (ملتان کا علاقہ) *</label>
                <div className="input-wrapper">
                  <span className="input-icon">📍</span>
                  <select
                    id="zone"
                    name="zone"
                    className="form-input form-select"
                    value={formData.zone}
                    onChange={handleChange}
                  >
                    <option value="Multan Cantt & Sadar">Multan Cantt &amp; Sadar</option>
                    <option value="Bosan Road & Gulgasht">Bosan Road &amp; Gulgasht Colony</option>
                    <option value="Shah Rukn-e-Alam & New Multan">Shah Rukn-e-Alam &amp; New Multan</option>
                    <option value="Wapda Town & Northern Bypass">Wapda Town &amp; Northern Bypass</option>
                    <option value="MDA Chowk & Lodhi Colony">MDA Chowk &amp; Lodhi Colony</option>
                    <option value="Model Town & Shershah Road">Model Town &amp; Shershah Road</option>
                    <option value="Suraj Miani & Qasim Bela">Suraj Miani &amp; Qasim Bela</option>
                  </select>
                </div>
              </div>

              {/* Experience Level & Qualification */}
              <div className="form-row-dual">
                <div className="form-group">
                  <label htmlFor="experience">Experience Level</label>
                  <div className="input-wrapper">
                    <select
                      id="experience"
                      name="experience"
                      className="form-input form-select"
                      value={formData.experience}
                      onChange={handleChange}
                    >
                      <option value="1-3 Years">1-3 Years</option>
                      <option value="4-7 Years">4-7 Years</option>
                      <option value="8+ Years Master">8+ Years Master</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="qualification">Qualification Pathway</label>
                  <div className="input-wrapper">
                    <select
                      id="qualification"
                      name="qualification"
                      className="form-input form-select"
                      value={formData.qualification}
                      onChange={handleChange}
                    >
                      <option value="TEVTA / PBTE Diploma">TEVTA Diploma</option>
                      <option value="Master Ustad Apprenticeship">Ustad Apprenticeship</option>
                      <option value="Practical Field Experience">Field Experience</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payout Channel & Account */}
              <div className="form-row-dual">
                <div className="form-group">
                  <label htmlFor="payoutChannel">Payout Channel</label>
                  <div className="input-wrapper">
                    <select
                      id="payoutChannel"
                      name="payoutChannel"
                      className="form-input form-select"
                      value={formData.payoutChannel}
                      onChange={handleChange}
                    >
                      <option value="State Bank Raast ID">State Bank Raast ID</option>
                      <option value="JazzCash Business">JazzCash</option>
                      <option value="EasyPaisa Pro">EasyPaisa</option>
                      <option value="Bank IBAN">Bank Account (IBAN)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="accountNumber">Account / Raast Number</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      placeholder="e.g. 03001234567 or IBAN"
                      className="form-input"
                      value={formData.accountNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Solemn Oath Checkbox */}
              <div className="form-options oath-row">
                <label className="remember-me" style={{ alignItems: 'flex-start' }}>
                  <input
                    type="checkbox"
                    name="agreedToOath"
                    checked={formData.agreedToOath}
                    onChange={handleChange}
                    required
                  />
                  <span style={{ fontSize: '0.85rem', lineHeight: '1.45' }}>
                    I solemnly swear that my trade information and CNIC are 100% genuine and clear of any criminal record.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="auth-button"
                disabled={loading}
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Submitting Application...' : 'Register as Verified Pro (درخواست جمع کروائیں) →'}
              </button>

              {/* Switch to Login */}
              <div className="auth-switch">
                <span>Already registered as a partner?</span>
                <button
                  type="button"
                  className="switch-link"
                  onClick={() => setCurrentPage && setCurrentPage('provider-login')}
                >
                  Sign In to Provider Portal
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default ProviderVerification
