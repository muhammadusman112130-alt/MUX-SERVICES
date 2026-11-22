import { useState, useEffect, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import CategorySection from './components/CategorySection'
import MuxTickerStrips from './components/MuxTickerStrips'
import PriceOfferSection from './components/PriceOfferSection'
import ProfessionalsSection from './components/ProfessionalsSection'
import TrustSection from './components/TrustSection'
import CallToActionSection from './components/CallToActionSection'
import Footer from './components/Footer'
import { authAPI } from './services/api'

// Route-based Code Splitting: Lazy load non-home pages so initial Home payload is minimal
const Services = lazy(() => import('./pages/Services'))
const Professionals = lazy(() => import('./pages/Professionals'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Profile = lazy(() => import('./pages/Profile'))
const MyBookings = lazy(() => import('./pages/MyBookings'))
const Messages = lazy(() => import('./pages/Messages'))
const ProviderDashboard = lazy(() => import('./provider/ProviderDashboard'))
const ProviderLogin = lazy(() => import('./provider/ProviderLogin'))
const ProviderVerification = lazy(() => import('./provider/ProviderVerification'))

const VALID_PAGES = [
  'home',
  'services',
  'professionals',
  'about',
  'contact',
  'booked',
  'bookings',
  'messages',
  'profile',
  'provider-dashboard',
  'provider-login',
  'provider-verification'
]

const getInitialPageState = () => {
  try {
    const rawPath = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '')
    const params = new URLSearchParams(window.location.search)

    if (rawPath === 'login' || params.get('auth') === 'login') {
      return { page: 'home', auth: 'login', query: '' }
    }
    if (rawPath === 'signup' || params.get('auth') === 'signup') {
      return { page: 'home', auth: 'signup', query: '' }
    }

    const query = params.get('service') || params.get('category') || params.get('q') || params.get('query') || ''

    if (rawPath) {
      if (rawPath === 'bookings') return { page: 'booked', auth: null, query }
      if (VALID_PAGES.includes(rawPath)) {
        return { page: rawPath, auth: null, query }
      }
    }

    if (window.history.state && window.history.state.page) {
      const p = window.history.state.page === 'bookings' ? 'booked' : window.history.state.page
      return {
        page: p,
        auth: window.history.state.auth || null,
        query: window.history.state.query || ''
      }
    }

    const saved = sessionStorage.getItem('mux_active_page') || localStorage.getItem('mux_active_page')
    if (saved && VALID_PAGES.includes(saved.toLowerCase())) {
      const p = saved.toLowerCase() === 'bookings' ? 'booked' : saved.toLowerCase()
      const savedQuery = sessionStorage.getItem('mux_search_query') || ''
      return { page: p, auth: null, query: savedQuery }
    }
  } catch (e) {
    console.warn('Error reading initial page state:', e)
  }

  return { page: 'home', auth: null, query: '' }
}

const getUrlForState = (page, auth = null, query = '') => {
  if (auth === 'login') return '/login'
  if (auth === 'signup') return '/signup'
  if (page === 'home') return '/'
  const base = `/${page.toLowerCase()}`
  if (query && query.trim()) {
    return `${base}?service=${encodeURIComponent(query.trim())}`
  }
  return base
}

function App() {
  const initialBoot = getInitialPageState()
  const [currentPage, setCurrentPage] = useState(initialBoot.page)
  const [initialSearchQuery, setInitialSearchQuery] = useState(initialBoot.query)
  const [authPage, setAuthPage] = useState(initialBoot.auth) // 'login' or 'signup' or null
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [isProviderLoggedIn, setIsProviderLoggedIn] = useState(() => initialBoot.page === 'provider-dashboard')

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

  // Browser Native Back/Forward Navigation & Refresh State Synchronization
  useEffect(() => {
    // Keep active URL aligned on mount/refresh
    const targetUrl = getUrlForState(currentPage, authPage, initialSearchQuery)
    window.history.replaceState({ page: currentPage, auth: authPage, query: initialSearchQuery }, '', targetUrl)

    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        const p = event.state.page === 'bookings' ? 'booked' : event.state.page
        setCurrentPage(p)
        setAuthPage(event.state.auth || null)
        setInitialSearchQuery(event.state.query || '')
        try {
          sessionStorage.setItem('mux_active_page', p)
        } catch (e) {
          console.warn(e)
        }
      } else {
        const restored = getInitialPageState()
        setCurrentPage(restored.page)
        setAuthPage(restored.auth)
        setInitialSearchQuery(restored.query)
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handlePageChange = (page, query = '', pushToHistory = true) => {
    const normalized = page === 'bookings' ? 'booked' : (page === 'Booked' ? 'booked' : (page === 'Messages' ? 'messages' : page))
    setInitialSearchQuery(query || '')
    if (normalized === 'provider-dashboard') {
      setIsProviderLoggedIn(true)
    }
    setCurrentPage(normalized)
    setAuthPage(null)

    try {
      sessionStorage.setItem('mux_active_page', normalized)
      localStorage.setItem('mux_active_page', normalized)
      if (query) {
        sessionStorage.setItem('mux_search_query', query)
      } else {
        sessionStorage.removeItem('mux_search_query')
      }
    } catch (e) {
      console.warn(e)
    }

    const targetUrl = getUrlForState(normalized, null, query)
    if (pushToHistory) {
      window.history.pushState({ page: normalized, auth: null, query }, '', targetUrl)
    } else {
      window.history.replaceState({ page: normalized, auth: null, query }, '', targetUrl)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLoginClick = (pushToHistory = true) => {
    setAuthPage('login')
    const targetUrl = getUrlForState(currentPage, 'login')
    if (pushToHistory) {
      window.history.pushState({ page: currentPage, auth: 'login', query: initialSearchQuery }, '', targetUrl)
    } else {
      window.history.replaceState({ page: currentPage, auth: 'login', query: initialSearchQuery }, '', targetUrl)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSignupClick = (pushToHistory = true) => {
    setAuthPage('signup')
    const targetUrl = getUrlForState(currentPage, 'signup')
    if (pushToHistory) {
      window.history.pushState({ page: currentPage, auth: 'signup', query: initialSearchQuery }, '', targetUrl)
    } else {
      window.history.replaceState({ page: currentPage, auth: 'signup', query: initialSearchQuery }, '', targetUrl)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToHome = () => {
    setAuthPage(null)
    handlePageChange('home', '', true)
  }

  const handleLogin = (user) => {
    setCurrentUser(user || authAPI.getStoredUser())
    setIsLoggedIn(true)
    setIsProviderLoggedIn(false)
    setAuthPage(null)

    // Check if there was a pending service category chosen before login
    let pendingCategory = null
    try {
      pendingCategory = localStorage.getItem('pending_service_category')
      if (pendingCategory) {
        localStorage.removeItem('pending_service_category')
      }
    } catch (e) {
      console.warn('Storage read notice:', e)
    }

    if (pendingCategory) {
      handlePageChange('services', pendingCategory)
    } else {
      handlePageChange('home', '', true)
    }
  }

  const handleProviderLogin = () => {
    setIsProviderLoggedIn(true)
    setIsLoggedIn(false)
    setAuthPage(null)
    handlePageChange('provider-dashboard', '', true)
  }

  const handleLogout = () => {
    authAPI.logout()
    setCurrentUser(null)
    setIsLoggedIn(false)
    setIsProviderLoggedIn(false)
    setAuthPage(null)
    handlePageChange('home', '', true)
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
        return (
          <Services 
            initialSearchQuery={initialSearchQuery} 
            setCurrentPage={handlePageChange} 
            isLoggedIn={isLoggedIn}
            onLoginClick={() => handleLoginClick(true)}
            currentUser={currentUser}
          />
        )
      case 'professionals':
        return <Professionals setCurrentPage={handlePageChange} />
      case 'about':
        return <About setCurrentPage={handlePageChange} />
      case 'contact':
        return <Contact setCurrentPage={handlePageChange} />
      case 'profile':
        return (
          <Profile 
            onLogout={handleLogout} 
            setCurrentPage={handlePageChange} 
            user={currentUser} 
            onUserUpdate={(updatedUser) => setCurrentUser(updatedUser)}
          />
        )
      case 'booked':
      case 'Booked':
      case 'bookings':
      case 'Bookings':
        return <MyBookings setCurrentPage={handlePageChange} />
      case 'messages':
      case 'Messages':
        return (
          <Messages 
            setCurrentPage={handlePageChange} 
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
          />
        )
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
      {/* Lazy-loaded Route Suspense Boundary with zero layout shift */}
      <Suspense fallback={
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid rgba(143, 211, 232, 0.2)', borderTopColor: '#8FD3E8', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
        </div>
      }>
        {renderPage()}
      </Suspense>
      {shouldShowFooter && <Footer setCurrentPage={handlePageChange} />}
    </div>
  )
}

export default App
