import { useState, useEffect, useRef } from 'react'
import './About.css'
import aboutTeamImg from '../assets/about-team-mission.webp'
import aboutCraftImg from '../assets/about-service-craft.webp'

function About({ setCurrentPage }) {
  const [valuesInView, setValuesInView] = useState(false)
  const valuesSectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setValuesInView(true)
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    )

    if (valuesSectionRef.current) {
      observer.observe(valuesSectionRef.current)
    }

    return () => {
      if (valuesSectionRef.current) {
        observer.unobserve(valuesSectionRef.current)
      }
    }
  }, [])

  const coreValues = [
    {
      icon: '🛡️',
      title: 'Absolute Trust & Security',
      description:
        'We strictly screen every technician through National Identity Card (CNIC) authentication, criminal background clearance, and certified trade assessment before they ever step into your home. Your family’s personal privacy, property safety, and peace of mind are non-negotiable fundamentals of our service ecosystem.'
    },
    {
      icon: '🏆',
      title: 'Engineering Excellence',
      description:
        'We refuse temporary quick fixes or unreliable patch-ups. Every technician on MUX Services operates specialized digital testing tools, high-precision multimeters, and acoustic leak detectors, ensuring that root causes are solved permanently with manufacturer-approved spare components and certified craftsmanship.'
    },
    {
      icon: '🤝',
      title: 'Empowering Local Craftsmen',
      description:
        'We believe in elevating Multan’s hardworking technical artisans. By removing exploitative intermediaries and informal day-labor uncertainty, we provide technicians with verified digital identity, fair living income, performance merit, and continuous safety training across every neighborhood.'
    },
    {
      icon: '⏱️',
      title: 'Punctual Doorstep Arrival',
      description:
        'Your time is invaluable. Our intelligent locality dispatch routes technicians across Cantt, Bosan Road, Gulgasht, Shah Rukn-e-Alam, and surrounding sectors to guarantee prompt arrival within 30 minutes, fully geared with the exact specialized tools needed for instant diagnosis and execution.'
    }
  ]

  const handleServicesClick = () => {
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('services')
    }
  }

  const handleJoinProClick = () => {
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('provider-login')
    }
  }

  return (
    <div className="about-page">
      {/* ── HERO SECTION ── */}
      <section className="about-hero">
        <div className="hero-content">
          <div className="about-badge">
            <span className="about-badge-dot"></span>
            <span>MULTAN'S PREMIER VERIFIED SERVICE PLATFORM</span>
          </div>

          <h1 className="hero-title">
            Multan’s Premier Network For{' '}
            <span className="about-title-mint-shine">Certified Home &amp; Technical Craftsmanship.</span>
          </h1>

          <p className="hero-description">
            MUX SERVICES was founded in Multan with a clear vision: to eliminate the stress, uncertainty, and safety concerns of traditional home maintenance. By creating a strictly vetted digital service ecosystem, we bridge the gap between Multan’s most skilled independent technicians and households seeking dependable, transparent doorstep care. Every service booked through our platform is backed by thorough background screening, guaranteed punctual arrival, and fair PKR pricing.
          </p>

          <div className="hero-actions">
            <button type="button" className="hero-primary-btn" onClick={handleServicesClick}>
              Explore Verified Services →
            </button>
            <button type="button" className="hero-secondary-btn" onClick={handleJoinProClick}>
              Join as a Technician
            </button>
          </div>

          {/* Quick Hero Proof Stats */}
          <div className="hero-proof-strip">
            <div className="proof-item">
              <span className="proof-num">12,500+</span>
              <span className="proof-lbl">Jobs Completed</span>
            </div>
            <div className="proof-div"></div>
            <div className="proof-item">
              <span className="proof-num">4.93 / 5</span>
              <span className="proof-lbl">Customer Rating</span>
            </div>
            <div className="proof-div"></div>
            <div className="proof-item">
              <span className="proof-num">100%</span>
              <span className="proof-lbl">Police Vetted</span>
            </div>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="about-image-card main-team-card">
            <img
              src={aboutTeamImg}
              alt="MUX Services Multan Technical Operations Team"
              className="about-feature-img"
            />
            <div className="about-img-overlay">
              <span className="about-img-badge">
                👥 Multan Operations &amp; Certified Technical Leads
              </span>
            </div>
            <div className="floating-trust-pill pill-top-right">
              <span className="pill-pulse"></span>
              <span>⭐ Multan’s #1 Verified Network</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPLETE SERVICE ECOSYSTEM SECTION (Image on Left, Text & Stats on Right) ── */}
      <section className="har-service-section">
        <div className="section-content">
          {/* Craft Image on Left */}
          <div className="images-grid">
            <div className="about-image-card craft-card">
              <img
                src={aboutCraftImg}
                alt="Doorstep Technical Craftsmanship and Diagnostic Tools"
                className="about-feature-img"
              />
              <div className="about-img-overlay">
                <span className="about-img-badge">
                  🔧 Precision Digital Diagnostic Equipment &amp; Genuine Spares
                </span>
              </div>
              <div className="floating-trust-pill pill-bottom-left">
                <span>✓ 100% Satisfaction Guarantee</span>
              </div>
            </div>
          </div>

          {/* Text & Stats on Right */}
          <div className="text-content">
            <div className="why-choose-badge">
              <span className="why-choose-dot"></span>
              <span>WHY CHOOSE MUX SERVICES</span>
            </div>
            <h2 className="section-title">Complete Home &amp; Technical Solutions In One Trusted Hub</h2>
            <p className="section-description">
              From emergency midnight electrical short-circuits and complex inverter PCB troubleshooting to concealed plumbing leak detection, carpentry fittings, and sanitizing deep cleans — MUX SERVICES centralizes every residential and commercial maintenance solution into a single, unified digital experience. We remove the uncertainty of unverified street contractors and deliver factory-grade doorstep craftsmanship with standard safety protocols across all Multan localities.
            </p>

            <div className="about-stats-grid">
              <div className="about-stat-box">
                <span className="about-stat-number">12,500+</span>
                <span className="about-stat-label">Verified Jobs Completed</span>
              </div>
              <div className="about-stat-box">
                <span className="about-stat-number">&lt; 30 Mins</span>
                <span className="about-stat-label">Average Multan Arrival</span>
              </div>
              <div className="about-stat-box">
                <span className="about-stat-number">99.2%</span>
                <span className="about-stat-label">On-Time Performance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES SECTION (Scroll-Triggered Animated Reveal) ── */}
      <section
        ref={valuesSectionRef}
        className={`core-values-section ${valuesInView ? 'values-in-view' : 'values-out-view'}`}
      >
        <div className="values-header">
          <h2 className="values-title">Core Values That Guide Every Doorstep Visit</h2>
          <p className="values-subtitle">
            The principles upholding customer peace of mind and technician dignity across Multan.
          </p>
        </div>

        <div className="values-grid">
          {coreValues.map((value, index) => (
            <div key={index} className={`value-card anim-card-${index + 1}`}>
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAIR PRICING & TRANSPARENCY SECTION (Full-Width Justified Narrative) ── */}
      <section className="fair-pricing-section">
        <div className="pricing-content full-narrative">
          <div className="pricing-header-center">
            <span className="pricing-label">TRANSPARENCY GUARANTEED</span>
            <h2 className="pricing-title">Fair Pricing Through Upfront Rates &amp; Agreed Estimates</h2>
          </div>

          <div className="pricing-narrative-block">
            <p className="pricing-description justified-narrative">
              Say goodbye to unexpected add-ons, erratic door-to-door overcharging, and arbitrary street contractor bargaining. MUX SERVICES was established to bring radical pricing transparency to Multan’s home maintenance sector. Traditional unverified labor in our city frequently relies on subjective verbal estimates that escalate once work begins, leaving homeowners unprotected and financially stressed. We replace this broken dynamic with an institutional pricing model where every repair requirement receives a clearly defined scope, upfront labor standards, and itemized component breakdowns before a single tool is lifted.
            </p>
            <p className="pricing-description justified-narrative">
              Through our transparent rate architecture, homeowners across Cantt, Bosan Road, Gulgasht, Shah Rukn-e-Alam, Model Town, and all surrounding Multan localities can book certified electricians, plumbers, AC engineers, and home specialists with absolute financial certainty. Every quote provided is an agreed estimate based on standardized diagnostic benchmarks rather than guesswork. Technicians carry verified digital rate cards, provide genuine vendor receipts for all replacement parts, and ensure that every service is backed by our certified workmanship guarantee with zero hidden doorstep surcharges.
            </p>
          </div>

          <div className="pricing-guarantees-grid">
            <div className="pricing-guarantee-card">
              <span className="feat-check">✓</span>
              <div className="guarantee-text">
                <h4 className="guarantee-title">Direct Upfront Rates</h4>
                <p className="guarantee-desc">Standardized labor and diagnostic pricing with zero unexpected doorstep surcharges.</p>
              </div>
            </div>

            <div className="pricing-guarantee-card">
              <span className="feat-check">✓</span>
              <div className="guarantee-text">
                <h4 className="guarantee-title">Genuine Spare Parts</h4>
                <p className="guarantee-desc">Direct manufacturer-approved parts backed by transparent, verified vendor receipts.</p>
              </div>
            </div>

            <div className="pricing-guarantee-card">
              <span className="feat-check">✓</span>
              <div className="guarantee-text">
                <h4 className="guarantee-title">Workmanship Guarantee</h4>
                <p className="guarantee-desc">Free re-inspection and complete resolution coverage on every verified doorstep service.</p>
              </div>
            </div>

            <div className="pricing-guarantee-card">
              <span className="feat-check">✓</span>
              <div className="guarantee-text">
                <h4 className="guarantee-title">Digital Proof &amp; Invoices</h4>
                <p className="guarantee-desc">Itemized digital invoices delivered directly to your device upon job sign-off.</p>
              </div>
            </div>
          </div>

          <div className="pricing-action-wrap">
            <button
              type="button"
              className="pricing-cta-btn"
              onClick={handleServicesClick}
            >
              Explore Verified Services &amp; Upfront Rates →
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
