import { useState, useEffect } from 'react'
import './HeroSection.css'
import slide1 from '../Public/1.png'
import slide2 from '../Public/2.png'
import slide3 from '../Public/3.png'
import slide4 from '../Public/education-learning.jpg'
import slide5 from '../Public/doctor-hero.png'

function HeroSection({ setCurrentPage }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    slide1,
    slide2,
    slide3,
    slide4,
    slide5
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
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
          text-shadow: none !important;
          -webkit-text-fill-color: #ffffff !important;
          background: none !important;
          background-image: none !important;
          background-clip: unset !important;
          -webkit-background-clip: unset !important;
        }
        .hero-section .hero-content p.hero-subtitle,
        .hero-section .hero-content p.hero-subtitle span {
          color: #ffffff !important;
          text-shadow: none !important;
          -webkit-text-fill-color: #ffffff !important;
        }
        .hero-section .hero-content .stat-number {
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4), 0 0 25px rgba(255, 255, 255, 0.3) !important;
        }
        .hero-section .hero-content .stat-label {
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
        }
      `}</style>
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={slide} alt={`Slide ${index + 1}`} />
          </div>
        ))}
        
        <button className="slider-arrow prev" onClick={prevSlide}>
          ‹
        </button>
        <button className="slider-arrow next" onClick={nextSlide}>
          ›
        </button>
        
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
      
      <div className="hero-content">
        <h1 className="hero-title"><span style={{ color: '#ffffff', display: 'inline-block' }}>Find Trusted Professionals</span></h1>
        <p className="hero-subtitle"><span style={{ color: '#ffffff', display: 'inline-block' }}>Connect with skilled experts for all your needs</span></p>
        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="What service are you looking for?"
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
            <span className="stat-number">10K+</span>
            <span className="stat-label">Professionals</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100+</span>
            <span className="stat-label">Categories</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
