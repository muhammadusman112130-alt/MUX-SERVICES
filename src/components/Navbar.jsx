import { useState, useRef, useEffect } from 'react'
import './Navbar.css'
import webLogo from '../Public/web logo.png'

function Navbar({ 
  currentPage = 'home',
  setCurrentPage, 
  onLoginClick, 
  onSignupClick, 
  isLoggedIn, 
  currentUser,
  isProviderLoggedIn, 
  onLogout 
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navRef = useRef(null)
  const toggleBtnRef = useRef(null)
  const isProviderAuthPage = currentPage === 'provider-login' || currentPage === 'provider-verification'

  useEffect(() => {
    setIsMenuOpen(false)
  }, [currentPage])

  useEffect(() => {
    if (!isMenuOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
        toggleBtnRef.current?.focus()
      }
    }

    const handlePointerDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }

    const mediaQuery = window.matchMedia(isLoggedIn ? '(min-width: 1440px)' : '(min-width: 1201px)')
    const handleMediaChange = () => setIsMenuOpen(false)

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [isMenuOpen, isLoggedIn])

  const handleNavClick = (e) => {
    if (e.target.closest('button') && !e.target.closest('.navbar-menu-toggle')) {
      setIsMenuOpen(false)
    }
  }

  return (
    <nav 
      className={`navbar${isLoggedIn ? ' navbar--account' : ''}`} 
      ref={navRef} 
      aria-label="Main navigation" 
      onClick={handleNavClick}
    >
      <div className={`navbar-container${isMenuOpen ? ' is-menu-open' : ''}`}>
        <div className="navbar-logo">
          <button 
            type="button" 
            className="logo-link" 
            onClick={() => setCurrentPage('home')}
            aria-label="MUX SERVICES Home"
          >
            <img src={webLogo} alt="MUX SERVICES Logo" className="logo-image" />
            <span className="logo-text">
              <span className="logo-text-mux">MUX</span>
              <span className="logo-text-services">SERVICES</span>
            </span>
          </button>
        </div>

        <button
          type="button"
          className="navbar-menu-toggle"
          ref={toggleBtnRef}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation account-navigation"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {isMenuOpen ? (
              <path d="m6 6 12 12M6 18 18 6" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>

        <ul className="navbar-menu" id="main-navigation">
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
          {currentPage === 'provider-verification' && (
            <li className="navbar-mobile-provider-link">
              <button onClick={() => setCurrentPage('Messages')}>
                <span className="nav-btn-text">Messages</span>
              </button>
            </li>
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

        <div className="navbar-auth" id="account-navigation">
          {isProviderLoggedIn || isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {currentUser && (
                <button 
                  className="navbar-profile"
                  onClick={() => setCurrentPage('profile')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    borderRadius: '20px',
                    padding: '0.35rem 0.85rem',
                    color: '#ffffff',
                    fontSize: 'max(var(--minimum-font-size, 0px), 0.85rem)',
                    cursor: 'pointer'
                  }}
                  title="View Profile"
                >
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </span>
                  <span style={{ fontWeight: 600, maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {currentUser.fullName || currentUser.email}
                  </span>
                </button>
              )}
              <button className="btn-logout" onClick={onLogout}>
                Logout
              </button>
            </div>
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
