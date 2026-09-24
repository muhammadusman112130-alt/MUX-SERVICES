import { useState } from 'react'
import './ProviderVerification.css'

/* ─────────────────────────────────────────────
   DYNAMIC VERIFICATION SECTIONS PER PROFESSION
───────────────────────────────────────────── */

function HealthcareVerification() {
  return (
    <div className="pv-card">
      <div className="pv-section-header">
        <span className="pv-step-num">3</span>
        <h2 className="pv-section-title">Professional Industry Verification</h2>
        <span className="pv-auto-badge">PMDC / PMC Required</span>
      </div>
      <p className="pv-card-subtitle">Category specific compliance framework</p>

      <div className="pv-verification-banner">
        <span className="pv-ver-icon">🏥</span>
        <div>
          <p className="pv-ver-title">Healthcare Verification Protocol (PMDC/PMC)</p>
          <p className="pv-ver-desc">
            Doctors in Pakistan must hold an unexpired registration with PMDC. All submissions are
            verified against the Pakistan Medical &amp; Dental Registry system. Active prescribers and clinic privileges are verified.
          </p>
        </div>
      </div>

      <div className="pv-form-row">
        <div className="pv-form-group">
          <label className="pv-label">PMDC / PMC Registration No. *</label>
          <input className="pv-input" type="text" placeholder="e.g. PM420-P / 123456" />
        </div>
        <div className="pv-form-group">
          <label className="pv-label">Live Identity Confirmed</label>
          <input className="pv-input" type="text" placeholder="Auto-confirmed" disabled />
        </div>
        <div className="pv-form-group">
          <label className="pv-label">Primary Medical Degree *</label>
          <select className="pv-input pv-select">
            <option>MBBS – Bachelor of Medicine &amp; Surgery</option>
            <option>BDS – Bachelor of Dental Surgery</option>
            <option>MD – Doctor of Medicine</option>
          </select>
        </div>
      </div>

      <div className="pv-form-row">
        <div className="pv-form-group">
          <label className="pv-label">Medical College / University *</label>
          <input className="pv-input" type="text" placeholder="e.g. King Edward Medical Univ, Dow, Aga..." />
        </div>
        <div className="pv-form-group">
          <label className="pv-label">Year Graduation &amp; Hospital *</label>
          <input className="pv-input" type="text" placeholder="e.g. Mayo Hospital (2016 – 2019)" />
        </div>
      </div>

      <div className="pv-form-row">
        <div className="pv-form-group pv-full-width">
          <label className="pv-label">Current Hospital Affiliations or Clinic Address *</label>
          <input className="pv-input" type="text" placeholder="e.g. Shaukat Khanum Memorial / Services Hospital / Private OPD, Jail Road Lahore" />
        </div>
      </div>

      <div className="pv-upload-row">
        <div className="pv-upload-box">
          <label className="pv-label">PMC Registration Card<br /><span className="pv-upload-sub">Front &amp; Back PDF or JPG (Max 5MB)</span></label>
          <label className="pv-upload-btn">Choose File<input type="file" hidden /></label>
        </div>
        <div className="pv-upload-box">
          <label className="pv-label">Medical Degree / FCPS Transcript<br /><span className="pv-upload-sub">Shown on institutional letterhead</span></label>
          <label className="pv-upload-btn">Choose File<input type="file" hidden /></label>
        </div>
      </div>

      <div className="pv-oath-checkbox">
        <input type="checkbox" id="pmdc-oath" />
        <label htmlFor="pmdc-oath">
          <strong>QuackMedic Legal Declaration:</strong> I hereby solemnly certify that I maintain an active licence in good standing with
          PMDC with no pending sanctions, malpractice actions or adverse judgements issued to my Credential Panel Gate.
        </label>
      </div>
    </div>
  )
}

