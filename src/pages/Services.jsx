import { useState, useEffect, useRef } from 'react'
import { bookingsAPI } from '../services/api'
import './Services.css'
import webLogo from '../Public/brand-logo-cyan-v3.png'
import plumberImage from '../Public/plumber.webp'
import carpenterImage from '../Public/carpenter.webp'
import homeCleaningImage from '../Public/cleaner.webp'
import paintingImage from '../Public/painter.webp'
import servicesHeroBanner from '../assets/services-hero-banner.webp'
import aluminiumImage from '../Public/glass aluminum .webp'
import gardeningImage from '../Public/gardner.webp'
import acImage from '../Public/AC technicon.webp'
import welderImage from '../Public/welder.webp'
import laundryImage from '../Public/laundary.webp'
import electricianImage from '../Public/electricon.webp'
import applianceImage from '../Public/appliance.webp'
import categoryAcBanner from '../assets/category-ac-banner.webp'
import categoryElectricianBanner from '../assets/category-electrician-banner.webp'
import categoryPlumberBanner from '../assets/category-plumber-banner.webp'
import categoryCarpenterBanner from '../assets/category-carpenter-banner.webp'
import categoryCleaningBanner from '../assets/category-cleaning-banner.webp'
import categoryPainterBanner from '../assets/category-painter-banner.webp'
import categoryApplianceBanner from '../assets/category-appliance-banner.webp'
import categoryGardenerBanner from '../assets/category-gardener-banner.webp'
import categoryGlassBanner from '../assets/category-glass-banner.webp'
import categoryWelderBanner from '../assets/category-welder-banner.webp'
import categoryLaundryBanner from '../assets/category-laundry-banner.webp'
import providerProfileBanner from '../assets/provider-profile-banner.webp'
const electricianPng = electricianImage
const electricianJpg = electricianImage
const acPng = acImage
const paintingPng = paintingImage
const cleanerPng = homeCleaningImage
const aluminiumPng = aluminiumImage
const gardeningPng = gardeningImage
const laundryPng = laundryImage
const applianceJpg = applianceImage

const homeIcon = webLogo

export const CANONICAL_SERVICES = [
  {
    key: 'Plumber',
    keywords: ['plumber', 'plumbur', 'plumbering', 'plumbing', 'pipe', 'leak', 'drain', 'flush', 'tap', 'sink', 'sanitary', 'plumbr', 'plamber', 'nal', 'nal sazi', 'motor', 'geyser']
  },
  {
    key: 'Electrician',
    keywords: ['electrician', 'electric', 'wiring', 'spark', 'bijli', 'power', 'circuit', 'breaker', 'switch', 'light', 'fan', 'electrican', 'electrition', 'ups', 'generator']
  },
  {
    key: 'Carpenter',
    keywords: ['carpenter', 'carpentry', 'wood', 'furniture', 'door', 'cabinet', 'table', 'chair', 'carpentar', 'carpnter', 'woodwork', 'badhai']
  },
  {
    key: 'Painter',
    keywords: ['painter', 'paint', 'rang', 'wall painting', 'texture', 'waterproofing', 'paintr', 'distemper']
  },
  {
    key: 'AC & HVAC',
    keywords: ['ac', 'hvac', 'air conditioner', 'cooling', 'gas filling', 'chiller', 'compressor', 'ac repair', 'ac service', 'inverter', 'split ac']
  },
  {
    key: 'Home Cleaning',
    keywords: ['cleaning', 'cleaner', 'deep clean', 'maid', 'home cleaning', 'sofa clean', 'carpet clean', 'wash', 'sanitization', 'safai']
  },
  {
    key: 'Appliance Repair',
    keywords: ['appliance', 'fridge', 'refrigerator', 'washing machine', 'microwave', 'oven', 'dispenser']
  },
  {
    key: 'Glass & Aluminum',
    keywords: ['glass', 'aluminum', 'aluminium', 'window', 'mirror', 'frame', 'door glass']
  },
  {
    key: 'Gardener',
    keywords: ['gardener', 'garden', 'lawn', 'plants', 'mali', 'grass', 'trees', 'gardening']
  },
  {
    key: 'Welder',
    keywords: ['welder', 'welding', 'iron', 'gate', 'grill', 'metal', 'loha', 'weldr']
  },
  {
    key: 'Laundry & Ironing',
    keywords: ['laundry', 'ironing', 'dry clean', 'wash clothes', 'press', 'istri', 'clothes', 'washing']
  }
]

export const normalizeServiceName = (query) => {
  if (!query || typeof query !== 'string') return null
  const clean = query.trim().toLowerCase()
  if (!clean) return null
  
  // Exact key match first
  for (const item of CANONICAL_SERVICES) {
    if (item.key.toLowerCase() === clean) return item.key
  }
  
  // Keyword match
  for (const item of CANONICAL_SERVICES) {
    for (const kw of item.keywords) {
      if (clean === kw || clean.includes(kw) || kw.includes(clean)) {
        return item.key
      }
    }
  }
  
  return null
}

const MULTAN_LOCALITIES = [
  { id: 'all', name: 'All Multan Areas', tag: 'Citywide' },
  { id: 'cantt', name: 'Multan Cantt', tag: 'Central' },
  { id: 'gulgasht', name: 'Gulgasht Colony', tag: 'Popular' },
  { id: 'bosan', name: 'Bosan Road', tag: 'Fast Dispatch' },
  { id: 'officers', name: 'Officers Colony', tag: 'Prime' },
  { id: 'modeltown', name: 'Model Town', tag: 'Prime' },
  { id: 'mda', name: 'MDA Chowk & Shah Rukn-e-Alam', tag: 'Central' },
  { id: 'newmultan', name: 'New Multan', tag: 'Commercial' },
  { id: 'mumtazabad', name: 'Mumtazabad', tag: 'South' },
  { id: 'wapdatown', name: 'Wapda Town', tag: 'Suburban' }
]

