import './About.css'

function About() {
  const coreValues = [
    {
      icon: '🛡️',
      title: 'Trust',
      description: 'We vet every provider, so you can book with confidence. Your peace of mind is our priority.'
    },
    {
      icon: '🏆',
      title: 'Excellence',
      description: 'We never settle for "good enough." Every professional on our platform is top-tier.'
    },
    {
      icon: '🤝',
      title: 'Community',
      description: 'We empower local professionals and help neighbors help neighbors.'
    }
  ]

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <span className="hero-label">OUR STORY</span>
          <h1 className="hero-title">About MUX SERVICES — Multan's Premier Home Services Network.</h1>
          <p className="hero-description">
            We're on a mission to empower skilled professionals and simplify life for customers. 
            By creating a trusted service marketplace, we bridge the gap between talent and opportunity, 
            ensuring every home and business gets the expert care it deserves.
          </p>
          <button className="hero-button">Join Our Mission</button>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">
            <span className="placeholder-icon">👥</span>
            <p className="placeholder-text">Team Collaboration</p>
          </div>
        </div>
      </section>

      {/* Har Service Section */}
      <section className="har-service-section">
        <div className="section-content">
          <div className="text-content">
            <h2 className="section-title">COMPLETE HOME SERVICES IN ONE PLACE</h2>
            <p className="section-description">
              From plumbing and electrical wiring to AC repairs and deep cleaning, we centralize every home maintenance service you need in one secure, trusted platform. No more unreliable recommendations — just quality verified handymen, ready to help.
            </p>
            <div className="stats-card">
              <span className="stats-number">5M+</span>
              <span className="stats-label">JOBS COMPLETED</span>
            </div>
          </div>
          <div className="images-grid">
            <div className="image-card">
              <div className="image-placeholder small">
                <span className="placeholder-icon">🔧</span>
                <p className="placeholder-text">Expert Repairs</p>
              </div>
            </div>
            <div className="image-card">
              <div className="image-placeholder small">
                <span className="placeholder-icon">🤝</span>
                <p className="placeholder-text">Client Meeting</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="core-values-section">
        <div className="values-header">
          <h2 className="values-title">Our Core Values</h2>
          <p className="values-subtitle">The principles that drive every connection we make.</p>
        </div>
        <div className="values-grid">
          {coreValues.map((value, index) => (
            <div key={index} className="value-card">
              <div className="value-icon">{value.icon}</div>
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fair Pricing Section */}
      <section className="fair-pricing-section">
        <div className="pricing-content">
          <div className="pricing-text">
            <span className="pricing-label">INNOVATION</span>
            <h2 className="pricing-title">Fair Pricing Through Smart Bidding</h2>
            <p className="pricing-description">
              Our dynamic price-bidding system ensures you get the best value for your money. 
              Post your job, receive competitive bids from verified professionals, and choose 
              the perfect match based on expertise, ratings, and budget.
            </p>
            <ul className="pricing-features">
              <li>✓ Post exactly what you need done</li>
              <li>✓ Receive multiple bids from vetted pros</li>
              <li>✓ Compare profiles, ratings, and prices</li>
            </ul>
          </div>
          <div className="pricing-visual">
            <div className="bid-card">
              <div className="bid-header">
                <div className="bid-avatar">⚡</div>
                <div className="bid-info">
                  <h4 className="bid-name">Mr. Electrician</h4>
                  <div className="bid-rating">
                    <span className="stars">⭐⭐⭐⭐⭐</span>
                    <span className="rating-score">4.9</span>
                  </div>
                </div>
              </div>
              <div className="bid-body">
                <p className="bid-description">Complete electrical wiring and fixture installation for 2-bedroom apartment</p>
                <div className="bid-price">₹850</div>
              </div>
              <button className="bid-button">Accept Bid</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