function HomeServicesVerification() {
  const [pathway, setPathway] = useState('diploma')

  return (
    <div className="pv-card">
      <div className="pv-section-header">
        <span className="pv-step-num">3</span>
        <h2 className="pv-section-title">Skilled Trades &amp; Vocational Verification</h2>
        <span className="pv-auto-badge">TEVTA / Apprenticeship</span>
      </div>
      <p className="pv-card-subtitle">TEVTA Diploma or Master Ustad Reference Pathway</p>

      {/* Pathway selector */}
      <div className="pv-pathway-label">Verification Pathway (تصدیق کا طریقہ منتخب کریں)</div>
      <div className="pv-pathway-row">
        <div
          className={`pv-pathway-card ${pathway === 'diploma' ? 'selected' : ''}`}
          onClick={() => setPathway('diploma')}
        >
          <div className="pv-pathway-radio">
            <span className={`pv-radio-dot ${pathway === 'diploma' ? 'active' : ''}`}></span>
            <strong>Pathway A: Technical Diploma</strong>
          </div>
          <p className="pv-pathway-desc">Certified via NAVTTC / TEVTA<br />Official state vocational diploma</p>
        </div>
        <div
          className={`pv-pathway-card ${pathway === 'ustad' ? 'selected' : ''}`}
          onClick={() => setPathway('ustad')}
        >
          <div className="pv-pathway-radio">
            <span className={`pv-radio-dot ${pathway === 'ustad' ? 'active' : ''}`}></span>
            <strong>Pathway B: Ustad &amp; Field Reference</strong>
          </div>
          <p className="pv-pathway-desc">نہ کوئی ڈپلومہ درکار، ماسٹر کی تصدیق شدہ<br />No diploma required, verified by master</p>
        </div>
      </div>

      <div className="pv-form-row">
        <div className="pv-form-group">
          <label className="pv-label">Trade Specialization *</label>
          <select className="pv-input pv-select">
            <option>Electrician (Three-Phase &amp; Solar Invert ▼</option>
            <option>Plumber (Residential &amp; Commercial)</option>
            <option>HVAC Technician</option>
            <option>Carpenter / Wood Works</option>
            <option>Welder / Fabricator</option>
            <option>Painter (Interior &amp; Exterior)</option>
          </select>
        </div>
        <div className="pv-form-group">
          <label className="pv-label">TEVTA / NAVTTC Certificate Registration No.</label>
          <input className="pv-input" type="text" placeholder="e.g. TEVTA-LHR-2021-9812" />
        </div>
      </div>

      {/* Upload */}
      <div className="pv-upload-solo">
        <div className="pv-upload-icon-box">📄</div>
        <div>
          <p className="pv-label">Upload TEVTA / Technical Institute Diploma</p>
          <p className="pv-upload-sub">Scanned copy of course diploma or marks sheet</p>
          <label className="pv-upload-btn" style={{marginTop:'0.5rem'}}>
            Choose File
            <input type="file" hidden />
          </label>
        </div>
      </div>

      {/* Safety checklist */}
      <div className="pv-safety-box">
        <p className="pv-safety-title">Safety Equipment &amp; Kit Inventory</p>
        <div className="pv-safety-grid">
          <label className="pv-check-item">
            <input type="checkbox" defaultChecked /> Owns professional insulated tools &amp; digital multimeter
          </label>
          <label className="pv-check-item">
            <input type="checkbox" defaultChecked /> Owns safety harness, helmet &amp; rubberized safety shoes
          </label>
        </div>
      </div>
    </div>
  )
}

function ITVerification() {
  return (
    <div className="pv-card">
      <div className="pv-section-header">
        <span className="pv-step-num">3</span>
        <h2 className="pv-section-title">IT, Digital &amp; Software Verification</h2>
        <span className="pv-auto-badge">HEC / Tech Portfolios</span>
      </div>
      <p className="pv-card-subtitle">Higher Education &amp; Shipped Product Portfolios</p>

      {/* Portfolio banner */}
      <div className="pv-verification-banner it-banner">
        <span className="pv-ver-icon">💻</span>
        <div>
          <p className="pv-ver-title">Digital Portfolio &amp; Higher Education Verification</p>
          <p className="pv-ver-desc">
            High-level IT contracts require verifiable proof of past shipped software, design repositories, or HEC
            recognised computer science/media degrees.
          </p>
        </div>
      </div>

      <div className="pv-form-row">
        <div className="pv-form-group">
          <label className="pv-label">University Degree (HEC Recognized?) *</label>
          <input className="pv-input" type="text" placeholder="e.g. BS Computer Science (FAST NUCES)" />
        </div>
        <div className="pv-form-group">
          <label className="pv-label">Portfolio / Github / Dribbble / Behance URL *</label>
          <input className="pv-input" type="text" placeholder="https://github.com/yourhandle or behance..." />
        </div>
      </div>

      <div className="pv-form-row">
        <div className="pv-form-group pv-full-width">
          <label className="pv-label">Primary Skills &amp; Tech Stack Tags</label>
          <input className="pv-input" type="text" placeholder="React.js, Node.js, Python, Figma, TailwindCSS, AWS" />
        </div>
      </div>

      {/* Upload row — 2 uploads */}
      <div className="pv-upload-row">
        <div className="pv-upload-box">
          <label className="pv-label">Degree / Transcript / Certificate<br /><span className="pv-upload-sub">HEC recognized or IBCC attested (PDF/JPG)</span></label>
          <label className="pv-upload-btn">Choose File<input type="file" hidden /></label>
        </div>
        <div className="pv-upload-box">
          <label className="pv-label">Portfolio Screenshot / Project Proof<br /><span className="pv-upload-sub">Up to 3 screenshots of shipped work (PNG/PDF)</span></label>
          <label className="pv-upload-btn">Choose File<input type="file" hidden /></label>
        </div>
      </div>

      <div className="pv-oath-checkbox">
        <input type="checkbox" id="it-oath" />
        <label htmlFor="it-oath">
          <strong>Digital Integrity Declaration:</strong> I confirm that all portfolio links, project descriptions, and educational credentials
          submitted are authentic and belong to me. I authorize Service HUB to verify these against public repositories and HEC records.
        </label>
      </div>
    </div>
  )
}

function AutoVerification() {
  return (
    <div className="pv-card">
      <div className="pv-section-header">
        <span className="pv-step-num">3</span>
        <h2 className="pv-section-title">Auto &amp; Heavy Appliance Verification</h2>
        <span className="pv-auto-badge">NAVTTC / Workshop Reg.</span>
      </div>
      <p className="pv-card-subtitle">Mechanical trade licence &amp; workshop registration</p>

      <div className="pv-verification-banner">
        <span className="pv-ver-icon">🚗</span>
        <div>
          <p className="pv-ver-title">Auto Mechanic &amp; Appliance Technician Protocol</p>
          <p className="pv-ver-desc">
            All auto mechanics and appliance technicians must provide a workshop registration certificate or
            NAVTTC/TEVTA trade qualification with at least 2 years of documented hands-on experience.
          </p>
        </div>
      </div>

      <div className="pv-form-row">
        <div className="pv-form-group">
          <label className="pv-label">Auto Trade Specialization *</label>
          <select className="pv-input pv-select">
            <option>Auto Mechanic (Engine &amp; Transmission)</option>
            <option>Auto Electrician</option>
            <option>AC &amp; Cooling Systems</option>
            <option>Heavy Appliance Repair (AC, Fridge, Washing)</option>
            <option>Tyre &amp; Alignment Specialist</option>
          </select>
        </div>
        <div className="pv-form-group">
          <label className="pv-label">Workshop / Garage Registration No.</label>
          <input className="pv-input" type="text" placeholder="e.g. WRK-LHR-2020-4521" />
        </div>
      </div>

      <div className="pv-form-row">
        <div className="pv-form-group">
          <label className="pv-label">Years of Experience *</label>
          <select className="pv-input pv-select">
            <option>2 – 5 Years</option>
            <option>5 – 10 Years</option>
            <option>10+ Years</option>
          </select>
        </div>
        <div className="pv-form-group">
          <label className="pv-label">Workshop / Business Address</label>
          <input className="pv-input" type="text" placeholder="Shop #5, Auto Market, Shahdara Lahore" />
        </div>
      </div>

      <div className="pv-upload-row">
        <div className="pv-upload-box">
          <label className="pv-label">NAVTTC / TEVTA Auto Trade Certificate<br /><span className="pv-upload-sub">Scanned copy (PDF or JPG)</span></label>
          <label className="pv-upload-btn">Choose File<input type="file" hidden /></label>
        </div>
        <div className="pv-upload-box">
          <label className="pv-label">Workshop Registration / NTN Certificate<br /><span className="pv-upload-sub">Issued by local body or FBR</span></label>
          <label className="pv-upload-btn">Choose File<input type="file" hidden /></label>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */

function ProviderVerification({ setCurrentPage }) {
  const [selectedProfession, setSelectedProfession] = useState('healthcare')
  const [agreedToOath, setAgreedToOath] = useState(false)

  const professions = [
    { id: 'healthcare', icon: '🏥', title: 'Healthcare & Medical', desc: 'Doctors, Dentists, Therapists / Privates' },
    { id: 'home', icon: '🏠', title: 'Home Services & Trades', desc: 'Electricians, Plumbers, HVAC, Carpenters' },
    { id: 'it', icon: '💻', title: 'IT, Digital & Creative', desc: 'Developers, UI/UX, SEO, Multimedia' },
    { id: 'auto', icon: '🚗', title: 'Auto & Heavy Appliance', desc: 'Auto mechanics, Industrial type' },
  ]

  /* Render the correct Step-3 form based on selected profession */
  const renderProfessionForm = () => {
    switch (selectedProfession) {
      case 'healthcare': return <HealthcareVerification />
      case 'home':       return <HomeServicesVerification />
      case 'it':         return <ITVerification />
      case 'auto':       return <AutoVerification />
      default:           return <HealthcareVerification />
    }
  }

  return (
    <div className="pv-wrapper">
      <nav className="provider-navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <img src="/src/Public/Web-logo.png" alt="Logo" className="navbar-logo" />
          </div>
          <div className="navbar-center">
            <button type="button" onClick={() => setCurrentPage && setCurrentPage('home')} className="nav-link">Home</button>
            <button type="button" onClick={() => setCurrentPage && setCurrentPage('Messages')} className="nav-link">Messages</button>
            <button type="button" onClick={() => setCurrentPage && setCurrentPage('about')} className="nav-link">About</button>
            <button type="button" onClick={() => setCurrentPage && setCurrentPage('contact')} className="nav-link">Contact</button>
          </div>
        </div>
      </nav>

      {/* ── TOP BREADCRUMB ── */}
      <div className="pv-breadcrumb">
        <span>🏠 Home</span>
        <span className="pv-sep">›</span>
        <span>Partner Network</span>
        <span className="pv-sep">›</span>
        <span className="pv-active">Provider Verification &amp; Registration</span>
      </div>

      {/* ── HERO BANNER ── */}
      <div className="pv-hero">
        <div className="pv-hero-badge">✅ VERIFIED PRO ONBOARDING GATEWAY</div>
        <h1 className="pv-hero-title">
          Join Service HUB as an Elite<br />Verified Pro
        </h1>
        <p className="pv-hero-subtitle">سروس ہب پر مصدق پارٹنر بنیں</p>
        <p className="pv-hero-desc">
          Select your profession below. Our dynamic verification engine automatically
          adapts credential standards — from PMDC licenses for doctors to
          TEVTA/Ustad references for skilled trade craftsmen.
        </p>

        <div className="pv-stats-row">
          <div className="pv-stat">
            <span className="pv-stat-icon">✓</span>
            <div>
              <p className="pv-stat-val">100% Verified</p>
              <p className="pv-stat-sub">NADRA &amp; Legal Backed</p>
            </div>
          </div>
          <div className="pv-stat">
            <span className="pv-stat-icon">⏱</span>
            <div>
              <p className="pv-stat-val">24-48 hrs</p>
              <p className="pv-stat-sub">Fast Review Cycle</p>
            </div>
          </div>
          <div className="pv-stat">
            <span className="pv-stat-icon">💰</span>
            <div>
              <p className="pv-stat-val">PKR 500k</p>
              <p className="pv-stat-sub">Accelerated Earner</p>
            </div>
          </div>
          <div className="pv-stat">
            <span className="pv-stat-icon">🎯</span>
            <div>
              <p className="pv-stat-val">0% Commission</p>
              <p className="pv-stat-sub">On First 5 Orders</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="pv-main-grid">

        {/* ═══════ LEFT COLUMN ═══════ */}
        <div className="pv-left">

          {/* ── STEP 1: Profession ── */}
          <div className="pv-section-header">
            <span className="pv-step-num">1</span>
            <h2 className="pv-section-title">Select Your Professional Industry / پیشہ منتخب کریں</h2>
            <span className="pv-auto-badge">✓ Credential fields adjust automatically</span>
          </div>

          <div className="pv-profession-grid">
            {professions.map(p => (
              <div
                key={p.id}
                className={`pv-profession-card ${selectedProfession === p.id ? 'selected' : ''}`}
                onClick={() => setSelectedProfession(p.id)}
              >
                <div className="pv-prof-icon">{p.icon}</div>
                <p className="pv-prof-title">{p.title}</p>
                <p className="pv-prof-desc">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* ── STEP 2: Identity (common for all) ── */}
          <div className="pv-card">
            <div className="pv-section-header">
              <span className="pv-step-num">2</span>
              <h2 className="pv-section-title">Identity &amp; Biometric Details</h2>
              <span className="pv-auto-badge">🆔 256-Bit Encrypted</span>
            </div>
            <p className="pv-card-subtitle">Standard NADRA-aligned identity parameters</p>

            <div className="pv-form-row">
              <div className="pv-form-group">
                <label className="pv-label">Full Name (as on CNIC) *</label>
                <input className="pv-input" type="text" placeholder="Dr. Muhammad Hamid Khan" />
              </div>
              <div className="pv-form-group">
                <label className="pv-label">Mobile Number (WhatsApp Enabled) *</label>
                <input className="pv-input" type="text" placeholder="+92 3001234567" />
              </div>
            </div>

            <div className="pv-form-row">
              <div className="pv-form-group">
                <label className="pv-label">Professional Email Address *</label>
                <input className="pv-input" type="email" placeholder="m.haris@healthpro.pk" />
              </div>
              <div className="pv-form-group">
                <label className="pv-label">Base City of Operation *</label>
                <select className="pv-input pv-select">
                  <option>Lahore (All Sectors &amp; Cantt)</option>
                  <option>Karachi</option>
                  <option>Islamabad / Rawalpindi</option>
                  <option>Multan</option>
                </select>
              </div>
            </div>

            <div className="pv-form-row">
              <div className="pv-form-group pv-full-width">
                <label className="pv-label">13-Digit National Identity Core (CNIC) / قومی شناختی کارڈ نمبر *</label>
                <input className="pv-input" type="text" placeholder="35201-1234567-1" />
                <p className="pv-hint">✓ NADRA VeriSys Verified</p>
                <p className="pv-note">Identity checks run automatically in the background via NADRA Verisys gateway.</p>
              </div>
            </div>
          </div>

          {/* ── STEP 3: Dynamic per profession ── */}
          {renderProfessionForm()}

          {/* ── STEP 4: Police Clearance (common) ── */}
          <div className="pv-card">
            <div className="pv-section-header">
              <span className="pv-step-num">4</span>
              <h2 className="pv-section-title">Police Clearance &amp; Legal Oath</h2>
              <p className="pv-section-urdu">قانونی حلف اور پولیس کی منظوری</p>
            </div>

            <div className="pv-upload-row">
              <div className="pv-upload-box">
                <label className="pv-label">Punjab Police Khidmat Markaz<br />Token / Character Card<br /><span className="pv-upload-sub">Attach Scan / Verification Slip</span></label>
                <label className="pv-upload-btn">Choose File<input type="file" hidden /></label>
              </div>
              <div className="pv-upload-box">
                <label className="pv-label">Upload Certificate / Slip</label>
                <label className="pv-upload-btn">Choose File<input type="file" hidden /></label>
              </div>
            </div>

            <div className="pv-oath-block">
              <input
                type="checkbox"
                id="criminal-oath"
                checked={agreedToOath}
                onChange={() => setAgreedToOath(!agreedToOath)}
              />
              <label htmlFor="criminal-oath">
                <strong>Solemn Oath &amp; Consent for Criminal Background Verification / حلف نامہ</strong><br />
                I solemnly swear under the laws of the Islamic Republic of Pakistan that I do not possess any
                criminal convictions or active First Information Reports (FIRs) against any person. I authorize
                Service Hub to contact third-party licensed/registered authorities with criminal justice departments.
              </label>
            </div>
          </div>

          {/* ── STEP 5: Payout ── */}
          <div className="pv-card">
            <div className="pv-section-header">
              <span className="pv-step-num">5</span>
              <h2 className="pv-section-title">Direct Payout Account (Raast / JazzCash)</h2>
              <p className="pv-section-urdu">Immediate payments for all customer bookings</p>
            </div>

            <div className="pv-form-row">
              <div className="pv-form-group">
                <label className="pv-label">Payment Channel</label>
                <select className="pv-input pv-select">
                  <option>State Bank Raast IID (Phone/BAF ▼)</option>
                  <option>JazzCash</option>
                  <option>EasyPaisa</option>
                </select>
              </div>
              <div className="pv-form-group">
                <label className="pv-label">Raast ID / Account Number / IBAN</label>
                <input className="pv-input" type="text" placeholder="PK00MZ900000000000000 or 0300-" />
              </div>
            </div>
          </div>

          {/* ── SUBMIT ── */}
          <button
            className="pv-submit-btn"
            onClick={() => setCurrentPage && setCurrentPage('provider-login')}
          >
            ✅ Submit for Verified Partner Badge (24-48h Approval)
          </button>
          <p className="pv-submit-note">
            Upon approval, your verified partner badge and dispatch access will become immediately active online.
          </p>
        </div>

        {/* ═══════ RIGHT COLUMN ═══════ */}
        <div className="pv-right">

          <div className="pv-sla-card">
            <div className="pv-sla-header">
              <span className="pv-sla-dot"></span>
              <span className="pv-sla-title">VERIFICATION SLA</span>
            </div>
            <h3 className="pv-sla-time">24 – 48 Hours</h3>
            <p className="pv-sla-desc">Average turnaround time for credential inspection and first dispatch access.</p>
            <div className="pv-sla-rows">
              <div className="pv-sla-row">
                <span>Background Checks to NADRA/PMDC</span>
                <span className="pv-sla-hrs">24 Hours</span>
              </div>
              <div className="pv-sla-row">
                <span>Payout / Reference Verification</span>
                <span className="pv-sla-hrs">24 Hours</span>
              </div>
              <div className="pv-sla-row">
                <span>Account Live &amp; Lead submission</span>
                <span className="pv-sla-hrs">Rev 2</span>
              </div>
            </div>
          </div>

          <div className="pv-hero-img">
            <div className="pv-img-placeholder">
              <span>👨‍⚕️</span>
              <p>Verified Pro</p>
            </div>
          </div>

          <div className="pv-rating-card">
            <div className="pv-stars">⭐⭐⭐⭐⭐</div>
            <p className="pv-rating-val">4.92 / 5.0</p>
            <p className="pv-rating-count">Join Over 12,000+ Verified Pros</p>
            <p className="pv-rating-desc">
              "Service Hub transformed me as an Khidmat Doctor from unverified dispenser. Utilising Verified
              Pro earning moved our family collectively. I'm strongly on my OWN."
            </p>
            <p className="pv-reviewer">— Dr. Khalid Mehmood, Consultant Physician</p>
          </div>

          <div className="pv-why-card">
            <h4 className="pv-why-title">Why Professionals Choose Service HUB</h4>
            <div className="pv-why-item">
              <span className="pv-why-icon">✅</span>
              <div>
                <p className="pv-why-head">PKR 500,000 Income Guarantee</p>
                <p className="pv-why-sub">Guaranteed earnings for your first 3 months on the platform</p>
              </div>
            </div>
            <div className="pv-why-item">
              <span className="pv-why-icon">🔒</span>
              <div>
                <p className="pv-why-head">Escrow-Backed Work</p>
                <p className="pv-why-sub">We hold 100% earnings for your life inside of your membership</p>
              </div>
            </div>
            <div className="pv-why-item">
              <span className="pv-why-icon">📱</span>
              <div>
                <p className="pv-why-head">24/7 Technician Account</p>
                <p className="pv-why-sub">24/7 coverage for all coverage for all for your business inside</p>
              </div>
            </div>
          </div>

          <div className="pv-helpline-card">
            <p className="pv-helpline-label">✅ Partner Verification Helpline</p>
            <p className="pv-helpline-num">042-111-HUB-PRO</p>
            <p className="pv-helpline-time">Mon – Sat 08 AM – 8:00 PM</p>
          </div>

          <div className="pv-app-card">
            <span className="pv-app-icon">📱</span>
            <div>
              <p className="pv-app-title">Service HUB Pro App</p>
              <p className="pv-app-desc">
                Access real-time job dispatches, navigate via Bykea, Al-maps, and manage daily client
                info in one place.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProviderVerification
