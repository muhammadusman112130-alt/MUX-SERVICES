import { useState, useEffect } from 'react'
import './HeroSection.css'
import electricianSlide from '../Public/electricon.webp'
import plumberSlide from '../Public/plumber.webp'
import acSlide from '../Public/AC technicon.webp'
import carpenterSlide from '../Public/carpenter.webp'
import cleaningSlide from '../Public/cleaner.webp'
import paintingSlide from '../Public/painter.webp'
import gardenerSlide from '../Public/gardner.webp'
import glassSlide from '../Public/glass aluminum .webp'
import welderSlide from '../Public/welder.webp'
import laundrySlide from '../Public/laundary.webp'

function HeroSection({ setCurrentPage }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // 100% Pure Home Services Only: Electrician, Plumber, AC, Carpenter, Cleaner, Painter, Gardener, Glass, Welder, Laundry
  const slides = [
    { src: electricianSlide, alt: 'Electrician & Wiring' },
    { src: plumberSlide, alt: 'Plumber & Sanitary' },
    { src: acSlide, alt: 'AC & Inverter HVAC' },
    { src: carpenterSlide, alt: 'Carpentry & Woodwork' },
    { src: cleaningSlide, alt: 'Deep Home Cleaning' },
    { src: paintingSlide, alt: 'Painting & Waterproofing' },
    { src: gardenerSlide, alt: 'Gardener & Landscaping' },
    { src: glassSlide, alt: 'Glass & Aluminum Works' },
    { src: welderSlide, alt: 'Welder & Metal Fabrication' },
    { src: laundrySlide, alt: 'Laundry & Dry Cleaning' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('services', searchQuery.trim())
    }
  }

  return (
    <section className="hero-section" id="home">
      <style>{`
        :root:not([data-theme="warm-stone"]) .hero-section .hero-content h1.hero-title span.hero-title-mint-shine {
          background: linear-gradient(
            90deg,
            #8FD3E8 0%,
            #17f7f7 25%,
            #5eead4 50%,
            #17f7f7 75%,
            #8FD3E8 100%
          ) !important;
          background-size: 200% auto !important;
          -webkit-background-clip: text !important;
          background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          color: transparent !important;
          display: inline-block !important;
          letter-spacing: 2px !important;
          font-weight: 900 !important;
          text-transform: uppercase !important;
          animation: mintColorFlow 4s linear infinite !important;
          text-shadow: none !important;
          filter: none !important;
        }
        :root:not([data-theme="warm-stone"]) .hero-section .hero-content p.hero-subtitle,
        :root:not([data-theme="warm-stone"]) .hero-section .hero-content p.hero-subtitle span {
          color: #FFFFF0 !important;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.8) !important;
          -webkit-text-fill-color: #FFFFF0 !important;
          font-weight: 500 !important;
        }
        :root:not([data-theme="warm-stone"]) .hero-section .hero-content .stat-number {
          color: #FFFFF0 !important;
          -webkit-text-fill-color: #FFFFF0 !important;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6), 0 0 25px rgba(255, 255, 240, 0.3) !important;
        }
        :root:not([data-theme="warm-stone"]) .hero-section .hero-content .stat-label {
          color: #FFFFF0 !important;
          -webkit-text-fill-color: #FFFFF0 !important;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.8) !important;
        }

        /* ── WARM STONE LIGHT MODE HERO SECTION SPECIFICS (ONLY #FFFFF0 & #0A0A0A WITH GLASSMORPHISM) ── */
        [data-theme="warm-stone"] .hero-section,
        .theme-warm-stone .hero-section {
          background: #FFFFF0 !important;
        }
        [data-theme="warm-stone"] .hero-slider::after,
        .theme-warm-stone .hero-slider::after {
          display: block !important;
          background: rgba(255, 255, 240, 0.25) !important;
          backdrop-filter: blur(1px) !important;
          -webkit-backdrop-filter: blur(1px) !important;
        }
        [data-theme="warm-stone"] .hero-slider .slide img,
        .theme-warm-stone .hero-slider .slide img {
          opacity: 0.95 !important;
          filter: blur(2.5px) !important;
          transform: scale(1.04) !important;
        }
        [data-theme="warm-stone"] .hero-section .hero-content h1.hero-title span.hero-title-mint-shine,
        .theme-warm-stone .hero-section .hero-content h1.hero-title span.hero-title-mint-shine {
          background: none !important;
          -webkit-background-clip: unset !important;
          background-clip: unset !important;
          -webkit-text-fill-color: #0A0A0A !important;
          color: #0A0A0A !important;
          text-shadow: 0 0 12px #FFFFF0, 0 0 24px #FFFFF0, 0 2px 6px #FFFFF0 !important;
          animation: none !important;
          filter: none !important;
          letter-spacing: 2px !important;
          font-weight: 900 !important;
          text-transform: uppercase !important;
          display: inline-block !important;
        }
        [data-theme="warm-stone"] .hero-section .hero-content p.hero-subtitle,
        [data-theme="warm-stone"] .hero-section .hero-content p.hero-subtitle span,
        .theme-warm-stone .hero-section .hero-content p.hero-subtitle,
        .theme-warm-stone .hero-section .hero-content p.hero-subtitle span {
          color: #0A0A0A !important;
          -webkit-text-fill-color: #0A0A0A !important;
          text-shadow: 0 0 10px #FFFFF0, 0 0 20px #FFFFF0 !important;
          font-weight: 800 !important;
        }
        [data-theme="warm-stone"] .hero-section .search-container .search-input,
        .theme-warm-stone .hero-section .search-container .search-input {
          background: rgba(255, 255, 240, 0.5) !important;
          backdrop-filter: blur(14px) !important;
          -webkit-backdrop-filter: blur(14px) !important;
          border: 2px solid rgba(10, 10, 10, 0.4) !important;
          color: #0A0A0A !important;
          font-weight: 700 !important;
          box-shadow: 0 8px 30px rgba(10, 10, 10, 0.12) !important;
        }
        [data-theme="warm-stone"] .hero-section .search-container .search-input:focus,
        .theme-warm-stone .hero-section .search-container .search-input:focus {
          background: rgba(255, 255, 240, 0.75) !important;
          border-color: #0A0A0A !important;
          box-shadow: 0 8px 32px rgba(10, 10, 10, 0.22) !important;
        }
        [data-theme="warm-stone"] .hero-section .search-container .search-input::placeholder,
        .theme-warm-stone .hero-section .search-container .search-input::placeholder {
          color: rgba(10, 10, 10, 0.75) !important;
        }
        [data-theme="warm-stone"] .hero-section .search-container .search-button,
        .theme-warm-stone .hero-section .search-container .search-button {
          background: rgba(10, 10, 10, 0.88) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          color: #FFFFF0 !important;
          border: 1px solid rgba(255, 255, 240, 0.4) !important;
          font-weight: 800 !important;
          box-shadow: 0 6px 20px rgba(10, 10, 10, 0.3) !important;
        }
        [data-theme="warm-stone"] .hero-section .search-container .search-button:hover,
        .theme-warm-stone .hero-section .search-container .search-button:hover {
          background: #222222 !important;
          color: #FFFFF0 !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 25px rgba(10, 10, 10, 0.4) !important;
        }
        [data-theme="warm-stone"] .hero-section .hero-stats .stat-item,
        .theme-warm-stone .hero-section .hero-stats .stat-item {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        [data-theme="warm-stone"] .hero-section .hero-content .stat-number,
        .theme-warm-stone .hero-section .hero-content .stat-number {
          color: #0A0A0A !important;
          -webkit-text-fill-color: #0A0A0A !important;
          text-shadow: 0 0 10px #FFFFF0, 0 0 20px #FFFFF0, 0 1px 4px #FFFFF0 !important;
          font-weight: 900 !important;
        }
        [data-theme="warm-stone"] .hero-section .hero-content .stat-label,
        .theme-warm-stone .hero-section .hero-content .stat-label {
          color: #0A0A0A !important;
          -webkit-text-fill-color: #0A0A0A !important;
          text-shadow: 0 0 8px #FFFFF0, 0 0 16px #FFFFF0, 0 1px 3px #FFFFF0 !important;
          font-weight: 800 !important;
        }
        [data-theme="warm-stone"] .hero-section .slider-arrow,
        .theme-warm-stone .hero-section .slider-arrow {
          background: rgba(255, 255, 240, 0.45) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          border: 1.5px solid rgba(10, 10, 10, 0.35) !important;
          color: #0A0A0A !important;
          box-shadow: 0 4px 15px rgba(10, 10, 10, 0.15) !important;
        }
        [data-theme="warm-stone"] .hero-section .slider-arrow:hover,
        .theme-warm-stone .hero-section .slider-arrow:hover {
          background: #0A0A0A !important;
          color: #FFFFF0 !important;
          border-color: #0A0A0A !important;
        }
        [data-theme="warm-stone"] .hero-section .slider-dots .dot,
        .theme-warm-stone .hero-section .slider-dots .dot {
          background: rgba(255, 255, 240, 0.55) !important;
          border: 1.5px solid #0A0A0A !important;
        }
        [data-theme="warm-stone"] .hero-section .slider-dots .dot.active,
        .theme-warm-stone .hero-section .slider-dots .dot.active {
          background: #0A0A0A !important;
          border-color: #0A0A0A !important;
        }
      `}</style>
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img 
              src={slide.src} 
              alt={slide.alt} 
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'low'}
              decoding="async"
              width="1200"
              height="670"
            />
          </div>
        ))}
        
        <button className="slider-arrow prev" onClick={prevSlide} aria-label="Previous Slide">
          ‹
        </button>
        <button className="slider-arrow next" onClick={nextSlide} aria-label="Next Slide">
          ›
        </button>
        
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-title-mint-shine">
            FIND TRUSTED HOME SERVICES IN MULTAN
          </span>
        </h1>
        <p className="hero-subtitle">
          <span className="hero-subtitle-inner">
            Book certified electricians, plumbers, carpenters, AC technicians &amp; deep cleaning pros across Multan
          </span>
        </p>
        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search home service (e.g. Electrician, Plumber, Gardener, AC)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
          />
          <button 
            type="button" 
            className="search-button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">5K+</span>
            <span className="stat-label">Verified Technicians</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">40K+</span>
            <span className="stat-label">Homes Serviced</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Satisfaction Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
