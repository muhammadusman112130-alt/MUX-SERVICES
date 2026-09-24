import './Navbar.css'
import webLogo from '../Public/Web-logo.png'

function Navbar({ 
  currentPage = 'home',
  setCurrentPage, 
  onLoginClick, 
  onSignupClick, 
  isLoggedIn, 
  isProviderLoggedIn, 
  onLogout 
}) {
  const isProviderAuthPage = currentPage === 'provider-login' || currentPage === 'provider-verification'

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <button 
            type="button" 
            className="logo-link" 
            onClick={() => setCurrentPage('home')}
            aria-label="Services Hub Home"
          >
            <img src={webLogo} alt="Services Hub Logo" className="logo-image" />
            <span className="logo-text">
              <span className="logo-text-services">SERVICES</span>
              <span className="logo-text-hub">HUB</span>
            </span>
          </button>
        </div>
        <ul className="navbar-menu">
          <li><button onClick={() => setCurrentPage('home')}><span className="nav-btn-text">Home</span></button></li>
          {!isProviderLoggedIn && !isProviderAuthPage && (
            <li><button onClick={() => setCurrentPage('services')}><span className="nav-btn-text">Services</span></button></li>
          )}
          {!isProviderLoggedIn && !isProviderAuthPage && (
            <li><button onClick={() => setCurrentPage('professionals')}><span className="nav-btn-text">Professionals</span></button></li>
          )}
          {isProviderLoggedIn && (
            <li><button onClick={() => setCurrentPage('provider-dashboard')}><span className="nav-btn-text">Dashboard</span></button></li>
          )}
          {isProviderLoggedIn && (
            <li><button onClick={() => setCurrentPage('Messages')}><span className="nav-btn-text">Messages</span></button></li>
          )}
          <li><button onClick={() => setCurrentPage('about')}><span className="nav-btn-text">About</span></button></li>
          <li><button onClick={() => setCurrentPage('contact')}><span className="nav-btn-text">Contact</span></button></li>
          {!isProviderLoggedIn && !isProviderAuthPage && isLoggedIn && (
            <>
              <li><button onClick={() => setCurrentPage('Bookings')}><span className="nav-btn-text">Bookings</span></button></li>
              <li><button onClick={() => setCurrentPage('Messages')}><span className="nav-btn-text">Messages</span></button></li>
              <li><button onClick={() => setCurrentPage('profile')}><span className="nav-btn-text">Profile</span></button></li>
            </>
          )}
        </ul>
        <div className="navbar-auth">
          {isProviderLoggedIn || isLoggedIn ? (
            <button className="btn-logout" onClick={onLogout}>
              Logout
            </button>
          ) : !isProviderAuthPage ? (
            <>
              <button className="btn-login" onClick={onLoginClick}>Login</button>
              <button className="btn-signup" onClick={onSignupClick}>Sign Up</button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