function Services({ initialSearchQuery = '', setCurrentPage, isLoggedIn = false, onLoginClick, currentUser = null }) {
  const userDefaultLocality = currentUser?.area || currentUser?.city || 'Multan Cantt'
  const [bookingFor, setBookingFor] = useState('myself') // 'myself' | 'someone_else'
  const [selectedLocality, setSelectedLocality] = useState(userDefaultLocality)
  const [recipientAddress, setRecipientAddress] = useState('')

  useEffect(() => {
    if (currentUser?.area || currentUser?.city) {
      const loc = currentUser.area || currentUser.city
      if (bookingFor === 'myself') {
        setSelectedLocality(loc)
      }
    }
  }, [currentUser, bookingFor])

  const getProviderETA = (providerLocation, targetLocality) => {
    if (!targetLocality || targetLocality === 'All Multan Areas') return '15 - 20 Mins'
    const pLoc = (providerLocation || '').toLowerCase()
    const tLoc = targetLocality.toLowerCase()
    const pArea = pLoc.split(',')[0].trim().toLowerCase()
    const tArea = tLoc.split(',')[0].trim().toLowerCase()
    
    if (pArea.includes(tArea) || tArea.includes(pArea)) {
      return '10 - 15 Mins (Direct Local)'
    }
    return '20 - 25 Mins (Rapid Dispatch)'
  }

  const [showAllHomeServices, setShowAllHomeServices] = useState(true)
  const [selectedService, setSelectedService] = useState(() => {
    if (initialSearchQuery && typeof initialSearchQuery === 'string' && initialSearchQuery.trim()) {
      const match = normalizeServiceName(initialSearchQuery.trim())
      if (match) return match
    }
    try {
      const params = new URLSearchParams(window.location.search)
      const serviceParam = params.get('service') || params.get('category')
      if (serviceParam) {
        const match = normalizeServiceName(serviceParam)
        if (match) return match
      }
    } catch (e) {
      console.warn(e)
    }
    return null
  })

  // Synchronize active selected service with URL
  useEffect(() => {
    try {
      const url = new URL(window.location.href)
      const currentServiceParam = url.searchParams.get('service') || url.searchParams.get('category')
      if (selectedService) {
        if (currentServiceParam !== selectedService) {
          url.pathname = '/services'
          url.searchParams.set('service', selectedService)
          url.searchParams.delete('category')
          window.history.replaceState({ page: 'services', auth: null, query: selectedService, service: selectedService }, '', url.pathname + url.search)
        }
      } else {
        if (currentServiceParam) {
          url.pathname = '/services'
          url.searchParams.delete('service')
          url.searchParams.delete('category')
          window.history.replaceState({ page: 'services', auth: null, query: '', service: null }, '', url.pathname)
        }
      }
    } catch (e) {
      console.warn(e)
    }
  }, [selectedService])

  // Automatically scroll to the top hero section whenever a service category is selected
  useEffect(() => {
    if (selectedService) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [selectedService])

  // Native Browser History Synchronization (Back/Forward Arrow) within Services
  useEffect(() => {
    const handlePopState = (e) => {
      if (window.location.pathname === '/services') {
        const params = new URLSearchParams(window.location.search)
        const serviceParam = e.state?.service ?? e.state?.query ?? params.get('service') ?? params.get('category')
        if (serviceParam && typeof serviceParam === 'string' && serviceParam.trim()) {
          const resolved = normalizeServiceName(serviceParam.trim()) || serviceParam.trim()
          setSelectedService(resolved)
        } else {
          setSelectedService(null)
        }
        setSelectedProvider(null)
        setIsViewingProfile(false)
        setShowChat(false)
        setShowBookingForm(false)
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [isViewingProfile, setIsViewingProfile] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [negotiatedPrice, setNegotiatedPrice] = useState(null)
  const [bookingStatus, setBookingStatus] = useState(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [showOfferCard, setShowOfferCard] = useState(false)
  const [customOfferAmount, setCustomOfferAmount] = useState('')
  const [isHistoryMode, setIsHistoryMode] = useState(false)
  const [reviewSlideIndex, setReviewSlideIndex] = useState(0)
  const [isReviewSliderPaused, setIsReviewSliderPaused] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [selectedBank, setSelectedBank] = useState('')
  const [selectedWallet, setSelectedWallet] = useState('')
  const [bankPaymentStep, setBankPaymentStep] = useState(1)
  const [userAccountNumber, setUserAccountNumber] = useState('')
  const [userAccountTitle, setUserAccountTitle] = useState('')
  const [bankPin, setBankPin] = useState('')
  const [walletPaymentStep, setWalletPaymentStep] = useState(1)
  const [walletPhoneNumber, setWalletPhoneNumber] = useState('')
  const [walletName, setWalletName] = useState('')
  const [walletPin, setWalletPin] = useState('')

  // Minimal state for search, filters, and booking
  const [searchQuery, setSearchQuery] = useState('')
  const [ratingFilter, setRatingFilter] = useState('All')
  const [priceFilter, setPriceFilter] = useState('All')
  const [heroSearchQuery, setHeroSearchQuery] = useState('')
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const [bookingAddress, setBookingAddress] = useState('')
  const [bookingNotes, setBookingNotes] = useState('')
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false)

  // Arrival open animation for home catalog cards (from 4th card / row 2 onwards)
  const [cardsOpen, setCardsOpen] = useState(false)
  const homeGridRef = useRef(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0
      const windowHeight = window.innerHeight || 800
      const isScrollingUp = scrollY < lastScrollY.current
      lastScrollY.current = scrollY

      if (homeGridRef.current) {
        const rect = homeGridRef.current.getBoundingClientRect()

        // When scrolling down and grid enters viewport: OPEN cards 4+
        if (rect.top <= windowHeight * 0.72) {
          // When user scrolls back UP towards top/hero: CLOSE cards 4+
          if (isScrollingUp && rect.top > windowHeight * 0.38) {
            setCardsOpen(false)
            return
          }
          setCardsOpen(true)
          return
        }

        // When grid is below trigger zone (user is up at the hero banner)
        if (rect.top > windowHeight * 0.72) {
          setCardsOpen(false)
          return
        }
      }

      // ScrollY fallback
      if (scrollY > 220) {
        if (isScrollingUp && scrollY < 320) {
          setCardsOpen(false)
        } else {
          setCardsOpen(true)
        }
      } else {
        setCardsOpen(false)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [selectedService, showAllHomeServices])

  // Profile DP upload & persistence state
  const providerDPInputRef = useRef(null)
  const [customProviderDPs, setCustomProviderDPs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('custom_provider_dps') || '{}')
    } catch {
      return {}
    }
  })

  const handleProviderDPUpload = (e) => {
    const file = e.target.files?.[0]
    if (file && selectedProvider) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const dataUrl = event.target.result
        const providerKey = selectedProvider.id || selectedProvider.name
        setCustomProviderDPs(prev => {
          const next = { ...prev, [providerKey]: dataUrl }
          try {
            localStorage.setItem('custom_provider_dps', JSON.stringify(next))
          } catch (err) {
            console.warn('Failed to save DP to localStorage', err)
          }
          return next
        })
        setSelectedProvider(prev => ({ ...prev, customDP: dataUrl }))
      }
      reader.readAsDataURL(file)
    }
  }

  const getProviderDP = (provider) => {
    if (!provider) return null
    const providerKey = provider.id || provider.name
    return provider.customDP || customProviderDPs[providerKey] || provider.image || null
  }

  // Handle incoming hero search query
  useEffect(() => {
    if (initialSearchQuery && typeof initialSearchQuery === 'string' && initialSearchQuery.trim()) {
      if (!isLoggedIn) {
        try {
          localStorage.setItem('pending_service_category', initialSearchQuery.trim())
        } catch (e) {
          console.warn(e)
        }
        if (typeof onLoginClick === 'function') {
          onLoginClick()
        } else if (typeof setCurrentPage === 'function') {
          setCurrentPage('login')
        }
        return
      }

      const resolved = normalizeServiceName(initialSearchQuery)
      if (resolved) {
        setSelectedService(resolved)
      } else {
        setHeroSearchQuery(initialSearchQuery.trim())
      }
    } else if (initialSearchQuery === '') {
      setSelectedService(null)
      setSelectedProvider(null)
      setIsViewingProfile(false)
    }
  }, [initialSearchQuery, isLoggedIn, onLoginClick, setCurrentPage])

  const banks = [
    'Allied Bank (ABL)',
    'Askari Bank',
    'Bank Alfalah',
    'Bank Al-Habib (BAHL)',
    'Bank Makramah',
    'Faysal Bank',
    'Habib Bank Limited (HBL)',
    'Habib Metropolitan Bank',
    'JS Bank',
    'MCB Bank',
    'Meezan Bank',
    'National Bank of Pakistan (NBP)',
    'Samba Bank',
    'Soneri Bank',
    'Standard Chartered Bank Pakistan',
    'United Bank Limited (UBL)',
    'The Bank of Punjab (BOP)',
    'The Bank of Khyber',
    'Sindh Bank',
    'Zarai Taraqiati Bank Limited (ZTBL)',
    'First Women Bank',
    'Punjab Provincial Cooperative Bank'
  ]

  const wallets = [
    'JazzCash',
    'Easypaisa',
    'NayaPay',
    'SadaPay',
    'UPaisa',
    'Raast'
  ]

  const homeRepairServices = [
    {
      name: 'Electrician',
      image: electricianImage,
      description: 'Wiring, circuit breaker repair, solar setup & 24/7 emergency service',
      rating: '4.9',
      reviews: '180+',
      price: 'Rs. 1,500/hr',
      badge: 'Verified Electrician'
    },
    {
      name: 'Plumber',
      image: plumberImage,
      description: 'Leak detection, pipe repairs, bathroom fitting & drainage solutions',
      rating: '4.8',
      reviews: '160+',
      price: 'Rs. 1,250/hr',
      badge: 'Master Plumber'
    },
    {
      name: 'Carpenter',
      image: carpenterImage,
      description: 'Custom woodwork, furniture repair, cabinets & door fixing',
      rating: '4.8',
      reviews: '130+',
      price: 'Rs. 1,400/hr',
      badge: 'Skilled Carpenter'
    },
    {
      name: 'Painter',
      image: paintingImage,
      description: 'Interior & exterior painting, texture coating & waterproofing',
      rating: '4.7',
      reviews: '110+',
      price: 'Rs. 1,100/hr',
      badge: 'Pro Painter'
    },
    {
      name: 'AC & HVAC',
      image: acImage,
      description: 'AC installation, gas charging, deep cleaning & cooling maintenance',
      rating: '4.9',
      reviews: '210+',
      price: 'Rs. 1,800/hr',
      badge: 'HVAC Expert'
    },
    {
      name: 'Appliance Repair',
      image: applianceImage,
      description: 'Washing machine, refrigerator, microwave & home appliance repair',
      rating: '4.8',
      reviews: '140+',
      price: 'Rs. 1,400/hr',
      badge: 'Appliance Specialist'
    },
  ]

  const allHomeServices = [
    {
      name: 'Electrician',
      image: electricianImage,
      description: 'Wiring, circuit breaker repair, solar setup & 24/7 emergency service',
      rating: '4.9',
      reviews: '180+',
      price: 'Rs. 1,500/hr',
      badge: 'Verified Electrician'
    },
    {
      name: 'Plumber',
      image: plumberImage,
      description: 'Leak detection, pipe repairs, bathroom fitting & drainage solutions',
      rating: '4.8',
      reviews: '160+',
      price: 'Rs. 1,250/hr',
      badge: 'Master Plumber'
    },
    {
      name: 'Carpenter',
      image: carpenterImage,
      description: 'Custom woodwork, furniture repair, cabinets & door fixing',
      rating: '4.8',
      reviews: '130+',
      price: 'Rs. 1,400/hr',
      badge: 'Skilled Carpenter'
    },
    {
      name: 'Painter',
      image: paintingImage,
      description: 'Interior & exterior painting, texture coating & waterproofing',
      rating: '4.7',
      reviews: '110+',
      price: 'Rs. 1,100/hr',
      badge: 'Pro Painter'
    },
    {
      name: 'AC & HVAC',
      image: acImage,
      description: 'AC installation, gas charging, deep cleaning & cooling maintenance',
      rating: '4.9',
      reviews: '210+',
      price: 'Rs. 1,800/hr',
      badge: 'HVAC Expert'
    },
    {
      name: 'Home Cleaning',
      image: homeCleaningImage,
      description: 'Deep house cleaning, kitchen & bathroom sanitization',
      rating: '4.9',
      reviews: '240+',
      price: 'Rs. 1,000/hr',
      badge: 'Deep Clean'
    },
    {
      name: 'Gardener',
      image: gardeningImage,
      description: 'Lawn care, plant maintenance, landscape design & pruning',
      rating: '4.7',
      reviews: '95+',
      price: 'Rs. 900/hr',
      badge: 'Green Thumb'
    },
    {
      name: 'Glass & Aluminum',
      image: aluminiumImage,
      description: 'Windows, glass partitions, aluminum frames & door fixtures',
      rating: '4.8',
      reviews: '85+',
      price: 'Rs. 1,600/hr',
      badge: 'Glazing Pro'
    },
    {
      name: 'Welder',
      image: welderImage,
      description: 'Gate fabrication, iron grills, railing & structural welding',
      rating: '4.7',
      reviews: '105+',
      price: 'Rs. 1,300/hr',
      badge: 'Metal Craft'
    },
    {
      name: 'Laundry & Ironing',
      image: laundryImage,
      description: 'Dry cleaning, cloth washing, steam press & doorstep delivery',
      rating: '4.8',
      reviews: '150+',
      price: 'Rs. 800/hr',
      badge: 'Fresh Care'
    },
    {
      name: 'Appliance Repair',
      image: applianceImage,
      description: 'Refrigerator, washing machine, microwave & home appliance repair',
      rating: '4.8',
      reviews: '140+',
      price: 'Rs. 1,400/hr',
      badge: 'Appliance Specialist'
    },
  ]

  const toggleHomeServices = () => {
    setShowAllHomeServices(!showAllHomeServices)
  }

  const handleServiceClick = (serviceName) => {
    if (!isLoggedIn) {
      try {
        localStorage.setItem('pending_service_category', serviceName)
      } catch (e) {
        console.warn(e)
      }
      if (typeof onLoginClick === 'function') {
        onLoginClick()
      } else if (typeof setCurrentPage === 'function') {
        setCurrentPage('login')
      }
      return
    }

    const canonical = normalizeServiceName(serviceName) || serviceName
    setSelectedService(canonical)
    setSelectedProvider(null)
    setIsViewingProfile(false)
    setShowChat(false)
    setShowBookingForm(false)

    // Scroll directly to the top hero section so start of screen is in view
    window.scrollTo({ top: 0, behavior: 'instant' })

    // Push entry to browser history so browser Back returns to /services catalog
    try {
      const url = new URL(window.location.href)
      url.pathname = '/services'
      url.searchParams.set('service', canonical)
      url.searchParams.delete('category')
      window.history.pushState(
        { page: 'services', auth: null, query: canonical, service: canonical },
        '',
        url.pathname + url.search
      )
    } catch (e) {
      console.warn(e)
    }
  }

  const handleBackToServices = () => {
    setSelectedService(null)
    setSelectedProvider(null)
    setIsViewingProfile(false)
    setShowChat(false)
    setShowBookingForm(false)
    setSearchQuery('')
    setRatingFilter('All')
    setPriceFilter('All')
    setBookingFor('myself')
    setSelectedLocality(userDefaultLocality)
    setRecipientAddress('')
    try {
      sessionStorage.removeItem('mux_selected_service')
      sessionStorage.removeItem('mux_search_query')
      const url = new URL(window.location.href)
      url.pathname = '/services'
      url.searchParams.delete('service')
      url.searchParams.delete('category')
      url.searchParams.delete('q')
      window.history.pushState({ page: 'services', auth: null, query: '', service: null }, '', url.pathname)
    } catch (e) {
      console.warn(e)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleBookNow = (provider) => {
    setSelectedProvider(provider)
  }

  const handleViewProviderProfile = (provider) => {
    setSelectedProvider(provider)
    setIsViewingProfile(true)
    setShowChat(false)
    setShowBookingForm(false)
    setBookingStatus(null)
    setReviewSlideIndex(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleMessageProvider = (provider) => {
    if (!provider) return
    setSelectedProvider(provider)
    setIsViewingProfile(false)
    setShowChat(false)

    // Save selected provider details to localStorage for the Messages screen
    const chatPayload = {
      id: provider.id || provider.name,
      name: provider.name,
      service: provider.service || selectedService || 'Home Specialist',
      price: provider.price || 'Rs. 2,500',
      rating: provider.rating || 4.9,
      reviews: provider.reviews || 28,
      image: getProviderDP(provider),
      badge: provider.badge || 'Verified Pro',
      experience: provider.experience || '8+ Years',
      verified: true,
      locality: selectedLocality,
      bookingFor: bookingFor,
      recipientAddress: recipientAddress
    }
    try {
      localStorage.setItem('active_chat_provider', JSON.stringify(chatPayload))
    } catch (e) {
      console.warn('Failed to save active chat provider', e)
    }

    if (typeof setCurrentPage === 'function') {
      setCurrentPage('messages')
    }
  }

  const handleBackToProviders = () => {
    setSelectedProvider(null)
    setIsViewingProfile(false)
    setShowChat(false)
    setChatMessages([])
    setNegotiatedPrice(null)
    setShowBookingForm(false)
    setIsHistoryMode(false)
    setBookingStatus(null)
    setIsSubmittingBooking(false)
  }

  const handleCloseChat = () => {
    setShowChat(false)
    setIsHistoryMode(false)
    if (!isViewingProfile && !showBookingForm && !bookingStatus) {
      setSelectedProvider(null)
    }
  }

  const handleStartChat = () => {
    if (selectedProvider) {
      handleMessageProvider(selectedProvider)
    }
  }

  const handleSendMessage = (message) => {
    setChatMessages([...chatMessages, { sender: 'customer', text: message }])

    // Simulate provider response after 1 second
    setTimeout(() => {
      if (message.includes('$') || message.toLowerCase().includes('price')) {
        setChatMessages(prev => [...prev, { sender: 'provider', text: 'Let me consider your offer. I\'ll get back to you shortly.' }])
        setTimeout(() => {
          setChatMessages(prev => [...prev, { sender: 'provider', text: 'I can accept that price! Shall we proceed with the booking?' }])
          setNegotiatedPrice(message.match(/\$\d+/)?.[0] || selectedProvider.price)
        }, 2000)
      } else {
        setChatMessages(prev => [...prev, { sender: 'provider', text: 'Sure, I understand. Let me know if you have any other questions.' }])
      }
    }, 1000)
  }

  const handleSendCustomOffer = () => {
    setShowOfferCard(true)
  }

  const handleVoiceStart = () => {
    setIsRecording(true)
  }

  const handleVoiceEnd = () => {
    setIsRecording(false)
    handleSendMessage('[Voice message sent]')
  }

  const handleAttachmentClick = (type) => {
    setShowAttachmentMenu(false)
    if (type === 'image') {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = (e) => {
        if (e.target.files[0]) {
          handleSendMessage(`[Image]: ${e.target.files[0].name}`)
        }
      }
      input.click()
    } else if (type === 'photo') {
      handleSendMessage('[Photo shared]')
    } else if (type === 'file') {
      const input = document.createElement('input')
      input.type = 'file'
      input.onchange = (e) => {
        if (e.target.files[0]) {
          handleSendMessage(`[File]: ${e.target.files[0].name}`)
        }
      }
      input.click()
    } else if (type === 'location') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            handleSendMessage(`[Location shared]: ${position.coords.latitude}, ${position.coords.longitude}`)
          },
          (error) => {
            handleSendMessage('[Location shared]')
          }
        )
      } else {
        handleSendMessage('[Location shared]')
      }
    }
  }

  const handleVoiceMessage = () => {
    handleSendMessage('[Voice message sent]')
  }

  const handleSubmitOffer = () => {
    if (customOfferAmount) {
      handleSendMessage(`Custom Offer: ${customOfferAmount}`)
      setShowOfferCard(false)
      setCustomOfferAmount('')
      // Simulate provider response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { sender: 'provider', text: 'Let me review your offer. I\'ll get back to you shortly.' }])
        setTimeout(() => {
          setChatMessages(prev => [...prev, { sender: 'provider', text: 'I can accept that offer! Shall we proceed with the booking?' }])
          setNegotiatedPrice(customOfferAmount)
        }, 2000)
      }, 1000)
    }
  }

  const handleDeclineOffer = () => {
    setShowOfferCard(false)
    setCustomOfferAmount('')
  }

  const handleAcceptAndBook = () => {
    setShowChat(false)
    setShowBookingForm(true)
  }

  const handleConfirmBooking = () => {
    if (isSubmittingBooking || bookingStatus === 'confirmed') return
    setIsSubmittingBooking(true)

    const dateStr = bookingDate || new Date().toISOString().split('T')[0]
    const timeStr = bookingTime || '10:00 AM'

    try {
      const saved = localStorage.getItem('servicehub_bookings')
      const existing = saved ? JSON.parse(saved) : []

      // Defensive check against double-clicks or duplicate entries
      const isDuplicate = Array.isArray(existing) && existing.some(b => 
        b.provider === selectedProvider.name &&
        b.service === selectedProvider.service &&
        b.date === dateStr &&
        Math.abs(Number(b.id) - Date.now()) < 4000
      )

      if (!isDuplicate) {
        const uniqueId = Date.now()
        const newBooking = {
          id: uniqueId,
          service: selectedProvider.service,
          provider: selectedProvider.name,
          date: dateStr,
          time: timeStr,
          status: 'scheduled',
          price: negotiatedPrice || selectedProvider.price,
          location: bookingAddress ? `${bookingAddress}, Multan` : (selectedProvider.location?.includes('Multan') ? selectedProvider.location : `${selectedProvider.location || 'Bosan Road'}, Multan, Pakistan`),
          refNumber: `BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
          notes: bookingNotes || ''
        }
        const updated = [newBooking, ...(Array.isArray(existing) ? existing : [])]
        localStorage.setItem('servicehub_bookings', JSON.stringify(updated))
        bookingsAPI.create(newBooking)
      }
    } catch (e) {
      console.error('Error saving booking to localStorage:', e)
    }

    setBookingStatus('confirmed')
    setShowBookingForm(false)
    setIsSubmittingBooking(false)
  }

  const getServiceTitle = (serviceName) => {
    const titles = {
      'Electrician': 'Expert Electrician',
      'Plumber': 'Expert Plumber',
      'Carpenter': 'Expert Carpenter',
      'Painter': 'Expert Painter',
      'AC & HVAC': 'Expert AC Technician',
      'Appliance Repair': 'Expert Appliance Technician',
      'Home Cleaning': 'Expert Deep Cleaning Service',
      'Gardener': 'Expert Gardener',
      'Glass & Aluminum': 'Expert Glass & Aluminum Fabricator',
      'Welder': 'Expert Welder & Metal Fabricator',
      'Laundry & Ironing': 'Expert Laundry & Dry Cleaning'
    }
    const normalized = normalizeServiceName(serviceName) || serviceName
    if (titles[normalized]) return titles[normalized]
    const foundKey = Object.keys(titles).find(k => k.toLowerCase() === normalized.toLowerCase())
    if (foundKey) return titles[foundKey]
    return `Expert ${normalized}`
  }

  const getServiceSubtitle = (serviceName) => {
    const normalized = normalizeServiceName(serviceName) || serviceName
    return `Verified home service professionals offering high-quality ${normalized.toLowerCase()} solutions.`
  }

  const getProviderImage = (req, serviceName) => {
    if (req.image) return req.image
    const normalized = normalizeServiceName(serviceName) || serviceName
    const imageMap = {
      'Electrician': electricianImage,
      'Plumber': plumberImage,
      'Carpenter': carpenterImage,
      'Painter': paintingImage,
      'Home Cleaning': homeCleaningImage,
      'AC & HVAC': acImage,
      'Glass & Aluminum': aluminiumImage,
      'Gardener': gardeningImage,
      'Welder': welderImage,
      'Laundry & Ironing': laundryImage,
      'Appliance Repair': applianceImage,
    }
    if (imageMap[normalized]) return imageMap[normalized]
    const foundKey = Object.keys(imageMap).find(k => k.toLowerCase() === normalized.toLowerCase())
    if (foundKey) return imageMap[foundKey]
    return getHeaderImage()
  }

  const getProviderRole = (req, serviceName) => {
    if (req.role) return req.role
    if (req.service) return req.service
    const normalized = normalizeServiceName(serviceName) || serviceName
    return `${normalized} Specialist`
  }

  const getProviderTags = (req, serviceName) => {
    if (Array.isArray(req.tags) && req.tags.length > 0) return req.tags
    const normalized = normalizeServiceName(serviceName) || serviceName
    const tagMap = {
      'Electrician': ['Wiring & Circuits', 'Circuit Breakers', 'Solar Setup', 'Emergency 24/7'],
      'Plumber': ['Leak Detection', 'Pipe Fitting', 'Drain Cleaning', 'Bathroom Fitting'],
      'Carpenter': ['Custom Woodwork', 'Cabinetry', 'Furniture Repair', 'Door Fixing'],
      'Painter': ['Wall Painting', 'Cabinet Refinishing', 'Trim Work', 'Waterproofing'],
      'AC & HVAC': ['AC Installation', 'Gas Charging', 'Deep Cleaning', 'Cooling Fix'],
      'Home Cleaning': ['Deep Sanitization', 'Floor Polishing', 'Kitchen Clean', 'Window Wash'],
      'Gardener': ['Lawn Care', 'Pruning & Trimming', 'Garden Design', 'Landscape'],
      'Glass & Aluminum': ['Window Fitting', 'Glass Partitions', 'Aluminum Frames', 'Door Fixtures'],
      'Welder': ['Metal Fabrication', 'Gate Welding', 'Iron Grills', 'Structural'],
      'Laundry & Ironing': ['Steam Press', 'Dry Cleaning', 'Delicate Wash', 'Doorstep Delivery'],
      'Appliance Repair': ['Refrigerator', 'Washing Machine', 'Microwave', 'Oven Repair'],
    }
    if (tagMap[normalized]) return tagMap[normalized]
    const foundKey = Object.keys(tagMap).find(k => k.toLowerCase() === normalized.toLowerCase())
    if (foundKey) return tagMap[foundKey]
    return ['Verified Expert', 'Top Rated', 'Guaranteed Quality']
  }

  const getProviderBio = (req, serviceName) => {
    if (req.bio) return req.bio
    const normalized = normalizeServiceName(serviceName) || serviceName
    return `Detail-oriented ${normalized.toLowerCase()} specialist with 8+ years experience delivering high-quality residential maintenance solutions with 100% satisfaction guarantee.`
  }

  const getServiceProviders = (serviceName) => {
    const normalized = normalizeServiceName(serviceName) || serviceName
    const providers = {
      'Electrician': [
        { id: 'PRV001', name: 'AKRAM', rating: '4.9', reviews: '120', price: 'Rs. 3,800/hr', location: 'Gulgasht Colony, Multan', date: '2 hours ago', service: 'Lighting & Wiring', verified: true, image: electricianImage },
        { id: 'PRV002', name: 'ALI', rating: '4.8', reviews: '95', price: 'Rs. 4,000/hr', location: 'Officers Colony, Multan', date: '3 hours ago', service: 'Wiring & Panels', verified: true, image: electricianImage },
        { id: 'PRV003', name: 'UJAY BHAI', rating: '4.7', reviews: '80', price: 'Rs. 3,200/hr', location: 'Model Town, Multan', date: '5 hours ago', service: 'Lighting & Solar', verified: false, image: electricianImage },
        { id: 'PRV004', name: 'Bilal Hassan', rating: '4.9', reviews: '110', price: 'Rs. 4,500/hr', location: 'Cantt, Multan', date: '6 hours ago', service: 'Emergency Breaker', verified: true, image: electricianImage },
        { id: 'PRV005', name: 'Naveed Iqbal', rating: '4.6', reviews: '75', price: 'Rs. 3,500/hr', location: 'Bosan Road, Multan', date: '8 hours ago', service: 'Power Inspection', verified: true, image: electricianImage },
      ],
      'Plumber': [
        { 
          id: 'PLB001', 
          name: 'Rashid Mehmood (Master Plumber)', 
          rating: '4.9', 
          reviews: '145', 
          price: 'Rs. 1,250/hr', 
          location: 'Gulgasht Colony, Multan', 
          date: '10 mins ago', 
          service: 'Pipe Repair & Leak Detection', 
          verified: true, 
          image: plumberImage,
          tags: ['Leak Detection', 'Pipe Fitting', 'Bathroom Sanitary', 'Drain Cleaning'],
          bio: 'Certified Master Plumber with 12+ years experience in domestic and commercial pipe fitting, concealed leakage detection, and sanitary fixtures.'
        },
        { 
          id: 'PLB002', 
          name: 'Muhammad Aslam', 
          rating: '4.8', 
          reviews: '118', 
          price: 'Rs. 1,100/hr', 
          location: 'Officers Colony, Multan', 
          date: '1 hour ago', 
          service: 'Bathroom & Sanitary Fitting', 
          verified: true, 
          image: plumberImage,
          tags: ['Sanitary Ware', 'Commode Fitting', 'Mixer Taps', 'Geyser Connection'],
          bio: 'Expert sanitary & plumbing technician specializing in modern bathroom fittings, water motor installations, and instant geyser setup.'
        },
        { 
          id: 'PLB003', 
          name: 'Tariq Javed', 
          rating: '4.9', 
          reviews: '160', 
          price: 'Rs. 1,400/hr', 
          location: 'Model Town, Multan', 
          date: '2 hours ago', 
          service: 'Drainage & Sewerage Cleaning', 
          verified: true, 
          image: plumberImage,
          tags: ['Drain Unblocking', 'Sewerage Line', 'Kitchen Sink Fix', 'Water Tank Cleaning'],
          bio: 'Specialist in motorized drain unclogging, mainline sewerage clearing, and underground water tank cleaning with same-day emergency dispatch.'
        },
        { 
          id: 'PLB004', 
          name: 'Naveed Akhtar', 
          rating: '4.7', 
          reviews: '92', 
          price: 'Rs. 1,000/hr', 
          location: 'Cantt, Multan', 
          date: '3 hours ago', 
          service: 'Emergency Water Leakage & PPRC Piping', 
          verified: true, 
          image: plumberImage,
          tags: ['PPRC Piping', 'Emergency Leak Fix', 'Pressure Pump', 'Pipeline Fitting'],
          bio: 'Quick response emergency plumber equipped with ultrasonic leak detectors and PPRC heat fusion welding tools.'
        },
        { 
          id: 'PLB005', 
          name: 'Kashif Hussain', 
          rating: '4.8', 
          reviews: '104', 
          price: 'Rs. 1,200/hr', 
          location: 'Bosan Road, Multan', 
          date: '5 hours ago', 
          service: 'Geyser & Water Heater Installation', 
          verified: true, 
          image: plumberImage,
          tags: ['Gas Geyser', 'Electric Geyser', 'Solar Water Heater', 'Safety Valve'],
          bio: 'Specialized in residential gas & electric geyser maintenance, thermostat replacement, and descaling with full safety compliance.'
        },
      ],
      'Carpenter': [
        { id: 'CRP001', name: 'Imran Malik', rating: '4.9', reviews: '105', price: 'Rs. 3,500/hr', location: 'Gulgasht Colony, Multan', date: '2 hours ago', service: 'Furniture', verified: true },
        { id: 'CRP002', name: 'Rashid Minhas', rating: '4.7', reviews: '88', price: 'Rs. 3,200/hr', location: 'Cantt, Multan', date: '3 hours ago', service: 'Cabinets', verified: true },
        { id: 'CRP003', name: 'Saad Rafiq', rating: '4.8', reviews: '95', price: 'Rs. 3,800/hr', location: 'Bosan Road, Multan', date: '4 hours ago', service: 'Flooring', verified: true },
        { id: 'CRP004', name: 'Adnan Siddiqui', rating: '4.6', reviews: '72', price: 'Rs. 3,000/hr', location: 'Model Town, Multan', date: '5 hours ago', service: 'Repair', verified: false },
        { id: 'CRP005', name: 'Hamza Butt', rating: '4.9', reviews: '115', price: 'Rs. 4,000/hr', location: 'Officers Colony, Multan', date: '6 hours ago', service: 'Custom', verified: true },
      ],
      'Painter': [
        {
          id: 'PNT001',
          name: 'Elena Rossi',
          role: 'Interior Specialist',
          rating: '4.9',
          reviews: '120',
          price: 'Rs. 2,250/hr',
          location: 'Gulgasht Colony, Multan',
          service: 'Interior Specialist',
          verified: true,
          image: paintingImage,
          tags: ['Wall Painting', 'Cabinet Refinishing', 'Trim Work'],
          bio: 'Detail-oriented interior painter with 10+ years transforming residential spaces. I specialize in crisp lines, smooth finishes, and meticulous prep work to ensure long-lasting results.'
        },
        {
          id: 'PNT002',
          name: 'Marcus Bell',
          role: 'Exterior Painter',
          rating: '4.8',
          reviews: '95',
          price: 'Rs. 2,800/hr',
          location: 'Cantt, Multan',
          service: 'Exterior Painter',
          verified: true,
          image: paintingImage,
          tags: ['Exterior Painting', 'Power Washing', 'Weatherproofing'],
          bio: 'Equipped for large residential and commercial exterior projects. Fully licensed and insured. We focus on durable, weather-resistant finishes that protect and beautify your property.'
        },
        {
          id: 'PNT003',
          name: 'Sophie Turner',
          role: 'Decorative Artist',
          rating: '5.0',
          reviews: '63',
          price: 'Rs. 3,200/hr',
          location: 'Bosan Road, Multan',
          service: 'Decorative Artist',
          verified: true,
          image: paintingImage,
          tags: ['Texture Coating', 'Faux Finishes', 'Murals'],
          bio: 'Specializing in high-end decorative finishes, custom textures, and bespoke wall treatments. I bring an artistic touch to residential interiors, creating unique, personalized spaces.'
        },
        {
          id: 'PNT004',
          name: 'Tariq Mehmood',
          role: 'Wall Primer & Texture',
          rating: '4.8',
          reviews: '84',
          price: 'Rs. 2,500/hr',
          location: 'Officers Colony, Multan',
          service: 'Wall Primer & Texture',
          verified: true,
          image: paintingImage,
          tags: ['Weather Sheet', 'Distemper', 'Enamel'],
          bio: 'Multan residential and commercial interior painter with 8+ years expertise in waterproof coatings.'
        }
      ],
      'AC & HVAC': [
        { id: 'AC001', name: 'Tariq Mehmood', rating: '4.9', reviews: '120', price: 'Rs. 4,200/hr', location: 'Gulgasht Colony, Multan', date: '1 hour ago', service: 'Installation', verified: true },
        { id: 'AC002', name: 'Usman Ali', rating: '4.8', reviews: '100', price: 'Rs. 4,000/hr', location: 'Cantt, Multan', date: '2 hours ago', service: 'Repair', verified: true },
        { id: 'AC003', name: 'Kamran Khan', rating: '4.7', reviews: '88', price: 'Rs. 3,800/hr', location: 'Bosan Road, Multan', date: '3 hours ago', service: 'Maintenance', verified: true },
        { id: 'AC004', name: 'Bilal Hassan', rating: '4.9', reviews: '115', price: 'Rs. 4,500/hr', location: 'Officers Colony, Multan', date: '4 hours ago', service: 'Emergency', verified: true },
        { id: 'AC005', name: 'Zahid Hussain', rating: '4.6', reviews: '75', price: 'Rs. 3,500/hr', location: 'Model Town, Multan', date: '5 hours ago', service: 'Inspection', verified: false },
      ],
      'Home Cleaning': [
        { id: 'CLN001', name: 'Mudassir Abbas (Deep Clean)', rating: '4.9', reviews: '168', price: 'Rs. 1,000/hr', location: 'Cantt, Multan', date: '10 mins ago', service: 'Full House Deep Sanitization', verified: true, image: homeCleaningImage, tags: ['Deep Sanitization', 'Floor Polishing', 'Kitchen Clean', 'Window Wash'], bio: 'Specialist in deep residential cleaning, chemical-free sanitization, motorized sofa washing and floor buffing.' },
        { id: 'CLN002', name: 'Zahid Mehmood', rating: '4.8', reviews: '135', price: 'Rs. 900/hr', location: 'Gulgasht Colony, Multan', date: '1 hour ago', service: 'Water Tank & Floor Buffing', verified: true, image: homeCleaningImage, tags: ['Water Tank', 'Floor Polish', 'Bathroom Sanitization'], bio: 'Expert in underground/overhead water tank cleaning, high-pressure jet washing and marble polishing.' },
        { id: 'CLN003', name: 'Farhan Cleaners', rating: '4.9', reviews: '190', price: 'Rs. 1,200/hr', location: 'Bosan Road, Multan', date: '2 hours ago', service: 'Sofa & Carpet Steam Wash', verified: true, image: homeCleaningImage, tags: ['Sofa Steam Wash', 'Carpet Wash', 'Mattress Clean'], bio: 'State-of-the-art steam extraction for fabric sofas, carpets and mattresses with quick-drying technology.' }
      ],
      'Appliance Repair': [
        { id: 'APR001', name: 'Farhan Akhtar', rating: '4.8', reviews: '98', price: 'Rs. 3,500/hr', location: 'Gulgasht Colony, Multan', date: '1 hour ago', service: 'Refrigerator', verified: true },
        { id: 'APR002', name: 'Carlos Martinez', rating: '4.7', reviews: '82', price: 'Rs. 3,200/hr', location: 'Cantt, Multan', date: '2 hours ago', service: 'Washing Machine', verified: true },
        { id: 'APR003', name: 'Steven Lee', rating: '4.9', reviews: '108', price: 'Rs. 3,800/hr', location: 'Bosan Road, Multan', date: '3 hours ago', service: 'Dishwasher', verified: true },
        { id: 'APR004', name: 'Daniel Kim', rating: '4.6', reviews: '74', price: 'Rs. 3,000/hr', location: 'Officers Colony, Multan', date: '4 hours ago', service: 'Oven', verified: false },
        { id: 'APR005', name: 'Paul Thompson', rating: '4.8', reviews: '91', price: 'Rs. 3,400/hr', location: 'Model Town, Multan', date: '5 hours ago', service: 'Microwave', verified: true },
      ],
      'Glass & Aluminum': [
        { id: 'GLA001', name: 'Frank Wright', rating: '4.9', reviews: '112', price: 'Rs. 4,000/hr', location: 'Gulgasht Colony, Multan', date: '1 hour ago', service: 'Windows', verified: true },
        { id: 'GLA002', name: 'George Miller', rating: '4.7', reviews: '87', price: 'Rs. 3,800/hr', location: 'Cantt, Multan', date: '2 hours ago', service: 'Doors', verified: true },
        { id: 'GLA003', name: 'Henry Davis', rating: '4.8', reviews: '95', price: 'Rs. 4,200/hr', location: 'Bosan Road, Multan', date: '3 hours ago', service: 'Aluminum Work', verified: true },
        { id: 'GLA004', name: 'Charles Brown', rating: '4.6', reviews: '73', price: 'Rs. 3,500/hr', location: 'Officers Colony, Multan', date: '4 hours ago', service: 'Glass Repair', verified: false },
        { id: 'GLA005', name: 'Edward Wilson', rating: '4.9', reviews: '118', price: 'Rs. 4,500/hr', location: 'Model Town, Multan', date: '5 hours ago', service: 'Custom Design', verified: true },
      ],
      'Gardener': [
        { id: 'GRD001', name: 'Mary Johnson', rating: '4.8', reviews: '94', price: 'Rs. 2,800/hr', location: 'Gulgasht Colony, Multan', date: '1 hour ago', service: 'Lawn Care', verified: true },
        { id: 'GRD002', name: 'Susan Williams', rating: '4.7', reviews: '83', price: 'Rs. 2,500/hr', location: 'Cantt, Multan', date: '2 hours ago', service: 'Landscaping', verified: true },
        { id: 'GRD003', name: 'Patricia Brown', rating: '4.9', reviews: '106', price: 'Rs. 3,000/hr', location: 'Bosan Road, Multan', date: '3 hours ago', service: 'Garden Design', verified: true },
        { id: 'GRD004', name: 'Jennifer Davis', rating: '4.6', reviews: '71', price: 'Rs. 2,250/hr', location: 'Officers Colony, Multan', date: '4 hours ago', service: 'Tree Trimming', verified: false },
        { id: 'GRD005', name: 'Linda Miller', rating: '4.8', reviews: '89', price: 'Rs. 2,600/hr', location: 'Model Town, Multan', date: '5 hours ago', service: 'Irrigation', verified: true },
      ],
      'Welder': [
        { id: 'WLD001', name: 'Thomas Anderson', rating: '4.9', reviews: '114', price: 'Rs. 4,200/hr', location: 'Gulgasht Colony, Multan', date: '1 hour ago', service: 'Metal Fabrication', verified: true },
        { id: 'WLD002', name: 'Robert Taylor', rating: '4.7', reviews: '88', price: 'Rs. 4,000/hr', location: 'Cantt, Multan', date: '2 hours ago', service: 'Structural Welding', verified: true },
        { id: 'WLD003', name: 'William Harris', rating: '4.8', reviews: '97', price: 'Rs. 4,500/hr', location: 'Bosan Road, Multan', date: '3 hours ago', service: 'Pipe Welding', verified: true },
        { id: 'WLD004', name: 'James Clark', rating: '4.6', reviews: '76', price: 'Rs. 3,800/hr', location: 'Officers Colony, Multan', date: '4 hours ago', service: 'Repair', verified: false },
        { id: 'WLD005', name: 'John Lewis', rating: '4.9', reviews: '120', price: 'Rs. 4,800/hr', location: 'Model Town, Multan', date: '5 hours ago', service: 'Custom Projects', verified: true },
      ],
      'Laundry & Ironing': [
        { id: 'LND001', name: 'Emma Wilson', rating: '4.8', reviews: '96', price: 'Rs. 2,000/hr', location: 'Gulgasht Colony, Multan', date: '1 hour ago', service: 'Laundry', verified: true },
        { id: 'LND002', name: 'Sophia Moore', rating: '4.7', reviews: '84', price: 'Rs. 1,800/hr', location: 'Cantt, Multan', date: '2 hours ago', service: 'Ironing', verified: true },
        { id: 'LND003', name: 'Olivia Taylor', rating: '4.9', reviews: '109', price: 'Rs. 2,250/hr', location: 'Bosan Road, Multan', date: '3 hours ago', service: 'Dry Cleaning', verified: true },
        { id: 'LND004', name: 'Ava Anderson', rating: '4.6', reviews: '72', price: 'Rs. 1,900/hr', location: 'Officers Colony, Multan', date: '4 hours ago', service: 'Fold & Pack', verified: false },
        { id: 'LND005', name: 'Isabella Thomas', rating: '4.8', reviews: '93', price: 'Rs. 2,100/hr', location: 'Model Town, Multan', date: '5 hours ago', service: 'Express Service', verified: true },
      ],
    }
    if (providers[normalized]) return providers[normalized]
    const foundKey = Object.keys(providers).find(k => k.toLowerCase() === normalized.toLowerCase())
    if (foundKey) return providers[foundKey]

    // Fallback: search across all providers by service or tag or name
    const allProviders = Object.values(providers).flat()
    const queryLower = normalized.toLowerCase()
    const matches = allProviders.filter(p => 
      p.service?.toLowerCase().includes(queryLower) ||
      p.name?.toLowerCase().includes(queryLower) ||
      (Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase().includes(queryLower)))
    )
    if (matches.length > 0) return matches

    return []
  }

  const getHeaderImage = (serviceName) => {
    if (!serviceName) return categoryAcBanner
    const normalized = normalizeServiceName(serviceName) || serviceName
    const imageMap = {
      'AC & HVAC': categoryAcBanner,
      'Electrician': categoryElectricianBanner,
      'Plumber': categoryPlumberBanner,
      'Carpenter': categoryCarpenterBanner,
      'Painter': categoryPainterBanner,
      'Home Cleaning': categoryCleaningBanner,
      'Appliance Repair': categoryApplianceBanner,
      'Glass & Aluminum': categoryGlassBanner,
      'Gardener': categoryGardenerBanner,
      'Welder': categoryWelderBanner,
      'Laundry & Ironing': categoryLaundryBanner,
    }
    if (imageMap[normalized]) return imageMap[normalized]
    const foundKey = Object.keys(imageMap).find(k => k.toLowerCase() === String(normalized).toLowerCase())
    if (foundKey) return imageMap[foundKey]

    const lower = String(serviceName).toLowerCase()
    if (lower.includes('ac') || lower.includes('hvac') || lower.includes('cool') || lower.includes('chiller')) return categoryAcBanner
    if (lower.includes('electr')) return categoryElectricianBanner
    if (lower.includes('plumb') || lower.includes('nal') || lower.includes('pipe')) return categoryPlumberBanner
    if (lower.includes('carpent') || lower.includes('wood')) return categoryCarpenterBanner
    if (lower.includes('paint') || lower.includes('rang')) return categoryPainterBanner
    if (lower.includes('clean') || lower.includes('safai')) return categoryCleaningBanner
    if (lower.includes('appliance') || lower.includes('fridge') || lower.includes('oven') || lower.includes('wash machine')) return categoryApplianceBanner
    if (lower.includes('glass') || lower.includes('alumin')) return categoryGlassBanner
    if (lower.includes('garden') || lower.includes('lawn') || lower.includes('mali')) return categoryGardenerBanner
    if (lower.includes('weld') || lower.includes('gate') || lower.includes('iron') || lower.includes('loha')) return categoryWelderBanner
    if (lower.includes('laund') || lower.includes('dry clean') || lower.includes('press') || lower.includes('istri')) return categoryLaundryBanner

    return categoryAcBanner
  }

  const getProviderCompletedWorks = (provider) => {
    const norm = normalizeServiceName(provider?.service) || provider?.service || 'Service'

    const worksMap = {
      'Plumber': [
        {
          id: 'w1',
          title: 'Master Bathroom Concealed Leakage & Sanitary Overhaul',
          image: plumberImage,
          category: 'Plumbing & Sanitary',
          location: 'Gulberg, Multan',
          completedDate: 'Completed 2 days ago',
          rating: 5.0,
          description: 'Concealed acoustic pipe leak detection, replaced 35ft cracked PPRC hot water line, and installed wall-hung fixtures with zero tile damage.',
          tags: ['PPRC Fusion', 'Acoustic Leak Detection', 'Pressure Tested']
        },
        {
          id: 'w2',
          title: 'Complete Commercial Kitchen Drainage & Grease Trap',
          image: plumberImage,
          category: 'Drainage & Sewerage',
          location: 'Bosan Road, Multan',
          completedDate: 'Completed 5 days ago',
          rating: 4.9,
          description: 'Installed 4-inch heavy UPVC drainage lines, high-capacity stainless grease trap, and automated waste water disposal pump.',
          tags: ['Heavy UPVC', 'Grease Trap', 'Zero Clog']
        },
        {
          id: 'w3',
          title: 'Rooftop Water Tank Overhaul & Booster Pressure Pump',
          image: plumberImage,
          category: 'Pumping & Storage',
          location: 'Cantt, Multan',
          completedDate: 'Completed 1 week ago',
          rating: 5.0,
          description: 'Installed 1.5HP Shimge automatic pressure booster pump with brass check valves and high-flow bypass system for multi-story house.',
          tags: ['Pressure Pump', 'Automatic Cutoff', '1 Year Warranty']
        }
      ],
      'Electrician': [
        {
          id: 'w1',
          title: 'Main Distribution Board & Breaker Box Rewiring',
          image: electricianImage,
          category: 'Wiring & Panels',
          location: 'Gulgasht Colony, Multan',
          completedDate: 'Completed Yesterday',
          rating: 5.0,
          description: 'Upgraded old porcelain fuses to Schneider MCB/RCBO trip breakers, load balanced across 3 phases, and eliminated short circuit hazards.',
          tags: ['Schneider Electric', 'Phase Balancing', 'Surge Protected']
        },
        {
          id: 'w2',
          title: 'Luxury Villa False Ceiling Smart LED & Chandelier Setup',
          image: electricianPng,
          category: 'Lighting & Smart Switch',
          location: 'DHA Phase 5, Lahore',
          completedDate: 'Completed 3 days ago',
          rating: 4.9,
          description: 'Complete concealed wiring for warm COB downlights, magnetic track lights, WiFi smart touch switches, and a 40kg crystal chandelier mount.',
          tags: ['Smart Lighting', 'Heavy Chandelier', 'Concealed Wiring']
        },
        {
          id: 'w3',
          title: '6kW Hybrid Solar Inverter & Battery Bank Installation',
          image: electricianJpg,
          category: 'Solar & Backup Power',
          location: 'Cantt, Multan',
          completedDate: 'Completed 1 week ago',
          rating: 5.0,
          description: 'Installed 6kW hybrid solar inverter with dual Phoenix tubular battery bank, heavy copper DC wiring, and automatic changeover ATS switch.',
          tags: ['Solar Inverter', 'ATS Auto-Changeover', 'DC Protection']
        }
      ],
      'Carpenter': [
        {
          id: 'w1',
          title: 'Custom UV-Sheet Acrylic Modular Kitchen Cabinets',
          image: carpenterImage,
          category: 'Custom Cabinetry',
          location: 'Model Town, Multan',
          completedDate: 'Completed 3 days ago',
          rating: 5.0,
          description: 'Fabricated high-gloss UV acrylic kitchen cabinets with soft-close Blum hydraulic hinges, pull-out pantry rack, and granite countertop fitting.',
          tags: ['UV Acrylic', 'Hydraulic Hinges', 'Waterproof Base']
        },
        {
          id: 'w2',
          title: 'Solid Ash Wood Main Entrance Door & Digital Lock',
          image: carpenterImage,
          category: 'Doors & Woodwork',
          location: 'Bosan Road, Multan',
          completedDate: 'Completed 6 days ago',
          rating: 4.9,
          description: 'Crafted 8x4ft solid seasoned Ash wood main door with CNC grooved geometric patterns, brass mortise handles, and smart fingerprint lock installation.',
          tags: ['Solid Ash Wood', 'Smart Lock', 'PU Matte Polish']
        },
        {
          id: 'w3',
          title: 'Floor-to-Ceiling Master Bedroom Wardrobe with Glass Slider',
          image: carpenterImage,
          category: 'Interior Furniture',
          location: 'DHA Phase 5, Lahore',
          completedDate: 'Completed 2 weeks ago',
          rating: 5.0,
          description: 'Custom 12ft built-in wardrobe with tinted fluted glass sliding shutters, interior motion-sensor LED strips, and concealed drawer organizers.',
          tags: ['Fluted Glass', 'Motion Sensor LED', 'Velvet Drawers']
        }
      ],
      'Painter': [
        {
          id: 'w1',
          title: 'Full Villa Luxury Velvet Touch Interior Painting',
          image: paintingImage,
          category: 'Interior Wall Finish',
          location: 'Cantt, Multan',
          completedDate: 'Completed 2 days ago',
          rating: 5.0,
          description: 'Applied 3 coats of Berger Elegance velvet emulsion with complete wall putty sanding, primer undercoat, and seamless accent walls.',
          tags: ['Velvet Emulsion', 'Putty Smoothing', 'Accent Wall']
        },
        {
          id: 'w2',
          title: 'Exterior Weatherproof Shield Coating & Texture Finish',
          image: paintingPng,
          category: 'Exterior Protection',
          location: 'Gulberg, Lahore',
          completedDate: 'Completed 5 days ago',
          rating: 4.9,
          description: 'Pressure washed exterior facade, repaired micro-cracks with acrylic elastomeric filler, and sprayed Jotun weather-resistant silicone paint.',
          tags: ['Weatherproof', 'Anti-Fungal', 'UV Resistant']
        },
        {
          id: 'w3',
          title: 'Decorative Stucco Marble Texture & Feature Wall',
          image: paintingImage,
          category: 'Decorative Artistry',
          location: 'Bosan Road, Multan',
          completedDate: 'Completed 1 week ago',
          rating: 5.0,
          description: 'Created Italian Stucco plaster finish resembling natural Calacatta marble on drawing room feature wall with glossy protective wax.',
          tags: ['Italian Stucco', 'Gloss Waxed', 'Bespoke Finish']
        }
      ],
      'AC & HVAC': [
        {
          id: 'w1',
          title: '1.5-Ton DC Inverter Deep Chemical Wash & Pressure Servicing',
          image: acImage,
          category: 'Deep Cleaning & Service',
          location: 'Bosan Road, Multan',
          completedDate: 'Completed Yesterday',
          rating: 5.0,
          description: 'Dismantled indoor unit blower and tray, cleaned evaporator coils with chemical foam jet spray, unblocked drainage line, and sanitized filters.',
          tags: ['Jet Chemical Wash', 'Zero Odor', 'Airflow +45%']
        },
        {
          id: 'w2',
          title: 'R410a Refrigerant Leak Detection & System Recharging',
          image: acPng,
          category: 'Gas Leak Repair',
          location: 'Gulgasht Colony, Multan',
          completedDate: 'Completed 3 days ago',
          rating: 4.9,
          description: 'Located outdoor condenser coil micro-leak using nitrogen pressure testing, silver brazed the copper joint, evacuated system with vacuum pump, and charged 1.1kg R410a.',
          tags: ['Nitrogen Leak Test', 'Copper Brazing', 'R410a Genuine']
        },
        {
          id: 'w3',
          title: 'Twin Inverter AC Dual Floor Installation & Copper Piping',
          image: acImage,
          category: 'Installation & Fitting',
          location: 'Cantt, Multan',
          completedDate: 'Completed 1 week ago',
          rating: 5.0,
          description: 'Mounted two new Gree inverter units with 100% pure insulated Mueller copper pipes, anti-vibration rubber foundation, and waterproof wall seals.',
          tags: ['100% Pure Copper', 'Silent Foundation', 'Leak Guaranteed']
        }
      ],
      'Home Cleaning': [
        {
          id: 'w1',
          title: '500-Sq Yard Bungalow Post-Renovation Deep Cleaning',
          image: homeCleaningImage,
          category: 'Deep House Cleaning',
          location: 'DHA Phase 5, Lahore',
          completedDate: 'Completed 2 days ago',
          rating: 5.0,
          description: 'Single-disc rotary machine scrubbing on marble floors, paint speck scraping on window glass, sanitization of 5 bathrooms and deep kitchen degreasing.',
          tags: ['Rotary Buffing', 'Chemical Free', 'Sanitized']
        },
        {
          id: 'w2',
          title: '7-Seater Fabric Sofa & Carpet Hot Steam Extraction',
          image: cleanerPng,
          category: 'Upholstery Steam Clean',
          location: 'Gulberg, Multan',
          completedDate: 'Completed 4 days ago',
          rating: 4.9,
          description: 'Industrial hot water steam extraction cleaning on suede fabric sofa and handmade wool rugs, removing tough stains and allergens with fast drying.',
          tags: ['Steam Extraction', 'Deep Stain Removal', 'Quick Dry']
        },
        {
          id: 'w3',
          title: 'Underground & Overhead RCC Water Tank Sanitization',
          image: homeCleaningImage,
          category: 'Water Tank Sanitizing',
          location: 'Cantt, Multan',
          completedDate: 'Completed 1 week ago',
          rating: 5.0,
          description: 'Sludge extraction with submersible pump, high-pressure 150-bar jet wash, chlorine disinfection, and UV lamp sterilization for clean potable water.',
          tags: ['150-Bar Jet Wash', 'Chlorine Sterilized', 'UV Treated']
        }
      ],
      'Appliance Repair': [
        {
          id: 'w1',
          title: 'Inverter Refrigerator Compressor & Inverter PCB Repair',
          image: applianceImage,
          category: 'Refrigerator Service',
          location: 'Gulgasht Colony, Multan',
          completedDate: 'Completed 2 days ago',
          rating: 5.0,
          description: 'Diagnosed BLDC compressor non-start fault, replaced burned IGBTs on motherboard PCB controller, refilled R600a eco-gas, and restored cooling.',
          tags: ['PCB Repair', 'R600a Eco Gas', '3-Month Warranty']
        },
        {
          id: 'w2',
          title: 'Front-Load Washing Machine Drum Bearing & Seal Replacement',
          image: applianceJpg,
          category: 'Washing Machine',
          location: 'Bosan Road, Multan',
          completedDate: 'Completed 5 days ago',
          rating: 4.9,
          description: 'Eliminated loud spin cycle vibrating noise by replacing twin heavy-duty SKF drum bearings, waterproof oil seal, and shock absorber dampers.',
          tags: ['SKF Bearings', 'Silent Spin', 'Original Spares']
        },
        {
          id: 'w3',
          title: 'Built-in Microwave & Oven Magnetron Replacement',
          image: applianceImage,
          category: 'Microwave & Oven',
          location: 'Cantt, Multan',
          completedDate: 'Completed 1 week ago',
          rating: 5.0,
          description: 'Replaced defective Panasonic 2M210 magnetron, high-voltage diode and capacitor, and tested microwave radiation shielding for 100% safety.',
          tags: ['High Voltage Test', 'Safety Radiation Check', 'Original Part']
        }
      ],
      'Glass & Aluminum': [
        {
          id: 'w1',
          title: 'Double-Glazed Soundproof Aluminum Windows Installation',
          image: aluminiumImage,
          category: 'Aluminum Glazing',
          location: 'Cantt, Multan',
          completedDate: 'Completed 2 days ago',
          rating: 5.0,
          description: 'Installed 1.6mm thermal-break powder-coated aluminum sliding windows with double-glazed acoustic glass to cut outside street noise by 85%.',
          tags: ['Thermal Break', 'Double Glazed', 'Noise Reduction']
        },
        {
          id: 'w2',
          title: 'Tempered Glass Shower Enclosure & Partition Fitting',
          image: aluminiumPng,
          category: 'Glass Partitions',
          location: 'Gulberg, Multan',
          completedDate: 'Completed 4 days ago',
          rating: 4.9,
          description: 'Custom fabricated 10mm clear tempered safety glass frameless shower partition with 304-grade matte black stainless steel hardware.',
          tags: ['10mm Tempered', 'Matte Black SS304', 'Zero Leak Seals']
        },
        {
          id: 'w3',
          title: 'Commercial Showroom Slim Aluminum Sliding Frontage',
          image: aluminiumImage,
          category: 'Commercial Aluminum',
          location: 'Bosan Road, Multan',
          completedDate: 'Completed 1 week ago',
          rating: 5.0,
          description: 'Completed 24-foot wide high-profile commercial glass storefront with heavy-duty roller track bearings and concealed floor springs.',
          tags: ['Heavy-Duty Rollers', 'Floor Springs', 'Architectural Glass']
        }
      ],
      'Gardener': [
        {
          id: 'w1',
          title: 'Luxury Lawn Turf Grass Laying & Landscape Designing',
          image: gardeningImage,
          category: 'Lawn & Turf Care',
          location: 'Model Town, Multan',
          completedDate: 'Completed 3 days ago',
          rating: 5.0,
          description: 'Levelled soil, added organic compost nutrient mix, and laid premium Dhaka fine-blade turf grass with automatic edging borders.',
          tags: ['Dhaka Grass', 'Organic Compost', 'Landscape Design']
        },
        {
          id: 'w2',
          title: 'Ornamental Tree Pruning & Automated Drip Irrigation Setup',
          image: gardeningPng,
          category: 'Irrigation & Tree Pruning',
          location: 'Cantt, Multan',
          completedDate: 'Completed 5 days ago',
          rating: 4.9,
          description: 'Precision trimming of palm and ficus trees, removed dry branches, and installed water-efficient micro drip irrigation lines for flowerbeds.',
          tags: ['Micro Drip Lines', 'Crown Pruning', 'Water Efficient']
        },
        {
          id: 'w3',
          title: 'Seasonal Flower Bedding & Soil Fertilization Treatment',
          image: gardeningImage,
          category: 'Soil & Plant Nutrition',
          location: 'Gulgasht Colony, Multan',
          completedDate: 'Completed 1 week ago',
          rating: 5.0,
          description: 'Planted seasonal Petunia and Marigold beds, applied root stimulator and eco-friendly pest prevention repellent across 2 Kanals.',
          tags: ['Seasonal Blooms', 'Pest Prevention', 'Root Stimulator']
        }
      ],
      'Welder': [
        {
          id: 'w1',
          title: 'Heavy-Duty Wrought Iron Security Gate & Compound Railing',
          image: welderImage,
          category: 'Iron Fabrication',
          location: 'Gulberg, Multan',
          completedDate: 'Completed 2 days ago',
          rating: 5.0,
          description: 'Custom fabricated 16-gauge wrought iron main sliding gate with anti-sag steel reinforcement, zinc-chromate rustproof primer, and deadbolt lock.',
          tags: ['16-Gauge Iron', 'Anti-Sag Frame', 'Rustproof Primed']
        },
        {
          id: 'w2',
          title: 'Custom Steel Staircase Spiral Framework & Grille Work',
          image: welderImage,
          category: 'Steel Structural Work',
          location: 'Bosan Road, Multan',
          completedDate: 'Completed 4 days ago',
          rating: 4.9,
          description: 'Engineered spiral metal staircase with non-slip tread plates, MIG-welded precision joints, and decorative baluster railings.',
          tags: ['MIG Precision', 'Non-Slip Treads', 'High Load Capacity']
        },
        {
          id: 'w3',
          title: 'Rooftop Car Porch Steel Shed Truss Welding',
          image: welderImage,
          category: 'Industrial Arc Welding',
          location: 'Cantt, Multan',
          completedDate: 'Completed 1 week ago',
          rating: 5.0,
          description: 'Fabricated triangular hollow steel truss frames, secure anchor plate bolting, and corrugated metal sheet roof shelter with wind bracing.',
          tags: ['Anchor Bolted', 'Wind Braced', 'Heavy Structural']
        }
      ],
      'Laundry & Ironing': [
        {
          id: 'w1',
          title: 'Delicate Designer Wear Dry Cleaning & Precision Steam Press',
          image: laundryImage,
          category: 'Steam Press & Care',
          location: 'Gulgasht Colony, Multan',
          completedDate: 'Completed Yesterday',
          rating: 5.0,
          description: 'Hydrocarbon gentle dry-cleaning on embroidered bridal dresses and Italian wool suits with crease-sharp steam ironing and protective garment covers.',
          tags: ['Hydrocarbon Clean', 'Crease-Sharp', 'Fabric Safe']
        },
        {
          id: 'w2',
          title: 'Heavy Bedding, Quilt & Curtain Sanitized Washing',
          image: laundryPng,
          category: 'Heavy Fabrics Wash',
          location: 'Cantt, Multan',
          completedDate: 'Completed 3 days ago',
          rating: 4.9,
          description: 'Hot water thermal wash on 4 king-size comforters and blackout curtains, anti-allergen enzyme rinse, and heated roller tumbling.',
          tags: ['Thermal Wash', 'Anti-Allergen', 'Fluff Dry']
        },
        {
          id: 'w3',
          title: 'Bulk Commercial Uniform Laundry & Rotary Pressing',
          image: laundryImage,
          category: 'Commercial Laundry',
          location: 'Bosan Road, Multan',
          completedDate: 'Completed 1 week ago',
          rating: 5.0,
          description: 'Same-day bulk washing, color-safe stain extraction, and high-speed industrial roller ironing for 60 medical and corporate uniforms.',
          tags: ['Bulk Express', 'Color Safe', 'Industrial Press']
        }
      ]
    }

    if (worksMap[norm]) return worksMap[norm]

    const fallbackImg = getHeaderImage(norm) || provider?.image || servicesHeroBanner
    return [
      {
        id: 'w1',
        title: `Residential ${norm} Full Overhaul & Repair`,
        image: fallbackImg,
        category: `${norm} Maintenance`,
        location: provider?.location || 'Multan, Pakistan',
        completedDate: 'Completed 2 days ago',
        rating: 5.0,
        description: `Completed comprehensive ${norm.toLowerCase()} execution for residential premises with highest safety standards and verified quality guarantee.`,
        tags: ['Verified Job', 'Same-Day Service', 'Warranty Protected']
      },
      {
        id: 'w2',
        title: `Emergency ${norm} Replacement & Installation`,
        image: fallbackImg,
        category: 'Emergency Dispatch',
        location: 'Gulberg, Multan',
        completedDate: 'Completed 5 days ago',
        rating: 4.9,
        description: `Dispatched on 30-minute notice, completed full diagnostic troubleshooting, and installed verified replacement components with precision.`,
        tags: ['Fast Response', 'Certified Expert', 'Escrow Insured']
      },
      {
        id: 'w3',
        title: `Commercial Maintenance & Annual Compliance Job`,
        image: fallbackImg,
        category: 'Commercial Service',
        location: 'Cantt, Multan',
        completedDate: 'Completed 1 week ago',
        rating: 5.0,
        description: `Quarterly inspection and maintenance contract execution with full diagnostic report and long-term durability guarantee.`,
        tags: ['Commercial Grade', 'Quality Tested', 'Client Recommended']
      }
    ]
  }

  const getProviderCustomerReviews = (provider) => {
    const sName = provider?.service || 'Service'
    return [
      {
        id: 'rev1',
        author: 'Muhammad Tariq',
        location: 'Gulgasht Colony, Multan',
        avatarColor: '#8FD3E8',
        rating: 5,
        date: '2 days ago',
        serviceDone: `${sName} Work`,
        comment: `${provider?.name || 'The provider'} arrived within 25 minutes! He was extremely courteous, diagnosed the exact issue right away, and charged the fair price agreed beforehand. Cleaned up everything before leaving. 10/10 service!`,
        helpfulCount: 16
      },
      {
        id: 'rev2',
        author: 'Dr. Ayesha Siddiqa',
        location: 'Cantt, Multan',
        avatarColor: '#354F52',
        rating: 5,
        date: '5 days ago',
        serviceDone: `Emergency ${sName}`,
        comment: `Finding reliable professionals used to be a headache until MUX SERVICES. ${provider?.name || 'The provider'} was very transparent, brought genuine equipment, and the work quality is top-notch. Highly recommended to everyone in Multan.`,
        helpfulCount: 12
      },
      {
        id: 'rev3',
        author: 'Usman Farooq',
        location: 'Bosan Road, Multan',
        avatarColor: '#d97706',
        rating: 5,
        date: '1 week ago',
        serviceDone: `${sName} Installation & Fitting`,
        comment: `Very professional attitude. He took time to explain what needed to be done and gave great preventive advice. Escrow payment through MUX SERVICES made the whole experience safe and hassle-free.`,
        helpfulCount: 9
      },
      {
        id: 'rev4',
        author: 'Zainab Bibi',
        location: 'DHA Phase 5, Lahore',
        avatarColor: '#7c3aed',
        rating: 5,
        date: '2 weeks ago',
        serviceDone: `${sName} Maintenance`,
        comment: `Great experience with ${provider?.name || 'the provider'}! He finished earlier than expected and tested everything twice before wrapping up. Will definitely hire again through MUX SERVICES.`,
        helpfulCount: 7
      },
      {
        id: 'rev5',
        author: 'Engr. Hamza Malik',
        location: 'Model Town, Multan',
        avatarColor: '#0891b2',
        rating: 5,
        date: '3 weeks ago',
        serviceDone: `Full ${sName} Project`,
        comment: `Superb craftsmanship and very neat execution. All safety protocols were followed properly. MUX SERVICES verified staff gave our entire family full peace of mind.`,
        helpfulCount: 14
      }
    ]
  }

  const handlePrevReview = () => {
    if (!selectedProvider) return
    const total = getProviderCustomerReviews(selectedProvider).length
    setReviewSlideIndex((prev) => (prev === 0 ? total - 1 : prev - 1))
  }

  const handleNextReview = () => {
    if (!selectedProvider) return
    const total = getProviderCustomerReviews(selectedProvider).length
    setReviewSlideIndex((prev) => (prev + 1) % total)
  }

  useEffect(() => {
    if (!isViewingProfile || !selectedProvider) return
    const count = getProviderCustomerReviews(selectedProvider).length
    if (count <= 1) return

    const timer = setInterval(() => {
      setReviewSlideIndex((prev) => (prev + 1) % count)
    }, 3200)

    return () => clearInterval(timer)
  }, [isViewingProfile, selectedProvider])

  return (
    <div className={`services-page ${selectedService ? 'has-detail-view' : ''}`}>
      {/* Booking & Checkout Flow (Triggered from Chat) */}
      {(showBookingForm || bookingStatus === 'confirmed' || bookingStatus === 'paid') && selectedProvider && !isViewingProfile && (
        <div className="booking-modal-overlay">
          <div className="booking-modal-container">
            <button className="booking-modal-close-btn" onClick={handleBackToProviders} title="Close">✕</button>
            {bookingStatus === 'paid' ? (
              <div className="booking-confirmed-section modal-step-view">
                <div className="confirmed-icon">✓</div>
                <h2 className="confirmed-title">Booking Confirmed!</h2>
                <p className="confirmed-message">
                  Your booking with <strong>{selectedProvider.name}</strong> ({selectedProvider.service}) has been successfully confirmed at <strong>{negotiatedPrice || selectedProvider.price}</strong>.
                </p>
                <div className="confirmed-summary-box">
                  <div className="cs-row">
                    <span className="cs-label">Service:</span>
                    <span className="cs-val">{selectedProvider.service}</span>
                  </div>
                  <div className="cs-row">
                    <span className="cs-label">Professional:</span>
                    <span className="cs-val">{selectedProvider.name}</span>
                  </div>
                  <div className="cs-row">
                    <span className="cs-label">Agreed Escrow Fee:</span>
                    <span className="cs-val price-highlight">{negotiatedPrice || selectedProvider.price}</span>
                  </div>
                  <div className="cs-row">
                    <span className="cs-label">Date & Time:</span>
                    <span className="cs-val">{bookingDate || 'Today'} at {bookingTime || '10:00 AM'}</span>
                  </div>
                  <div className="cs-row">
                    <span className="cs-label">Location:</span>
                    <span className="cs-val">{bookingAddress ? `${bookingAddress}, Multan` : 'Multan, Pakistan'}</span>
                  </div>
                  <div className="cs-row">
                    <span className="cs-label">Escrow Security:</span>
                    <span className="cs-val green-text">🛡️ Protected by MUX SERVICES</span>
                  </div>
                </div>
                <div className="confirmed-modal-actions">
                  <button className="btn-primary-done" onClick={handleBackToProviders}>
                    Back to Services
                  </button>
                  {setCurrentPage && (
                    <button className="btn-outline-bookings" onClick={() => { handleBackToProviders(); setCurrentPage('bookings'); }}>
                      View in My Bookings →
                    </button>
                  )}
                </div>
              </div>
            ) : bookingStatus === 'confirmed' ? (
              <div className="payment-section modal-step-view">
                <h2 className="payment-title">Complete Payment</h2>
                <p className="payment-subtitle">
                  Amount to pay: <strong>{negotiatedPrice || selectedProvider.price}</strong>
                  <span className="escrow-notice-text" style={{ display: 'block', fontSize: '0.84rem', marginTop: '4px' }}>
                    Notice: 100% Escrow Protection Active — Funds held securely in Pakistan Banking Escrow until satisfactory job completion.
                  </span>
                </p>
                <div className="payment-form">
                  <div className="payment-methods-grid">
                    <div className={`payment-method-card ${paymentMethod === 'card' ? 'selected' : ''}`} onClick={() => setPaymentMethod('card')}>
                      <div className="payment-method-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                      </div>
                      <h3>Credit/Debit Card</h3>
                    </div>
                    <div className={`payment-method-card ${paymentMethod === 'bank' ? 'selected' : ''}`} onClick={() => setPaymentMethod('bank')}>
                      <div className="payment-method-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="21" x2="21" y2="21"></line><line x1="3" y1="10" x2="21" y2="10"></line><polyline points="5 10 5 21"></polyline><polyline points="19 10 19 21"></polyline><polyline points="10 10 10 21"></polyline><polyline points="14 10 14 21"></polyline><polygon points="12 2 20 7 4 7 12 2"></polygon></svg>
                      </div>
                      <h3>Bank Transfer</h3>
                    </div>
                    <div className={`payment-method-card ${paymentMethod === 'wallet' ? 'selected' : ''}`} onClick={() => setPaymentMethod('wallet')}>
                      <div className="payment-method-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                      </div>
                      <h3>Digital Wallet</h3>
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="payment-details">
                      <div className="form-group">
                        <label>Card Number</label>
                        <input type="text" className="form-input" placeholder="1234 5678 9012 3456" maxLength="19" />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Expiry Date</label>
                          <input type="text" className="form-input" placeholder="MM/YY" maxLength="5" />
                        </div>
                        <div className="form-group">
                          <label>CVV</label>
                          <input type="text" className="form-input" placeholder="123" maxLength="3" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Cardholder Name</label>
                        <input type="text" className="form-input" placeholder="Name on card" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'bank' && bankPaymentStep === 1 && (
                    <div className="payment-details">
                      <div className="form-group">
                        <label>Select Bank</label>
                        <select className="form-input" value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
                          <option value="">-- Select Bank --</option>
                          {banks.map((bank, index) => (
                            <option key={index} value={bank}>{bank}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'bank' && bankPaymentStep === 2 && (
                    <div className="payment-details">
                      <h3 className="payment-details-title">Enter Your Account Details</h3>
                      <div className="form-group">
                        <label>Account Title</label>
                        <input type="text" className="form-input" placeholder="Your account title" value={userAccountTitle} onChange={(e) => setUserAccountTitle(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Account/IBAN Number</label>
                        <input type="text" className="form-input" placeholder="Your account number or IBAN" value={userAccountNumber} onChange={(e) => setUserAccountNumber(e.target.value)} />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'bank' && bankPaymentStep === 3 && (
                    <div className="payment-details bank-confirmation">
                      <div className="bank-info-card">
                        <h3 className="bank-info-title">Bank Transfer Details</h3>
                        <div className="bank-info-item">
                          <span className="bank-info-label">Bank:</span>
                          <span className="bank-info-value">{selectedBank}</span>
                        </div>
                        <div className="bank-info-item">
                          <span className="bank-info-label">Account Title:</span>
                          <span className="bank-info-value">MUX SERVICES Pvt Ltd</span>
                        </div>
                        <div className="bank-info-item">
                          <span className="bank-info-label">Account Number:</span>
                          <span className="bank-info-value">1234-5678-9012-3456</span>
                        </div>
                        <div className="bank-info-item">
                          <span className="bank-info-label">IBAN:</span>
                          <span className="bank-info-value">PK36HABB0000123456789012</span>
                        </div>
                        <div className="bank-info-item">
                          <span className="bank-info-label">Amount:</span>
                          <span className="bank-info-value">{negotiatedPrice || selectedProvider.price}</span>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Enter Your PIN</label>
                        <input type="password" className="form-input" placeholder="****" maxLength="4" value={bankPin} onChange={(e) => setBankPin(e.target.value)} />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'wallet' && walletPaymentStep === 1 && (
                    <div className="payment-details">
                      <div className="form-group">
                        <label>Select Wallet</label>
                        <select className="form-input" value={selectedWallet} onChange={(e) => setSelectedWallet(e.target.value)}>
                          <option value="">-- Select Wallet --</option>
                          {wallets.map((wallet, index) => (
                            <option key={index} value={wallet}>{wallet}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'wallet' && walletPaymentStep === 2 && (
                    <div className="payment-details">
                      <h3 className="payment-details-title">Enter Your Details</h3>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input type="text" className="form-input" placeholder="Your phone number" value={walletPhoneNumber} onChange={(e) => setWalletPhoneNumber(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-input" placeholder="Your name" value={walletName} onChange={(e) => setWalletName(e.target.value)} />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'wallet' && walletPaymentStep === 3 && (
                    <div className="payment-details wallet-confirmation">
                      <div className="wallet-info-card">
                        <h3 className="wallet-info-title">Wallet Payment Details</h3>
                        <div className="wallet-info-item">
                          <span className="wallet-info-label">Wallet:</span>
                          <span className="wallet-info-value">{selectedWallet}</span>
                        </div>
                        <div className="wallet-info-item">
                          <span className="wallet-info-label">Phone Number:</span>
                          <span className="wallet-info-value">{walletPhoneNumber}</span>
                        </div>
                        <div className="wallet-info-item">
                          <span className="wallet-info-label">Name:</span>
                          <span className="wallet-info-value">{walletName}</span>
                        </div>
                        <div className="wallet-info-item">
                          <span className="wallet-info-label">Amount:</span>
                          <span className="wallet-info-value">{negotiatedPrice || selectedProvider.price}</span>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Enter Your PIN</label>
                        <input type="password" className="form-input" placeholder="****" maxLength="4" value={walletPin} onChange={(e) => setWalletPin(e.target.value)} />
                      </div>
                    </div>
                  )}

                  <button className="pay-now-btn" onClick={() => {
                    if (paymentMethod === 'bank' && bankPaymentStep === 1 && selectedBank) {
                      setBankPaymentStep(2)
                    } else if (paymentMethod === 'bank' && bankPaymentStep === 2) {
                      setBankPaymentStep(3)
                    } else if (paymentMethod === 'bank' && bankPaymentStep === 3) {
                      setBookingStatus('paid')
                    } else if (paymentMethod === 'wallet' && walletPaymentStep === 1 && selectedWallet) {
                      setWalletPaymentStep(2)
                    } else if (paymentMethod === 'wallet' && walletPaymentStep === 2) {
                      setWalletPaymentStep(3)
                    } else if (paymentMethod === 'wallet' && walletPaymentStep === 3) {
                      setBookingStatus('paid')
                    } else {
                      setBookingStatus('paid')
                    }
                  }}>
                    {(paymentMethod === 'bank' && bankPaymentStep < 3) || (paymentMethod === 'wallet' && walletPaymentStep < 3) ? 'Continue' : 'Pay Now'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="booking-form-container modal-step-view">
                <button className="chat-history-btn" onClick={() => { setShowChat(true); setIsHistoryMode(true) }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  <span>View Chat History</span>
                </button>
                <h2 className="booking-form-title">Complete Your Booking</h2>
                <p style={{ fontSize: '0.9rem', marginBottom: '1.2rem' }}>
                  Booking with <strong>{selectedProvider.name}</strong> • Agreed Price: <strong className="booking-price-val">{negotiatedPrice || selectedProvider.price}</strong>
                </p>

                <div className="booking-form">
                  <div className="form-group">
                    <label>Service Type</label>
                    <input type="text" value={selectedProvider.service} readOnly className="form-input" />
                  </div>

                  <div className="form-group">
                    <label>Date</label>
                    <input 
                      type="date" 
                      className="form-input" 
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Time</label>
                    <input 
                      type="time" 
                      className="form-input" 
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Address (Multan, Pakistan)</label>
                    <textarea 
                      className="form-textarea" 
                      rows="3" 
                      placeholder="Enter your address in Multan"
                      value={bookingAddress}
                      onChange={(e) => setBookingAddress(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>Additional Notes</label>
                    <textarea 
                      className="form-textarea" 
                      rows="3" 
                      placeholder="Any special requirements"
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                    ></textarea>
                  </div>

                  <button 
                    className="confirm-booking-btn" 
                    onClick={handleConfirmBooking}
                    disabled={isSubmittingBooking}
                  >
                    {isSubmittingBooking ? 'Confirming...' : 'Confirm Booking & Proceed to Payment'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Provider Profile View */}
      {isViewingProfile && selectedProvider ? (
        <div className="booking-view provider-profile-view">
          <div className="booking-header">
            {/* Background Cinematic Profile Banner */}
            <img 
              src={providerProfileBanner} 
              alt="Specialist Profile Background" 
              className="booking-header-bg-img" 
            />
            <div className="booking-header-ambient-overlay" aria-hidden="true"></div>

            <div className="booking-header-content">
              <div className="booking-profile-section">
                <div className="booking-dp-orbit-container">
                  {/* Animated rotating non-attached circular lines (arcs) around DP */}
                  <svg className="dp-orbit-svg" viewBox="0 0 220 220" aria-hidden="true">
                    <defs>
                      <linearGradient id="dpOrbitCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8FD3E8" />
                        <stop offset="100%" stopColor="#bdecf9" />
                      </linearGradient>
                      <linearGradient id="dpOrbitBlueGrad" x1="100%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#EEF4F4" />
                        <stop offset="100%" stopColor="#8FD3E8" />
                      </linearGradient>
                    </defs>
                    {/* Outer Ring: dual rotating detached arcs (one top, one bottom, not connected) */}
                    <g className="dp-orbit-spin-clockwise">
                      {/* Top Arc (from top down) */}
                      <circle
                        cx="110"
                        cy="110"
                        r="101"
                        fill="none"
                        stroke="url(#dpOrbitCyanGrad)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeDasharray="180 137"
                        strokeDashoffset="0"
                      />
                      {/* Bottom Arc (from bottom up, separated by gap, not connected) */}
                      <circle
                        cx="110"
                        cy="110"
                        r="101"
                        fill="none"
                        stroke="url(#dpOrbitCyanGrad)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeDasharray="180 137"
                        strokeDashoffset="317"
                      />
                    </g>
                    {/* Inner Ring: secondary counter-rotating detached arcs */}
                    <g className="dp-orbit-spin-counter">
                      <circle
                        cx="110"
                        cy="110"
                        r="94"
                        fill="none"
                        stroke="url(#dpOrbitBlueGrad)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray="115 180"
                        strokeDashoffset="60"
                      />
                      <circle
                        cx="110"
                        cy="110"
                        r="94"
                        fill="none"
                        stroke="url(#dpOrbitBlueGrad)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray="115 180"
                        strokeDashoffset="210"
                      />
                    </g>
                  </svg>

                  <div className="booking-profile-image">
                    {getProviderDP(selectedProvider) ? (
                      <img src={getProviderDP(selectedProvider)} alt={selectedProvider.name} className="provider-dp-img" />
                    ) : (
                      <span className="profile-initial">{selectedProvider.name.charAt(0)}</span>
                    )}
                  </div>
                </div>

                <div className="booking-profile-details">
                  <h2 className="provider-name">{selectedProvider.name}</h2>
                  <div className="provider-rating">
                    <span className="star">⭐</span>
                    <span>{selectedProvider.rating}</span>
                    <span className="reviews">({selectedProvider.reviews} verified reviews)</span>
                  </div>
                  <p className="provider-about">
                    {selectedProvider.bio || `Certified ${selectedProvider.service} specialist with years of proven residential and commercial experience in ${selectedProvider.location}. Fully vetted with guaranteed satisfaction on MUX SERVICES.`}
                  </p>
                </div>
              </div>

              <div className="booking-header-buttons">
                <button
                  className="profile-direct-chat-btn"
                  onClick={handleStartChat}
                >
                  💬 Direct Chat &amp; Hire
                </button>
                <button 
                  className="share-profile-btn"
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href)
                      alert(`Profile link for ${selectedProvider.name} copied to clipboard!`)
                    }
                  }}
                >
                  🔗 Share Profile
                </button>
              </div>
            </div>
          </div>

          <div className="booking-content-section">
            <div className="booking-content-container">
              {/* Services Offered */}
              <h2 className="services-offered-title">Services Offered</h2>
              <div className="services-offered-grid">
                <div className="service-offer-card">
                  <div className="service-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                  </div>
                  <h3>{selectedProvider.service}</h3>
                  <p>Professional residential & commercial {selectedProvider.service.toLowerCase()} solutions</p>
                </div>
                <div className="service-offer-card">
                  <div className="service-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                  </div>
                  <h3>Emergency Service</h3>
                  <p>24/7 emergency response across Multan & Lahore</p>
                </div>
                <div className="service-offer-card">
                  <div className="service-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  </div>
                  <h3>Quality Assured</h3>
                  <p>100% guarantee with MUX SERVICES Escrow protection</p>
                </div>
              </div>

              {/* Provider Information */}
              <div className="provider-info-section">
                <h2 className="provider-info-title">Provider Information & Credentials</h2>
                <div className="provider-info-grid">
                  <div className="info-item">
                    <span className="info-label">Location:</span>
                    <span className="info-value">{selectedProvider.location}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Starting Price:</span>
                    <span className="info-value">{selectedProvider.price}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Response Time:</span>
                    <span className="info-value">{selectedProvider.date || 'Within 15 mins'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Identity Verified:</span>
                    <span className="info-value verified-nadra-text">✓ Verified NADRA CNIC</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Jobs Completed:</span>
                    <span className="info-value">{selectedProvider.reviews || '120'}+ Verified Jobs</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Escrow Protected:</span>
                    <span className="info-value" style={{ color: '#8FD3E8', fontWeight: 700 }}>✓ 100% Secure</span>
                  </div>
                </div>
              </div>

              {/* COMPLETED WORKS & PROJECTS SECTION */}
              <div className="completed-works-section">
                <div className="section-header-block">
                  <span className="section-header-badge">Portfolio & Past Projects</span>
                  <h2 className="section-main-title">
                    <span>Completed Works</span>
                  </h2>
                  <p className="section-main-subtitle">
                    Recent verified jobs and maintenance projects successfully executed by {selectedProvider.name}
                  </p>
                </div>

                <div className="completed-works-grid">
                  {getProviderCompletedWorks(selectedProvider).map((work) => (
                    <div key={work.id} className="completed-work-card">
                      <div className="work-card-media">
                        <img src={work.image} alt={work.title} className="work-card-img" />
                        <span className="work-verified-pill">✓ Verified Job</span>
                        <span className="work-rating-pill">⭐ {work.rating.toFixed(1)}</span>
                      </div>
                      <div className="work-card-body">
                        <div className="work-card-meta-top">
                          <span className="work-category-tag">{work.category}</span>
                          <span className="work-completed-date">{work.completedDate}</span>
                        </div>
                        <h3 className="work-card-title">{work.title}</h3>
                        <p className="work-card-desc">{work.description}</p>
                        <div className="work-tags-row">
                          {work.tags.map((t, idx) => (
                            <span key={idx} className="work-tag-chip">{t}</span>
                          ))}
                        </div>
                        <div className="work-card-footer">
                          <span className="work-location">📍 {work.location}</span>
                          <span className="work-guarantee">🛡️ Verified Craftsmanship</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CUSTOMER REVIEWS & RATINGS SECTION */}
              <div className="customer-reviews-section">
                <div className="section-header-block">
                  <span className="section-header-badge">Customer Feedback</span>
                  <h2 className="section-main-title">
                    <span>Client Reviews & Ratings</span>
                  </h2>
                  <p className="section-main-subtitle">
                    Verified testimonials and ratings from clients who hired {selectedProvider.name} on MUX SERVICES
                  </p>
                </div>

                {/* Rating Summary Bar */}
                <div className="reviews-summary-card">
                  <div className="summary-score-group">
                    <span className="summary-big-rating">{selectedProvider.rating}</span>
                    <div>
                      <div className="summary-stars-row">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} style={{ color: '#8FD3E8' }}>★</span>
                        ))}
                      </div>
                      <p className="summary-total-text">Based on {selectedProvider.reviews} verified client reviews</p>
                    </div>
                  </div>
                  <div className="summary-stats-pills">
                    <div className="stat-pill">
                      <span className="stat-pill-val">100%</span>
                      <span className="stat-pill-lbl">Job Completion</span>
                    </div>
                    <div className="stat-pill">
                      <span className="stat-pill-val">99%</span>
                      <span className="stat-pill-lbl">On-Time Arrival</span>
                    </div>
                    <div className="stat-pill">
                      <span className="stat-pill-val">4.9/5</span>
                      <span className="stat-pill-lbl">Work Quality</span>
                    </div>
                  </div>
                </div>

                {/* Continuous Auto-Rotating Reviews Slider */}
                <div className="reviews-slider-container">
                  <div className="reviews-slider-top-bar">
                    <div className="slider-indicator-text">
                      <span className="live-dot-pulse"></span>
                      <span>Verified Testimonials • Slide {reviewSlideIndex + 1} of {getProviderCustomerReviews(selectedProvider).length}</span>
                    </div>
                    <div className="slider-nav-arrows">
                      <button 
                        className="review-slider-arrow prev" 
                        onClick={handlePrevReview}
                        title="Previous Review"
                        aria-label="Previous Review"
                      >
                        ‹
                      </button>
                      <button 
                        className="review-slider-arrow next" 
                        onClick={handleNextReview}
                        title="Next Review"
                        aria-label="Next Review"
                      >
                        ›
                      </button>
                    </div>
                  </div>

                  <div className="reviews-slider-viewport">
                    <div 
                      className="reviews-slider-track"
                      style={{ transform: `translateX(-${reviewSlideIndex * 100}%)` }}
                    >
                      {getProviderCustomerReviews(selectedProvider).map((rev) => (
                        <div key={rev.id} className="review-slide-item">
                          <div className="customer-review-card slider-card-inner">
                            <div className="review-header">
                              <div className="reviewer-info-group">
                                <div className="reviewer-avatar-circle" style={{ backgroundColor: rev.avatarColor }}>
                                  {rev.author.charAt(0)}
                                </div>
                                <div>
                                  <h4 className="reviewer-name">{rev.author}</h4>
                                  <p className="reviewer-location">📍 {rev.location}</p>
                                </div>
                              </div>
                              <span className="review-verified-tag">✓ Verified Hire</span>
                            </div>
                            <div className="review-stars-row">
                              <span style={{ color: '#f59e0b', fontSize: '1.1rem' }}>★★★★★</span>
                              <span className="review-date">{rev.date}</span>
                            </div>
                            <span className="review-service-pill">🛠️ {rev.serviceDone}</span>
                            <p className="review-comment-text">"{rev.comment}"</p>
                            <div className="review-footer">
                              <span>MUX SERVICES Escrow Verified</span>
                              <button className="helpful-btn">👍 Helpful ({rev.helpfulCount})</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dots Navigation */}
                  <div className="reviews-slider-dots">
                    {getProviderCustomerReviews(selectedProvider).map((_, idx) => (
                      <button
                        key={idx}
                        className={`review-slider-dot ${idx === reviewSlideIndex ? 'active' : ''}`}
                        onClick={() => setReviewSlideIndex(idx)}
                        aria-label={`Go to review ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      ) : selectedService ? (
        <div className="service-detail-view">
          <div className="gradient-header">
            <img src={getHeaderImage(selectedService)} alt={`${selectedService} Background`} className="header-background-image" />
            <div className="header-overlay-ambient" aria-hidden="true"></div>

            <div className="header-content">
              {/* Centered Category Badge */}
              <div className="detail-top-nav-row">
                <div className="detail-badge">
                  <span className="detail-badge-dot"></span>
                  <span>MULTAN VERIFIED SPECIALISTS</span>
                </div>
              </div>

              <h1 className="header-title">
                <span className="hero-title-mint-shine">{getServiceTitle(selectedService)}</span>
              </h1>
              <p className="header-subtitle">{getServiceSubtitle(selectedService)}</p>


            </div>
          </div>

          <div className="white-content-section">

            {/* ══════════════════════════════════════════════════════════════
                CHOOSE LOCATION & SERVICE RECIPIENT DISPATCH BAR
                Allows booking for Myself (My Location) or Someone Else (Choose Locality)
            ══════════════════════════════════════════════════════════════ */}
            <div className="location-dispatcher-card animated-shadow-aura">
              <div className="ldc-header-row">
                <div className="ldc-heading-block">
                  <div className="ldc-badge-pill">
                    <span className="ldc-pulse-dot"></span>
                    <span>DISPATCH DESTINATION</span>
                  </div>
                  <h3 className="ldc-title">
                    {bookingFor === 'myself' 
                      ? 'Technicians Stationed Near Your Location' 
                      : `Technicians Stationed Near ${selectedLocality}`}
                  </h3>
                  <p className="ldc-subtitle">
                    Select whether this service is for yourself or someone else to view specialists stationed closest to the target doorstep.
                  </p>
                </div>

                {/* Recipient Toggle: For Myself vs For Someone Else */}
                <div className="ldc-toggle-group">
                  <button 
                    type="button" 
                    className={`ldc-toggle-btn ${bookingFor === 'myself' ? 'active' : ''}`}
                    onClick={() => {
                      setBookingFor('myself')
                      setSelectedLocality(userDefaultLocality)
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>For Myself</span>
                  </button>

                  <button 
                    type="button" 
                    className={`ldc-toggle-btn ${bookingFor === 'someone_else' ? 'active' : ''}`}
                    onClick={() => setBookingFor('someone_else')}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <span>For Someone Else</span>
                  </button>
                </div>
              </div>

              {/* Status Banner */}
              {bookingFor === 'myself' ? (
                <div className="ldc-myself-banner">
                  <div className="ldc-myself-left">
                    <div className="ldc-icon-circle">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#17f7f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div>
                      <div className="ldc-location-title-row">
                        <span className="ldc-loc-label">Active Delivery Location:</span>
                        <strong className="ldc-loc-value">{userDefaultLocality}</strong>
                        <span className="ldc-status-chip">Registered Home</span>
                      </div>
                      <p className="ldc-loc-subtext">
                        Showing all certified specialists stationed nearby {userDefaultLocality} with rapid doorstep arrival (approx 10-20 mins).
                      </p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className="ldc-switch-area-btn"
                    onClick={() => setBookingFor('someone_else')}
                  >
                    <span>Choose Other Multan Area →</span>
                  </button>
                </div>
              ) : (
                <div className="ldc-other-picker-box">
                  <div className="ldc-picker-headline">
                    <div className="ldc-pin-pulse">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#17f7f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                      </svg>
                    </div>
                    <div>
                      <strong>Select Multan Delivery Locality For Recipient:</strong>
                      <span className="ldc-subtle-hint">Choose neighborhood to see nearest stationed specialists</span>
                    </div>
                  </div>

                  {/* Multan Area Quick Select Pills */}
                  <div className="ldc-area-pills-wrap">
                    {MULTAN_LOCALITIES.map(loc => (
                      <button
                        key={loc.id}
                        type="button"
                        className={`ldc-area-pill ${selectedLocality === loc.name ? 'selected' : ''}`}
                        onClick={() => setSelectedLocality(loc.name)}
                      >
                        <span className="ldc-pill-marker"></span>
                        <span className="ldc-pill-text">{loc.name}</span>
                        <span className="ldc-pill-subtag">{loc.tag}</span>
                      </button>
                    ))}
                  </div>

                  {/* Recipient Detailed Address / Area Dropdown Row */}
                  <div className="ldc-address-fields-grid">
                    <div className="ldc-field-group">
                      <label className="ldc-field-label">Selected Multan Locality</label>
                      <select 
                        className="ldc-field-select"
                        value={selectedLocality}
                        onChange={(e) => setSelectedLocality(e.target.value)}
                      >
                        {MULTAN_LOCALITIES.map(loc => (
                          <option key={loc.id} value={loc.name}>{loc.name} ({loc.tag})</option>
                        ))}
                      </select>
                    </div>
                    <div className="ldc-field-group flex-2">
                      <label className="ldc-field-label">Recipient Exact Address / Landmark (Optional)</label>
                      <input 
                        type="text" 
                        className="ldc-field-input" 
                        placeholder="e.g. House #14, Street 5, Near Gol Bagh / Commercial Market..."
                        value={recipientAddress}
                        onChange={(e) => setRecipientAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Active Filtering Feedback */}
                  <div className="ldc-feedback-strip">
                    <span className="ldc-dot-emerald"></span>
                    <span>
                      {selectedLocality === 'All Multan Areas' 
                        ? 'Displaying all certified specialists across Multan with citywide rapid response.' 
                        : `Displaying specialists located in or providing rapid dispatch to: ${selectedLocality}`}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="search-filters-row">
              <div className="search-bar-inline">
                <input 
                  type="text" 
                  placeholder="Search specialists, locations, skills..." 
                  className="inline-search-input" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="inline-search-btn" title="Search">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </button>
              </div>
              <div className="inline-filters">
                <div className="inline-filter">
                  <label>Rating:</label>
                  <select 
                    className="inline-select"
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                  >
                    <option value="All">All Ratings</option>
                    <option value="4.5">4.5+ ⭐</option>
                    <option value="4.0">4.0+ ⭐</option>
                    <option value="3.5">3.5+ ⭐</option>
                  </select>
                </div>
                <div className="inline-filter">
                  <label>Price Range:</label>
                  <select 
                    className="inline-select"
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                  >
                    <option value="All">All Prices</option>
                    <option value="0-50">PKR 0 - PKR 2,500</option>
                    <option value="50-100">PKR 2,500 - PKR 5,000</option>
                    <option value="100+">PKR 5,000+</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Official Booking Protection Banner (100% Unified Brand Theme) */}
            <div className="safety-notice-banner">
              <div className="safety-notice-header">
                <div className="safety-notice-icon-circle">
                  <span className="safety-info-icon">🛡️</span>
                </div>
                <h3 className="safety-notice-title">
                  <span>Official Booking Protection</span>
                </h3>
              </div>
              <div className="safety-notice-content">
                <p className="safety-text-en">
                  Direct off-platform payments or unofficial phone agreements bypass MUX SERVICES quality supervision and dispute resolution. To guarantee certified craftsmanship, standard PKR rate cards, and verified technician accountability across Multan, always book directly through our official platform.
                </p>
                <p className="safety-text-ur" dir="rtl">
                  مکس سروسز پلیٹ فارم سے باہر براہ راست غیر تصدیق شدہ نقد لین دین یا فون پر زبانی ڈیل کرنا سیکیورٹی رسک ہے۔ سروس کے مکمل معیار، شفاف ریٹس اور تصدیق شدہ ٹیکنیشنز کی فوری رسائی کے لیے ہمیشہ آفیشل پورٹل کے ذریعے بکنگ مکمل کریں۔
                </p>
              </div>
            </div>

            {/* Provider Requests List */}
            <div className="provider-requests-container">
              {(() => {
                const isAllAreas = !selectedLocality || selectedLocality === 'All Multan Areas'
                const localityTerm = isAllAreas ? '' : selectedLocality.toLowerCase().replace(', multan', '').replace('multan', '').trim()

                const checkLocMatch = (locStr) => {
                  if (isAllAreas) return true
                  if (!locStr) return false
                  const l = locStr.toLowerCase()
                  if (localityTerm.includes('cantt') && l.includes('cantt')) return true
                  if (localityTerm.includes('gulgasht') && l.includes('gulgasht')) return true
                  if (localityTerm.includes('bosan') && l.includes('bosan')) return true
                  if (localityTerm.includes('officers') && l.includes('officers')) return true
                  if (localityTerm.includes('model town') && l.includes('model town')) return true
                  if (localityTerm.includes('mda') && (l.includes('mda') || l.includes('rukn'))) return true
                  if (localityTerm.includes('new multan') && l.includes('new multan')) return true
                  if (localityTerm.includes('mumtazabad') && l.includes('mumtazabad')) return true
                  if (localityTerm.includes('wapda') && l.includes('wapda')) return true
                  return l.includes(localityTerm) || localityTerm.includes(l.split(',')[0].trim().toLowerCase())
                }

                // All providers for this service
                const allProviders = getServiceProviders(selectedService)

                // Filter by search, rating, price
                const filteredBySearchAndRate = allProviders.filter((req) => {
                  if (searchQuery.trim()) {
                    const q = searchQuery.toLowerCase()
                    const matchName = req.name?.toLowerCase().includes(q)
                    const matchService = req.service?.toLowerCase().includes(q)
                    const matchLoc = req.location?.toLowerCase().includes(q)
                    const matchTags = Array.isArray(req.tags) && req.tags.some(t => t.toLowerCase().includes(q))
                    if (!matchName && !matchService && !matchLoc && !matchTags) return false
                  }
                  if (ratingFilter !== 'All') {
                    const minRating = parseFloat(ratingFilter)
                    if (parseFloat(req.rating) < minRating) return false
                  }
                  if (priceFilter !== 'All') {
                    const numPrice = parseInt(req.price.replace(/[^0-9]/g, ''), 10) || 0
                    if (priceFilter === '0-50' && (numPrice < 0 || numPrice > 50)) return false
                    if (priceFilter === '50-100' && (numPrice < 50 || numPrice > 100)) return false
                    if (priceFilter === '100+' && numPrice < 100) return false
                  }
                  return true
                })

                // Split into exact local matches vs nearby rapid dispatch
                const exactMatches = filteredBySearchAndRate.filter(req => checkLocMatch(req.location))
                const hasExact = exactMatches.length > 0
                const displayList = hasExact ? exactMatches : filteredBySearchAndRate

                if (displayList.length === 0) {
                  return (
                    <div className="no-providers-box">
                      <p className="no-providers-text">No verified specialists found matching your search filters.</p>
                      <button 
                        onClick={() => { setSearchQuery(''); setRatingFilter('All'); setPriceFilter('All'); setSelectedLocality('All Multan Areas'); }}
                        className="clear-filters-btn"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  )
                }

                return (
                  <>
                    {!isAllAreas && !hasExact && (
                      <div className="location-fallback-notice animated-shadow-aura">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#17f7f7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <span>
                          No specialists directly headquartered inside <strong>{selectedLocality}</strong>, but these top-rated Multan specialists are equipped with rapid transport and guarantee arrival in <strong>20-25 mins</strong>:
                        </span>
                      </div>
                    )}

                    {displayList.map((req, index) => {
                      const photo = getProviderImage(req, selectedService)
                      const roleTitle = getProviderRole(req, selectedService)
                      const tags = getProviderTags(req, selectedService)
                      const bio = getProviderBio(req, selectedService)
                      const isLocalStationed = checkLocMatch(req.location)

                      return (
                        <div 
                          key={req.id || index} 
                          className="provider-request-card"
                          style={{ animationDelay: `${index * 0.08}s` }}
                        >
                          {/* Left: Provider Photo with Floating Rating */}
                          <div className="provider-card-photo-box">
                            <img 
                              src={photo} 
                              alt={req.name} 
                              className="provider-card-photo"
                              onError={(e) => {
                                e.target.onerror = null
                                e.target.src = getHeaderImage(selectedService)
                              }}
                            />
                            <div className="provider-card-rating-badge">
                              <span className="star-icon">⭐</span>
                              <span className="rating-val">{req.rating}</span>
                              <span className="reviews-val">({req.reviews})</span>
                            </div>
                          </div>

                          {/* Right: Info, Tags, Bio, Actions */}
                          <div className="provider-card-details">
                            <div className="provider-card-top-row">
                              <div className="provider-name-block">
                                <div className="provider-name-verified-line">
                                  <h3 className="provider-card-name">{req.name}</h3>
                                  <span className="provider-verified-badge">✓ Verified</span>
                                </div>
                                <span className="provider-card-role">{roleTitle}</span>

                                {/* Multan Locality & Arrival ETA Tags */}
                                <div className="provider-locality-dispatch-row">
                                  <span className="pldr-location-badge">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#17f7f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                      <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    <span>{req.location}</span>
                                  </span>
                                  <span className={`pldr-eta-chip ${isLocalStationed ? 'local-speed' : 'citywide-speed'}`}>
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    <span>{getProviderETA(req.location, selectedLocality)}</span>
                                  </span>
                                </div>
                              </div>

                              <div className="provider-price-block">
                                <span className="price-label">STARTING AT</span>
                                <span className="price-amount">{req.price}</span>
                              </div>
                            </div>

                            {/* Skill Tags */}
                            <div className="provider-tags-row">
                              {tags.map((tag, tIdx) => (
                                <span key={tIdx} className="provider-tag-chip">{tag}</span>
                              ))}
                            </div>

                            {/* Bio / Description */}
                            <p className="provider-bio-text">{bio}</p>

                            {/* Action Buttons */}
                            <div className="provider-actions-row">
                              <button 
                                type="button" 
                                className="provider-view-profile-btn"
                                onClick={() => handleViewProviderProfile(req)}
                              >
                                View Full Profile
                              </button>
                              <button 
                                type="button" 
                                className="provider-chat-btn"
                                onClick={() => handleMessageProvider(req)}
                                title={`Chat with ${req.name}`}
                              >
                                <span className="btn-chat-icon">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                </span>
                                <span>Direct Chat</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </>
                )
              })()}
            </div>

            {/* Pagination Dots */}
            <div className="requests-pagination-dots">
              <span className="page-dot active"></span>
              <span className="page-dot"></span>
              <span className="page-dot"></span>
              <span className="page-dot"></span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* ── HERO ── */}
          <div className="services-hero">
            <img src={servicesHeroBanner} alt="Home Services Header" className="services-hero-bg" />
            <div className="services-hero-overlay" aria-hidden="true"></div>
            <div className="services-hero-content">
              <h1 className="hero-title">
                <span className="hero-title-mint-shine">Find Expert Home Services</span>
              </h1>
              <p className="hero-subtitle">Multan's premier verified platform for home repairs, maintenance, plumbing, electrical &amp; HVAC solutions.</p>
              <div className="hero-search-row">
                <input 
                  type="text" 
                  placeholder="Search home service (e.g. Electrician, Plumber, AC Repair)..." 
                  className="hero-search-input" 
                  value={heroSearchQuery}
                  onChange={(e) => setHeroSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && heroSearchQuery.trim()) {
                      handleServiceClick(heroSearchQuery.trim())
                    }
                  }}
                />
                <input 
                  type="text" 
                  placeholder="Location" 
                  defaultValue="Multan, Pakistan" 
                  readOnly 
                  className="hero-location-input" 
                />
                <button 
                  className="hero-search-btn"
                  onClick={() => {
                    if (heroSearchQuery.trim()) {
                      handleServiceClick(heroSearchQuery.trim())
                    }
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════
              HOME & REPAIR SERVICES CATALOG (CLEAN LEFT HEADER & 3 CARDS ROW)
          ══════════════════════════════════════════ */}
          <div className="svc-section svc-home">
            <div className="svc-home-header-row">
              <div className="svc-home-header-left">
                <h2 className="svc-home-clean-title">Home &amp; Repair Services</h2>
                <p className="svc-home-clean-sub">Electricians, Plumbers, Carpenters, AC Technicians &amp; Cleaners — 100% verified &amp; trusted</p>
              </div>
              <button className="svc-view-all-clean-btn" onClick={toggleHomeServices}>
                {showAllHomeServices ? 'Show Popular (6) ↑' : 'View All (11) →'}
              </button>
            </div>
            <div ref={homeGridRef} className={`svc-home-grid ${cardsOpen ? 'cards-open' : ''}`}>
              {(showAllHomeServices ? allHomeServices : homeRepairServices).map((service, index) => (
                <div 
                  key={index} 
                  className="svc-home-card" 
                  onClick={() => handleServiceClick(service.name)}
                >
                  <div className="svc-home-img">
                    <img src={service.image} alt={service.name} />
                  </div>
                  <div className="svc-home-body">
                    <div className="svc-home-badge">{service.badge}</div>
                    <h3 className="svc-home-name">{service.name}</h3>
                    <p className="svc-home-desc">{service.description}</p>
                    <div className="svc-home-meta">
                      <span>⭐ {service.rating} ({service.reviews})</span>
                      <strong>{service.price}</strong>
                    </div>
                    <button className="svc-home-btn" onClick={(e) => { e.stopPropagation(); handleServiceClick(service.name); }}>
                      Book Now →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Services
