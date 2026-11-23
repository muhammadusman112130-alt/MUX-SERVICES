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
          color: #ffffff !important;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.8) !important;
          -webkit-text-fill-color: #ffffff !important;
          font-weight: 500 !important;
        }
        :root:not([data-theme="warm-stone"]) .hero-section .hero-content .stat-number {
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6), 0 0 25px rgba(255, 255, 255, 0.3) !important;
        }
        :root:not([data-theme="warm-stone"]) .hero-section .hero-content .stat-label {
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.8) !important;
        }

        /* ── WARM STONE LIGHT MODE HERO SECTION SPECIFICS (ONLY #FFFFFF & #354F52 WITH GLASSMORPHISM) ── */
        [data-theme="warm-stone"] .hero-section,
        .theme-warm-stone .hero-section {
          background: #FFFFFF !important;
        }
        [data-theme="warm-stone"] .hero-slider::after,
        .theme-warm-stone .hero-slider::after {
          display: none !important;
        }
        [data-theme="warm-stone"] .hero-slider .slide img,
        .theme-warm-stone .hero-slider .slide img {
          opacity: 1 !important;
          filter: none !important;
        }
        [data-theme="warm-stone"] .hero-section .hero-content h1.hero-title span.hero-title-mint-shine,
        .theme-warm-stone .hero-section .hero-content h1.hero-title span.hero-title-mint-shine {
          background: none !important;
          -webkit-background-clip: unset !important;
          background-clip: unset !important;
          -webkit-text-fill-color: #354F52 !important;
          color: #354F52 !important;
          text-shadow: 0 0 12px #FFFFFF, 0 0 24px #FFFFFF, 0 2px 6px #FFFFFF !important;
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
          color: #354F52 !important;
          -webkit-text-fill-color: #354F52 !important;
          text-shadow: 0 0 10px #FFFFFF, 0 0 20px #FFFFFF !important;
          font-weight: 800 !important;
        }
        [data-theme="warm-stone"] .hero-section .search-container .search-input,
        .theme-warm-stone .hero-section .search-container .search-input {
          background: rgba(255, 255, 255, 0.5) !important;
          backdrop-filter: blur(14px) !important;
          -webkit-backdrop-filter: blur(14px) !important;
          border: 2px solid rgba(53, 79, 82, 0.4) !important;
          color: #354F52 !important;
          font-weight: 700 !important;
          box-shadow: 0 8px 30px rgba(53, 79, 82, 0.12) !important;
        }
        [data-theme="warm-stone"] .hero-section .search-container .search-input:focus,
        .theme-warm-stone .hero-section .search-container .search-input:focus {
          background: rgba(255, 255, 255, 0.75) !important;
          border-color: #354F52 !important;
          box-shadow: 0 8px 32px rgba(53, 79, 82, 0.22) !important;
        }
        [data-theme="warm-stone"] .hero-section .search-container .search-input::placeholder,
        .theme-warm-stone .hero-section .search-container .search-input::placeholder {
          color: rgba(53, 79, 82, 0.75) !important;
        }
        [data-theme="warm-stone"] .hero-section .search-container .search-button,
        .theme-warm-stone .hero-section .search-container .search-button {
          background: rgba(53, 79, 82, 0.88) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          color: #FFFFFF !important;
          border: 1px solid rgba(255, 255, 255, 0.4) !important;
          font-weight: 800 !important;
          box-shadow: 0 6px 20px rgba(53, 79, 82, 0.3) !important;
        }
        [data-theme="warm-stone"] .hero-section .search-container .search-button:hover,
        .theme-warm-stone .hero-section .search-container .search-button:hover {
          background: #283C3E !important;
          color: #FFFFFF !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 25px rgba(53, 79, 82, 0.4) !important;
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
          color: #354F52 !important;
          -webkit-text-fill-color: #354F52 !important;
          text-shadow: 0 0 10px #FFFFFF, 0 0 20px #FFFFFF, 0 1px 4px #FFFFFF !important;
          font-weight: 900 !important;
        }
        [data-theme="warm-stone"] .hero-section .hero-content .stat-label,
        .theme-warm-stone .hero-section .hero-content .stat-label {
          color: #354F52 !important;
          -webkit-text-fill-color: #354F52 !important;
          text-shadow: 0 0 8px #FFFFFF, 0 0 16px #FFFFFF, 0 1px 3px #FFFFFF !important;
          font-weight: 800 !important;
        }
        [data-theme="warm-stone"] .hero-section .slider-arrow,
        .theme-warm-stone .hero-section .slider-arrow {
          background: rgba(255, 255, 255, 0.45) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          border: 1.5px solid rgba(53, 79, 82, 0.35) !important;
          color: #354F52 !important;
          box-shadow: 0 4px 15px rgba(53, 79, 82, 0.15) !important;
        }
        [data-theme="warm-stone"] .hero-section .slider-arrow:hover,
        .theme-warm-stone .hero-section .slider-arrow:hover {
          background: #354F52 !important;
          color: #FFFFFF !important;
          border-color: #354F52 !important;
        }
        [data-theme="warm-stone"] .hero-section .slider-dots .dot,
        .theme-warm-stone .hero-section .slider-dots .dot {
          background: rgba(255, 255, 255, 0.55) !important;
          border: 1.5px solid #354F52 !important;
        }
        [data-theme="warm-stone"] .hero-section .slider-dots .dot.active,
        .theme-warm-stone .hero-section .slider-dots .dot.active {
          background: #354F52 !important;
          border-color: #354F52 !important;
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
