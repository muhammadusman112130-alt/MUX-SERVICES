import { useState } from 'react'
import './ProviderVerification.css'

function ProviderVerification({ setCurrentPage }) {
  const [selectedProfession, setSelectedProfession] = useState('electrical')
  const [pathway, setPathway] = useState('diploma')
  const [agreedToOath, setAgreedToOath] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    cnic: '',
    zone: 'Multan Cantt & Sadar',
    experience: '4-7 Years',
    diplomaInstitute: '',
    diplomaNumber: '',
    ustadName: '',
    workshopAddress: '',
    ustadContact: '',
    payoutChannel: 'State Bank Raast ID',
    accountNumber: ''
  })

  const professions = [
    {
      id: 'electrical',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      title: 'Electrical & Solar',
      urdu: 'بجلی و سولر وائرنگ',
      desc: 'Short circuits, distribution boards, UPS, solar inverters & wiring.'
    },
    {
      id: 'plumbing',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      title: 'Plumbing & Sanitary',
      urdu: 'پلمبنگ و سینیٹری',
      desc: 'Acoustic leak detection, PPRC fitting, geyser & water motor fixes.'
    },
    {
      id: 'hvac',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07" />
        </svg>
      ),
      title: 'AC & HVAC Cooling',
      urdu: 'اے سی و کولنگ سروس',
      desc: 'Inverter installation, jet deep wash, gas recharge & PCB repair.'
    },
    {
      id: 'carpentry',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m14 12 6-6M2 20l7-7M9 13l2 2M16 6l2 2M6 22l-4-4 13-13 4 4L6 22z" />
        </svg>
      ),
      title: 'Carpentry & Woodwork',
      urdu: 'بڑھئی و لکڑی کا کام',
      desc: 'Wardrobes, kitchen cabinets, hydraulic hinges & door locks.'
    },
    {
      id: 'appliances',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="4" y1="10" x2="20" y2="10" />
        </svg>
      ),
      title: 'Appliance Repair',
      urdu: 'گھریلو آلات ریپئر',
      desc: 'Automatic washing machines, refrigerators, deep freezers & ovens.'
    },
    {
      id: 'painting',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m19 11-8-8-8.5 8.5a2.12 2.12 0 0 0 3 3L12 8l3 3" />
          <path d="m5 2 5 5" />
          <path d="M2 22h20" />
        </svg>
      ),
      title: 'Painting & Polishing',
      urdu: 'پینٹر و پالش سروس',
      desc: 'Interior plastic emulsion, weather sheet, rockwall & deco polish.'
    },
    {
      id: 'cleaning',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      ),
      title: 'Deep Home Cleaning',
      urdu: 'ڈیپ ہوم کلیننگ',
      desc: 'Floor scrubbing, chemical tank wash, sofa & carpet extraction.'
    },
    {
      id: 'welder',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      ),
      title: 'Welding & Fabrication',
      urdu: 'ویلڈنگ و میٹل فیبریکیشن',
      desc: 'Main safety gates, window grills, shed framing & iron repair.'
    },
    {
      id: 'gardener',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22v-9" />
          <path d="M12 13a5 5 0 0 0 5-5c0-3-5-6-5-6s-5 3-5 6a5 5 0 0 0 5 5z" />
          <path d="M8 17a4 4 0 0 1-4-4c0-2.5 4-5 4-5" />
          <path d="M16 17a4 4 0 0 0 4-4c0-2.5-4-5-4-5" />
        </svg>
      ),
      title: 'Gardening & Lawn',
      urdu: 'باغبانی و لان کیئر',
      desc: 'Lawn manicuring, hedge shaping, seasonal flowers & pest spray.'
    }
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!agreedToOath) {
      alert('Please agree to the Safety & Character Declaration oath before submitting.')
      return
    }
    setSubmitted(true)
    window.scrollTo({ top: 120, behavior: 'smooth' })
  }

  return (
    <div className="pv-page-container">
      {/* ── TOP BREADCRUMB & SWITCH ACTION ── */}
      <div className="pv-top-nav-bar">
        <div className="pv-breadcrumb-wrap">
          <button 
            type="button" 
            className="pv-crumb-link" 
            onClick={() => setCurrentPage && setCurrentPage('home')}
          >
            Home
          </button>
          <span className="pv-crumb-sep">›</span>
          <span className="pv-crumb-current">Partner Network</span>
          <span className="pv-crumb-sep">›</span>
          <span className="pv-crumb-badge">Verified Pro Registration</span>
        </div>

        <button 
          type="button" 
          className="pv-switch-login-btn"
          onClick={() => setCurrentPage && setCurrentPage('provider-login')}
        >
          <span>Already a Registered Partner?</span>
          <strong>Login to Provider Portal →</strong>
        </button>
      </div>

      {/* ── CINEMATIC HERO SECTION ── */}
      <section className="pv-hero-banner animated-shadow-aura">
        <div className="pv-hero-content">
          <div className="pv-hero-chip">
            <span className="pv-chip-dot"></span>
            <span>MULTAN VERIFIED PRO ONBOARDING GATEWAY</span>
          </div>

          <h1 className="pv-hero-title">
            Register as a Certified <span className="highlight-cyan">MUX Professional</span>
          </h1>

          <p className="pv-hero-urdu">
            مکس سروسز پر مصدقہ کاریگر بنیں اور ملتان بھر سے براہِ راست روزانہ کام حاصل کریں
          </p>

          <p className="pv-hero-description">
            Join Multan's fastest-growing technical artisan network. Connect directly with verified homeowners 
            across Multan Cantt, Bosan Road, Gulgasht Colony, Shah Rukn-e-Alam, and surrounding sectors. 
            Enjoy transparent upfront PKR pricing, 100% daily customer leads, and zero middleman cuts.
          </p>

          <div className="pv-hero-stats-strip">
            <div className="pv-hstat-card">
              <span className="pv-hstat-icon">🛡️</span>
              <div className="pv-hstat-text">
                <strong>100% Verified</strong>
                <span>NADRA CNIC &amp; Criminal Clearance</span>
              </div>
            </div>

            <div className="pv-hstat-card">
              <span className="pv-hstat-icon">💰</span>
              <div className="pv-hstat-text">
                <strong>PKR 75K – 120K+</strong>
                <span>Average Monthly Pro Income</span>
              </div>
            </div>

            <div className="pv-hstat-card">
              <span className="pv-hstat-icon">🎉</span>
              <div className="pv-hstat-text">
                <strong>0% Commission</strong>
                <span>Free on First 5 Orders Monthly</span>
              </div>
            </div>

            <div className="pv-hstat-card">
              <span className="pv-hstat-icon">⏱️</span>
              <div className="pv-hstat-text">
                <strong>&lt; 30 Mins Dispatch</strong>
                <span>Smart Locality Radius Routing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SUCCESS NOTICE BANNER (IF SUBMITTED) ── */}
      {submitted ? (
        <div className="pv-success-banner animated-shadow-aura">
          <div className="pv-sb-icon">✅</div>
          <div className="pv-sb-content">
            <h2>Application Submitted Successfully! (درخواست موصول ہوگئی)</h2>
            <p>
              Your verification packet has been logged into our Multan Compliance Center (Registration Token: <strong>MUX-PRO-{Math.floor(100000 + Math.random() * 900000)}</strong>). 
              Our team will review your CNIC and credentials within <strong>24 – 48 hours</strong>.
            </p>
            <div className="pv-sb-actions">
              <button 
                type="button" 
                className="pv-btn-primary" 
                onClick={() => setCurrentPage && setCurrentPage('provider-login')}
              >
                Proceed to Provider Login Portal →
              </button>
              <button 
                type="button" 
                className="pv-btn-secondary" 
                onClick={() => setCurrentPage && setCurrentPage('home')}
              >
                Return to Homepage
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ── MAIN WORKSPACE GRID ── */
        <div className="pv-main-grid">
          {/* ═══════ LEFT COLUMN: ONBOARDING FORM ═══════ */}
          <form className="pv-form-column" onSubmit={handleSubmit}>
            
            {/* STEP 1: CHOOSE PROFESSION */}
            <div className="pv-form-card animated-shadow-aura">
              <div className="pv-card-step-header">
                <span className="pv-step-badge">STEP 1</span>
                <div>
                  <h2 className="pv-step-title">Select Your Skilled Trade / پیشہ منتخب کریں</h2>
                  <p className="pv-step-subtitle">Choose your primary field of expertise in Multan</p>
                </div>
              </div>

              <div className="pv-professions-grid">
                {professions.map((p) => {
                  const isSelected = selectedProfession === p.id
                  return (
                    <div
                      key={p.id}
                      className={`pv-profession-box ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedProfession(p.id)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="pv-pbox-icon">{p.icon}</div>
                      <h3 className="pv-pbox-title">{p.title}</h3>
                      <p className="pv-pbox-urdu">{p.urdu}</p>
                      <p className="pv-pbox-desc">{p.desc}</p>
                      {isSelected && <span className="pv-pbox-check">✓ Active Choice</span>}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* STEP 2: PERSONAL IDENTITY & CONTACT */}
            <div className="pv-form-card animated-shadow-aura">
              <div className="pv-card-step-header">
                <span className="pv-step-badge">STEP 2</span>
                <div>
                  <h2 className="pv-step-title">Technician Identity &amp; Contact Details</h2>
                  <p className="pv-step-subtitle">Standard National Identity parameters for verified doorstep dispatch</p>
                </div>
              </div>

              <div className="pv-fields-grid">
                <div className="pv-input-group">
                  <label htmlFor="fullName">Full Name (as per CNIC / شناختی کارڈ کے مطابق نام) *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="e.g. Muhammad Rafiq"
                    className="pv-input-field"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="pv-input-group">
                  <label htmlFor="mobile">Mobile Number (WhatsApp Enabled) *</label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    placeholder="0300-1234567"
                    className="pv-input-field"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="pv-input-group">
                  <label htmlFor="cnic">13-Digit CNIC Number (قومی شناختی کارڈ نمبر) *</label>
                  <input
                    type="text"
                    id="cnic"
                    name="cnic"
                    placeholder="36302-XXXXXXX-X"
                    className="pv-input-field"
                    value={formData.cnic}
                    onChange={handleChange}
                    required
                  />
                  <span className="pv-field-hint">✓ Encrypted &amp; authenticated via NADRA standards</span>
                </div>

                <div className="pv-input-group">
                  <label htmlFor="email">Email Address (Optional)</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="rafiq.electrician@gmail.com"
                    className="pv-input-field"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="pv-input-group">
                  <label htmlFor="zone">Operating Locality in Multan *</label>
                  <select
                    id="zone"
                    name="zone"
                    className="pv-input-field pv-select-field"
                    value={formData.zone}
                    onChange={handleChange}
                  >
                    <option>Multan Cantt &amp; Sadar</option>
                    <option>Bosan Road &amp; BZU Sector</option>
                    <option>Gulgasht Colony &amp; Gol Bagh</option>
                    <option>Shah Rukn-e-Alam &amp; New Multan</option>
                    <option>Model Town &amp; Northern Bypass</option>
                    <option>Suraj Miani &amp; Walled City</option>
                    <option>Chowk Kumharanwala &amp; Vehari Road</option>
                    <option>All Multan Municipal Sectors (30 Mins Radius)</option>
                  </select>
                </div>

                <div className="pv-input-group">
                  <label htmlFor="experience">Years of Practical Trade Experience *</label>
                  <select
                    id="experience"
                    name="experience"
                    className="pv-input-field pv-select-field"
                    value={formData.experience}
                    onChange={handleChange}
                  >
                    <option>1 – 3 Years (Junior Technician)</option>
                    <option>4 – 7 Years (Skilled Craftsman)</option>
                    <option>8+ Years (Master Ustad / Specialist)</option>
                    <option>15+ Years (Industry Veteran)</option>
                  </select>
                </div>
              </div>

              {/* Upload CNIC Front & Back */}
              <div className="pv-upload-row">
                <div className="pv-upload-card">
                  <div className="pv-uc-head">
                    <span className="pv-uc-icon">🪪</span>
                    <strong>CNIC Front Photo</strong>
                  </div>
                  <p>Clear colored photo of your National ID Card front side</p>
                  <label className="pv-btn-file">
                    <span>Choose File</span>
                    <input type="file" accept="image/*" hidden />
                  </label>
                </div>

                <div className="pv-upload-card">
                  <div className="pv-uc-head">
                    <span className="pv-uc-icon">🪪</span>
                    <strong>CNIC Back Photo</strong>
                  </div>
                  <p>Clear colored photo showing current address &amp; signature</p>
                  <label className="pv-btn-file">
                    <span>Choose File</span>
                    <input type="file" accept="image/*" hidden />
                  </label>
                </div>
              </div>
            </div>

            {/* STEP 3: VOCATIONAL CREDENTIALS OR USTAD REFERENCE */}
            <div className="pv-form-card animated-shadow-aura">
              <div className="pv-card-step-header">
                <span className="pv-step-badge">STEP 3</span>
                <div>
                  <h2 className="pv-step-title">Trade Certification &amp; Apprenticeship Pathway</h2>
                  <p className="pv-step-subtitle">Select how your craftsmanship qualifications are proven</p>
                </div>
              </div>

              {/* Pathway Toggle */}
              <div className="pv-pathway-tabs">
                <button
                  type="button"
                  className={`pv-ptab ${pathway === 'diploma' ? 'active' : ''}`}
                  onClick={() => setPathway('diploma')}
                >
                  <span className="pv-ptab-icon">📜</span>
                  <div className="pv-ptab-text">
                    <strong>TEVTA / NAVTTC Technical Diploma</strong>
                    <span>Certified diploma or trade test certificate</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`pv-ptab ${pathway === 'ustad' ? 'active' : ''}`}
                  onClick={() => setPathway('ustad')}
                >
                  <span className="pv-ptab-icon">🤝</span>
                  <div className="pv-ptab-text">
                    <strong>Master Ustad Apprenticeship Reference</strong>
                    <span>Verified workshop apprenticeship &amp; market repute</span>
                  </div>
                </button>
              </div>

              {pathway === 'diploma' ? (
                <div className="pv-fields-grid">
                  <div className="pv-input-group">
                    <label htmlFor="diplomaInstitute">Diploma Awarding Body / Technical Institute *</label>
                    <input
                      type="text"
                      id="diplomaInstitute"
                      name="diplomaInstitute"
                      placeholder="e.g. Government College of Technology (GCT) Multan / TEVTA"
                      className="pv-input-field"
                      value={formData.diplomaInstitute}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="pv-input-group">
                    <label htmlFor="diplomaNumber">Roll / Certificate Number *</label>
                    <input
                      type="text"
                      id="diplomaNumber"
                      name="diplomaNumber"
                      placeholder="e.g. DAE-ELEC-2021-8945"
                      className="pv-input-field"
                      value={formData.diplomaNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ) : (
                <div className="pv-fields-grid">
                  <div className="pv-input-group">
                    <label htmlFor="ustadName">Master Ustad / Workshop Mentor Name *</label>
                    <input
                      type="text"
                      id="ustadName"
                      name="ustadName"
                      placeholder="e.g. Ustad Bashir Ahmad (Master Plumber)"
                      className="pv-input-field"
                      value={formData.ustadName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="pv-input-group">
                    <label htmlFor="workshopAddress">Workshop Address / Multan Market *</label>
                    <input
                      type="text"
                      id="workshopAddress"
                      name="workshopAddress"
                      placeholder="e.g. Shop #12, Loha Market, Haram Gate, Multan"
                      className="pv-input-field"
                      value={formData.workshopAddress}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="pv-input-group pv-full-width">
                    <label htmlFor="ustadContact">Ustad Contact Mobile (For verification call) *</label>
                    <input
                      type="tel"
                      id="ustadContact"
                      name="ustadContact"
                      placeholder="0301-7654321"
                      className="pv-input-field"
                      value={formData.ustadContact}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {/* Tools Checklist */}
              <div className="pv-tools-box">
                <span className="pv-tools-badge">✓ PROFESSIONAL TOOLKIT PREREQUISITE</span>
                <p className="pv-tools-desc">
                  Every MUX verified technician must carry their own specialized digital meters, testing equipment, 
                  and safety gear upon arrival at the customer's doorstep.
                </p>
                <div className="pv-tools-pills">
                  <span>⚡ Digital Multimeter / Circuit Testers</span>
                  <span>🔧 Acoustic Leak &amp; Pressure Gauges</span>
                  <span>❄️ Manifold Vacuum Pump Kit</span>
                  <span>🛡️ Insulated Safety Gloves &amp; Shoes</span>
                </div>
              </div>
            </div>

            {/* STEP 4: POLICE CHARACTER CLEARANCE & INTEGRITY OATH */}
            <div className="pv-form-card animated-shadow-aura">
              <div className="pv-card-step-header">
                <span className="pv-step-badge">STEP 4</span>
                <div>
                  <h2 className="pv-step-title">Police Character Clearance &amp; Legal Oath</h2>
                  <p className="pv-step-subtitle">قومی حلف نامہ اور پولیس کریکٹر ویری فکیشن</p>
                </div>
              </div>

              <div className="pv-police-strip">
                <div className="pv-ps-icon">👮‍♂️</div>
                <div className="pv-ps-text">
                  <strong>Punjab Police Khidmat Markaz Character Authentication</strong>
                  <p>
                    Technicians must possess clean legal standing with no active FIRs or criminal convictions. 
                    Token slip or character clearance slip from Multan Khidmat Markaz (Kutchery / Cantt / MDA Chowk) is verified.
                  </p>
                </div>
              </div>

              <div className="pv-upload-card pv-single-upload">
                <div className="pv-uc-head">
                  <span className="pv-uc-icon">📄</span>
                  <strong>Police Khidmat Markaz Clearance Slip / Certificate</strong>
                </div>
                <p>Upload token slip, character certificate or police verification slip (JPG or PDF)</p>
                <label className="pv-btn-file">
                  <span>Choose Document</span>
                  <input type="file" accept="image/*,.pdf" hidden />
                </label>
              </div>

              <div className="pv-oath-declaration-box">
                <label className="pv-checkbox-wrap">
                  <input
                    type="checkbox"
                    checked={agreedToOath}
                    onChange={(e) => setAgreedToOath(e.target.checked)}
                    required
                  />
                  <span className="pv-custom-checkbox"></span>
                  <span className="pv-oath-text">
                    <strong>Solemn Oath &amp; Professional Integrity Undertaking (حلف نامہ):</strong><br />
                    I solemnly swear under the laws of the Islamic Republic of Pakistan that I possess no criminal record 
                    or active FIRs. I commit to honoring customer privacy, strictly charging agreed upfront PKR prices, 
                    using genuine manufacturer parts, and executing every service with highest trade excellence.
                  </span>
                </label>
              </div>
            </div>

            {/* STEP 5: DIRECT PAYOUTS */}
            <div className="pv-form-card animated-shadow-aura">
              <div className="pv-card-step-header">
                <span className="pv-step-badge">STEP 5</span>
                <div>
                  <h2 className="pv-step-title">Direct Payout Account (Raast / JazzCash / Bank)</h2>
                  <p className="pv-step-subtitle">Receive 100% of customer earnings instantly with zero bank deduction</p>
                </div>
              </div>

              <div className="pv-fields-grid">
                <div className="pv-input-group">
                  <label htmlFor="payoutChannel">Payout Channel *</label>
                  <select
                    id="payoutChannel"
                    name="payoutChannel"
                    className="pv-input-field pv-select-field"
                    value={formData.payoutChannel}
                    onChange={handleChange}
                  >
                    <option>State Bank Raast ID (Instant 0 Fee)</option>
                    <option>JazzCash Merchant / Mobile Account</option>
                    <option>EasyPaisa Business Wallet</option>
                    <option>Bank Alfalah / HBL / Meezan Bank Transfer</option>
                  </select>
                </div>

                <div className="pv-input-group">
                  <label htmlFor="accountNumber">Raast ID / Account Number / IBAN *</label>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    placeholder="e.g. 03001234567 or PK36ALFH0000..."
                    className="pv-input-field"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    required
                  />
                  <span className="pv-field-hint">✓ Escrow funds disburse directly to this account immediately upon job sign-off</span>
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON ROW */}
            <div className="pv-submit-row">
              <button type="submit" className="pv-btn-submit-app animated-shadow-aura">
                <span>Submit Application for Verified Partner Badge (24-48h Review)</span>
                <span className="pv-btn-arrow">→</span>
              </button>
              <p className="pv-submit-disclaimer">
                Upon submission, our Multan onboarding desk will review your credentials within 24 to 48 hours. 
                Once activated, you will receive real-time job dispatch notifications directly to your phone.
              </p>
            </div>
          </form>

          {/* ═══════ RIGHT COLUMN: TRUST & SLA SIDEBAR ═══════ */}
          <aside className="pv-sidebar-column">
            
            {/* SLA CARD */}
            <div className="pv-side-card animated-shadow-aura">
              <div className="pv-sc-header">
                <span className="pv-live-indicator"></span>
                <h3>VERIFICATION SLA</h3>
              </div>
              <div className="pv-sla-time-box">
                <strong className="pv-sla-num">24 – 48</strong>
                <span className="pv-sla-unit">Hours Turnaround</span>
              </div>
              <p className="pv-sla-info">
                Average approval turnaround time for credential inspection and dispatch clearance across Multan.
              </p>
              
              <div className="pv-sla-steps-list">
                <div className="pv-sla-item done">
                  <span className="pv-sstep-check">✓</span>
                  <div>
                    <strong>Identity &amp; CNIC Audit</strong>
                    <span>Automated NADRA parameter check</span>
                  </div>
                </div>

                <div className="pv-sla-item in-progress">
                  <span className="pv-sstep-check">⏱</span>
                  <div>
                    <strong>Trade Credential Evaluation</strong>
                    <span>TEVTA / Master Ustad verification</span>
                  </div>
                </div>

                <div className="pv-sla-item pending">
                  <span className="pv-sstep-check">🚀</span>
                  <div>
                    <strong>Live Dispatch Activation</strong>
                    <span>Account goes live on customer maps</span>
                  </div>
                </div>
              </div>
            </div>

            {/* WHY CHOOSE MUX SERVICES */}
            <div className="pv-side-card animated-shadow-aura">
              <h3 className="pv-side-title">Why Top Multan Pros Choose MUX</h3>
              
              <div className="pv-why-points">
                <div className="pv-why-point">
                  <span className="pv-wp-icon">💰</span>
                  <div>
                    <strong>Upfront Escrow Protection</strong>
                    <p>Clients pay upfront in escrow; zero risk of delayed or unpaid labor charges.</p>
                  </div>
                </div>

                <div className="pv-why-point">
                  <span className="pv-wp-icon">📍</span>
                  <div>
                    <strong>30-Min Locality Radius</strong>
                    <p>Dispatch routes jobs in your neighborhood so you spend less time driving and more time earning.</p>
                  </div>
                </div>

                <div className="pv-why-point">
                  <span className="pv-wp-icon">⭐</span>
                  <div>
                    <strong>Verified Pro Badge Prestige</strong>
                    <p>Stand out from informal day-laborers with authenticated ratings and police clearance.</p>
                  </div>
                </div>

                <div className="pv-why-point">
                  <span className="pv-wp-icon">📱</span>
                  <div>
                    <strong>Direct Customer Chat</strong>
                    <p>Coordinate directions and job requirements through in-app live messaging.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TESTIMONIAL CARD */}
            <div className="pv-side-card pv-testimonial-card animated-shadow-aura">
              <div className="pv-tstars">⭐⭐⭐⭐⭐ 5.0</div>
              <p className="pv-tquote">
                &ldquo;Before MUX SERVICES, I had to wait in market addas hoping for electrical jobs. 
                Now I receive 4 to 6 verified doorstep service calls every day in Cantt and Bosan Road. 
                My monthly earnings exceed PKR 90,000!&rdquo;
              </p>
              <div className="pv-tauthor">
                <span className="pv-ta-avatar">🔧</span>
                <div>
                  <strong>Muhammad Rafiq</strong>
                  <span>Master Electrician • Multan Cantt</span>
                </div>
              </div>
            </div>

            {/* 24/7 HELPLINE CARD */}
            <div className="pv-side-card pv-helpline-side-card animated-shadow-aura">
              <span className="pv-hl-badge">24/7 PRO ONBOARDING DESK</span>
              <h4 className="pv-hl-num">061-652-MUX1</h4>
              <p className="pv-hl-sub">Multan Khidmat Desk: MDA Chowk &amp; Cantt</p>
              <a href="tel:03006896891" className="pv-hl-call-btn">
                <span>📞 Call Onboarding Support</span>
              </a>
            </div>

          </aside>
        </div>
      )}
    </div>
  )
}

export default ProviderVerification
