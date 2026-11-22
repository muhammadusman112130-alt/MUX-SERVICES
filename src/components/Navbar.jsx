import { useState, useRef, useEffect } from 'react'
import './Navbar.css'
import brandLogo from '../Public/brand-logo-cyan-v3.png'

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
    if ((e.target.closest('button') || e.target.closest('a')) && !e.target.closest('.navbar-menu-toggle')) {
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
          <a
            href="/"
            className="logo-link"
            onClick={(e) => {
              e.preventDefault()
              setCurrentPage('home')
            }}
            aria-label="MUX SERVICES Home"
          >
            <img 
              src={brandLogo} 
              alt="MUX SERVICES Logo" 
              className="navbar-brand-icon"
              style={{
                height: '56px',
                width: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 12px rgba(23, 247, 247, 0.9)) drop-shadow(0 0 24px rgba(23, 247, 247, 0.5))'
              }}
            />
            <span
              className="brand-logo-text-wrap"
              style={{
                background: 'none',
                fontWeight: 900,
                fontSize: '1.52rem',
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span
                className="brand-logo-mux"
                style={{
                  color: '#ffffff',
                  WebkitTextFillColor: '#ffffff',
                  textShadow: '0 0 14px rgba(255, 255, 255, 0.8), 0 0 28px rgba(238, 244, 244, 0.5)'
                }}
              >
                MUX
              </span>
              <span
                className="brand-logo-services"
                style={{
                  color: '#17f7f7',
                  WebkitTextFillColor: '#17f7f7',
                  textShadow: '0 0 14px rgba(23, 247, 247, 0.9), 0 0 30px rgba(23, 247, 247, 0.6)'
                }}
              >
                SERVICES
              </span>
            </span>
          </a>
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
          <li>
            <a href="/" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>
              <span className="nav-btn-text">Home</span>
            </a>
          </li>
          {!isProviderLoggedIn && !isProviderAuthPage && (
            <li>
              <a href="/services" onClick={(e) => { e.preventDefault(); setCurrentPage('services'); }}>
                <span className="nav-btn-text">Services</span>
              </a>
            </li>
          )}
          {!isProviderLoggedIn && !isProviderAuthPage && (
            <li>
              <a href="/professionals" onClick={(e) => { e.preventDefault(); setCurrentPage('professionals'); }}>
                <span className="nav-btn-text">Professionals</span>
              </a>
            </li>
          )}
          {isProviderLoggedIn && (
            <li>
              <a href="/provider-dashboard" onClick={(e) => { e.preventDefault(); setCurrentPage('provider-dashboard'); }}>
                <span className="nav-btn-text">Dashboard</span>
              </a>
            </li>
          )}
          {isProviderLoggedIn && (
            <li>
              <a href="/messages" onClick={(e) => { e.preventDefault(); setCurrentPage('messages'); }}>
                <span className="nav-btn-text">Messages</span>
              </a>
            </li>
          )}
          {currentPage === 'provider-verification' && (
            <li className="navbar-mobile-provider-link">
              <a href="/messages" onClick={(e) => { e.preventDefault(); setCurrentPage('messages'); }}>
                <span className="nav-btn-text">Messages</span>
              </a>
            </li>
          )}
          <li>
            <a href="/about" onClick={(e) => { e.preventDefault(); setCurrentPage('about'); }}>
              <span className="nav-btn-text">About</span>
            </a>
          </li>
          <li>
            <a href="/contact" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}>
              <span className="nav-btn-text">Contact</span>
            </a>
          </li>
          {!isProviderLoggedIn && !isProviderAuthPage && isLoggedIn && (
            <>
              <li>
                <a href="/booked" onClick={(e) => { e.preventDefault(); setCurrentPage('booked'); }}>
                  <span className="nav-btn-text">Booked</span>
                </a>
              </li>
              <li>
                <a href="/messages" onClick={(e) => { e.preventDefault(); setCurrentPage('messages'); }}>
                  <span className="nav-btn-text">Messages</span>
                </a>
              </li>
            </>
          )}
        </ul>

        <div className="navbar-auth" id="account-navigation">
          {isProviderLoggedIn || isLoggedIn ? (
            <div className="navbar-account-actions">
              <button
                type="button"
                className={`navbar-user-pill ${currentPage === 'profile' ? 'active' : ''}`}
                onClick={() => setCurrentPage('profile')}
                title="View &amp; Edit Profile"
              >
                <span className="nup-avatar-circle">
                  <span className="nup-avatar-text">
                    {currentUser?.fullName
                      ? currentUser.fullName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
                      : 'ALI'}
                  </span>
                  <span className="nup-live-dot"></span>
                </span>
                <span className="nup-user-name">
                  {currentUser?.fullName || 'Ali'}
                </span>
              </button>

              <button type="button" className="btn-logout" onClick={onLogout}>
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
