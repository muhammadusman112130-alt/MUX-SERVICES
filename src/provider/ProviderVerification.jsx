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
    experience: 'Fresh',
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
      setError('Please select your trade from the category list.')
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
        setError('Please enter Ustad Name, Shop Location, and Workshop Address.')
        return
      }
    }

    // Validation for Diploma Pathway
    if (pathway === 'diploma') {
      if (!formData.instituteName.trim()) {
        setError('Please enter technical Institute Name.')
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
              Your registration application has been received successfully.
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
              Register your trade to receive daily verified bookings across Multan
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
                <label htmlFor="fullName">
                  Full Name <span className="form-req-star">*</span>
                </label>
                <div className="input-wrapper">
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
                <label htmlFor="mobile">
                  Mobile Number <span className="form-req-star">*</span>
                </label>
                <div className="input-wrapper">
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    placeholder="0300-1234567"
                    className="form-input"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* CNIC */}
              <div className="form-group">
                <label htmlFor="cnic">
                  CNIC Number (13 Digits) <span className="form-req-star">*</span>
                </label>
                <div className="input-wrapper">
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

              {/* Profession Category Dropdown List */}
              <div className="form-group">
                <label htmlFor="profession">
                  Select Profession <span className="form-req-star">*</span>
                </label>
                <div className="input-wrapper select-input-wrapper">
                  <select
                    id="profession"
                    name="profession"
                    className="form-input form-select"
                    value={formData.profession}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Trade --</option>
                    <option value="Electrical & Solar">Electrical &amp; Solar</option>
                    <option value="Plumbing & Sanitary">Plumbing &amp; Sanitary</option>
                    <option value="AC & HVAC Cooling">AC &amp; HVAC Cooling</option>
                    <option value="Carpentry & Woodwork">Carpentry &amp; Woodwork</option>
                    <option value="Appliance Repair">Appliance Repair</option>
                    <option value="Painting & Polishing">Painting &amp; Polishing</option>
                    <option value="Deep Home Cleaning">Deep Home Cleaning</option>
                    <option value="Welding & Fabrication">Welding &amp; Fabrication</option>
                    <option value="Gardening & Lawn">Gardening &amp; Lawn</option>
                  </select>
                  <span className="select-arrow-chevron" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </div>
              </div>

              {/* Multan Locality & Optional Experience Level */}
              <div className="form-row-dual">
                <div className="form-group">
                  <label htmlFor="zone">
                    Multan Locality <span className="form-req-star">*</span>
                  </label>
                  <div className="input-wrapper select-input-wrapper">
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
                    <span className="select-arrow-chevron" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="experience">Experience (Optional)</label>
                  <div className="input-wrapper select-input-wrapper">
                    <select
                      id="experience"
                      name="experience"
                      className="form-input form-select"
                      value={formData.experience}
                      onChange={handleChange}
                    >
                      <option value="Fresh">Fresh</option>
                      <option value="1-3 Years">1 - 3 Years</option>
                      <option value="4-7 Years">4 - 7 Years</option>
                      <option value="8+ Years Master">8+ Years Master</option>
                    </select>
                    <span className="select-arrow-chevron" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              {/* Skill Qualification Pathway as Dropdown List Bar */}
              <div className="form-group">
                <label htmlFor="pathway">
                  Skill Qualification <span className="form-req-star">*</span>
                </label>
                <div className="input-wrapper select-input-wrapper">
                  <select
                    id="pathway"
                    name="pathway"
                    className="form-input form-select"
                    value={pathway}
                    onChange={(e) => setPathway(e.target.value)}
                    required
                  >
                    <option value="ustad">Master Ustad Apprenticeship</option>
                    <option value="diploma">Technical Diploma</option>
                  </select>
                  <span className="select-arrow-chevron" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </div>
              </div>

              {/* Dynamic Form: If Ustad is Selected */}
              {pathway === 'ustad' && (
                <>
                  <div className="form-group">
                    <label htmlFor="ustadName">
                      Master Ustad Name <span className="form-req-star">*</span>
                    </label>
                    <div className="input-wrapper">
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
                      <label htmlFor="ustadCnic">Ustad CNIC</label>
                      <div className="input-wrapper">
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
                      <label htmlFor="shopLocation">
                        Shop Location <span className="form-req-star">*</span>
                      </label>
                      <div className="input-wrapper">
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
                    <label htmlFor="shopAddress">
                      Workshop Address <span className="form-req-star">*</span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        id="shopAddress"
                        name="shopAddress"
                        placeholder="Shop #, Street, Landmark, Multan"
                        className="form-input"
                        value={formData.shopAddress}
                        onChange={handleChange}
                        required={pathway === 'ustad'}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="ustadContact">Ustad Phone (Optional)</label>
                    <div className="input-wrapper">
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
                </>
              )}

              {/* Dynamic Form: If Diploma is Selected */}
              {pathway === 'diploma' && (
                <>
                  <div className="form-group">
                    <label htmlFor="instituteName">
                      Institute Name <span className="form-req-star">*</span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        id="instituteName"
                        name="instituteName"
                        placeholder="e.g. Government College of Technology Multan"
                        className="form-input"
                        value={formData.instituteName}
                        onChange={handleChange}
                        required={pathway === 'diploma'}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="diplomaFile">Upload Diploma</label>
                    <div className="file-upload-box">
                      <input
                        type="file"
                        id="diplomaFile"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e, 'diplomaFile', 'diplomaFileName')}
                        className="file-hidden-input"
                      />
                      <label htmlFor="diplomaFile" className="file-upload-trigger">
                        <div className="fut-text">
                          <strong>{formData.diplomaFileName || 'Choose Diploma Certificate File'}</strong>
                          <span>Supports JPG, PNG or PDF</span>
                        </div>
                        <span className="fut-btn">
                          <span className="fut-btn-sparkle">✦</span> Browse File
                        </span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* Police Clearance Certificate Upload Field */}
              <div className="form-group">
                <label htmlFor="policeCertificate">
                  Police Clearance Certificate <span className="form-req-star">*</span>
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
                    <div className="fut-text">
                      <strong>
                        {formData.policeCertificateFileName || 'Upload Police Clearance Certificate'}
                      </strong>
                      <span>Punjab Police Khidmat Markaz Document (JPG, PNG, PDF)</span>
                    </div>
                    <span className="fut-btn">
                      <span className="fut-btn-sparkle">✦</span> Upload Slip
                    </span>
                  </label>
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
                    I solemnly swear that my trade information, qualification details, and CNIC are 100% genuine and clear of any criminal record.
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
                {loading ? 'Submitting Application...' : 'Register as Verified Pro →'}
              </button>

              {/* Switch to Login with Prominent Lighting Button */}
              <div className="provider-reg-highlight-wrap">
                <span className="prh-question">Already registered as a partner?</span>
                <button
                  type="button"
                  className="provider-reg-lighting-btn"
                  onClick={() => setCurrentPage && setCurrentPage('provider-login')}
                >
                  <span className="prh-glow-aura" aria-hidden="true"></span>
                  <span className="prh-btn-text">Sign In to Provider Portal</span>
                  <span className="prh-arrow">→</span>
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
