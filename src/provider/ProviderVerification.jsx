import { useState } from 'react'
import loginScr from '../Public/login scr.webp'
import './ProviderVerification.css'

function ProviderVerification({ setCurrentPage }) {
  const [pathway, setPathway] = useState('ustad') // 'ustad' | 'diploma'
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    cnic: '',
    profession: '',
    zone: 'Multan Cantt & Sadar',
    experience: 'None / Fresh',
    // Ustad Pathway Fields
    ustadName: '',
    ustadCnic: '',
    shopLocation: '',
    shopAddress: '',
    ustadContact: '',
    // Diploma Pathway Fields
    instituteName: '',
    diplomaFile: null,
    diplomaFileName: '',
    // Police Verification Upload
    policeCertificateFile: null,
    policeCertificateFileName: '',
    // Payout details
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

  const handleFileChange = (e, fileField, nameField) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData((prev) => ({
        ...prev,
        [fileField]: file,
        [nameField]: file.name
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)

    if (!formData.fullName.trim() || !formData.mobile.trim() || !formData.cnic.trim()) {
      setError('Please provide your Full Name, Mobile Number, and CNIC.')
      return
    }

    if (!formData.profession) {
      setError('Please select your trade / profession from the category list.')
      return
    }

    const cnicClean = formData.cnic.replace(/[^0-9]/g, '')
    if (cnicClean.length !== 13) {
      setError('Please enter your valid 13-digit CNIC number.')
      return
    }

    // Validation for Ustad Pathway
    if (pathway === 'ustad') {
      if (!formData.ustadName.trim() || !formData.shopLocation.trim() || !formData.shopAddress.trim()) {
        setError("Please enter Ustad's Name, Shop Location, and Shop Address.")
        return
      }
    }

    // Validation for Diploma Pathway
    if (pathway === 'diploma') {
      if (!formData.instituteName.trim()) {
        setError('Please enter your technical Institute or Board name.')
        return
      }
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
                Your profile for <strong>{formData.profession}</strong> in <strong>{formData.zone}</strong> has been submitted.
              </p>
              <p>
                Verification method: <strong>{pathway === 'ustad' ? 'Master Ustad Apprenticeship' : 'Technical Diploma'}</strong>.
              </p>
              <p>Punjab Police Khidmat Markaz verification will complete within 24 hours.</p>
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

              {/* Multan Locality & Optional Experience Level */}
              <div className="form-row-dual">
                <div className="form-group">
                  <label htmlFor="zone">Multan Locality (علاقہ) *</label>
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
                      <option value="Bosan Road & Gulgasht">Bosan Road &amp; Gulgasht</option>
                      <option value="Shah Rukn-e-Alam & New Multan">Shah Rukn-e-Alam</option>
                      <option value="Wapda Town & Northern Bypass">Wapda Town</option>
                      <option value="MDA Chowk & Lodhi Colony">MDA Chowk</option>
                      <option value="Model Town & Shershah Road">Model Town</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="experience">Experience (تجربہ - Optional)</label>
                  <div className="input-wrapper">
                    <select
                      id="experience"
                      name="experience"
                      className="form-input form-select"
                      value={formData.experience}
                      onChange={handleChange}
                    >
                      <option value="None / Fresh">None / Fresh (نئے کاریگر)</option>
                      <option value="1-3 Years">1 - 3 Years</option>
                      <option value="4-7 Years">4 - 7 Years</option>
                      <option value="8+ Years Master">8+ Years (ماسٹر کاریگر)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 2 Pathway Selection (Ustad vs Diploma ONLY as requested) */}
              <div className="form-group">
                <label className="section-step-label">
                  Skill Qualification Pathway (ہنر کی تصدیق کا طریقہ - صرف 2 آپشنز) *
                </label>
                <div className="pathway-toggle-grid">
                  <button
                    type="button"
                    className={`pathway-card-btn ${pathway === 'ustad' ? 'active' : ''}`}
                    onClick={() => setPathway('ustad')}
                  >
                    <span className="pw-icon">👨‍🏫</span>
                    <div className="pw-text-block">
                      <strong>Master Ustad Apprenticeship</strong>
                      <span>استاد شاگردی کا عملی تجربہ</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`pathway-card-btn ${pathway === 'diploma' ? 'active' : ''}`}
                    onClick={() => setPathway('diploma')}
                  >
                    <span className="pw-icon">📜</span>
                    <div className="pw-text-block">
                      <strong>Technical Diploma / TEVTA</strong>
                      <span>ٹیکنیکل ڈپلومہ یا سرٹیفیکیٹ</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Dynamic Form: If Ustad is Selected */}
              {pathway === 'ustad' && (
                <div className="dynamic-pathway-box anim-fade-in">
                  <div className="pathway-header-strip">
                    <span className="phs-tag">👨‍🏫 Master Ustad Verification Details</span>
                    <span className="phs-urdu">استاد اور ورکشاپ کی تفصیلات درج کریں</span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="ustadName">Master Ustad's Full Name (استاد کا نام) *</label>
                    <div className="input-wrapper">
                      <span className="input-icon">👨‍🔧</span>
                      <input
                        type="text"
                        id="ustadName"
                        name="ustadName"
                        placeholder="e.g. Ustad Tariq Mehmood"
                        className="form-input"
                        value={formData.ustadName}
                        onChange={handleChange}
                        required={pathway === 'ustad'}
                      />
                    </div>
                  </div>

                  <div className="form-row-dual">
                    <div className="form-group">
                      <label htmlFor="ustadCnic">Ustad's CNIC (شناختی کارڈ نمبر)</label>
                      <div className="input-wrapper">
                        <span className="input-icon">🪪</span>
                        <input
                          type="text"
                          id="ustadCnic"
                          name="ustadCnic"
                          maxLength={15}
                          placeholder="36302-XXXXXXX-X"
                          className="form-input"
                          value={formData.ustadCnic}
                          onChange={(e) => {
                            let val = e.target.value.replace(/[^0-9]/g, '')
                            if (val.length > 5 && val.length <= 12) {
                              val = `${val.slice(0, 5)}-${val.slice(5)}`
                            } else if (val.length > 12) {
                              val = `${val.slice(0, 5)}-${val.slice(5, 12)}-${val.slice(12, 13)}`
                            }
                            setFormData((prev) => ({ ...prev, ustadCnic: val }))
                          }}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="shopLocation">Shop / Market Location (علاقہ / مارکیٹ) *</label>
                      <div className="input-wrapper">
                        <span className="input-icon">📍</span>
                        <input
                          type="text"
                          id="shopLocation"
                          name="shopLocation"
                          placeholder="e.g. Loha Market, Cantt Multan"
                          className="form-input"
                          value={formData.shopLocation}
                          onChange={handleChange}
                          required={pathway === 'ustad'}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="shopAddress">Complete Workshop Address (ورکشاپ کا مکمل پتہ) *</label>
                    <div className="input-wrapper">
                      <span className="input-icon">🏢</span>
                      <input
                        type="text"
                        id="shopAddress"
                        name="shopAddress"
                        placeholder="Shop #, Street, Near Landmark, Multan"
                        className="form-input"
                        value={formData.shopAddress}
                        onChange={handleChange}
                        required={pathway === 'ustad'}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="ustadContact">Ustad's Phone (رابطہ فون نمبر - Optional)</label>
                    <div className="input-wrapper">
                      <span className="input-icon">📞</span>
                      <input
                        type="tel"
                        id="ustadContact"
                        name="ustadContact"
                        placeholder="03XX-XXXXXXX"
                        className="form-input"
                        value={formData.ustadContact}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Form: If Diploma is Selected */}
              {pathway === 'diploma' && (
                <div className="dynamic-pathway-box anim-fade-in">
                  <div className="pathway-header-strip">
                    <span className="phs-tag">📜 Technical Institute &amp; Certificate</span>
                    <span className="phs-urdu">ڈپلومہ ادارے اور سرٹیفیکیٹ کی تفصیل</span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="instituteName">Institute / Board Name (ادارے کا نام) *</label>
                    <div className="input-wrapper">
                      <span className="input-icon">🏫</span>
                      <input
                        type="text"
                        id="instituteName"
                        name="instituteName"
                        placeholder="e.g. TEVTA / Government College of Technology Multan"
                        className="form-input"
                        value={formData.instituteName}
                        onChange={handleChange}
                        required={pathway === 'diploma'}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="diplomaFile">Upload Diploma / Certificate (سرٹیفیکیٹ اپلوڈ کریں)</label>
                    <div className="file-upload-box">
                      <input
                        type="file"
                        id="diplomaFile"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e, 'diplomaFile', 'diplomaFileName')}
                        className="file-hidden-input"
                      />
                      <label htmlFor="diplomaFile" className="file-upload-trigger">
                        <span className="fut-icon">📎</span>
                        <div className="fut-text">
                          <strong>{formData.diplomaFileName || 'Choose Diploma Certificate File / Photo'}</strong>
                          <span>Supports JPG, PNG or PDF</span>
                        </div>
                        <span className="fut-btn">Browse</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Police Character Clearance Certificate Upload Field */}
              <div className="form-group">
                <label className="section-step-label">
                  Police Verification Clearance (پنجاب پولیس خدمت مرکز کلیرنس سرٹیفیکیٹ) *
                </label>
                <div className="file-upload-box police-upload-box">
                  <input
                    type="file"
                    id="policeCertificate"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, 'policeCertificateFile', 'policeCertificateFileName')}
                    className="file-hidden-input"
                  />
                  <label htmlFor="policeCertificate" className="file-upload-trigger">
                    <span className="fut-icon">🛡️</span>
                    <div className="fut-text">
                      <strong>
                        {formData.policeCertificateFileName || 'Upload Police Khidmat Markaz Clearance Slip / Certificate'}
                      </strong>
                      <span>پنجاب پولیس خدمت مرکز سلپ یا کریکٹر سرٹیفیکیٹ کی تصویر اپلوڈ کریں</span>
                    </div>
                    <span className="fut-btn">Upload</span>
                  </label>
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
                  <label htmlFor="accountNumber">Account / Raast ID</label>
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
                    I solemnly swear that my trade information, Master Ustad / Diploma details, and CNIC are 100% genuine and clear of any criminal record.
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
