import { useState, useEffect, useRef } from 'react'
import './CategorySection.css'
import homeIcon from '../Public/home icon.jpg'
import techIcon from '../Public/tech icon.avif'
import homeSideImg from '../Public/home cleaning.png'
import techSideImg from '../Public/tech-data.jpg'
import doctorSideImg from '../Public/doctor-ai.png'
import eduSideImg from '../Public/education-learning.jpg'

function CategorySection({ setCurrentPage }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const sliderRef = useRef(null)

  // Strictly the 4 requested services with dedicated side images
  const categories = [
    {
      id: 'home',
      name: 'Home Services',
      headline: 'Complete Home & Repair Solutions',
      tagline: 'Electricians, Plumbers, Carpenters, AC & Cleaners — verified & trusted at your doorstep',
      badge: '⚡ 1,500+ Verified Pros',
      liveStatus: 'Instant Booking',
      iconType: 'image',
      iconSrc: homeIcon,
      sideImage: homeSideImg,
      sideImageAlt: 'Home Services Expert Living Care',
      sideBadge: '🏠 Home Care Pro',
      themeClass: 'theme-home',
      count: '1,500+',
      rating: '4.9',
      reviews: '3,420+',
      priceRange: 'From $19/hr',
      query: 'Home Services',
      skills: ['Electrician', 'Plumber', 'Carpenter', 'AC & HVAC', 'Home Cleaning', 'Gardener'],
      features: [
        '⚡ 24/7 Emergency response under 30 mins',
        '🛡️ Certified & police-verified handymen',
        '💰 Upfront pricing with price offer guarantee'
      ]
    },
    {
      id: 'tech',
      name: 'Tech Services',
      headline: 'Next-Gen Technology & Digital Experts',
      tagline: 'Web Developers, Mobile Apps, UI/UX, SEO & IT Hardware — elite digital talent',
      badge: '💻 850+ Digital Experts',
      liveStatus: 'Top Rated 2026',
      iconType: 'image',
      iconSrc: techIcon,
      sideImage: techSideImg,
      sideImageAlt: 'Technology and Data Solutions',
      sideBadge: '💻 AI & Cloud',
      themeClass: 'theme-tech',
      count: '850+',
      rating: '4.95',
      reviews: '2,890+',
      priceRange: 'From $35/hr',
      query: 'Tech',
      skills: ['Web Development', 'Mobile Apps', 'UI/UX Design', 'Cyber Security', 'IT Support', 'SEO'],
      features: [
        '🚀 Modern stack: React, Node, Flutter & AI',
        '🔒 NDA protection & secure milestone payments',
        '⚡ Fast turnaround with high code quality'
      ]
    },
    {
      id: 'doctor',
      name: 'Doctor Services',
      headline: 'Certified Healthcare & Medical Consultation',
      tagline: 'PMDC Verified Doctors, Physiotherapists & Nutritionists for clinic & online visits',
      badge: '🩺 PMDC Verified Doctors',
      liveStatus: 'Online & Home Visit',
      iconType: 'doctor_svg',
      sideImage: doctorSideImg,
      sideImageAlt: 'Medical AI and Healthcare Doctor Consultation',
      sideBadge: '🩺 Health & Care',
      themeClass: 'theme-doctor',
      count: '620+',
      rating: '4.98',
      reviews: '1,980+',
      priceRange: 'From $25/consult',
      query: 'Doctor Consult',
      skills: ['General Physician', 'Cardiologist', 'Physiotherapy', 'Nutritionist', 'Child Specialist'],
      features: [
        '✅ Verified PMDC certified practitioners',
        '💊 Digital prescriptions & lab report review',
        '🏥 Home visit & private audio/video consultation'
      ]
    },
    {
      id: 'education',
      name: 'Education',
      headline: 'Premier Tutors & Academic Mentors',
      tagline: 'Expert Home Tutors, O/A Levels, STEM, Coding & Language Specialists for all grades',
      badge: '🎓 950+ Certified Tutors',
      liveStatus: 'Demo Class Free',
      iconType: 'edu_svg',
      sideImage: eduSideImg,
      sideImageAlt: 'Online Education and Tutoring',
      sideBadge: '🎓 Learning Pro',
      themeClass: 'theme-education',
      count: '950+',
      rating: '4.88',
      reviews: '1,640+',
      priceRange: 'From $20/hr',
      query: 'Education',
      skills: ['Mathematics', 'Physics & Chem', 'English & O/A Levels', 'Coding & STEM', 'Exam Prep'],
      features: [
        '📚 1-on-1 personalized learning plans',
        '🏆 Top university alumni & certified teachers',
        '🎯 Free trial demo class available'
      ]
    }
  ]

  const totalSlides = categories.length

  // Ultra-smooth auto-slide with zero lag
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 4200)

    return () => clearInterval(interval)
  }, [isPaused, totalSlides])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (idx) => {
    setCurrentIndex(idx)
  }

  const handleServiceSelect = (category) => {
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('services', category.query || category.name)
    }
  }

  // Mobile swipe support
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  return (
    <section 
      className="category-section" 
      id="services"
      aria-label="Top Services"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        {/* Section Header */}
        <div className="category-header-wrap">
          <div className="category-pill-badge">
            <span className="pill-dot"></span>
            <span>Premier Verified Categories</span>
          </div>
          <h2 className="section-title">Top Services</h2>
          <p className="section-subtitle">
            Choose from our top-rated, certified service categories with transparent pricing and verified experts
          </p>

          {/* Quick Category Filter Tabs */}
          <div className="category-quick-nav">
            {categories.map((cat, idx) => (
              <button
                key={cat.id}
                type="button"
                className={`quick-nav-btn ${cat.themeClass} ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(idx)}
              >
                <span className="quick-nav-icon">
                  {cat.id === 'home' && '🏠'}
                  {cat.id === 'tech' && '💻'}
                  {cat.id === 'doctor' && '🩺'}
                  {cat.id === 'education' && '🎓'}
                </span>
                <span className="quick-nav-label">{cat.name}</span>
                {idx === currentIndex && <span className="quick-nav-glow"></span>}
              </button>
            ))}
          </div>
        </div>

        {/* ── Animated Slider Wrapper ── */}
        <div 
          className="slider-showcase-container"
          ref={sliderRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Navigation Arrows */}
          <button 
            type="button"
            className="slider-control-btn prev-btn" 
            onClick={prevSlide}
            aria-label="Previous Service"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button 
            type="button"
            className="slider-control-btn next-btn" 
            onClick={nextSlide}
            aria-label="Next Service"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Slider Track (GPU accelerated for zero lag) */}
          <div className="slider-viewport">
            <div 
              className="slider-track"
              style={{
                transform: `translate3d(-${currentIndex * 100}%, 0, 0)`
              }}
            >
              {categories.map((cat, index) => {
                const isActive = index === currentIndex
                return (
                  <div 
                    key={cat.id} 
                    className={`slider-slide ${isActive ? 'slide-active' : ''}`}
                  >
                    <div 
                      className={`top-service-card ${cat.themeClass}`}
                      onClick={() => handleServiceSelect(cat)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleServiceSelect(cat) }}
                    >
                      {/* Ambient background glow element */}
                      <div className="card-ambient-glow"></div>

                      <div className="card-top-row">
                        <div className="card-badge-tag">
                          <span className="badge-pulse-indicator"></span>
                          <span>{cat.badge}</span>
                        </div>
                        <div className="card-live-status">
                          <span className="live-ring"></span>
                          <span>{cat.liveStatus}</span>
                        </div>
                      </div>

                      {/* Card Content Split: Left Text + Right Visual Side Image */}
                      <div className="card-split-layout">
                        {/* Left Info Column */}
                        <div className="card-info-col">
                          <div className="card-main-body">
                            {/* Icon Box */}
                            <div className="card-icon-wrapper">
                              {cat.iconType === 'image' ? (
                                <img src={cat.iconSrc} alt={cat.name} className="card-img-icon" />
                              ) : cat.iconType === 'doctor_svg' ? (
                                <div className="card-svg-icon doctor-icon">
                                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
                                    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
                                    <circle cx="20" cy="10" r="2"></circle>
                                  </svg>
                                </div>
                              ) : (
                                <div className="card-svg-icon edu-icon">
                                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                                    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                                  </svg>
                                </div>
                              )}
                            </div>

                            {/* Title & Info */}
                            <div className="card-text-block">
                              <div className="card-title-row">
                                <h3 className="card-service-title">{cat.name}</h3>
                                <span className="card-price-chip">{cat.priceRange}</span>
                              </div>
                              <h4 className="card-headline">{cat.headline}</h4>
                              <p className="card-tagline">{cat.tagline}</p>
                            </div>
                          </div>

                          {/* Feature Checklist */}
                          <div className="card-features-list">
                            {cat.features.map((feat, fIdx) => (
                              <div key={fIdx} className="feature-item">
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>

                          {/* Popular Skills / Sub-services Tags */}
                          <div className="card-skills-wrap">
                            <span className="skills-heading">Popular:</span>
                            <div className="skills-tags-row">
                              {cat.skills.map((skill, sIdx) => (
                                <span key={sIdx} className="skill-chip">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Side: Featured Visual Image Showcase */}
                        <div className="card-side-visual">
                          <div className="card-side-img-wrapper">
                            <img 
                              src={cat.sideImage} 
                              alt={cat.sideImageAlt} 
                              className="card-side-img" 
                              loading="lazy"
                            />
                            <div className="card-side-img-overlay"></div>
                            <div className="card-side-img-badge">
                              <span>{cat.sideBadge}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer Row */}
                      <div className="card-bottom-row">
                        <div className="card-stats-info">
                          <div className="rating-pill">
                            <span className="star-icon">⭐</span>
                            <strong>{cat.rating}</strong>
                            <span className="review-count">({cat.reviews})</span>
                          </div>
                          <div className="pros-count-text">
                            <strong>{cat.count}</strong> Experts Available
                          </div>
                        </div>

                        <button 
                          type="button" 
                          className="card-explore-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleServiceSelect(cat)
                          }}
                        >
                          <span>Book &amp; Explore</span>
                          <span className="btn-arrow">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Slider Pagination Controls (Pause button removed as requested) */}
          <div className="slider-nav-footer">
            <div className="slider-counter">
              <span className="counter-current">0{currentIndex + 1}</span>
              <span className="counter-divider">/</span>
              <span className="counter-total">0{totalSlides}</span>
            </div>

            <div className="slider-dots-track">
              {categories.map((cat, idx) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`slider-dot-btn ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to ${cat.name}`}
                >
                  <span className="dot-inner"></span>
                  {idx === currentIndex && (
                    <span 
                      className="dot-progress-bar" 
                      style={{ animationDuration: isPaused ? '0s' : '4.2s' }}
                    ></span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategorySection
