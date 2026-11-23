import { useState, useEffect, useRef } from 'react'
import './CallToActionSection.css'

function CallToActionSection({ setCurrentPage }) {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleObserver = (entries) => {
      entries.forEach((entry) => {
        // Only trigger when user actually arrives at this section in the viewport.
        // Resets when scrolling away so it plays freshly every time they scroll into it.
        if (entry.isIntersecting) {
          setIsInView(true)
        } else {
          setIsInView(false)
        }
      })
    }

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.28, // 28% of section must be visible inside viewport
      rootMargin: '-80px 0px -80px 0px' // Prevents premature triggering while still on sections above
    })

    const currentElem = sectionRef.current
    if (currentElem) {
      observer.observe(currentElem)
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem)
      }
    }
  }, [])

  const handleBookNowClick = () => {
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('services')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleViewProsClick = () => {
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('professionals')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const steps = [
    {
      stepNum: '01',
      title: 'Search & Choose Service',
      description: 'Browse our verified service categories — Electrician, Plumber, AC Repair, Painter, Carpenter, Cleaner, ya koi bhi category select karein.',
      tag: '30+ Categories Available',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      )
    },
    {
      stepNum: '02',
      title: 'Select Verified Expert',
      description: 'Technicians ki verified profiles, real customer reviews, price estimates, aur experience compare karke apna pasandeeda expert chunain.',
      tag: '100% Background Checked',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      )
    },
    {
      stepNum: '03',
      title: 'Doorstep Expert Service',
      description: 'Aapka chunida technician aapke scheduled time aur Multan address par mukammal tools ke sath pohnch kar high-quality kaam sar-anjaam deta hai.',
      tag: 'On-Time Doorstep Arrival',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      )
    },
    {
      stepNum: '04',
      title: 'Pay Fairly & Leave Review',
      description: 'Kaam mukammal hone aur tasalli ke baad agreed transparent price ada karein. Zero hidden charges aur direct customer ratings.',
      tag: 'Zero Hidden Charges',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
          <circle cx="6" cy="16" r="1.5"></circle>
        </svg>
      )
    }
  ]

  return (
    <section
      ref={sectionRef}
      className={`workflow-section ${isInView ? 'is-in-view' : 'is-out-view'}`}
      aria-label="How MUX SERVICES Works - Booking Workflow"
    >
      {/* Ambient background glowing elements */}
      <div className="wf-orb wf-orb-left" aria-hidden="true"></div>
      <div className="wf-orb wf-orb-right" aria-hidden="true"></div>

      <div className="container">
        {/* Header Area */}
        <div className="wf-header">
          <div className="wf-pill-badge wf-flow wf-flow-head">
            <span className="wf-pulse-dot"></span>
            <span>EASY 4-STEP BOOKING WORKFLOW</span>
          </div>

          <h2 className="wf-title wf-flow wf-flow-title">
            How It Works — <span className="highlight-cyan">Book Your Service in 4 Simple Steps</span>
          </h2>

          <p className="wf-subtitle wf-flow wf-flow-sub">
            Multan me certified aur verified home technicians book karna nihayat asan, tez, aur mukammal transparent hai.
            Bas in 4 steps ko follow karein aur tension-free service hasil karein:
          </p>
        </div>

        {/* 4 Steps Animated Cards Flow */}
        <div className="wf-steps-wrapper">
          {/* Connecting timeline beam between steps */}
          <div className="wf-timeline-track" aria-hidden="true">
            <div className="wf-timeline-glow"></div>
          </div>

          <div className="wf-steps-grid">
            {steps.map((step, index) => (
              <div
                key={step.stepNum}
                className={`wf-step-card wf-card-${index + 1}`}
              >
                <div className="wf-card-top">
                  <div className="wf-step-badge">
                    <span className="wf-step-num">{step.stepNum}</span>
                  </div>
                  <div className="wf-icon-box">
                    {step.icon}
                  </div>
                </div>

                <div className="wf-card-body">
                  <span className="wf-micro-tag">{step.tag}</span>
                  <h3 className="wf-step-title">{step.title}</h3>
                  <p className="wf-step-desc">{step.description}</p>
                </div>

                <div className="wf-card-glow-bar" aria-hidden="true"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons & Trust Highlights */}
        <div className="wf-footer-actions wf-flow wf-flow-actions">
          <div className="wf-buttons-row">
            <button
              type="button"
              className="wf-primary-btn"
              onClick={handleBookNowClick}
            >
              <span>Book a Service Now</span>
              <span className="btn-arrow">→</span>
            </button>

            <button
              type="button"
              className="wf-secondary-btn"
              onClick={handleViewProsClick}
            >
              View All Professionals
            </button>
          </div>

          <div className="wf-trust-badges">
            <div className="wf-trust-item">
              <span className="trust-check">✓</span>
              <span>100% Verified Multan Technicians</span>
            </div>
            <div className="wf-trust-item">
              <span className="trust-check">✓</span>
              <span>Transparent PKR Pricing</span>
            </div>
            <div className="wf-trust-item">
              <span className="trust-check">✓</span>
              <span>Doorstep Service Guaranteed</span>
            </div>
            <div className="wf-trust-item">
              <span className="trust-check">✓</span>
              <span>24/7 Support Desk</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToActionSection
