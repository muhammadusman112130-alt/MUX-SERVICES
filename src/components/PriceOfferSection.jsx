import './PriceOfferSection.css'

function PriceOfferSection({ setCurrentPage }) {
  return (
    <section className="price-offer-section">
      <div className="container">
        <div className="price-content">
          <div className="price-text">
            <h2 className="price-title">Aapka Unique Feature - Price Offer</h2>
            <p className="price-description">
              Get the best prices for your services. Our platform ensures competitive pricing 
              and transparent cost estimates from verified professionals.
            </p>
            <ul className="price-features">
              <li>✓ Compare prices from multiple professionals</li>
              <li>✓ Get instant price estimates</li>
              <li>✓ No hidden charges</li>
              <li>✓ Best price guarantee</li>
            </ul>
            <button 
              type="button" 
              className="price-button"
              onClick={() => typeof setCurrentPage === 'function' && setCurrentPage('services')}
            >
              Get Free Quote
            </button>
          </div>
          <div className="price-visual">
            <div className="price-card">
              <div className="price-header">
                <span className="price-label">Starting from</span>
                <span className="price-amount">Rs. 500</span>
              </div>
              <div className="price-body">
                <div className="price-item">
                  <span className="item-name">Basic Service</span>
                  <span className="item-price">Rs. 500 - Rs. 1,500</span>
                </div>
                <div className="price-item">
                  <span className="item-name">Standard Service</span>
                  <span className="item-price">Rs. 1,500 - Rs. 3,500</span>
                </div>
                <div className="price-item">
                  <span className="item-name">Premium Service</span>
                  <span className="item-price">Rs. 5,000+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PriceOfferSection
