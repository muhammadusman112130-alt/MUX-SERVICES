import './ProfessionalsSection.css'
import electricianImg from '../Public/electricon.png'
import plumberImg from '../Public/plumber.png'
import carpenterImg from '../Public/carpenter.png'
import cleanerImg from '../Public/cleaner.png'

function ProfessionalsSection() {
  const professionals = [
    {
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

  return (
    <section className="professionals-section" id="professionals">
      <div className="container">
        <h2 className="section-title">Top Professional Services</h2>
        <p className="section-subtitle">Highly rated verified experts delivering top-tier services with guaranteed quality</p>
        <div className="professionals-grid">
          {professionals.map((pro, index) => (
            <div key={index} className="professional-card">
              <div className="professional-image">
                <div className="avatar">
                  <img src={pro.image} alt={pro.name} className="avatar-photo-img" />
                </div>
                {pro.verified && <span className="verified-badge" title="Verified Expert">✓</span>}
              </div>
              <div className="professional-info">
                <h3 className="professional-name">{pro.name}</h3>

                {/* Service Detail Box with Animation */}
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
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', verticalAlign: '-1px' }}>
                        <circle cx="12" cy="8" r="7"/>
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                      </svg>
                      {pro.experience}
                    </span>
                    <span className="pro-stat-chip">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', verticalAlign: '-1px', color: '#16a34a' }}>
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {pro.completedJobs}
                    </span>
                  </div>
                </div>

                <div className="professional-rating">
                  <span className="stars-svg">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </span>
                  <span className="rating-number">{pro.rating}</span>
                  <span className="reviews">({pro.reviews} reviews)</span>
                  <strong className="pro-rate-tag">{pro.rate}</strong>
                </div>
                <button className="hire-button" type="button">
                  <span>Hire Now</span>
                  <span className="hire-btn-arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProfessionalsSection
