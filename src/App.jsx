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

const getPageFromPathname = (pathname = window.location.pathname) => {
  try {
    const clean = pathname.toLowerCase().replace(/^\/+|\/+$/g, '')
    if (!clean) return 'home'
    if (clean === 'bookings') return 'booked'
    if (clean === 'login' || clean === 'signup') return 'home'
    if (VALID_PAGES.includes(clean)) return clean
  } catch (e) {
    console.warn(e)
  }
  return 'home'
}

const getAuthFromPathname = (pathname = window.location.pathname) => {
  try {
    const clean = pathname.toLowerCase().replace(/^\/+|\/+$/g, '')
    if (clean === 'login') return 'login'
    if (clean === 'signup') return 'signup'
  } catch {}
  return null
}

const getQueryFromSearch = (search = window.location.search) => {
  try {
    const params = new URLSearchParams(search)
    return params.get('service') || params.get('category') || params.get('q') || ''
  } catch {
    return ''
  }
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
  const initialPage = getPageFromPathname()
  const initialAuth = getAuthFromPathname()
  const initialQuery = getQueryFromSearch()

  const [currentPage, setCurrentPage] = useState(initialPage)
  const [initialSearchQuery, setInitialSearchQuery] = useState(initialQuery)
  const [authPage, setAuthPage] = useState(initialAuth) // 'login' or 'signup' or null
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [isProviderLoggedIn, setIsProviderLoggedIn] = useState(() => initialPage === 'provider-dashboard')
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('mux_theme') || 'warm-stone'
    } catch {
      return 'warm-stone'
    }
  })

  // Synchronize theme to documentElement & body for global CSS targeting
  useEffect(() => {
    try {
      localStorage.setItem('mux_theme', theme)
    } catch {}
    document.documentElement.setAttribute('data-theme', theme)
    if (theme === 'warm-stone') {
      document.documentElement.classList.add('theme-warm-stone')
      document.body.classList.add('theme-warm-stone')
    } else {
      document.documentElement.classList.remove('theme-warm-stone')
      document.body.classList.remove('theme-warm-stone')
    }
  }, [theme])

  // Clean stale legacy storage on startup
  useEffect(() => {
    try {
      localStorage.removeItem('mux_active_page')
      localStorage.removeItem('mux_current_page')
      sessionStorage.removeItem('mux_active_page')
      sessionStorage.removeItem('mux_current_page')
    } catch {}
  }, [])

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

  // Native Browser History Synchronization (Back/Forward Arrow)
  useEffect(() => {
    // Keep active URL aligned on mount/refresh
    const targetUrl = getUrlForState(currentPage, authPage, initialSearchQuery)
    window.history.replaceState({ page: currentPage, auth: authPage, query: initialSearchQuery, service: initialSearchQuery || null }, '', targetUrl)

    const handlePopState = (event) => {
      // Direct 1-to-1 page navigation from browser history
      const poppedPage = event.state?.page || getPageFromPathname(window.location.pathname)
      const poppedAuth = event.state?.auth || getAuthFromPathname(window.location.pathname)
      const poppedQuery = event.state?.query || getQueryFromSearch(window.location.search)

      setCurrentPage(poppedPage)
      setAuthPage(poppedAuth)
      setInitialSearchQuery(poppedQuery)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handlePageChange = (page, query = '', pushToHistory = true) => {
    let normalized = page === 'bookings' ? 'booked' : (page === 'Booked' ? 'booked' : (page === 'Messages' ? 'messages' : page))
    
    // When provider is logged in, navigating to 'home' should keep them on provider-dashboard
    if (isProviderLoggedIn && (normalized === 'home' || normalized === '')) {
      normalized = 'provider-dashboard'
    }

    const isSamePage = normalized === currentPage && query === initialSearchQuery && authPage === null

    setInitialSearchQuery(query || '')
    if (normalized === 'provider-dashboard') {
      setIsProviderLoggedIn(true)
    }
    setCurrentPage(normalized)
    setAuthPage(null)

    const targetUrl = getUrlForState(normalized, null, query)
    const stateObj = { page: normalized, auth: null, query: query || '', service: query || null }

    if (pushToHistory && !isSamePage) {
      // If user navigates from home directly into a specific service category, insert /services into history
      // so browser Back always takes the user to the /services catalog first
      if (currentPage === 'home' && normalized === 'services' && query && query.trim()) {
        window.history.pushState({ page: 'services', auth: null, query: '', service: null }, '', '/services')
      }
      window.history.pushState(stateObj, '', targetUrl)
    } else {
      window.history.replaceState(stateObj, '', targetUrl)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleLoginClick = (pushToHistory = true) => {
    setAuthPage('login')
    const targetUrl = getUrlForState(currentPage, 'login')
    if (pushToHistory) {
      window.history.pushState({ page: currentPage, auth: 'login', query: initialSearchQuery }, '', targetUrl)
    } else {
      window.history.replaceState({ page: currentPage, auth: 'login', query: initialSearchQuery }, '', targetUrl)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleSignupClick = (pushToHistory = true) => {
    setAuthPage('signup')
    const targetUrl = getUrlForState(currentPage, 'signup')
    if (pushToHistory) {
      window.history.pushState({ page: currentPage, auth: 'signup', query: initialSearchQuery }, '', targetUrl)
    } else {
      window.history.replaceState({ page: currentPage, auth: 'signup', query: initialSearchQuery }, '', targetUrl)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
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
    // Automatically log out any active customer dashboard session
    try {
      authAPI.logout()
    } catch (e) {
      console.warn('Customer logout cleanup:', e)
    }
    setCurrentUser(null)
    setIsLoggedIn(false)
    setIsProviderLoggedIn(true)
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
        if (isProviderLoggedIn) {
          return <ProviderDashboard setCurrentPage={handlePageChange} onLogout={handleLogout} />
        }
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
            isProviderLoggedIn={isProviderLoggedIn}
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
            currentTheme={theme}
            onThemeChange={setTheme}
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
        if (isProviderLoggedIn) {
          return <ProviderDashboard setCurrentPage={handlePageChange} onLogout={handleLogout} />
        }
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
    <div className={`app theme-${theme}`} data-theme={theme}>
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
