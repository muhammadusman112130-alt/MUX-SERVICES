import { useState, useEffect, useRef } from 'react'
import './CategorySection.css'
import electricianImg from '../Public/electricon.png'
import plumberImg from '../Public/plumber.png'
import acImg from '../Public/AC technicon.png'
import carpenterImg from '../Public/carpenter.png'
import cleanImg from '../Public/cleaner.png'
import paintingImg from '../Public/painter.png'
import gardenerImg from '../Public/gardner.png'
import glassImg from '../Public/glass aluminum .png'
import welderImg from '../Public/welder.png'
import laundryImg from '../Public/laundary.png'

function CategorySection({ setCurrentPage }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const sliderRef = useRef(null)

  // 100% Home Services Divisions
  const categories = [
    {
      id: 'electrician',
      name: 'Electrician & Wiring',
      headline: 'Certified Residential & Commercial Electricians',
      tagline: 'UPS wiring, circuit breaker diagnosis, solar inverters, ceiling fans & 24/7 emergency response',
      badge: '850+ Verified Electricians',
      liveStatus: 'Instant Dispatch',
      iconType: 'electric_svg',
      sideImage: electricianImg,
      sideImageAlt: 'Master Electrician Repairing Panel',
      sideBadge: 'Master Electrician',
      themeClass: 'theme-home',
      count: '850+',
      rating: '4.9',
      reviews: '2,890+',
      priceRange: 'From Rs. 1,500/hr',
      query: 'Electrician',
      skills: ['Wiring & Circuits', 'Circuit Breakers', 'Solar Inverter', 'UPS Setup', 'Emergency 24/7', 'Sub-meter Fix'],
      features: [
        '24/7 Emergency response under 30 mins in Multan',
        'Certified & police-verified electrical technicians',
        'Transparent upfront pricing with price offer guarantee'
      ]
    },
    {
      id: 'plumber',
      name: 'Plumbing & Sanitary',
      headline: 'Master Plumbers & Pipeline Repair Specialists',
      tagline: 'Concealed leak detection, PPRC piping, sanitary fitting, geyser installation & drainage unblocking',
      badge: '720+ Verified Plumbers',
      liveStatus: 'Rapid Arrival',
      iconType: 'plumber_svg',
      sideImage: plumberImg,
      sideImageAlt: 'Professional Plumber Fixing Bathroom Pipe',
      sideBadge: 'Master Plumber',
      themeClass: 'theme-tech',
      count: '720+',
      rating: '4.88',
      reviews: '2,450+',
      priceRange: 'From Rs. 1,250/hr',
      query: 'Plumber',
      skills: ['Concealed Leak Detection', 'PPRC Pipeline', 'Sanitary Fitting', 'Geyser Installation', 'Motor Pump', 'Drain Cleaning'],
      features: [
        'Ultrasonic non-destructive leak detection tools',
        'Same-day emergency heat fusion PPRC welding',
        'Guaranteed leak-free bathroom & kitchen sanitary fittings'
      ]
    },
    {
      id: 'ac_hvac',
      name: 'AC & Inverter HVAC',
      headline: 'Inverter AC Masters & Cooling Specialists',
      tagline: 'High-pressure jet wash, R410A/R32 gas charging, split mounting, PCB repair & chilling fixes',
      badge: '640+ HVAC Technicians',
      liveStatus: 'Peak Season Ready',
      iconType: 'ac_svg',
      sideImage: acImg,
      sideImageAlt: 'HVAC Technician Servicing Inverter AC',
      sideBadge: 'HVAC Pro',
      themeClass: 'theme-events',
      count: '640+',
      rating: '4.95',
      reviews: '3,120+',
      priceRange: 'From Rs. 1,800/hr',
      query: 'AC & HVAC',
      skills: ['Inverter PCB Repair', 'Gas Top-Up (R410/R32)', 'Pressure Jet Wash', 'Split Installation', 'Leak Brazing', 'Compressor Fix'],
      features: [
        '90-Day cooling performance warranty guarantee',
        'Digital pressure manifold & 100% pure refrigerant',
        'Complete indoor & outdoor deep service'
      ]
    },
    {
      id: 'carpenter',
      name: 'Carpentry & Woodwork',
      headline: 'Artisan Carpenters & Custom Furniture Crafters',
      tagline: 'Custom wardrobes, modern kitchen cabinets, door lock fitting, wood polishing & sofa bed repairs',
      badge: '510+ Skilled Carpenters',
      liveStatus: 'Custom Orders',
      iconType: 'carpenter_svg',
      sideImage: carpenterImg,
      sideImageAlt: 'Skilled Carpenter Crafting Wooden Furniture',
      sideBadge: 'Artisan Woodcraft',
      themeClass: 'theme-cosmetics',
      count: '510+',
      rating: '4.85',
      reviews: '1,780+',
      priceRange: 'From Rs. 1,400/hr',
      query: 'Carpenter',
      skills: ['Kitchen Cabinetry', 'Door Locks & Hinges', 'Wardrobe Fitting', 'Wooden Polishing', 'Sofa Frame Repair', 'Deco Finish'],
      features: [
        'Precision German soft-close hardware & hinges',
        'Solid wood, MDF & sheet lamination expertise',
        'Doorstep measurement & custom layout consultation'
      ]
    },
    {
      id: 'cleaning',
      name: 'Deep Home Cleaning',
      headline: 'Professional House Sanitization & Steam Wash',
      tagline: 'Deep kitchen cleaning, marble floor buffing, sofa steam extraction, water tank sanitization & post-renovation',
      badge: '580+ Cleaning Pros',
      liveStatus: 'Doorstep Service',
      iconType: 'clean_svg',
      sideImage: cleanImg,
      sideImageAlt: 'Deep Home Cleaning and Sanitization Service',
      sideBadge: 'Deep Clean Pro',
      themeClass: 'theme-home',
      count: '580+',
      rating: '4.92',
      reviews: '2,900+',
      priceRange: 'From Rs. 1,000/hr',
      query: 'Home Cleaning',
      skills: ['Sofa Steam Extraction', 'Floor Polishing & Buffing', 'Kitchen Degreasing', 'Water Tank Cleaning', 'Bathroom Sanitization'],
      features: [
        'Hospital-grade disinfectant & non-toxic chemicals',
        'Industrial rotary floor scrubber & high-power wet vacuum',
        'Trained verified cleaning staff with full hygiene equipment'
      ]
    },
    {
      id: 'painting',
      name: 'Painting & Waterproofing',
      headline: 'Interior & Exterior Painting Experts',
      tagline: 'Weather-shield exterior painting, interior velvet finish, wall putty, dampness proofing & texture coating',
      badge: '390+ Pro Painters',
      liveStatus: 'Free Quote',
      iconType: 'paint_svg',
      sideImage: paintingImg,
      sideImageAlt: 'Professional Painter Painting Wall',
      sideBadge: 'Pro Painter',
      themeClass: 'theme-events',
      count: '390+',
      rating: '4.82',
      reviews: '1,420+',
      priceRange: 'From Rs. 1,100/hr',
      query: 'Painter',
      skills: ['Interior Wall Paint', 'Exterior Weather-shield', 'Wall Putty & Primer', 'Waterproofing & Seep', 'Texture & Stencil', 'Wood & Metal Enamel'],
      features: [
        'Premium branded paints (Berger, Dulux, Nippon, Brighto)',
        'Dust-free motorized wall sanding machines',
        'Complete floor & furniture masking protection'
      ]
    },
    {
      id: 'gardener',
      name: 'Gardening & Lawn Care',
      headline: 'Expert Landscape & Lawn Specialists',
      tagline: 'Lawn grass cutting, hedge pruning, seasonal flowers planting, soil fertilizing & automated irrigation',
      badge: '320+ Expert Gardeners',
      liveStatus: 'Lush Gardens',
      iconType: 'gardener_svg',
      sideImage: gardenerImg,
      sideImageAlt: 'Expert Gardener Landscaping Lawn',
      sideBadge: 'Green Thumb',
      themeClass: 'theme-home',
      count: '320+',
      rating: '4.86',
      reviews: '1,150+',
      priceRange: 'From Rs. 900/hr',
      query: 'Gardener',
      skills: ['Lawn Mowing', 'Plant Pruning', 'Fertilizer Setup', 'Flower Planting', 'Irrigation Piping', 'Landscape Design'],
      features: [
        'Eco-friendly organic fertilizer & pest management',
        'Motorized lawn mowers and precision hedge trimmers',
        'Weekly and monthly routine garden upkeep packages'
      ]
    },
    {
      id: 'glass_aluminum',
      name: 'Glass & Aluminum',
      headline: 'Modern Glass Partitions & Aluminum Fabricators',
      tagline: 'Tempered glass shower enclosures, double-glazed windows, commercial shopfronts & aluminum doors',
      badge: '280+ Glazing Specialists',
      liveStatus: 'Custom Fitting',
      iconType: 'glass_svg',
      sideImage: glassImg,
      sideImageAlt: 'Glass and Aluminum Fabrication Specialist',
      sideBadge: 'Master Glazier',
      themeClass: 'theme-tech',
      count: '280+',
      rating: '4.84',
      reviews: '980+',
      priceRange: 'From Rs. 1,600/hr',
      query: 'Glass & Aluminum',
      skills: ['Aluminum Windows', 'Glass Partitions', 'Shower Cabin', 'Shopfront Glass', 'Roller Mesh', 'Lock & Roller Repair'],
      features: [
        'Heavy-gauge aluminum sections with powder coating',
        'Shatter-proof safety tempered glass (8mm to 12mm)',
        'Accurate laser leveling and airtight weather seals'
      ]
    },
    {
      id: 'welder',
      name: 'Welding & Fabrication',
      headline: 'Certified Metal Fabricators & Structural Welders',
      tagline: 'Heavy main gates, safety window grills, steel stairs, shade sheds & on-site repair welding',
      badge: '310+ Certified Welders',
      liveStatus: 'On-Site Welding',
      iconType: 'welder_svg',
      sideImage: welderImg,
      sideImageAlt: 'Master Welder Welding Metal Gate',
      sideBadge: 'Master Welder',
      themeClass: 'theme-cosmetics',
      count: '310+',
      rating: '4.87',
      reviews: '1,210+',
      priceRange: 'From Rs. 1,300/hr',
      query: 'Welder',
      skills: ['Main Iron Gates', 'Window Grills', 'Stair Handrails', 'Tin Shed Fabrication', 'ARC / Argon Welding', 'Hinges Repair'],
      features: [
        'Portable inverter welding machine for quick home visits',
        'Rust-proof anti-corrosion primer application',
        'High-tensile iron & stainless steel fabrication'
      ]
    },
    {
      id: 'laundry',
      name: 'Laundry & Dry Cleaning',
      headline: 'Express Steam Ironing & Fabric Care',
      tagline: 'Doorstep pickup & drop, delicate dry cleaning, steam press, curtains & heavy blanket washing',
      badge: '250+ Fabric Care Pros',
      liveStatus: 'Doorstep Pickup',
      iconType: 'laundry_svg',
      sideImage: laundryImg,
      sideImageAlt: 'Professional Laundry and Steam Press',
      sideBadge: 'Fresh Care',
      themeClass: 'theme-events',
      count: '250+',
      rating: '4.89',
      reviews: '1,640+',
      priceRange: 'From Rs. 800/hr',
      query: 'Laundry & Ironing',
      skills: ['Steam Press', 'Delicate Dry Clean', 'Blanket & Quilt Wash', 'Curtain Cleaning', 'Stain Removal', 'Doorstep Express'],
      features: [
        'Fabric-safe non-abrasive international detergents',
        'Crease-free commercial vacuum steam ironing',
        'Free 24-48 hours doorstep pickup and express drop'
      ]
    }
  ]

  const totalSlides = categories.length

  // Ultra-smooth auto-slide
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 4500)

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

  // Render clean SVG trade icon
  const renderCategoryIcon = (type) => {
    switch (type) {
      case 'electric_svg':
        return (
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#FF5A4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        )
      case 'plumber_svg':
        return (
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#FF5A4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        )
      case 'ac_svg':
        return (
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07" />
          </svg>
        )
      case 'carpenter_svg':
        return (
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m14 12 6-6M2 20l7-7M9 13l2 2M16 6l2 2M6 22l-4-4 13-13 4 4L6 22z" />
          </svg>
        )
      case 'clean_svg':
        return (
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4M3 5h4M19 17v4M17 19h4" />
          </svg>
        )
      case 'appliance_svg':
        return (
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="4" y1="10" x2="20" y2="10" />
            <line x1="8" y1="6" x2="8" y2="7" />
            <line x1="8" y1="15" x2="8" y2="17" />
          </svg>
        )
      case 'paint_svg':
        return (
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m19 11-8-8-8.5 8.5a2.12 2.12 0 0 0 3 3L11 9" />
            <path d="m5 15 6 6" />
            <path d="m9 19 2 2" />
          </svg>
        )
      case 'gardener_svg':
        return (
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22v-9" /><path d="M9 9a3 3 0 0 1 6 0c0 4-3 6-3 6s-3-2-3-6z" /><path d="M4.5 15.5c2 0 3.5-1.5 3.5-3.5 0-3-2-4.5-3.5-4.5-1 1-1.5 2.5-1.5 4.5 0 2 1.5 3.5 3.5 3.5z" />
          </svg>
        )
      case 'glass_svg':
        return (
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 12h18M12 3v18" />
          </svg>
        )
      case 'welder_svg':
        return (
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m14 12 6-6M2 20l7-7M9 13l2 2M16 6l2 2" /><circle cx="18" cy="6" r="3" />
          </svg>
        )
      case 'laundry_svg':
        return (
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" /><circle cx="12" cy="13" r="5" /><path d="M12 10a3 3 0 0 1 3 3" />
          </svg>
        )
      default:
        return (
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#FF5A4E" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
        )
    }
  }

  return (
    <section 
      className="category-section" 
      id="services"
      aria-label="Home Services"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        {/* Section Header */}
        <div className="category-header-wrap">
          <div className="category-pill-badge">
            <span className="pill-dot"></span>
            <span>100% Verified Home Services</span>
          </div>
          <h2 className="section-title">Home Services &amp; Repairs</h2>
          <p className="section-subtitle">
            Multan's leading certified home service divisions with transparent pricing, instant booking &amp; skilled technicians
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
                  {cat.id === 'electrician' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                  )}
                  {cat.id === 'plumber' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
                  )}
                  {cat.id === 'ac_hvac' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07" /></svg>
                  )}
                  {cat.id === 'carpenter' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m14 12 6-6M2 20l7-7M9 13l2 2M16 6l2 2M6 22l-4-4 13-13 4 4L6 22z" /></svg>
                  )}
                  {cat.id === 'cleaning' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
                  )}
                  {cat.id === 'painting' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m19 11-8-8-8.5 8.5a2.12 2.12 0 0 0 3 3L11 9" /><path d="m5 15 6 6" /></svg>
                  )}
                  {cat.id === 'gardener' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 22v-9" /><path d="M9 9a3 3 0 0 1 6 0c0 4-3 6-3 6s-3-2-3-6z" /></svg>
                  )}
                  {cat.id === 'glass_aluminum' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 12h18M12 3v18" /></svg>
                  )}
                  {cat.id === 'welder' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m14 12 6-6M2 20l7-7" /></svg>
                  )}
                  {cat.id === 'laundry' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="4" y="2" width="16" height="20" rx="2" /><circle cx="12" cy="13" r="5" /></svg>
                  )}
                </span>
                <span className="quick-nav-label">{cat.name}</span>
                {idx === currentIndex && <span className="quick-nav-glow"></span>}
              </button>
            ))}
          </div>
        </div>

        {/* ── Animated Slider Showcase ── */}
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

          {/* Slider Track */}
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
                    {/* Animated glowing backlight behind card on hover */}
                    <div className={`card-backlight-glow glow-${cat.themeClass}`} aria-hidden="true"></div>

                    <div 
                      className={`top-service-card ${cat.themeClass}`}
                      onClick={() => handleServiceSelect(cat)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleServiceSelect(cat) }}
                    >
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

                      <div className="card-split-layout">
                        {/* Left Info Column */}
                        <div className="card-info-col">
                          <div className="card-main-body">
                            <div className="card-icon-wrapper">
                              {renderCategoryIcon(cat.iconType)}
                            </div>

                            <div className="card-text-block">
                              <div className="card-title-row">
                                <h3 className="card-service-title">{cat.name}</h3>
                                <span className="card-price-chip">{cat.priceRange}</span>
                              </div>
                              <h4 className="card-headline">{cat.headline}</h4>
                              <p className="card-tagline">{cat.tagline}</p>
                            </div>
                          </div>

                          <div className="card-features-list">
                            {cat.features.map((feat, fIdx) => (
                              <div key={fIdx} className="feature-item">
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>

                          <div className="card-skills-wrap">
                            <span className="skills-heading">Popular Tasks:</span>
                            <div className="skills-tags-row">
                              {cat.skills.map((skill, sIdx) => (
                                <span key={sIdx} className="skill-chip">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Side: Featured Visual Image */}
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
                          <span>Book {cat.name.split(' ')[0]}</span>
                          <span className="btn-arrow">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Slider Pagination Controls */}
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
                      style={{ animationDuration: isPaused ? '0s' : '4.5s' }}
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
