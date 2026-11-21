import { useState, useEffect } from 'react'
import './HeroSection.css'
import electricianSlide from '../Public/electricon.png'
import plumberSlide from '../Public/plumber.png'
import acSlide from '../Public/AC technicon.png'
import carpenterSlide from '../Public/carpenter.png'
import cleaningSlide from '../Public/cleaner.png'
import paintingSlide from '../Public/painter.png'
import gardenerSlide from '../Public/gardner.png'
import glassSlide from '../Public/glass aluminum .png'
import welderSlide from '../Public/welder.png'
import laundrySlide from '../Public/laundary.png'

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
        .hero-section .hero-content h1.hero-title,
        .hero-section .hero-content h1.hero-title span {
          color: #ffffff !important;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 0, 0, 0.5) !important;
          -webkit-text-fill-color: #ffffff !important;
          background: none !important;
          background-image: none !important;
          background-clip: unset !important;
          -webkit-background-clip: unset !important;
          text-transform: uppercase !important;
          letter-spacing: 2px !important;
          font-weight: 900 !important;
        }
        .hero-section .hero-content p.hero-subtitle,
        .hero-section .hero-content p.hero-subtitle span {
          color: #ffffff !important;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.8) !important;
          -webkit-text-fill-color: #ffffff !important;
          font-weight: 500 !important;
        }
        .hero-section .hero-content .stat-number {
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6), 0 0 25px rgba(255, 255, 255, 0.3) !important;
        }
        .hero-section .hero-content .stat-label {
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.8) !important;
        }
      `}</style>
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.src} alt={slide.alt} />
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
          <span style={{ color: '#ffffff', display: 'inline-block', letterSpacing: '2px', fontWeight: 900, textTransform: 'uppercase' }}>
            FIND TRUSTED HOME SERVICES
          </span>
        </h1>
        <p className="hero-subtitle">
          <span style={{ color: '#ffffff', display: 'inline-block' }}>
            Connect with certified electricians, plumbers, gardeners, carpenters &amp; home technicians in Multan
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
