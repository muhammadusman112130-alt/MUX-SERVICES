import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import CategorySection from './components/CategorySection'
import MuxTickerStrips from './components/MuxTickerStrips'
import PriceOfferSection from './components/PriceOfferSection'
import ProfessionalsSection from './components/ProfessionalsSection'
import TrustSection from './components/TrustSection'
import CallToActionSection from './components/CallToActionSection'
import Footer from './components/Footer'
import Services from './pages/Services'
import Professionals from './pages/Professionals'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import MyBookings from './pages/MyBookings'
import Messages from './pages/Messages'
import ProviderDashboard from './provider/ProviderDashboard'
import ProviderLogin from './provider/ProviderLogin'
import ProviderVerification from './provider/ProviderVerification'
import { authAPI } from './services/api'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [initialSearchQuery, setInitialSearchQuery] = useState('')
  const [authPage, setAuthPage] = useState(null) // 'login' or 'signup' or null
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [isProviderLoggedIn, setIsProviderLoggedIn] = useState(false)

  // Verify and sync logged-in user on load & clean legacy MDA storage
  useEffect(() => {
    // Clean up any stale MDA keys stored from port 5173
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.toLowerCase().includes('mda')) {
          localStorage.removeItem(key)
        }
      })
      Object.keys(sessionStorage).forEach((key) => {
        if (key.toLowerCase().includes('mda')) {
          sessionStorage.removeItem(key)
        }
      })
    } catch (e) {
      console.warn('Storage cleanup notice:', e)
    }

    const initAuth = async () => {
      if (authAPI.hasToken()) {
        const stored = authAPI.getStoredUser()
        if (stored) {
          setCurrentUser(stored)
          setIsLoggedIn(true)
        }

        try {
          const res = await authAPI.getMe()
          if (res.success && res.user) {
            setCurrentUser(res.user)
            setIsLoggedIn(true)
          }
        } catch (err) {
          console.warn('Session verification failed:', err.message)
          if (err.status === 401) {
            authAPI.logout()
            setCurrentUser(null)
            setIsLoggedIn(false)
          }
        }
      }
    }

    initAuth()
  }, [])

  // Browser Native Back/Forward Navigation Synchronization
  useEffect(() => {
    // Initialize base history state
    window.history.replaceState({ page: 'home', auth: null, query: '' }, '', '')

    const handlePopState = (event) => {
      if (event.state) {
        setCurrentPage(event.state.page || 'home')
        setAuthPage(event.state.auth || null)
        setInitialSearchQuery(event.state.query || '')
      } else {
        setCurrentPage('home')
        setAuthPage(null)
        setInitialSearchQuery('')
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handlePageChange = (page, query = '', pushToHistory = true) => {
    setInitialSearchQuery(query || '')
    if (page === 'provider-dashboard') {
      setIsProviderLoggedIn(true)
    }
    setCurrentPage(page)
    setAuthPage(null)

    if (pushToHistory) {
      window.history.pushState({ page, auth: null, query }, '', '')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLoginClick = (pushToHistory = true) => {
    setAuthPage('login')
    if (pushToHistory) {
      window.history.pushState({ page: currentPage, auth: 'login' }, '', '')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSignupClick = (pushToHistory = true) => {
    setAuthPage('signup')
    if (pushToHistory) {
      window.history.pushState({ page: currentPage, auth: 'signup' }, '', '')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToHome = () => {
    setAuthPage(null)
    setCurrentPage('home')
    window.history.pushState({ page: 'home', auth: null, query: '' }, '', '')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLogin = (user) => {
    setCurrentUser(user || authAPI.getStoredUser())
    setIsLoggedIn(true)
    setIsProviderLoggedIn(false)
    setAuthPage(null)
    setCurrentPage('home')
    window.history.pushState({ page: 'home', auth: null, query: '' }, '', '')
  }

  const handleProviderLogin = () => {
    setIsProviderLoggedIn(true)
    setIsLoggedIn(false)
    setAuthPage(null)
    setCurrentPage('home')
    window.history.pushState({ page: 'home', auth: null, query: '' }, '', '')
  }

  const handleLogout = () => {
    authAPI.logout()
    setCurrentUser(null)
    setIsLoggedIn(false)
    setIsProviderLoggedIn(false)
    setAuthPage(null)
    setCurrentPage('home')
    window.history.pushState({ page: 'home', auth: null, query: '' }, '', '')
  }

  const shouldShowFooter = !authPage && currentPage !== 'Messages' && currentPage !== 'messages'

  const renderPage = () => {
    if (authPage === 'login') {
      return (
        <Login 
          onSignupClick={() => handleSignupClick(true)} 
          onBackClick={handleBackToHome} 
          onLogin={handleLogin} 
        />
      )
    }

    if (authPage === 'signup') {
      return (
        <Signup 
          onLoginClick={() => handleLoginClick(true)} 
          onBackClick={handleBackToHome} 
        />
      )
    }

    switch(currentPage) {
      case 'home':
        return (
          <>
            <HeroSection setCurrentPage={handlePageChange} />
            <CategorySection setCurrentPage={handlePageChange} />
            <MuxTickerStrips />
            <PriceOfferSection setCurrentPage={handlePageChange} />
            <ProfessionalsSection setCurrentPage={handlePageChange} />
            <TrustSection />
            {!isProviderLoggedIn && <CallToActionSection setCurrentPage={handlePageChange} />}
          </>
        )
      case 'services':
        return <Services initialSearchQuery={initialSearchQuery} setCurrentPage={handlePageChange} />
      case 'professionals':
        return <Professionals setCurrentPage={handlePageChange} />
      case 'about':
        return <About />
      case 'contact':
        return <Contact />
      case 'profile':
        return <Profile onLogout={handleLogout} setCurrentPage={handlePageChange} user={currentUser} />
      case 'bookings':
      case 'Bookings':
        return <MyBookings setCurrentPage={handlePageChange} />
      case 'messages':
      case 'Messages':
        return <Messages setCurrentPage={handlePageChange} />
      case 'provider-dashboard':
        return <ProviderDashboard setCurrentPage={handlePageChange} onLogout={handleLogout} />
      case 'provider-login':
        return <ProviderLogin setCurrentPage={handlePageChange} onProviderLogin={handleProviderLogin} />
      case 'provider-verification':
        return <ProviderVerification setCurrentPage={handlePageChange} />
      default:
        return (
          <>
            <HeroSection setCurrentPage={handlePageChange} />
            <CategorySection setCurrentPage={handlePageChange} />
            <MuxTickerStrips />
            <PriceOfferSection setCurrentPage={handlePageChange} />
            <ProfessionalsSection setCurrentPage={handlePageChange} />
            <TrustSection />
            {!isProviderLoggedIn && <CallToActionSection setCurrentPage={handlePageChange} />}
          </>
        )
    }
  }

  return (
    <div className="app">
      {!authPage && (
        <Navbar 
          currentPage={currentPage}
          setCurrentPage={handlePageChange} 
          onLoginClick={() => handleLoginClick(true)} 
          onSignupClick={() => handleSignupClick(true)} 
          isLoggedIn={isLoggedIn} 
          currentUser={currentUser}
          isProviderLoggedIn={isProviderLoggedIn} 
          onLogout={handleLogout} 
        />
      )}
      {renderPage()}
      {shouldShowFooter && <Footer setCurrentPage={handlePageChange} />}
    </div>
  )
}

export default App
