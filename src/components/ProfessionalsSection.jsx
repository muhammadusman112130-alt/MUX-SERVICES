import { useState, useEffect, useRef } from 'react'
import './ProfessionalsSection.css'
import electricianImg from '../Public/electricon.png'
import plumberImg from '../Public/plumber.png'
import carpenterImg from '../Public/carpenter.png'
import cleanerImg from '../Public/cleaner.png'

function ProfessionalsSection({ setCurrentPage }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(null)
  const touchEndX = useRef(null)

  const professionals = [
    {
      id: 'pro-1',
      name: 'QASWAR ABBAS',
      service: 'Electrician',
      rating: 4.9,
      reviews: 234,
      image: electricianImg,
      verified: true,
      badge: 'Master Electrician',
      detail: 'Wiring, Circuit Breakers, Solar Setup & 24/7 Emergency Repairs',
      skills: ['Wiring & Circuits', 'Solar Setup', 'Emergency 24/7'],
      experience: '8+ Years Exp',
      completedJobs: '450+ Jobs',
      rate: 'Rs. 1,500/hr'
    },
    {
      id: 'pro-2',
      name: 'SANWAL RIAZ',
      service: 'Plumber',
      rating: 4.8,
      reviews: 189,
      image: plumberImg,
      verified: true,
      badge: 'Master Plumber',
      detail: 'Pipe Repairs, Leak Detection, Bathroom Fitting & Drainage Fixes',
      skills: ['Leak Detection', 'Pipe Fitting', 'Drain Cleaning'],
      experience: '6+ Years Exp',
      completedJobs: '320+ Jobs',
      rate: 'Rs. 1,200/hr'
    },
    {
      id: 'pro-3',
      name: 'MUZAMIL ABBAS',
      service: 'Carpenter',
      rating: 4.7,
      reviews: 156,
      image: carpenterImg,
      verified: true,
      badge: 'Artisan Carpenter',
      detail: 'Custom Wood Furniture, Door Lock Fitting & Wooden Restorations',
      skills: ['Custom Woodwork', 'Cabinetry', 'Furniture Repair'],
      experience: '7+ Years Exp',
      completedJobs: '280+ Jobs',
      rate: 'Rs. 1,400/hr'
    },
    {
      id: 'pro-4',
      name: 'MUDASSIR ABBAS',
      service: 'Cleaner',
      rating: 4.9,
      reviews: 298,
      image: cleanerImg,
      verified: true,
      badge: 'Deep Clean Pro',
      detail: 'Full House Sanitization, Floor Polishing & Kitchen Deep Cleaning',
      skills: ['Full Sanitization', 'Floor Polish', 'Deep Kitchen Clean'],
      experience: '5+ Years Exp',
      completedJobs: '510+ Jobs',
      rate: 'Rs. 1,000/hr'
    },
  ]

  const totalCards = professionals.length

  // Smooth continuous auto-progression every 3.6s (pauses on hover)
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalCards)
    }, 3600)

    return () => clearInterval(interval)
  }, [isPaused, totalCards])

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    if (diff > 45) {
      // Swiped left -> next card
      setActiveIndex((prev) => (prev + 1) % totalCards)
    } else if (diff < -45) {
      // Swiped right -> prev card
      setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards)
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  const handleHireClick = (e, pro) => {
    e.stopPropagation()
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('services', pro.service)
    }
  }

  return (
    <section 
      className="professionals-section" 
      id="professionals"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        <h2 className="section-title">Top Professional Services</h2>
        <p className="section-subtitle">
          Highly rated verified experts delivering top-tier services with guaranteed quality
        </p>

        {/* ── HORIZONTAL CAROUSEL VIEWPORT (Center Focused, Sides Blurred, NO Side Arrows) ── */}
        <div 
          className="professionals-carousel-viewport"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="professionals-carousel-track"
            style={{
              transform: `translateX(calc(50% - (var(--pro-card-w) / 2) - ${activeIndex} * (var(--pro-card-w) + var(--pro-gap))))`
            }}
          >
            {professionals.map((pro, index) => {
              const isActive = index === activeIndex
              return (
                <div 
                  key={pro.id} 
                  className={`professional-card ${isActive ? 'card-active' : 'card-inactive'}`}
                  onClick={() => setActiveIndex(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${pro.name} - ${pro.service} (${isActive ? 'active' : 'click to focus'})`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveIndex(index)
                    }
                  }}
                >
                  <div className="professional-image">
                    <div className="avatar">
                      <img src={pro.image} alt={pro.name} className="avatar-photo-img" />
                    </div>
                    {pro.verified && (
                      <span className="verified-badge" title="Verified Expert">✓</span>
                    )}
                  </div>

                  <div className="professional-info">
                    <h3 className="professional-name">{pro.name}</h3>

                    {/* Service Detail Box */}
                    <div className="professional-service-box">
                      <div className="pro-service-box-header">
                        <span className="pro-service-badge">{pro.badge}</span>
                        <span className="pro-live-status">
                          <span className="pro-pulse-dot"></span> Available
                        </span>
                      </div>
                      <p className="pro-service-detail">{pro.detail}</p>
                      
                      {/* Skills tags */}
                      <div className="pro-service-tags">
                        {pro.skills.map((skill, idx) => (
                          <span key={idx} className="pro-skill-tag">✓ {skill}</span>
                        ))}
                      </div>

                      <div className="pro-service-stats">
                        <span className="pro-stat-chip">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8FD3E8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', verticalAlign: '-1px' }}>
                            <circle cx="12" cy="8" r="7"/>
                            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                          </svg>
                          {pro.experience}
                        </span>
                        <span className="pro-stat-chip">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8FD3E8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', verticalAlign: '-1px' }}>
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          {pro.completedJobs}
                        </span>
                      </div>
                    </div>

                    <div className="professional-rating">
                      <span className="stars-svg">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#8FD3E8" stroke="#8FD3E8">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </span>
                      <span className="rating-number">{pro.rating}</span>
                      <span className="reviews">({pro.reviews} reviews)</span>
                      <strong className="pro-rate-tag">{pro.rate}</strong>
                    </div>

                    <button 
                      className="hire-button" 
                      type="button"
                      onClick={(e) => handleHireClick(e, pro)}
                    >
                      <span>Hire Now</span>
                      <span className="hire-btn-arrow">→</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── MINIMAL PROGRESS DOT INDICATORS (NO ARROWS AS REQUESTED) ── */}
        <div className="professionals-pagination-dots" aria-label="Carousel navigation">
          {professionals.map((pro, idx) => (
            <button
              key={pro.id}
              type="button"
              className={`pro-dot-btn ${idx === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to ${pro.name} - ${pro.service}`}
            >
              <span className="pro-dot-fill"></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProfessionalsSection
