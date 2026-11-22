import { useState, useMemo, useRef, useEffect } from 'react'
import './Professionals.css'
import heroBanner from '../assets/professionals-hero-banner.webp'
import electricianImg from '../Public/electricon.webp'
import plumberImg from '../Public/plumber.webp'
import acImg from '../Public/AC technicon.webp'
import carpenterImg from '../Public/carpenter.webp'
import painterImg from '../Public/painter.webp'
import cleanerImg from '../Public/cleaner.webp'
import gardenerImg from '../Public/gardner.webp'
import glassImg from '../Public/glass aluminum .webp'
import applianceImg from '../Public/appliance.webp'
import welderImg from '../Public/welder.webp'

function Professionals({ setCurrentPage }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [verifiedOnly, setVerifiedOnly] = useState(true)
  const [selectedProModal, setSelectedProModal] = useState(null)

  // Scroll open & close animation for Guarantee Section cards
  const [trustCardsOpen, setTrustCardsOpen] = useState(false)
  const trustGridRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!trustGridRef.current) return
      const rect = trustGridRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight || 800

      // When guarantee section enters viewport: open cards
      // When scrolled away (up or down): close cards
      if (rect.top <= windowHeight * 0.82 && rect.bottom >= 40) {
        setTrustCardsOpen(true)
      } else {
        setTrustCardsOpen(false)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const categories = [
    'All',
    'Electrician',
    'Plumber',
    'AC & HVAC',
    'Carpenter',
    'Painter',
    'Cleaning',
    'Appliance Repair',
    'Gardener',
    'Welder'
  ]

  const professionalsList = [
    {
      id: 'PRO-101',
      name: 'Muhammad Akram',
      title: 'Master Electrician & Solar Lead',
      service: 'Electrician',
      rating: 4.95,
      reviews: 340,
      responseRate: '99%',
      responseTime: '8 mins',
      experience: '11+ Years',
      completedJobs: '1,450+',
      hourlyRate: 'Rs. 1,500/hr',
      location: 'Gulgasht Colony, Bosan Road & New Multan',
      verified: true,
      available: true,
      image: electricianImg,
      skills: ['UPS Wiring', 'Solar Inverter Setup', 'DB Board Overhaul', 'Short Circuit Detection'],
      bio: 'Licensed electrical engineer with over a decade of residential & commercial wiring experience in Multan. Punctual, fully equipped with digital testing gear.',
      customerQuote: 'Bosan Road par 20 minute me pohnch gaye. UPS wiring ka issue foran diagnose karke fix kar diya!'
    },
    {
      id: 'PRO-102',
      name: 'Ustad Rasheed Khan',
      title: 'Senior HVAC & Inverter Specialist',
      service: 'AC & HVAC',
      rating: 4.98,
      reviews: 410,
      responseRate: '100%',
      responseTime: '6 mins',
      experience: '14+ Years',
      completedJobs: '1,890+',
      hourlyRate: 'Rs. 1,800/hr',
      location: 'DHA Multan, Bosan Road & Wapda Town',
      verified: true,
      available: true,
      image: acImg,
      skills: ['Inverter PCB Repair', 'R410/R32 Gas Charging', 'Deep Jet Pump Wash', 'Compressor Fitting'],
      bio: 'Factory-trained HVAC expert specializing in T3 tropical compressor units and DC inverters. Guaranteed cooling satisfaction with 30-day warranty.',
      customerQuote: 'AC bilkul cool nahi kar raha tha, Ustad Rasheed ne gas leak pakar ke 1 ghantay me chill kar diya!'
    },
    {
      id: 'PRO-103',
      name: 'Rashid Mehmood',
      title: 'Senior Sanitary & Master Plumber',
      service: 'Plumber',
      rating: 4.92,
      reviews: 285,
      responseRate: '98%',
      responseTime: '10 mins',
      experience: '12+ Years',
      completedJobs: '1,320+',
      hourlyRate: 'Rs. 1,250/hr',
      location: 'Cantt, Shah Rukn-e-Alam & Gulberg',
      verified: true,
      available: true,
      image: plumberImg,
      skills: ['Concealed Leak Detection', 'PPRC Water Piping', 'Geyser Installation', 'Sewer Line Unclogging'],
      bio: 'Government-certified master plumber with modern acoustic leak detection tools. Zero wall damage approach for sanitary and drainage fixes.',
      customerQuote: 'Bathroom pipe leak ki wajah se deewar kharab ho rahi thi, Rashid sahab ne bina tor phor ke masla hal kiya.'
    },
    {
      id: 'PRO-104',
      name: 'Muzamil Abbas',
      title: 'Master Woodwork & Furniture Artisan',
      service: 'Carpenter',
      rating: 4.88,
      reviews: 215,
      responseRate: '97%',
      responseTime: '12 mins',
      experience: '9+ Years',
      completedJobs: '860+',
      hourlyRate: 'Rs. 1,400/hr',
      location: 'Shamsabad, Mumtazabad & Multan Cantt',
      verified: true,
      available: true,
      image: carpenterImg,
      skills: ['Door Lock Fitting', 'Custom Wardrobes', 'Bed & Sofa Repair', 'Kitchen Cabinet Polish'],
      bio: 'Second-generation wood craftsman. Expert in modern modular fittings, solid Sheesham repair, and precision magnetic door locks.',
      customerQuote: 'Almari ke hinges aur drawer bilkul naye jaisay chalne lagay. Boht safai se kaam kiya.'
    },
    {
      id: 'PRO-105',
      name: 'Imran Khan',
      title: 'Deep Cleaning & Sanitization Lead',
      service: 'Cleaning',
      rating: 4.94,
      reviews: 310,
      responseRate: '99%',
      responseTime: '7 mins',
      experience: '7+ Years',
      completedJobs: '980+',
      hourlyRate: 'Rs. 1,000/hr',
      location: 'Entire Multan City & Suburbs',
      verified: true,
      available: true,
      image: cleanerImg,
      skills: ['Sofa & Carpet Extraction', 'Water Tank Disinfection', 'Post-Construction Scrub', 'Kitchen Degreasing'],
      bio: 'Trained professional cleaning supervisor equipped with industrial vacuum extractors and eco-friendly disinfectant solutions.',
      customerQuote: 'Water tank aur sofa cleaning aisi ki jese showroom se naya aaya ho. Highly recommended!'
    },
    {
      id: 'PRO-106',
      name: 'Bilal Hassan',
      title: 'Solar & 24/7 Emergency Electrician',
      service: 'Electrician',
      rating: 4.91,
      reviews: 230,
      responseRate: '98%',
      responseTime: '9 mins',
      experience: '9+ Years',
      completedJobs: '1,020+',
      hourlyRate: 'Rs. 1,600/hr',
      location: 'New Multan, MDA Colony & Model Town',
      verified: true,
      available: true,
      image: electricianImg,
      skills: ['Hybrid Solar Inverters', 'Net Metering Filing', 'Phase Changeover Switches', 'Circuit Breakers'],
      bio: 'Solar tech specialist with extensive knowledge of On-Grid/Off-Grid setups, lithium storage, and emergency breaker replacements.',
      customerQuote: 'Raat ko breaker trip kar raha tha, 20 minute me pohanch kar raat ko hi fix kar diya.'
    },
    {
      id: 'PRO-107',
      name: 'Muhammad Sanwal',
      title: 'Drainage & High-Pressure Plumbing Expert',
      service: 'Plumber',
      rating: 4.90,
      reviews: 240,
      responseRate: '99%',
      responseTime: '9 mins',
      experience: '10+ Years',
      completedJobs: '1,150+',
      hourlyRate: 'Rs. 1,300/hr',
      location: 'Cantt, Model Town & Bosan Road',
      verified: true,
      available: true,
      image: plumberImg,
      skills: ['Instant Gas Geyser Fix', 'Drain Machine Clean', 'Underground Tank Motor', 'Mixer Taps'],
      bio: 'Expert in residential high-pressure water pump installations, motorized drain snake clearing, and automated water-level controllers.',
      customerQuote: 'Geyser water flow boht slow tha, Sanwal sahab ne acid wash karke flow double kar diya.'
    },
    {
      id: 'PRO-108',
      name: 'Kashif Mehmood',
      title: 'Pro Painter & Texture Specialist',
      service: 'Painter',
      rating: 4.85,
      reviews: 190,
      responseRate: '96%',
      responseTime: '15 mins',
      experience: '8+ Years',
      completedJobs: '740+',
      hourlyRate: 'Rs. 1,100/hr',
      location: 'Shah Rukn-e-Alam, Gulgasht & New Multan',
      verified: true,
      available: true,
      image: painterImg,
      skills: ['WeatherSheet Exterior', 'Deco & High-Gloss Polish', 'Velvet Texture Wall', 'Waterproofing Coat'],
      bio: 'Master of color harmony, damp proofing, and surface prep. Uses premium Berger & Dulux certified application standards.',
      customerQuote: 'Drawing room me feature wall pe velvet texture paint banwaya, bilkul 5-star hotel jaisa look aaya!'
    },
    {
      id: 'PRO-109',
      name: 'Tariq Jameel',
      title: 'Home Appliances & Inverter Tech',
      service: 'Appliance Repair',
      rating: 4.89,
      reviews: 205,
      responseRate: '97%',
      responseTime: '11 mins',
      experience: '10+ Years',
      completedJobs: '890+',
      hourlyRate: 'Rs. 1,400/hr',
      location: 'Gulgasht, Bosan Road & Wapda Town',
      verified: true,
      available: true,
      image: applianceImg,
      skills: ['Automatic Washing Machines', 'Inverter Fridge Gas & Thermostat', 'Microwave Ovens', 'Deep Freezers'],
      bio: 'Chip-level motherboard diagnosis for Korean & Japanese home appliances. Genuine spare parts with vendor receipt.',
      customerQuote: 'Automatic washing machine ka motor sensor kharab tha, genuine part daal kar foran theek kar diya.'
    },
    {
      id: 'PRO-110',
      name: 'Chaudhry Rauf',
      title: 'Glass & Aluminum Works Master',
      service: 'Welder',
      rating: 4.87,
      reviews: 175,
      responseRate: '96%',
      responseTime: '14 mins',
      experience: '11+ Years',
      completedJobs: '760+',
      hourlyRate: 'Rs. 1,350/hr',
      location: 'Industrial Area, Bosan Road & Cantt',
      verified: true,
      available: true,
      image: glassImg,
      skills: ['Sliding Aluminum Windows', 'Tempered Glass Showers', 'Office Partitions', 'Roller Mesh Screens'],
      bio: 'Specialist in 12mm tempered safety glass, soundproof double-glazed aluminum windows, and mosquito net roller systems.',
      customerQuote: 'Window rollers jam thay aur hawa se awaz aati thi. Chaudhry sahab ne rubber packing badal di, ab bilkul silent hai.'
    },
    {
      id: 'PRO-111',
      name: 'Malik Asif',
      title: 'Landscape & Organic Lawn Specialist',
      service: 'Gardener',
      rating: 4.86,
      reviews: 160,
      responseRate: '95%',
      responseTime: '15 mins',
      experience: '8+ Years',
      completedJobs: '620+',
      hourlyRate: 'Rs. 1,000/hr',
      location: 'DHA, Multan Cantt & MDA Officers Colony',
      verified: true,
      available: true,
      image: gardenerImg,
      skills: ['Fine Lawn Trimming', 'Seasonal Plant Sowing', 'Organic Pest Spray', 'Automatic Drip Irrigation'],
      bio: 'Experienced horticulturist offering lawn aeration, exotic imported flower planting, and fruit tree pruning across Multan.',
      customerQuote: 'Ghaas pe fungus aa gai thi, Malik sahab ke spray se pura lawn dobara green aur fresh ho gaya!'
    },
    {
      id: 'PRO-112',
      name: 'Ustad Yaqoob',
      title: 'Industrial & Domestic Welder',
      service: 'Welder',
      rating: 4.88,
      reviews: 195,
      responseRate: '97%',
      responseTime: '12 mins',
      experience: '13+ Years',
      completedJobs: '1,120+',
      hourlyRate: 'Rs. 1,450/hr',
      location: 'Old Shujabad Road, Cantt & New Multan',
      verified: true,
      available: true,
      image: welderImg,
      skills: ['Main Gate Heavy Hinges', 'Safety Window Grills', 'Spiral Metal Stairs', 'Argon & Arc Welding'],
      bio: 'Heavy-duty argon and electric arc welder. Door hinges, iron sheds, structural beams, and precision security locks.',
      customerQuote: 'Bhari iron main gate zameen se lag raha tha, Ustad Yaqoob ne hydraulic jack se lift karke heavy hinges weld kiye.'
    }
  ]

  // Filter Pipeline (Highest rated first by default)
  const filteredProfessionals = useMemo(() => {
    return professionalsList
      .filter((pro) => {
        // Category filter
        if (selectedCategory !== 'All' && pro.service.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false
        }
        // Verified filter
        if (verifiedOnly && !pro.verified) {
          return false
        }
        return true
      })
      .sort((a, b) => b.rating - a.rating)
  }, [professionalsList, selectedCategory, verifiedOnly])

  const handleBook = (pro) => {
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('services', pro.service)
    }
  }

  const handleMessage = (pro) => {
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('Messages')
    }
  }

  return (
    <div className="professionals-page">
      {/* ── HERO BANNER ── */}
      <section className="professionals-hero">
        <img src={heroBanner} alt="Multan Professionals" className="pro-hero-bg" />
        <div className="pro-hero-overlay" aria-hidden="true"></div>
        <div className="pro-hero-content">
          <div className="pro-hero-badge">
            <span>🛡️ 100% Background Checked &amp; Police Verified Multan Experts</span>
          </div>
          <h1 className="hero-title">
            <span className="hero-title-mint-shine">Top-Rated Multan Professionals</span>
          </h1>
          <p className="pro-hero-sub">
            Directly connect with certified technicians who maintain highest ratings, quickest response rates, and transparent PKR pricing in Multan.
          </p>

          {/* Quick Metrics Bar (Clean bare stats without card background or star/lightning icons) */}
          <div className="pro-hero-metrics">
            <div className="pro-metric-item">
              <span className="pro-metric-num">4.93</span>
              <span className="pro-metric-lbl">Avg. Customer Rating</span>
            </div>
            <div className="pro-metric-div"></div>
            <div className="pro-metric-item">
              <span className="pro-metric-num">&lt; 10 Mins</span>
              <span className="pro-metric-lbl">Fastest Response</span>
            </div>
            <div className="pro-metric-div"></div>
            <div className="pro-metric-item">
              <span className="pro-metric-num">12,500+</span>
              <span className="pro-metric-lbl">Jobs Completed</span>
            </div>
            <div className="pro-metric-div"></div>
            <div className="pro-metric-item">
              <span className="pro-metric-num">100%</span>
              <span className="pro-metric-lbl">Identity Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIRECTORY CONTROLS SECTION ── */}
      <section className="pro-controls-section">
        <div className="pro-controls-wrapper">
          {/* Category Filter Navigation (Bare text tabs, shifted up in place of search bar) */}
          <div className="pro-category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`pro-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'All' ? '✨ All Top Experts' : cat}
              </button>
            ))}
          </div>

          {/* Active Status Bar */}
          <div className="pro-status-bar">
            <span className="pro-results-count">
              Showing <strong>{filteredProfessionals.length}</strong> top-rated technicians in Multan
            </span>
            <label className="pro-verified-toggle">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
              />
              <span className="pro-toggle-slider"></span>
              <span className="pro-toggle-text">Verified Professionals Only</span>
            </label>
          </div>
        </div>
      </section>

      {/* ── PROFESSIONALS DIRECTORY GRID ── */}
      <section className="pro-grid-section">
        <div className="pro-grid-wrapper">
          {filteredProfessionals.length === 0 ? (
            <div className="pro-empty-state">
              <span className="pro-empty-icon">🔍</span>
              <h3>No matching professionals found</h3>
              <p>Try choosing another service category.</p>
              <button
                className="pro-reset-btn"
                onClick={() => {
                  setSelectedCategory('All')
                  setVerifiedOnly(false)
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="pro-grid">
              {filteredProfessionals.map((pro) => (
                <div key={pro.id} className="pro-card">
                  {/* Card Header with Avatar & Status */}
                  <div className="pro-card-header">
                    <div className="pro-avatar-box">
                      <img src={pro.image} alt={pro.name} className="pro-avatar-img" />
                      {pro.verified && (
                        <span className="pro-avatar-verified" title="Verified Multan Expert">
                          ✓
                        </span>
                      )}
                    </div>
                    <div className="pro-header-info">
                      <div className="pro-name-row">
                        <h3 className="pro-name">{pro.name}</h3>
                      </div>
                      <span className="pro-title-badge">{pro.title}</span>
                      <span className="pro-live-status">
                        <span className="pro-pulse-dot"></span> Available Today in Multan
                      </span>
                    </div>
                  </div>

                  {/* Highlight Metrics (High Rating & Fast Response) */}
                  <div className="pro-metrics-strip">
                    <div className="pro-stat-chip">
                      <span className="pro-stat-val">⭐ {pro.rating}</span>
                      <span className="pro-stat-sub">({pro.reviews} reviews)</span>
                    </div>
                    <div className="pro-stat-chip">
                      <span className="pro-stat-val">⚡ {pro.responseRate}</span>
                      <span className="pro-stat-sub">in ~{pro.responseTime}</span>
                    </div>
                    <div className="pro-stat-chip">
                      <span className="pro-stat-val">🏆 {pro.experience}</span>
                      <span className="pro-stat-sub">{pro.completedJobs} jobs</span>
                    </div>
                  </div>

                  {/* Location & Pricing */}
                  <div className="pro-meta-row">
                    <div className="pro-location">
                      <span className="pro-loc-icon">📍</span>
                      <span>{pro.location}</span>
                    </div>
                    <div className="pro-price">
                      <span className="pro-price-tag">{pro.hourlyRate}</span>
                    </div>
                  </div>

                  {/* Skills Tag Chips */}
                  <div className="pro-skills-box">
                    {pro.skills.map((skill, idx) => (
                      <span key={idx} className="pro-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Customer Quote Snippet */}
                  <div className="pro-quote-box">
                    <span className="pro-quote-mark">“</span>
                    <p className="pro-quote-text">{pro.customerQuote}</p>
                  </div>

                  {/* Card Actions */}
                  <div className="pro-actions-row">
                    <button
                      type="button"
                      className="pro-book-btn"
                      onClick={() => handleBook(pro)}
                    >
                      Book Technician →
                    </button>
                    <button
                      type="button"
                      className="pro-msg-btn"
                      onClick={() => handleMessage(pro)}
                      title="Direct Chat with Technician"
                    >
                      💬 Message
                    </button>
                    <button
                      type="button"
                      className="pro-profile-btn"
                      onClick={() => setSelectedProModal(pro)}
                      title="View Verified Profile Details"
                    >
                      Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── WHY CHOOSE MUX VERIFIED PROFESSIONALS (3 Cards with 3D Scroll Flow) ── */}
      <section className="pro-trust-banner">
        <div className="pro-trust-wrapper">
          <div className="pro-trust-header">
            <span className="pro-trust-badge">MUX VERIFIED GUARANTEE</span>
            <h2>Why Book Multan Technicians on MUX Services?</h2>
            <p>Every technician is strictly screened for technical expertise, background record, and customer respect.</p>
          </div>

          <div 
            ref={trustGridRef} 
            className={`pro-trust-grid ${trustCardsOpen ? 'trust-cards-open' : ''}`}
          >
            <div className="pro-trust-card">
              <span className="pro-trust-icon">🛡️</span>
              <h4>CNIC &amp; Police Background Checked</h4>
              <p>Strict identity and criminal record screening before any technician is onboarded to your home.</p>
            </div>
            <div className="pro-trust-card">
              <span className="pro-trust-icon">⏱️</span>
              <h4>Punctual On-Time Doorstep Arrival</h4>
              <p>Average arrival within 30 minutes across Multan with complete specialized professional tools.</p>
            </div>
            <div className="pro-trust-card">
              <span className="pro-trust-icon">💵</span>
              <h4>Transparent PKR Pricing</h4>
              <p>Agreed pricing upfront before work starts. Zero surprise add-ons or hidden charges guaranteed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROFILE MODAL DETAIL VIEW ── */}
      {selectedProModal && (
        <div className="pro-modal-backdrop" onClick={() => setSelectedProModal(null)}>
          <div className="pro-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="pro-modal-close" onClick={() => setSelectedProModal(null)} title="Close">
              ✕
            </button>

            <div className="pro-modal-header">
              <img src={selectedProModal.image} alt={selectedProModal.name} className="pro-modal-avatar" />
              <div>
                <div className="pro-modal-name-row">
                  <h3>{selectedProModal.name}</h3>
                  <span className="pro-modal-verified">✓ Verified Expert</span>
                </div>
                <p className="pro-modal-sub">{selectedProModal.title}</p>
                <div className="pro-modal-rating">
                  ⭐ <strong>{selectedProModal.rating}</strong> ({selectedProModal.reviews} authentic reviews) • ⚡ <strong>{selectedProModal.responseRate}</strong> response
                </div>
              </div>
            </div>

            <div className="pro-modal-body">
              <h4>About the Professional</h4>
              <p className="pro-modal-bio">{selectedProModal.bio}</p>

              <h4>Verified Service Areas in Multan</h4>
              <p className="pro-modal-loc">📍 {selectedProModal.location}</p>

              <h4>Core Technical Skills</h4>
              <div className="pro-modal-skills">
                {selectedProModal.skills.map((s, idx) => (
                  <span key={idx} className="pro-skill-tag active-tag">{s}</span>
                ))}
              </div>

              <h4>Agreed Pricing</h4>
              <div className="pro-modal-price-box">
                <span className="pro-modal-price">{selectedProModal.hourlyRate}</span>
                <span className="pro-modal-note">No travel surcharge in verified service zones</span>
              </div>
            </div>

            <div className="pro-modal-actions">
              <button
                type="button"
                className="pro-book-btn"
                onClick={() => {
                  setSelectedProModal(null)
                  handleBook(selectedProModal)
                }}
              >
                Hire &amp; Book Service Now →
              </button>
              <button
                type="button"
                className="pro-msg-btn"
                onClick={() => {
                  setSelectedProModal(null)
                  handleMessage(selectedProModal)
                }}
              >
                💬 Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Professionals
