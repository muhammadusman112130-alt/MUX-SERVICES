import './ProfessionalsSection.css'

function ProfessionalsSection() {
  const professionals = [
    {
      name: 'QASWAR ABBAS',
      service: 'Electrician',
      rating: 4.9,
      reviews: 234,
      image: '👨‍🔧',
      verified: true,
      badge: '⚡ Master Electrician',
      detail: 'Wiring, Circuit Breakers, Solar Setup & 24/7 Emergency Repairs',
      skills: ['Wiring & Circuits', 'Solar Setup', 'Emergency 24/7'],
      experience: '8+ Years Exp',
      completedJobs: '450+ Jobs',
      rate: '$30/hr'
    },
    {
      name: 'SANWAL RIAZ',
      service: 'Plumber',
      rating: 4.8,
      reviews: 189,
      image: '👩‍🔧',
      verified: true,
      badge: '🔧 Master Plumber',
      detail: 'Pipe Repairs, Leak Detection, Bathroom Fitting & Drainage Fixes',
      skills: ['Leak Detection', 'Pipe Fitting', 'Drain Cleaning'],
      experience: '6+ Years Exp',
      completedJobs: '320+ Jobs',
      rate: '$25/hr'
    },
    {
      name: 'MUZAMIL ABBAS',
      service: 'Carpenter',
      rating: 4.7,
      reviews: 156,
      image: '👨‍🏭',
      verified: true,
      badge: '🪚 Artisan Carpenter',
      detail: 'Custom Wood Furniture, Door Lock Fitting & Wooden Restorations',
      skills: ['Custom Woodwork', 'Cabinetry', 'Furniture Repair'],
      experience: '7+ Years Exp',
      completedJobs: '280+ Jobs',
      rate: '$28/hr'
    },
    {
      name: 'MUDASSIR ABBAS',
      service: 'Cleaner',
      rating: 4.9,
      reviews: 298,
      image: '👩‍💼',
      verified: true,
      badge: '🧹 Deep Clean Pro',
      detail: 'Full House Sanitization, Floor Polishing & Kitchen Deep Cleaning',
      skills: ['Full Sanitization', 'Floor Polish', 'Deep Kitchen Clean'],
      experience: '5+ Years Exp',
      completedJobs: '510+ Jobs',
      rate: '$20/hr'
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
                <span className="avatar">{pro.image}</span>
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
                  
                  {/* Skills tags with hover animation */}
                  <div className="pro-service-tags">
                    {pro.skills.map((skill, idx) => (
                      <span key={idx} className="pro-skill-tag">✓ {skill}</span>
                    ))}
                  </div>

                  <div className="pro-service-stats">
                    <span className="pro-stat-chip">🏆 {pro.experience}</span>
                    <span className="pro-stat-chip">✅ {pro.completedJobs}</span>
                  </div>
                </div>

                <div className="professional-rating">
                  <span className="stars">⭐⭐⭐⭐⭐</span>
                  <span className="rating-number">{pro.rating}</span>
                  <span className="reviews">({pro.reviews} reviews)</span>
                  <strong className="pro-rate-tag">{pro.rate}</strong>
                </div>
                <button className="hire-button">
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
