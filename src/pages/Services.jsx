import { useState, useEffect } from 'react'
import './Services.css'
import homeIcon from '../Public/home icon.jpg'
import techIcon from '../Public/tech icon.avif'
import headerImage from '../Public/4.png'
import plumberImage from '../Public/plumber.png'
import carpenterImage from '../Public/carpenter.png'
import homeCleaningImage from '../Public/home cleaning.png'
import paintingImage from '../Public/painting.png'
import servicesHeaderImage from '../Public/services scr.png'
import aluminiumImage from '../Public/aluminium.png'
import gardeningImage from '../Public/gardeninig.png'
import acImage from '../Public/ac.png'
import welderImage from '../Public/welder.png'
import laundryImage from '../Public/laundry.png'
import screenImage from '../Public/screen.png'
import image22 from '../Public/22.png'
import image03 from '../Public/03.png'
import electricianImage from '../Public/electrician.jpg'
import applianceImage from '../Public/appliance.jpg'
import itSupportImage from '../Public/it-support.jpg'
import uiuxImage from '../Public/uiux-design.jpg'
import cyberSecurityImage from '../Public/cyber-security.png'
import softwareDevImage from '../Public/software-dev.png'
import seoImage from '../Public/seo.png'
import aiImage from '../Public/ai-specialist.png'
import databaseImage from '../Public/database.jpg'

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
  },
  {
    key: 'Web Developer',
    keywords: ['web', 'website', 'web developer', 'frontend', 'backend', 'fullstack', 'react', 'wordpress', 'web development']
  },
  {
    key: 'App Developer',
    keywords: ['app', 'android', 'ios', 'mobile app', 'flutter', 'react native', 'app developer', 'application']
  },
  {
    key: 'Graphic Designer',
    keywords: ['graphic', 'designer', 'logo', 'photoshop', 'illustrator', 'banner', 'branding', 'graphic designer', 'graphic design']
  },
  {
    key: 'UI/UX Designer',
    keywords: ['ui', 'ux', 'ui/ux', 'figma', 'prototype', 'wireframe', 'user experience', 'uiux']
  },
  {
    key: 'IT Support & Hardware',
    keywords: ['it support', 'it', 'hardware', 'laptop repair', 'computer', 'pc repair', 'wifi', 'networking', 'windows', 'network']
  },
  {
    key: 'Software Developer',
    keywords: ['software', 'software developer', 'coding', 'python', 'java', 'api', 'backend developer', 'software engineer']
  },
  {
    key: 'SEO & Marketing',
    keywords: ['seo', 'marketing', 'digital marketing', 'google rank', 'ads', 'backlinks', 'seo specialist']
  },
  {
    key: 'Cybersecurity & Network',
    keywords: ['cyber', 'cybersecurity', 'security', 'hacking', 'network security', 'firewall', 'penetration']
  },
  {
    key: 'Data & AI Specialist',
    keywords: ['ai', 'data', 'artificial intelligence', 'machine learning', 'data science', 'deep learning', 'chatgpt']
  },
  {
    key: 'Database Specialist',
    keywords: ['database', 'sql', 'mysql', 'mongodb', 'postgresql', 'oracle', 'db']
  },
  {
    key: 'Doctor Consult',
    keywords: ['doctor', 'dr', 'physician', 'medical', 'clinic', 'consultation', 'health', 'medicine', 'doctor consult']
  },
  {
    key: 'Physiotherapist',
    keywords: ['physio', 'physiotherapy', 'physiotherapist', 'rehab', 'back pain', 'joint', 'spinal']
  },
  {
    key: 'Nutritionist',
    keywords: ['nutrition', 'diet', 'dietitian', 'nutritionist', 'weight loss', 'meal plan', 'food']
  },
  {
    key: 'Fitness Trainer',
    keywords: ['fitness', 'trainer', 'gym', 'workout', 'personal trainer', 'exercise', 'bodybuilding']
  },
  {
    key: 'Education',
    keywords: ['education', 'tutor', 'teacher', 'math', 'physics', 'english', 'tuition', 'coaching', 'study', 'teaching']
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

function Services({ initialSearchQuery = '' }) {
  const [showAllHomeServices, setShowAllHomeServices] = useState(false)
  const [showAllTechServices, setShowAllTechServices] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedProvider, setSelectedProvider] = useState(null)
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

  // Handle incoming hero search query
  useEffect(() => {
    if (initialSearchQuery && typeof initialSearchQuery === 'string' && initialSearchQuery.trim()) {
      const resolved = normalizeServiceName(initialSearchQuery)
      if (resolved) {
        setSelectedService(resolved)
      } else {
        setHeroSearchQuery(initialSearchQuery.trim())
      }
    }
  }, [initialSearchQuery])

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
      price: '$30/hr',
      badge: '⚡ Verified Electrician'
    },
    {
      name: 'Plumber',
      image: plumberImage,
      description: 'Leak detection, pipe repairs, bathroom fitting & drainage solutions',
      rating: '4.8',
      reviews: '160+',
      price: '$25/hr',
      badge: '🔧 Master Plumber'
    },
    {
      name: 'Carpenter',
      image: carpenterImage,
      description: 'Custom woodwork, furniture repair, cabinets & door fixing',
      rating: '4.8',
      reviews: '130+',
      price: '$28/hr',
      badge: '🪚 Skilled Carpenter'
    },
    {
      name: 'Painter',
      image: paintingImage,
      description: 'Interior & exterior painting, texture coating & waterproofing',
      rating: '4.7',
      reviews: '110+',
      price: '$22/hr',
      badge: '🎨 Pro Painter'
    },
    {
      name: 'AC & HVAC',
      image: acImage,
      description: 'AC installation, gas charging, deep cleaning & cooling maintenance',
      rating: '4.9',
      reviews: '210+',
      price: '$35/hr',
      badge: '❄️ HVAC Expert'
    },
    {
      name: 'Appliance Repair',
      image: applianceImage,
      description: 'Washing machine, refrigerator, microwave & home appliance repair',
      rating: '4.8',
      reviews: '140+',
      price: '$28/hr',
      badge: '🔌 Appliance Specialist'
    },
  ]

  const allHomeServices = [
    {
      name: 'Electrician',
      image: electricianImage,
      description: 'Wiring, circuit breaker repair, solar setup & 24/7 emergency service',
      rating: '4.9',
      reviews: '180+',
      price: '$30/hr',
      badge: '⚡ Verified Electrician'
    },
    {
      name: 'Plumber',
      image: plumberImage,
      description: 'Leak detection, pipe repairs, bathroom fitting & drainage solutions',
      rating: '4.8',
      reviews: '160+',
      price: '$25/hr',
      badge: '🔧 Master Plumber'
    },
    {
      name: 'Carpenter',
      image: carpenterImage,
      description: 'Custom woodwork, furniture repair, cabinets & door fixing',
      rating: '4.8',
      reviews: '130+',
      price: '$28/hr',
      badge: '🪚 Skilled Carpenter'
    },
    {
      name: 'Painter',
      image: paintingImage,
      description: 'Interior & exterior painting, texture coating & waterproofing',
      rating: '4.7',
      reviews: '110+',
      price: '$22/hr',
      badge: '🎨 Pro Painter'
    },
    {
      name: 'AC & HVAC',
      image: acImage,
      description: 'AC installation, gas charging, deep cleaning & cooling maintenance',
      rating: '4.9',
      reviews: '210+',
      price: '$35/hr',
      badge: '❄️ HVAC Expert'
    },
    {
      name: 'Home Cleaning',
      image: homeCleaningImage,
      description: 'Deep house cleaning, kitchen & bathroom sanitization',
      rating: '4.9',
      reviews: '240+',
      price: '$20/hr',
      badge: '🧹 Deep Clean'
    },
    {
      name: 'Gardener',
      image: gardeningImage,
      description: 'Lawn care, plant maintenance, landscape design & pruning',
      rating: '4.7',
      reviews: '95+',
      price: '$18/hr',
      badge: '🌱 Green Thumb'
    },
    {
      name: 'Glass & Aluminum',
      image: aluminiumImage,
      description: 'Windows, glass partitions, aluminum frames & door fixtures',
      rating: '4.8',
      reviews: '85+',
      price: '$32/hr',
      badge: '🪟 Glazing Pro'
    },
    {
      name: 'Welder',
      image: welderImage,
      description: 'Gate fabrication, iron grills, railing & structural welding',
      rating: '4.7',
      reviews: '105+',
      price: '$26/hr',
      badge: '🔥 Metal Craft'
    },
    {
      name: 'Laundry & Ironing',
      image: laundryImage,
      description: 'Dry cleaning, cloth washing, steam press & doorstep delivery',
      rating: '4.8',
      reviews: '150+',
      price: '$15/hr',
      badge: '👕 Fresh Care'
    },
    {
      name: 'Appliance Repair',
      image: applianceImage,
      description: 'Refrigerator, washing machine, microwave & home appliance repair',
      rating: '4.8',
      reviews: '140+',
      price: '$28/hr',
      badge: '🔌 Appliance Specialist'
    },
  ]

  const toggleHomeServices = () => {
    setShowAllHomeServices(!showAllHomeServices)
  }

  const toggleTechServices = () => {
    setShowAllTechServices(!showAllTechServices)
  }

  const handleServiceClick = (serviceName) => {
    const canonical = normalizeServiceName(serviceName) || serviceName
    setSelectedService(canonical)
  }

  const handleBackToServices = () => {
    setSelectedService(null)
    setSearchQuery('')
    setRatingFilter('All')
    setPriceFilter('All')
  }

  const handleBookNow = (provider) => {
    setSelectedProvider(provider)
  }

  const handleViewProviderProfile = (provider) => {
    setSelectedProvider(provider)
    setShowChat(false)
  }

  const handleMessageProvider = (provider) => {
    setSelectedProvider(provider)
    setShowChat(true)
    setIsHistoryMode(false)
    setChatMessages([
      { sender: 'provider', text: `Hello! I'm ${provider.name}. How can I help you today?` }
    ])
  }

  const handleBackToProviders = () => {
    setSelectedProvider(null)
    setShowChat(false)
    setChatMessages([])
    setNegotiatedPrice(null)
    setShowBookingForm(false)
    setIsHistoryMode(false)
    setBookingStatus(null)
    setIsSubmittingBooking(false)
  }

  const handleStartChat = () => {
    setShowChat(true)
    setIsHistoryMode(false)
    setChatMessages([
      { sender: 'provider', text: `Hello! I'm ${selectedProvider.name}. How can I help you today?` }
    ])
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
    handleSendMessage('🎤 Voice message sent')
  }

  const handleAttachmentClick = (type) => {
    setShowAttachmentMenu(false)
    if (type === 'image') {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = (e) => {
        if (e.target.files[0]) {
          handleSendMessage(`📷 Image: ${e.target.files[0].name}`)
        }
      }
      input.click()
    } else if (type === 'photo') {
      handleSendMessage('📸 Photo shared')
    } else if (type === 'file') {
      const input = document.createElement('input')
      input.type = 'file'
      input.onchange = (e) => {
        if (e.target.files[0]) {
          handleSendMessage(`📎 File: ${e.target.files[0].name}`)
        }
      }
      input.click()
    } else if (type === 'location') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            handleSendMessage(`📍 Location shared: ${position.coords.latitude}, ${position.coords.longitude}`)
          },
          (error) => {
            handleSendMessage('📍 Location shared')
          }
        )
      } else {
        handleSendMessage('📍 Location shared')
      }
    }
  }

  const handleVoiceMessage = () => {
    handleSendMessage('🎤 Voice message sent')
  }

  const handleSubmitOffer = () => {
    if (customOfferAmount) {
      handleSendMessage(`💰 Custom Offer: ${customOfferAmount}`)
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
      'Cleaning': 'Expert Cleaning Service',
      'Gardening': 'Expert Gardener',
      'Pest Control': 'Expert Pest Control',
      'Web Developer': 'Expert Web Developer',
      'App Developer': 'Expert Mobile App Developer',
      'Graphic Designer': 'Expert Graphic Designer',
      'UI/UX Designer': 'Expert UI/UX Designer',
      'IT Support & Hardware': 'Expert IT Support & Hardware Specialist',
      'IT Support': 'Expert IT Support Specialist',
      'Software Developer': 'Expert Software Developer',
      'SEO & Marketing': 'Expert SEO & Digital Marketer',
      'SEO Specialist': 'Expert SEO Specialist',
      'Cybersecurity & Network': 'Expert Cybersecurity & Network Engineer',
      'Cybersecurity Specialist': 'Expert Cybersecurity Specialist',
      'Data & AI Specialist': 'Expert Data & AI Specialist',
      'Database Specialist': 'Expert Database Administrator',
      'Doctor Consult': 'Expert Doctor Consultation',
      'Fitness Trainer': 'Expert Fitness Trainer',
      'Personal Trainer': 'Expert Personal Trainer',
      'Yoga Instructor': 'Expert Yoga Instructor',
      'Physiotherapist': 'Expert Physiotherapist',
      'Nutritionist': 'Expert Nutritionist',
      'Mental Health Counselor': 'Expert Mental Health Counselor',
      'Education': 'Expert Tutors & Educators'
    }
    const normalized = normalizeServiceName(serviceName) || serviceName
    if (titles[normalized]) return titles[normalized]
    const foundKey = Object.keys(titles).find(k => k.toLowerCase() === normalized.toLowerCase())
    if (foundKey) return titles[foundKey]
    return `Expert ${normalized}`
  }

  const getServiceSubtitle = (serviceName) => {
    const normalized = normalizeServiceName(serviceName) || serviceName
    return `Verified professionals offering high-quality ${normalized.toLowerCase()} services.`
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
      'Web Developer': screenImage,
      'App Developer': image03,
      'Graphic Designer': image22,
      'UI/UX Designer': uiuxImage,
      'IT Support & Hardware': itSupportImage,
      'IT Support': itSupportImage,
      'Software Developer': softwareDevImage,
      'SEO & Marketing': seoImage,
      'SEO Specialist': seoImage,
      'Cybersecurity & Network': cyberSecurityImage,
      'Data & AI Specialist': aiImage,
      'Database Specialist': databaseImage,
      'Doctor Consult': 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
      'Physiotherapist': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
      'Nutritionist': 'https://images.unsplash.com/photo-1594824813576-9c4c73a0e671?auto=format&fit=crop&w=600&q=80',
      'Fitness Trainer': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      'Education': 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    }
    if (imageMap[normalized]) return imageMap[normalized]
    const foundKey = Object.keys(imageMap).find(k => k.toLowerCase() === normalized.toLowerCase())
    if (foundKey) return imageMap[foundKey]
    return getHeaderImage(normalized)
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
      'Painter': ['Wall Painting', 'Cabinet Refinishing', 'Trim Work'],
      'AC & HVAC': ['AC Installation', 'Gas Charging', 'Deep Cleaning', 'Cooling Fix'],
      'Home Cleaning': ['Deep Sanitization', 'Floor Polishing', 'Kitchen Clean', 'Window Wash'],
      'Gardener': ['Lawn Care', 'Pruning & Trimming', 'Garden Design', 'Landscape'],
      'Glass & Aluminum': ['Window Fitting', 'Glass Partitions', 'Aluminum Frames', 'Door Fixtures'],
      'Welder': ['Metal Fabrication', 'Gate Welding', 'Iron Grills', 'Structural'],
      'Laundry & Ironing': ['Steam Press', 'Dry Cleaning', 'Delicate Wash', 'Doorstep Delivery'],
      'Appliance Repair': ['Refrigerator', 'Washing Machine', 'Microwave', 'Oven Repair'],
      'Web Developer': ['React & Next.js', 'Full Stack', 'Node.js', 'E-Commerce'],
      'App Developer': ['iOS Swift', 'Android Kotlin', 'Flutter Cross-Platform', 'UI/UX'],
      'Graphic Designer': ['Brand Identity', 'Logo Design', 'Social Creatives', 'Vector Art'],
      'UI/UX Designer': ['Figma Prototypes', 'Wireframes', 'Design Systems', 'User Research'],
      'IT Support & Hardware': ['Hardware Diagnostic', 'Network Setup', 'OS Install', 'Data Recovery'],
      'Software Developer': ['Python & Java', 'API Integration', 'Cloud Architecture', 'Databases'],
      'SEO & Marketing': ['Technical SEO', 'Keyword Rank', 'Google Ads', 'Content Strategy'],
      'Cybersecurity & Network': ['Penetration Testing', 'Firewall Defense', 'VAPT', 'Security Audit'],
      'Data & AI Specialist': ['LLM Finetuning', 'Machine Learning', 'Computer Vision', 'Data Pipelines'],
      'Database Specialist': ['PostgreSQL Tuning', 'MongoDB Scaling', 'Query Optimization', 'Cloud DB'],
      'Doctor Consult': ['General Medicine', 'Tele-Health', 'Prescriptions', 'Clinical Review'],
      'Physiotherapist': ['Orthopedic Rehab', 'Sports Injury', 'Post-Surgery Care', 'Spine Mobility'],
      'Nutritionist': ['Clinical Diet', 'Weight Management', 'Cardiac Nutrition', 'Meal Plans'],
      'Fitness Trainer': ['Strength Conditioning', 'Functional Fitness', 'Personal Coaching', 'Fat Loss'],
      'Education': ['1-on-1 Tutoring', 'Exam Preparation', 'STEM & Coding', 'Concept Mastery']
    }
    if (tagMap[normalized]) return tagMap[normalized]
    const foundKey = Object.keys(tagMap).find(k => k.toLowerCase() === normalized.toLowerCase())
    if (foundKey) return tagMap[foundKey]
    return ['Verified Expert', 'Top Rated', 'Guaranteed Quality']
  }

  const getProviderBio = (req, serviceName) => {
    if (req.bio) return req.bio
    const normalized = normalizeServiceName(serviceName) || serviceName
    return `Detail-oriented ${normalized.toLowerCase()} specialist with 8+ years experience delivering high-quality residential and commercial solutions with 100% satisfaction guarantee.`
  }

  const getServiceProviders = (serviceName) => {
    const normalized = normalizeServiceName(serviceName) || serviceName
    const providers = {
      'Electrician': [
        { id: 'PRV001', name: 'AKRAM', rating: '4.9', reviews: '120', price: '$75/hr', location: 'Gulberg, Lahore', date: '2 hours ago', service: 'Lighting & Wiring', verified: true, image: electricianImage },
        { id: 'PRV002', name: 'ALI', rating: '4.8', reviews: '95', price: '$80/hr', location: 'DHA Phase 5, Lahore', date: '3 hours ago', service: 'Wiring & Panels', verified: true, image: electricianImage },
        { id: 'PRV003', name: 'UJAY BHAI', rating: '4.7', reviews: '80', price: '$65/hr', location: 'Johar Town, Lahore', date: '5 hours ago', service: 'Lighting & Solar', verified: false, image: electricianImage },
        { id: 'PRV004', name: 'Robert Brown', rating: '4.9', reviews: '110', price: '$90/hr', location: 'Cantt, Multan', date: '6 hours ago', service: 'Emergency Breaker', verified: true, image: electricianImage },
        { id: 'PRV005', name: 'James Taylor', rating: '4.6', reviews: '75', price: '$70/hr', location: 'Bosan Road, Multan', date: '8 hours ago', service: 'Power Inspection', verified: true, image: electricianImage },
      ],
      'Plumber': [
        { 
          id: 'PLB001', 
          name: 'Rashid Mehmood (Master Plumber)', 
          rating: '4.9', 
          reviews: '145', 
          price: '$25/hr', 
          location: 'Gulberg, Lahore', 
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
          price: '$22/hr', 
          location: 'DHA Phase 5, Lahore', 
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
          price: '$28/hr', 
          location: 'Johar Town, Lahore', 
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
          price: '$20/hr', 
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
          price: '$24/hr', 
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
        { id: 'CRP001', name: 'Mark Johnson', rating: '4.9', reviews: '105', price: '$70/hr', location: 'New York', date: '2 hours ago', service: 'Furniture', verified: true },
        { id: 'CRP002', name: 'Paul Williams', rating: '4.7', reviews: '88', price: '$65/hr', location: 'Brooklyn', date: '3 hours ago', service: 'Cabinets', verified: true },
        { id: 'CRP003', name: 'Andrew Brown', rating: '4.8', reviews: '95', price: '$75/hr', location: 'Queens', date: '4 hours ago', service: 'Flooring', verified: true },
        { id: 'CRP004', name: 'James Miller', rating: '4.6', reviews: '72', price: '$60/hr', location: 'Manhattan', date: '5 hours ago', service: 'Repair', verified: false },
        { id: 'CRP005', name: 'Robert Davis', rating: '4.9', reviews: '115', price: '$80/hr', location: 'Bronx', date: '6 hours ago', service: 'Custom', verified: true },
      ],
      'Painter': [
        {
          id: 'PNT001',
          name: 'Elena Rossi',
          role: 'Interior Specialist',
          rating: '4.9',
          reviews: '120',
          price: '$45/hr',
          location: 'New York',
          service: 'Interior Specialist',
          verified: true,
          image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
          tags: ['Wall Painting', 'Cabinet Refinishing', 'Trim Work'],
          bio: 'Detail-oriented interior painter with 10+ years transforming residential spaces. I specialize in crisp lines, smooth finishes, and meticulous prep work to ensure long-lasting results.'
        },
        {
          id: 'PNT002',
          name: 'Marcus Bell',
          role: 'Exterior Painter',
          rating: '4.8',
          reviews: '95',
          price: '$55/hr',
          location: 'Brooklyn',
          service: 'Exterior Painter',
          verified: true,
          image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
          tags: ['Exterior Painting', 'Power Washing', 'Weatherproofing'],
          bio: 'Equipped for large residential and commercial exterior projects. Fully licensed and insured. We focus on durable, weather-resistant finishes that protect and beautify your property.'
        },
        {
          id: 'PNT003',
          name: 'Sophie Turner',
          role: 'Decorative Artist',
          rating: '5.0',
          reviews: '63',
          price: '$65/hr',
          location: 'Queens',
          service: 'Decorative Artist',
          verified: true,
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
          tags: ['Texture Coating', 'Faux Finishes', 'Murals'],
          bio: 'Specializing in high-end decorative finishes, custom textures, and bespoke wall treatments. I bring an artistic touch to residential interiors, creating unique, personalized spaces.'
        },
      ],
      'AC & HVAC': [
        { id: 'AC001', name: 'Michael Smith', rating: '4.9', reviews: '120', price: '$85/hr', location: 'New York', date: '1 hour ago', service: 'Installation', verified: true },
        { id: 'AC002', name: 'David Johnson', rating: '4.8', reviews: '100', price: '$80/hr', location: 'Brooklyn', date: '2 hours ago', service: 'Repair', verified: true },
        { id: 'AC003', name: 'James Wilson', rating: '4.7', reviews: '88', price: '$75/hr', location: 'Queens', date: '3 hours ago', service: 'Maintenance', verified: true },
        { id: 'AC004', name: 'Robert Brown', rating: '4.9', reviews: '115', price: '$90/hr', location: 'Manhattan', date: '4 hours ago', service: 'Emergency', verified: true },
        { id: 'AC005', name: 'William Davis', rating: '4.6', reviews: '75', price: '$70/hr', location: 'Bronx', date: '5 hours ago', service: 'Inspection', verified: false },
      ],
      'Appliance Repair': [
        { id: 'APR001', name: 'Richard Garcia', rating: '4.8', reviews: '98', price: '$70/hr', location: 'New York', date: '1 hour ago', service: 'Refrigerator', verified: true },
        { id: 'APR002', name: 'Carlos Martinez', rating: '4.7', reviews: '82', price: '$65/hr', location: 'Brooklyn', date: '2 hours ago', service: 'Washing Machine', verified: true },
        { id: 'APR003', name: 'Steven Lee', rating: '4.9', reviews: '108', price: '$75/hr', location: 'Queens', date: '3 hours ago', service: 'Dishwasher', verified: true },
        { id: 'APR004', name: 'Daniel Kim', rating: '4.6', reviews: '74', price: '$60/hr', location: 'Manhattan', date: '4 hours ago', service: 'Oven', verified: false },
        { id: 'APR005', name: 'Paul Thompson', rating: '4.8', reviews: '91', price: '$68/hr', location: 'Bronx', date: '5 hours ago', service: 'Microwave', verified: true },
      ],
      'Glass & Aluminum': [
        { id: 'GLA001', name: 'Frank Wright', rating: '4.9', reviews: '112', price: '$80/hr', location: 'New York', date: '1 hour ago', service: 'Windows', verified: true },
        { id: 'GLA002', name: 'George Miller', rating: '4.7', reviews: '87', price: '$75/hr', location: 'Brooklyn', date: '2 hours ago', service: 'Doors', verified: true },
        { id: 'GLA003', name: 'Henry Davis', rating: '4.8', reviews: '95', price: '$85/hr', location: 'Queens', date: '3 hours ago', service: 'Aluminum Work', verified: true },
        { id: 'GLA004', name: 'Charles Brown', rating: '4.6', reviews: '73', price: '$70/hr', location: 'Manhattan', date: '4 hours ago', service: 'Glass Repair', verified: false },
        { id: 'GLA005', name: 'Edward Wilson', rating: '4.9', reviews: '118', price: '$90/hr', location: 'Bronx', date: '5 hours ago', service: 'Custom Design', verified: true },
      ],
      'Gardener': [
        { id: 'GRD001', name: 'Mary Johnson', rating: '4.8', reviews: '94', price: '$55/hr', location: 'New York', date: '1 hour ago', service: 'Lawn Care', verified: true },
        { id: 'GRD002', name: 'Susan Williams', rating: '4.7', reviews: '83', price: '$50/hr', location: 'Brooklyn', date: '2 hours ago', service: 'Landscaping', verified: true },
        { id: 'GRD003', name: 'Patricia Brown', rating: '4.9', reviews: '106', price: '$60/hr', location: 'Queens', date: '3 hours ago', service: 'Garden Design', verified: true },
        { id: 'GRD004', name: 'Jennifer Davis', rating: '4.6', reviews: '71', price: '$45/hr', location: 'Manhattan', date: '4 hours ago', service: 'Tree Trimming', verified: false },
        { id: 'GRD005', name: 'Linda Miller', rating: '4.8', reviews: '89', price: '$52/hr', location: 'Bronx', date: '5 hours ago', service: 'Irrigation', verified: true },
      ],
      'Welder': [
        { id: 'WLD001', name: 'Thomas Anderson', rating: '4.9', reviews: '114', price: '$85/hr', location: 'New York', date: '1 hour ago', service: 'Metal Fabrication', verified: true },
        { id: 'WLD002', name: 'Robert Taylor', rating: '4.7', reviews: '88', price: '$80/hr', location: 'Brooklyn', date: '2 hours ago', service: 'Structural Welding', verified: true },
        { id: 'WLD003', name: 'William Harris', rating: '4.8', reviews: '97', price: '$90/hr', location: 'Queens', date: '3 hours ago', service: 'Pipe Welding', verified: true },
        { id: 'WLD004', name: 'James Clark', rating: '4.6', reviews: '76', price: '$75/hr', location: 'Manhattan', date: '4 hours ago', service: 'Repair', verified: false },
        { id: 'WLD005', name: 'John Lewis', rating: '4.9', reviews: '120', price: '$95/hr', location: 'Bronx', date: '5 hours ago', service: 'Custom Projects', verified: true },
      ],
      'Laundry & Ironing': [
        { id: 'LND001', name: 'Emma Wilson', rating: '4.8', reviews: '96', price: '$40/hr', location: 'New York', date: '1 hour ago', service: 'Laundry', verified: true },
        { id: 'LND002', name: 'Sophia Moore', rating: '4.7', reviews: '84', price: '$35/hr', location: 'Brooklyn', date: '2 hours ago', service: 'Ironing', verified: true },
        { id: 'LND003', name: 'Olivia Taylor', rating: '4.9', reviews: '109', price: '$45/hr', location: 'Queens', date: '3 hours ago', service: 'Dry Cleaning', verified: true },
        { id: 'LND004', name: 'Ava Anderson', rating: '4.6', reviews: '72', price: '$38/hr', location: 'Manhattan', date: '4 hours ago', service: 'Fold & Pack', verified: false },
        { id: 'LND005', name: 'Isabella Thomas', rating: '4.8', reviews: '93', price: '$42/hr', location: 'Bronx', date: '5 hours ago', service: 'Express Service', verified: true },
      ],
      'Web Developer': [
        { id: 'WEB001', name: 'Alexander Wright', rating: '4.9', reviews: '142', price: '$50/hr', location: 'New York', date: 'Just now', service: 'Full-Stack React & Node', verified: true, avatar: '👨‍💻', icon: '💻' },
        { id: 'WEB002', name: 'Sarah Jenkins', rating: '4.8', reviews: '118', price: '$45/hr', location: 'San Francisco', date: '1 hour ago', service: 'Frontend & UI Web Apps', verified: true, avatar: '👩‍💻', icon: '🌐' },
        { id: 'WEB003', name: 'David Miller', rating: '4.9', reviews: '165', price: '$55/hr', location: 'Austin', date: '2 hours ago', service: 'E-Commerce & Shopify', verified: true, avatar: '👨‍💻', icon: '🛒' },
        { id: 'WEB004', name: 'Elena Rostova', rating: '4.7', reviews: '89', price: '$40/hr', location: 'Chicago', date: '3 hours ago', service: 'Next.js & Modern Web', verified: false, avatar: '👩‍💻', icon: '⚡' },
        { id: 'WEB005', name: 'Marcus Chen', rating: '4.8', reviews: '130', price: '$52/hr', location: 'Seattle', date: '4 hours ago', service: 'WordPress & Custom CMS', verified: true, avatar: '👨‍💻', icon: '⚙️' },
      ],
      'App Developer': [
        { id: 'APP001', name: 'Liam Gallagher', rating: '4.9', reviews: '155', price: '$55/hr', location: 'San Jose', date: '30 mins ago', service: 'iOS Swift & SwiftUI', verified: true, avatar: '👨‍💻', icon: '📱' },
        { id: 'APP002', name: 'Priya Sharma', rating: '4.8', reviews: '140', price: '$50/hr', location: 'Boston', date: '2 hours ago', service: 'Flutter Cross-Platform', verified: true, avatar: '👩‍💻', icon: '🚀' },
        { id: 'APP003', name: 'Kevin Zhao', rating: '4.9', reviews: '128', price: '$58/hr', location: 'New York', date: '3 hours ago', service: 'Android Kotlin Native', verified: true, avatar: '👨‍💻', icon: '🤖' },
        { id: 'APP004', name: 'Hannah White', rating: '4.7', reviews: '92', price: '$48/hr', location: 'Denver', date: '5 hours ago', service: 'React Native Apps', verified: false, avatar: '👩‍💻', icon: '📲' },
        { id: 'APP005', name: 'Tariq Mehmood', rating: '4.8', reviews: '110', price: '$52/hr', location: 'Dallas', date: '6 hours ago', service: 'App Store Submission & QA', verified: true, avatar: '👨‍💻', icon: '⭐' },
      ],
      'Graphic Designer': [
        { id: 'DES001', name: 'Chloe Dubois', rating: '4.8', reviews: '135', price: '$40/hr', location: 'New York', date: '1 hour ago', service: 'Brand Identity & Logos', verified: true, avatar: '👩‍🎨', icon: '🎨' },
        { id: 'DES002', name: 'Daniel Vance', rating: '4.9', reviews: '148', price: '$45/hr', location: 'Los Angeles', date: '2 hours ago', service: 'Social Media & Ad Creative', verified: true, avatar: '👨‍🎨', icon: '✨' },
        { id: 'DES003', name: 'Mia Santos', rating: '4.7', reviews: '98', price: '$35/hr', location: 'Miami', date: '4 hours ago', service: 'Vector Art & Illustrations', verified: false, avatar: '👩‍🎨', icon: '🖌️' },
        { id: 'DES004', name: 'Oliver Scott', rating: '4.8', reviews: '112', price: '$42/hr', location: 'Atlanta', date: '5 hours ago', service: 'Packaging & Print Design', verified: true, avatar: '👨‍🎨', icon: '📦' },
      ],
      'UI/UX Designer': [
        { id: 'UIX001', name: 'Jessica Taylor', rating: '4.9', reviews: '162', price: '$48/hr', location: 'San Francisco', date: 'Just now', service: 'Figma Prototyping & UX Flow', verified: true, avatar: '👩‍💻', icon: '📐' },
        { id: 'UIX002', name: 'Ryan Mitchell', rating: '4.8', reviews: '125', price: '$45/hr', location: 'New York', date: '1 hour ago', service: 'Mobile App Wireframes', verified: true, avatar: '👨‍💻', icon: '📱' },
        { id: 'UIX003', name: 'Zoe Kravitz', rating: '4.9', reviews: '140', price: '$50/hr', location: 'Seattle', date: '3 hours ago', service: 'Design Systems & Tokens', verified: true, avatar: '👩‍💻', icon: '🎨' },
        { id: 'UIX004', name: 'Ethan Hunt', rating: '4.7', reviews: '88', price: '$42/hr', location: 'Austin', date: '5 hours ago', service: 'User Journey & Research', verified: false, avatar: '👨‍💻', icon: '🔍' },
      ],
      'IT Support & Hardware': [
        { id: 'ITS001', name: 'Brian O\'Connor', rating: '4.9', reviews: '195', price: '$38/hr', location: 'Chicago', date: '1 hour ago', service: 'Laptop & Desktop Repair', verified: true, avatar: '👨‍🔧', icon: '🛠️' },
        { id: 'ITS002', name: 'Samantha Reed', rating: '4.8', reviews: '150', price: '$35/hr', location: 'Houston', date: '2 hours ago', service: 'Network Setup & WiFi Fix', verified: true, avatar: '👩‍🔧', icon: '📶' },
        { id: 'ITS003', name: 'Ahmed Raza', rating: '4.9', reviews: '175', price: '$40/hr', location: 'New York', date: '3 hours ago', service: 'OS Crash & Data Recovery', verified: true, avatar: '👨‍🔧', icon: '💾' },
        { id: 'ITS004', name: 'Lucas Gray', rating: '4.7', reviews: '96', price: '$30/hr', location: 'Philadelphia', date: '5 hours ago', service: 'Hardware Diagnostic & RAM', verified: false, avatar: '👨‍🔧', icon: '⚙️' },
      ],
      'IT Support': [
        { id: 'ITS001', name: 'Brian O\'Connor', rating: '4.9', reviews: '195', price: '$38/hr', location: 'Chicago', date: '1 hour ago', service: 'Laptop & Desktop Repair', verified: true, avatar: '👨‍🔧', icon: '🛠️' },
        { id: 'ITS002', name: 'Samantha Reed', rating: '4.8', reviews: '150', price: '$35/hr', location: 'Houston', date: '2 hours ago', service: 'Network Setup & WiFi Fix', verified: true, avatar: '👩‍🔧', icon: '📶' },
      ],
      'Software Developer': [
        { id: 'SFT001', name: 'Dmitri Petrov', rating: '4.9', reviews: '188', price: '$65/hr', location: 'Seattle', date: 'Just now', service: 'Backend Python & Go APIs', verified: true, avatar: '👨‍💻', icon: '⚡' },
        { id: 'SFT002', name: 'Emily Thorne', rating: '4.8', reviews: '142', price: '$60/hr', location: 'Boston', date: '1 hour ago', service: 'Enterprise C# .NET Systems', verified: true, avatar: '👩‍💻', icon: '💻' },
        { id: 'SFT003', name: 'Vikram Patel', rating: '4.9', reviews: '170', price: '$68/hr', location: 'New York', date: '2 hours ago', service: 'Microservices & Cloud', verified: true, avatar: '👨‍💻', icon: '☁️' },
        { id: 'SFT004', name: 'Rachel Green', rating: '4.7', reviews: '99', price: '$55/hr', location: 'Austin', date: '4 hours ago', service: 'Java Spring Cloud Systems', verified: false, avatar: '👩‍💻', icon: '☕' },
      ],
      'SEO & Marketing': [
        { id: 'SEO001', name: 'Nathan Drake', rating: '4.9', reviews: '138', price: '$45/hr', location: 'San Francisco', date: '1 hour ago', service: 'Google Top Ranking SEO', verified: true, avatar: '👨‍💼', icon: '📈' },
        { id: 'SEO002', name: 'Alicia Keys', rating: '4.8', reviews: '120', price: '$40/hr', location: 'New York', date: '2 hours ago', service: 'Technical SEO & Speed Fix', verified: true, avatar: '👩‍💼', icon: '🔍' },
        { id: 'SEO003', name: 'Jason Miller', rating: '4.7', reviews: '105', price: '$42/hr', location: 'Miami', date: '3 hours ago', service: 'High DA Backlinks Strategy', verified: false, avatar: '👨‍💼', icon: '🔗' },
        { id: 'SEO004', name: 'Claire Bennet', rating: '4.9', reviews: '145', price: '$48/hr', location: 'Dallas', date: '5 hours ago', service: 'PPC Ads & Conversion Rate', verified: true, avatar: '👩‍💼', icon: '🎯' },
      ],
      'SEO Specialist': [
        { id: 'SEO001', name: 'Nathan Drake', rating: '4.9', reviews: '138', price: '$45/hr', location: 'San Francisco', date: '1 hour ago', service: 'Google Top Ranking SEO', verified: true, avatar: '👨‍💼', icon: '📈' },
        { id: 'SEO002', name: 'Alicia Keys', rating: '4.8', reviews: '120', price: '$40/hr', location: 'New York', date: '2 hours ago', service: 'Technical SEO & Speed Fix', verified: true, avatar: '👩‍💼', icon: '🔍' },
      ],
      'Cybersecurity & Network': [
        { id: 'CYB001', name: 'Elliot Alderson', rating: '4.9', reviews: '172', price: '$75/hr', location: 'New York', date: '30 mins ago', service: 'Penetration Testing & VAPT', verified: true, avatar: '👨‍💻', icon: '🛡️' },
        { id: 'CYB002', name: 'Angela Moss', rating: '4.8', reviews: '134', price: '$68/hr', location: 'Washington DC', date: '2 hours ago', service: 'Firewall & Network Defense', verified: true, avatar: '👩‍💻', icon: '🔒' },
        { id: 'CYB003', name: 'Leon Vance', rating: '4.9', reviews: '158', price: '$80/hr', location: 'San Diego', date: '3 hours ago', service: 'Malware Removal & Recovery', verified: true, avatar: '👨‍💻', icon: '🛑' },
        { id: 'CYB004', name: 'Grace Hopper', rating: '4.7', reviews: '82', price: '$65/hr', location: 'Boston', date: '5 hours ago', service: 'Server Security Hardening', verified: false, avatar: '👩‍💻', icon: '🔐' },
      ],
      'Cybersecurity Specialist': [
        { id: 'CYB001', name: 'Elliot Alderson', rating: '4.9', reviews: '172', price: '$75/hr', location: 'New York', date: '30 mins ago', service: 'Penetration Testing & VAPT', verified: true, avatar: '👨‍💻', icon: '🛡️' },
        { id: 'CYB002', name: 'Angela Moss', rating: '4.8', reviews: '134', price: '$68/hr', location: 'Washington DC', date: '2 hours ago', service: 'Firewall & Network Defense', verified: true, avatar: '👩‍💻', icon: '🔒' },
      ],
      'Data & AI Specialist': [
        { id: 'DAI001', name: 'Dr. Alan Turing', rating: '4.9', reviews: '190', price: '$85/hr', location: 'Boston', date: 'Just now', service: 'Machine Learning & LLM Finetune', verified: true, avatar: '👨‍🔬', icon: '🤖' },
        { id: 'DAI002', name: 'Dr. Ada Lovelace', rating: '4.9', reviews: '182', price: '$90/hr', location: 'San Francisco', date: '1 hour ago', service: 'Computer Vision & AI Agents', verified: true, avatar: '👩‍🔬', icon: '🧠' },
        { id: 'DAI003', name: 'Ken Thompson', rating: '4.8', reviews: '128', price: '$78/hr', location: 'Seattle', date: '3 hours ago', service: 'Predictive Data Pipelines', verified: true, avatar: '👨‍🔬', icon: '📊' },
        { id: 'DAI004', name: 'Sophie Germain', rating: '4.7', reviews: '95', price: '$72/hr', location: 'New York', date: '4 hours ago', service: 'NLP & Custom Chatbots', verified: false, avatar: '👩‍🔬', icon: '💬' },
      ],
      'Database Specialist': [
        { id: 'DBS001', name: 'Donald Chamberlin', rating: '4.9', reviews: '165', price: '$60/hr', location: 'New York', date: '1 hour ago', service: 'PostgreSQL & MySQL Tuning', verified: true, avatar: '👨‍💻', icon: '🗄️' },
        { id: 'DBS002', name: 'Raymond Boyce', rating: '4.8', reviews: '130', price: '$55/hr', location: 'Austin', date: '2 hours ago', service: 'MongoDB & Redis Scaling', verified: true, avatar: '👨‍💻', icon: '⚡' },
        { id: 'DBS003', name: 'Linus Torvalds', rating: '4.9', reviews: '178', price: '$65/hr', location: 'Portland', date: '3 hours ago', service: 'Database Migration & Backup', verified: true, avatar: '👨‍💻', icon: '🔄' },
        { id: 'DBS004', name: 'Barbara Liskov', rating: '4.7', reviews: '89', price: '$52/hr', location: 'Denver', date: '5 hours ago', service: 'Query Optimization & Indexing', verified: false, avatar: '👩‍💻', icon: '📈' },
      ],
      'Doctor Consult': [
        { id: 'DOC001', name: 'Dr. Hamza Malik', rating: '4.9', reviews: '160', price: '$40/hr', location: 'Nishtar Road, Multan', date: 'Just now', service: 'General Physician & Tele-Health', verified: true, avatar: '👨‍⚕️', icon: '🩺' },
        { id: 'DOC002', name: 'Dr. Ayesha Siddiqui', rating: '4.8', reviews: '142', price: '$45/hr', location: 'Cantt, Multan', date: '1 hour ago', service: 'Cardiology & Family Medicine', verified: true, avatar: '👩‍⚕️', icon: '🩺' },
        { id: 'DOC003', name: 'Dr. Usman Tariq', rating: '4.9', reviews: '118', price: '$50/hr', location: 'Gulgasht Colony, Multan', date: '3 hours ago', service: 'Pediatrics & Child Care', verified: true, avatar: '👨‍⚕️', icon: '🩺' },
      ],
      'Physiotherapist': [
        { id: 'PHY001', name: 'Dr. Bilal Qureshi (PT)', rating: '4.9', reviews: '135', price: '$35/hr', location: 'Bosan Road, Multan', date: '2 hours ago', service: 'Orthopedic Rehabilitation', verified: true, avatar: '👨‍⚕️', icon: '🏃' },
        { id: 'PHY002', name: 'Dr. Sana Arshad (PT)', rating: '4.8', reviews: '110', price: '$38/hr', location: 'Gulgasht, Multan', date: '4 hours ago', service: 'Sports Injury Therapy', verified: true, avatar: '👩‍⚕️', icon: '🏃' },
      ],
      'Nutritionist': [
        { id: 'NUT001', name: 'Zainab Fatima', rating: '4.8', reviews: '125', price: '$30/hr', location: 'Officers Colony, Multan', date: '1 hour ago', service: 'Clinical Diet & Weight Loss', verified: true, avatar: '👩‍⚕️', icon: '🥗' },
        { id: 'NUT002', name: 'Haris Mehmood', rating: '4.7', reviews: '98', price: '$28/hr', location: 'Cantt, Multan', date: '3 hours ago', service: 'Diabetes & Cardiac Nutrition', verified: true, avatar: '👨‍⚕️', icon: '🥗' },
      ],
      'Fitness Trainer': [
        { id: 'FIT001', name: 'Captain Imran', rating: '4.9', reviews: '175', price: '$25/hr', location: 'Bosan Road, Multan', date: 'Just now', service: 'Strength & Functional Fitness', verified: true, avatar: '🏋️‍♂️', icon: '💪' },
        { id: 'FIT002', name: 'Maria Khan', rating: '4.8', reviews: '130', price: '$30/hr', location: 'Gulgasht, Multan', date: '2 hours ago', service: 'Aerobics & Calisthenics', verified: true, avatar: '🏋️‍♀️', icon: '💪' },
      ],
      'Education': [
        { id: 'EDU001', name: 'Prof. Tariq Mahmood', rating: '4.9', reviews: '145', price: '$25/hr', location: 'Gulgasht Colony, Multan', date: 'Just now', service: 'Mathematics & Physics Tutor', verified: true, avatar: '👨‍🏫', icon: '📐' },
        { id: 'EDU002', name: 'Ayesha Siddiqui', rating: '4.8', reviews: '120', price: '$22/hr', location: 'Cantt, Multan', date: '1 hour ago', service: 'English & O/A Level Prep', verified: true, avatar: '👩‍🏫', icon: '📚' },
        { id: 'EDU003', name: 'Engr. Bilal Farooq', rating: '4.9', reviews: '160', price: '$30/hr', location: 'Bosan Road, Multan', date: '2 hours ago', service: 'Coding & STEM Instructor', verified: true, avatar: '👨‍💻', icon: '💻' },
      ],
    }
    if (providers[normalized]) return providers[normalized]
    const foundKey = Object.keys(providers).find(k => k.toLowerCase() === normalized.toLowerCase())
    if (foundKey) return providers[foundKey]

    // Fallback: search across all providers by service or tag or name instead of defaulting to Electrician
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
    const normalized = normalizeServiceName(serviceName) || serviceName
    const images = {
      'Electrician': electricianImage,
      'Plumber': plumberImage,
      'Carpenter': carpenterImage,
      'Home Cleaning': homeCleaningImage,
      'Painter': paintingImage,
      'Glass & Aluminum': aluminiumImage,
      'Gardener': gardeningImage,
      'AC & HVAC': acImage,
      'Welder': welderImage,
      'Laundry & Ironing': laundryImage,
      'Appliance Repair': applianceImage,
      'Web Developer': screenImage,
      'App Developer': image03,
      'Graphic Designer': image22,
      'UI/UX Designer': uiuxImage,
      'IT Support & Hardware': itSupportImage,
      'IT Support': itSupportImage,
      'Software Developer': softwareDevImage,
      'SEO & Marketing': seoImage,
      'SEO Specialist': seoImage,
      'SEO': seoImage,
      'Cybersecurity & Network': cyberSecurityImage,
      'Cybersecurity Specialist': cyberSecurityImage,
      'Cybersecurity': cyberSecurityImage,
      'Data & AI Specialist': aiImage,
      'AI Specialist': aiImage,
      'Database Specialist': databaseImage,
      'Doctor Consult': 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80',
      'Physiotherapist': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      'Nutritionist': 'https://images.unsplash.com/photo-1594824813576-9c4c73a0e671?auto=format&fit=crop&w=1200&q=80',
      'Fitness Trainer': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
      'Education': 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'
    }
    if (images[normalized]) return images[normalized]
    const foundKey = Object.keys(images).find(k => k.toLowerCase() === normalized.toLowerCase())
    if (foundKey) return images[foundKey]
    return headerImage
  }

  const mainTechServices = [
    {
      name: 'Web Developer',
      description: 'Custom websites, responsive design & web applications',
      rating: '4.9',
      reviews: '200+',
      price: '$50/hr',
      hasImage: true,
      image: screenImage
    },
    {
      name: 'App Developer',
      description: 'iOS & Android mobile application development',
      rating: '4.9',
      reviews: '150+',
      price: '$55/hr',
      hasImage: true,
      image: image03
    },
    {
      name: 'Graphic Designer',
      description: 'Brand identity, logos, vector art & social media creatives',
      rating: '4.7',
      reviews: '120+',
      price: '$40/hr',
      hasImage: true,
      image: image22
    },
    {
      name: 'UI/UX Designer',
      description: 'Figma prototypes, mobile UX research & modern UI layouts',
      rating: '4.9',
      reviews: '135+',
      price: '$45/hr',
      hasImage: true,
      image: uiuxImage
    },
  ]

  const allTechServices = [
    {
      name: 'Web Developer',
      description: 'Custom websites, responsive design & web applications',
      rating: '4.9',
      reviews: '200+',
      price: '$50/hr',
      hasImage: true,
      image: screenImage
    },
    {
      name: 'App Developer',
      description: 'iOS & Android mobile application development',
      rating: '4.9',
      reviews: '150+',
      price: '$55/hr',
      hasImage: true,
      image: image03
    },
    {
      name: 'Graphic Designer',
      description: 'Brand identity, logos, vector art & social media creatives',
      rating: '4.7',
      reviews: '120+',
      price: '$40/hr',
      hasImage: true,
      image: image22
    },
    {
      name: 'UI/UX Designer',
      description: 'Figma prototypes, mobile UX research & modern UI layouts',
      rating: '4.9',
      reviews: '135+',
      price: '$45/hr',
      hasImage: true,
      image: uiuxImage
    },
    {
      name: 'IT Support & Hardware',
      description: 'PC repair, diagnostics, OS installations & hardware fixes',
      rating: '4.8',
      reviews: '190+',
      price: '$35/hr',
      hasImage: true,
      image: itSupportImage
    },
    {
      name: 'Software Developer',
      description: 'Enterprise desktop software, cloud systems & custom APIs',
      rating: '4.8',
      reviews: '180+',
      price: '$60/hr',
      hasImage: true,
      image: softwareDevImage
    },
    {
      name: 'SEO & Marketing',
      description: 'Search engine rankings, keyword optimization & ads growth',
      rating: '4.8',
      reviews: '115+',
      price: '$42/hr',
      hasImage: true,
      image: seoImage
    },
    {
      name: 'Cybersecurity & Network',
      description: 'Network setup, router security, firewalls & data protection',
      rating: '4.9',
      reviews: '85+',
      price: '$65/hr',
      hasImage: true,
      image: cyberSecurityImage
    },
    {
      name: 'Data & AI Specialist',
      description: 'Machine learning, deep learning & intelligent AI models',
      rating: '4.9',
      reviews: '110+',
      price: '$85/hr',
      hasImage: true,
      image: aiImage
    },
    {
      name: 'Database Specialist',
      description: 'SQL architecture, MongoDB, data pipelines & DB optimization',
      rating: '4.8',
      reviews: '95+',
      price: '$55/hr',
      hasImage: true,
      image: databaseImage
    },
  ]

  const healthServices = [
    {
      name: 'Doctor Consult',
      description: 'Online medical consultation',
      rating: '4.9',
      reviews: '200+',
      action: 'Book Now'
    },
    {
      name: 'Physiotherapist',
      description: 'Physical therapy sessions',
      rating: '4.8',
      reviews: '150+',
      action: 'Consult'
    },
    {
      name: 'Nutritionist',
      description: 'Diet planning & advice',
      rating: '4.7',
      reviews: '100+',
      action: 'Get Plan'
    },
    {
      name: 'Fitness Trainer',
      description: 'Personal fitness coaching',
      rating: '4.9',
      reviews: '180+',
      action: 'Find Trainer'
    },
  ]

  const moreCategories = [
    'Professional Services', 'Beauty & Personal Care', 'Automotive & Transport',
    'Events & Creative', 'Education', 'Family & Personal'
  ]

  return (
    <div className={`services-page ${selectedService ? 'has-detail-view' : ''}`}>
      {showChat && (
        <div className="chat-modal">
          <div className="chat-modal-header">
            <button className="close-chat-btn" onClick={() => { setShowChat(false); setIsHistoryMode(false) }}>✕</button>
            <h2 className="chat-modal-title">{isHistoryMode ? 'Chat History' : `Chat with ${selectedProvider.name}`}</h2>
            <div className="chat-modal-provider-info">
              <div className="chat-provider-avatar">
                <span className="profile-initial">{selectedProvider.name.charAt(0)}</span>
              </div>
              <div className="chat-provider-details">
                <span className="chat-provider-name">{selectedProvider.name}</span>
                <span className="chat-provider-service">{selectedProvider.service}</span>
              </div>
            </div>
          </div>
          <div className="chat-modal-messages">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`chat-modal-message ${msg.sender}`}>
                <span className="modal-message-sender">{msg.sender === 'provider' ? selectedProvider.name : 'You'}</span>
                <p className="modal-message-text">{msg.text}</p>
              </div>
            ))}
          </div>
          {negotiatedPrice && (
            <div className={`modal-price-confirmation ${isHistoryMode ? 'history-mode' : ''}`}>
              <p>Provider has agreed to: <strong>{negotiatedPrice}</strong></p>
              {!isHistoryMode && <button className="modal-accept-btn" onClick={handleAcceptAndBook}>Accept & Complete Booking</button>}
            </div>
          )}
          {!isHistoryMode && (
            <div className="chat-modal-footer">
              <button className="send-custom-offer-btn" onClick={handleSendCustomOffer}>💰 Send Custom Offer</button>
              <div className="chat-modal-input-section">
                <div className="chat-input-wrapper">
                  <button className="attachment-btn" onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}>+</button>
                  {showAttachmentMenu && (
                    <div className="attachment-menu">
                      <button className="attachment-option" onClick={() => handleAttachmentClick('image')}>
                        <span className="attachment-icon">📷</span>
                        <span>Upload Image</span>
                      </button>
                      <button className="attachment-option" onClick={() => handleAttachmentClick('photo')}>
                        <span className="attachment-icon">📸</span>
                        <span>Photo</span>
                      </button>
                      <button className="attachment-option" onClick={() => handleAttachmentClick('file')}>
                        <span className="attachment-icon">📎</span>
                        <span>File</span>
                      </button>
                      <button className="attachment-option" onClick={() => handleAttachmentClick('location')}>
                        <span className="attachment-icon">📍</span>
                        <span>Location</span>
                      </button>
                    </div>
                  )}
                  <input
                    type="text"
                    className="chat-modal-input"
                    placeholder="Type your message..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        handleSendMessage(e.target.value)
                        e.target.value = ''
                      }
                    }}
                  />
                  <button
                    className={`voice-btn ${isRecording ? 'recording' : ''}`}
                    onMouseDown={handleVoiceStart}
                    onMouseUp={handleVoiceEnd}
                    onTouchStart={handleVoiceStart}
                    onTouchEnd={handleVoiceEnd}
                  >
                    {isRecording ? '⏹️' : '🎤'}
                  </button>
                  <button
                    className="chat-modal-send-btn"
                    onClick={(e) => {
                      const input = e.target.parentElement.querySelector('.chat-modal-input')
                      if (input.value.trim()) {
                        handleSendMessage(input.value)
                        input.value = ''
                      }
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
          {showOfferCard && (
            <div className="offer-card-modal">
              <div className="offer-card">
                <h3 className="offer-card-title">Make a Custom Offer</h3>
                <p className="offer-card-subtitle">Current price: {selectedProvider.price}</p>
                <div className="offer-input-group">
                  <label>Your Offer:</label>
                  <input
                    type="text"
                    className="offer-input"
                    placeholder="e.g., $60"
                    value={customOfferAmount}
                    onChange={(e) => setCustomOfferAmount(e.target.value)}
                  />
                </div>
                <div className="offer-card-actions">
                  <button className="offer-decline-btn" onClick={handleDeclineOffer}>Decline</button>
                  <button className="offer-accept-btn" onClick={handleSubmitOffer}>Send Offer</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {selectedProvider ? (
        <div className="booking-view">
          <div className="booking-header">
            <button className="back-to-services-btn" onClick={handleBackToProviders}>← Back to Providers</button>
            <div className="booking-header-content">
              <div className="booking-profile-section">
                <div className="booking-profile-image">
                  <span className="profile-initial">{selectedProvider.name.charAt(0)}</span>
                </div>
                <div className="booking-profile-details">
                  <h2 className="provider-name">{selectedProvider.name}</h2>
                  <div className="provider-rating">
                    <span className="star">⭐</span>
                    <span>{selectedProvider.rating}</span>
                    <span className="reviews">({selectedProvider.reviews} reviews)</span>
                  </div>
                  <p className="provider-about">Professional {selectedProvider.service} specialist with years of experience providing quality services in {selectedProvider.location}.</p>
                </div>
              </div>
              <div className="booking-header-buttons">
                <button className="view-profile-btn">View Profile</button>
                <button className="share-profile-btn">Share Profile</button>
              </div>
            </div>
          </div>

          <div className="booking-content-section">
            <div className="booking-content-container">
              <h2 className="services-offered-title">Services Offered</h2>

              <div className="services-offered-grid">
                <div className="service-offer-card">
                  <div className="service-icon">🔧</div>
                  <h3>{selectedProvider.service}</h3>
                  <p>Professional {selectedProvider.service.toLowerCase()} services</p>
                </div>
                <div className="service-offer-card">
                  <div className="service-icon">⚡</div>
                  <h3>Emergency Service</h3>
                  <p>24/7 emergency support available</p>
                </div>
                <div className="service-offer-card">
                  <div className="service-icon">✓</div>
                  <h3>Quality Assured</h3>
                  <p>Guaranteed quality work</p>
                </div>
              </div>

              <div className="provider-info-section">
                <h2 className="provider-info-title">Provider Information</h2>
                <div className="provider-info-grid">
                  <div className="info-item">
                    <span className="info-label">Location:</span>
                    <span className="info-value">{selectedProvider.location}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Price:</span>
                    <span className="info-value">{selectedProvider.price}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Response Time:</span>
                    <span className="info-value">{selectedProvider.date}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Verified:</span>
                    <span className="info-value">{selectedProvider.verified ? '✓ Yes' : 'No'}</span>
                  </div>
                </div>
              </div>

              {bookingStatus === 'confirmed' ? (
                <div className="booking-confirmed-view">
                  <div className="booking-content-container">
                    <div className="payment-section">
                      <h2 className="payment-title">Complete Payment</h2>
                      <p className="payment-subtitle">
                        Amount to pay: <strong>{negotiatedPrice || selectedProvider.price}</strong>
                        <span style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginTop: '4px' }}>
                          Notice: Payment demo mode — payment gateway is not connected in this version.
                        </span>
                      </p>
                      <div className="payment-form">
                        <div className="payment-methods-grid">
                          <div className={`payment-method-card ${paymentMethod === 'card' ? 'selected' : ''}`} onClick={() => setPaymentMethod('card')}>
                            <div className="payment-method-icon">💳</div>
                            <h3>Credit/Debit Card</h3>
                          </div>
                          <div className={`payment-method-card ${paymentMethod === 'bank' ? 'selected' : ''}`} onClick={() => setPaymentMethod('bank')}>
                            <div className="payment-method-icon">🏦</div>
                            <h3>Bank Transfer</h3>
                          </div>
                          <div className={`payment-method-card ${paymentMethod === 'wallet' ? 'selected' : ''}`} onClick={() => setPaymentMethod('wallet')}>
                            <div className="payment-method-icon">📱</div>
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
                                <span className="bank-info-value">Service HUB Pvt Ltd</span>
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
                        }}>{(paymentMethod === 'bank' && bankPaymentStep < 3) || (paymentMethod === 'wallet' && walletPaymentStep < 3) ? 'Continue' : 'Pay Now'}</button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : bookingStatus === 'paid' ? (
                <div className="booking-confirmed-view">
                  <div className="booking-content-container">
                    <div className="booking-confirmed-section">
                      <div className="confirmed-icon">✓</div>
                      <h2 className="confirmed-title">Booking Confirmed!</h2>
                      <p className="confirmed-message">Your booking with {selectedProvider.name} has been confirmed at {negotiatedPrice || selectedProvider.price}.</p>
                      <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '8px' }}>
                        Payment demo completed locally. Payment gateway is not connected in this version.
                      </p>
                    </div>
                  </div>
                </div>
              ) : showBookingForm ? (
                <div className="booking-form-container">
                  <button className="chat-history-btn" onClick={() => { setShowChat(true); setIsHistoryMode(true) }}>
                    💬 View Chat History
                  </button>
                  <h2 className="booking-form-title">Complete Your Booking</h2>

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
                      {isSubmittingBooking ? 'Confirming...' : 'Confirm Booking'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="chat-button-section">
                  <div className="booking-note">
                    <p className="note-text">Direct payments or chatting with providers outside of Service HUB can lead to scams or fraud. To avoid these risks and ensure service quality, please use 'Custom Offers' and complete all bookings through our official website. Thank you!</p>
                    <p className="note-text-urdu">سروس ہب سے باہر فراہم کنندگان کے ساتھ براہ راست چیٹ یا ادائیگی کرنے سے دھوکہ دہی یا فراڈ ہو سکتا ہے۔ ان خطرات سے بچنے اور سروس کے معیار کو یقینی بنانے کے لیے، براہ کرم 'کسٹم آفرز' کا استعمال کریں اور تمام بکنگ ہماری آفیشل ویب سائٹ کے ذریعے مکمل کریں۔ شکریہ! </p>
                    <button className="start-chat-btn" onClick={handleStartChat}>
                      💬 Chat with Provider
                    </button>
                  </div>
                  <p className="chat-hint">Click to negotiate price before booking</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : selectedService ? (
        <div className="service-detail-view">
          <div className="gradient-header">
            <img src={getHeaderImage(selectedService)} alt="Header Background" className="header-background-image" />
            <div className="header-content">
              <button className="back-to-services-btn" onClick={handleBackToServices}>← Back to Services</button>
              <h1 className="header-title">{getServiceTitle(selectedService)}</h1>
              <p className="header-subtitle">{getServiceSubtitle(selectedService)}</p>
            </div>
          </div>

          <div className="white-content-section">
            <div className="search-filters-row">
              <div className="search-bar-inline">
                <input 
                  type="text" 
                  placeholder="Search requests..." 
                  className="inline-search-input" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="inline-search-btn">🔍</button>
              </div>
              <div className="inline-filters">
                <div className="inline-filter">
                  <label>Rating:</label>
                  <select 
                    className="inline-select"
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="4.5">4.5+</option>
                    <option value="4.0">4.0+</option>
                    <option value="3.5">3.5+</option>
                  </select>
                </div>
                <div className="inline-filter">
                  <label>Price:</label>
                  <select 
                    className="inline-select"
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="0-50">$0 - $50</option>
                    <option value="50-100">$50 - $100</option>
                    <option value="100+">$100+</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ⚠️ Animated Safety Notice Banner */}
            <div className="safety-notice-banner">
              <div className="safety-notice-header">
                <div className="safety-notice-icon-circle">
                  <span className="safety-info-icon">!</span>
                </div>
                <h3 className="safety-notice-title">
                  <span className="safety-warning-emoji">⚠️</span> Safety Notice / حفاظتی نوٹ
                </h3>
              </div>
              <div className="safety-notice-content">
                <p className="safety-text-en">
                  Direct payments or chatting with providers outside of Service HUB can lead to scams or fraud. To avoid these risks and ensure service quality, please use 'Custom Offers' and complete all bookings through our official website. Thank you!
                </p>
                <p className="safety-text-ur" dir="rtl">
                  سروس ہب سے باہر فراہم کنندگان کے ساتھ براہ راست چیٹ یا ادائیگی کرنے سے دھوکہ دہی یا فراڈ ہو سکتا ہے۔ ان خطرات سے بچنے اور سروس کے معیار کو یقینی بنانے کے لیے، براہ کرم 'کسٹم آفرز' کا استعمال کریں اور تمام بکنگ ہماری آفیشل ویب سائٹ کے ذریعے مکمل کریں۔ شکریہ!
                </p>
              </div>
            </div>

            {/* Provider Requests List */}
            <div className="provider-requests-container">
              {(() => {
                const filtered = getServiceProviders(selectedService).filter((req) => {
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

                if (filtered.length === 0) {
                  return (
                    <div style={{ textAlign: 'center', padding: '50px 20px', color: '#64748b' }}>
                      <p style={{ fontSize: '1.1rem', marginBottom: '14px', fontWeight: 500 }}>No providers found matching your filters.</p>
                      <button 
                        onClick={() => { setSearchQuery(''); setRatingFilter('All'); setPriceFilter('All'); }}
                        style={{ background: '#071A3D', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        Clear Filters
                      </button>
                    </div>
                  )
                }

                return filtered.map((req, index) => {
                  const photo = getProviderImage(req, selectedService)
                  const roleTitle = getProviderRole(req, selectedService)
                  const tags = getProviderTags(req, selectedService)
                  const bio = getProviderBio(req, selectedService)

                  return (
                    <div key={req.id || index} className="provider-request-card">
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
                            <h3 className="provider-card-name">{req.name}</h3>
                            <span className="provider-card-role">{roleTitle}</span>
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
                            View Profile
                          </button>
                          <button 
                            type="button" 
                            className="provider-message-btn"
                            onClick={() => handleMessageProvider(req)}
                          >
                            <span className="btn-msg-icon">✉️</span>
                            <span>Message</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })
              })()}
            </div>

            {/* Pagination Dots (Matching screenshot) */}
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
            <img src={servicesHeaderImage} alt="Services Header" className="services-hero-bg" />
            <div className="services-hero-content">
              <h1 className="hero-title">Find Expert Services</h1>
              <p className="hero-subtitle">Discover trusted professionals for every need, from home repairs to digital solutions.</p>
              <div className="hero-search-row">
                <input 
                  type="text" 
                  placeholder="Search for a service..." 
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
              SECTION 1 — HOME & REPAIR SERVICES
          ══════════════════════════════════════════ */}
          <div className="svc-section svc-home">
            <div className="svc-section-banner svc-banner-home">
              <div className="svc-banner-left">
                <div className="svc-banner-img-box">
                  <img src={homeIcon} alt="Home Services" className="svc-banner-img-icon" />
                </div>
                <div>
                  <h2 className="svc-banner-title">Home &amp; Repair Services</h2>
                  <p className="svc-banner-sub">Electricians, Plumbers, Carpenters &amp; more — verified &amp; trusted</p>
                </div>
              </div>
              <button className="svc-view-all-btn" onClick={toggleHomeServices}>
                {showAllHomeServices ? '↑ View Less' : 'View All →'}
              </button>
            </div>
            <div className="svc-home-grid">
              {(showAllHomeServices ? allHomeServices : homeRepairServices).map((service, index) => (
                <div key={index} className="svc-home-card" onClick={() => handleServiceClick(service.name)}>
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

          {/* ══════════════════════════════════════════
              SECTION 2 — TECH & DIGITAL SERVICES
          ══════════════════════════════════════════ */}
          <div className="svc-section svc-tech">
            <div className="svc-section-banner svc-banner-tech">
              <div className="svc-banner-left">
                <div className="svc-banner-img-box">
                  <img src={techIcon} alt="Tech Services" className="svc-banner-img-icon" />
                </div>
                <div>
                  <h2 className="svc-banner-title">Technology &amp; Digital Services</h2>
                  <p className="svc-banner-sub">Developers, Designers, SEO &amp; IT Support — expert digital talent</p>
                </div>
              </div>
              <button className="svc-view-all-btn svc-view-all-tech" onClick={toggleTechServices}>
                {showAllTechServices ? '↑ View Less' : 'View All →'}
              </button>
            </div>
            <div className="svc-tech-grid">
              {(showAllTechServices ? allTechServices : mainTechServices).map((service, index) => (
                <div key={index} className="svc-tech-card" onClick={() => handleServiceClick(service.name)}>
                  {service.hasImage && (
                    <div className="svc-tech-img">
                      <img src={service.image} alt={service.name} />
                    </div>
                  )}
                  <div className="svc-tech-body">
                    <div className="svc-tech-icon-wrap">
                      <img src={techIcon} alt="Tech" className="svc-tech-icon-img" />
                    </div>
                    <h3 className="svc-tech-name">{service.name}</h3>
                    <p className="svc-tech-desc">{service.description}</p>
                    <div className="svc-tech-meta">
                      <span>⭐ {service.rating} ({service.reviews})</span>
                      <strong>{service.price}</strong>
                    </div>
                    <button className="svc-tech-btn" onClick={(e) => { e.stopPropagation(); handleServiceClick(service.name); }}>
                      Book Now →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════════
              SECTION 3 — HEALTH & DOCTOR SERVICES
          ══════════════════════════════════════════ */}
          <div className="svc-section svc-health">
            <div className="svc-section-banner svc-banner-health">
              <div className="svc-banner-left">
                <span className="svc-banner-emoji">🏥</span>
                <div>
                  <h2 className="svc-banner-title">Health, Doctor &amp; Wellness</h2>
                  <p className="svc-banner-sub">Doctors, Physiotherapists, Nutritionists &amp; Fitness Trainers — PMDC Verified</p>
                </div>
              </div>
              <span className="svc-health-badge">✅ PMDC Verified</span>
            </div>
            <div className="svc-health-grid">
              {healthServices.map((service, index) => (
                <div key={index} className="svc-health-card" onClick={() => handleServiceClick(service.name)} style={{ cursor: 'pointer' }}>
                  <div className="svc-health-icon-circle">🩺</div>
                  <h3 className="svc-health-name">{service.name}</h3>
                  <p className="svc-health-desc">{service.description}</p>
                  <div className="svc-health-rating">
                    <span>⭐ {service.rating}</span>
                    <span className="svc-health-reviews">({service.reviews} reviews)</span>
                  </div>
                  <button className="svc-health-btn" onClick={(e) => { e.stopPropagation(); handleServiceClick(service.name); }}>
                    {service.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* More Categories */}
          <div className="svc-more-section">
            <h2 className="svc-more-title">Explore More Categories</h2>
            <div className="svc-more-grid">
              {moreCategories.map((category, index) => (
                <div key={index} className="svc-more-item" onClick={() => handleServiceClick(category)} style={{ cursor: 'pointer' }}>
                  <span>{category}</span>
                  <span className="svc-more-arrow">→</span>
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
