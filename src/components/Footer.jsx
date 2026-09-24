import './Footer.css'

function Footer({ setCurrentPage }) {
  const handleNav = (page) => {
    if (typeof setCurrentPage === 'function') {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">ServiceHub</h3>
            <p className="footer-description">
              Your trusted platform for finding skilled professionals for all your needs.
            </p>
            <div className="social-links">
              <button type="button" onClick={(e) => e.preventDefault()} className="social-link" title="Facebook">📘</button>
              <button type="button" onClick={(e) => e.preventDefault()} className="social-link" title="Twitter">🐦</button>
              <button type="button" onClick={(e) => e.preventDefault()} className="social-link" title="Instagram">📸</button>
              <button type="button" onClick={(e) => e.preventDefault()} className="social-link" title="LinkedIn">💼</button>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><button type="button" onClick={() => handleNav('home')} className="footer-nav-btn">Home</button></li>
              <li><button type="button" onClick={() => handleNav('services')} className="footer-nav-btn">Services</button></li>
              <li><button type="button" onClick={() => handleNav('professionals')} className="footer-nav-btn">Professionals</button></li>
              <li><button type="button" onClick={() => handleNav('about')} className="footer-nav-btn">About Us</button></li>
              <li><button type="button" onClick={() => handleNav('contact')} className="footer-nav-btn">Contact</button></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li><button type="button" onClick={() => handleNav('services')} className="footer-nav-btn">Home Services</button></li>
              <li><button type="button" onClick={() => handleNav('services')} className="footer-nav-btn">Repairs</button></li>
              <li><button type="button" onClick={() => handleNav('services')} className="footer-nav-btn">Tech Support</button></li>
              <li><button type="button" onClick={() => handleNav('services')} className="footer-nav-btn">Creative Services</button></li>
              <li><button type="button" onClick={() => handleNav('services')} className="footer-nav-btn">Business Services</button></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">Contact Us</h4>
            <ul className="footer-contact">
              <li>📍 123 Service Street, Multan, Pakistan</li>
              <li>📞 +92 300 1234567</li>
              <li>✉️ info@servicehub.com</li>
              <li>⏰ Mon-Sat: 9AM - 6PM</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 ServiceHub. All rights reserved.</p>
          <div className="footer-bottom-links">
            <button type="button" onClick={(e) => e.preventDefault()} className="footer-policy-btn">Privacy Policy</button>
            <button type="button" onClick={(e) => e.preventDefault()} className="footer-policy-btn">Terms of Service</button>
            <button type="button" onClick={(e) => e.preventDefault()} className="footer-policy-btn">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
