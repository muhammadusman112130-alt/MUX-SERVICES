import { useState, useEffect, useRef } from 'react'
import './Messages.css'

// Default verified Multan specialists
const INITIAL_CONVERSATIONS = [
  {
    id: 'mary-johnson',
    name: 'Mary Johnson',
    role: 'AC & HVAC Master Engineer',
    service: 'AC Diagnostic & Cooling Overhaul',
    avatar: '❄️',
    image: null,
    price: 'Rs. 2,500',
    lastMessage: 'I have prepared your verified service offer. Please review and accept.',
    time: 'Just now',
    unread: 1,
    verified: true,
    online: true,
    location: 'Cantt & Bosan Road, Multan',
    offer: {
      id: 'off-mary-1',
      service: 'AC Master Diagnostic & Cooling Overhaul',
      amount: 'Rs. 2,500',
      status: 'pending', // 'pending' | 'accepted' | 'rejected'
      details: 'Comprehensive diagnostic inspection, gas pressure calibration, coil flush, and guaranteed doorstep workmanship across Multan.'
    },
    messages: [
      { 
        id: 1, 
        sender: 'provider', 
        text: 'Assalam-o-Alaikum! I am Mary Johnson, verified AC & HVAC Specialist with MUX SERVICES. I am available for immediate doorstep arrival across Multan.', 
        time: '10:00 AM' 
      },
      { 
        id: 2, 
        sender: 'user', 
        text: 'Hi Mary, the cooling in my master bedroom AC is low and it makes a rattling noise.', 
        time: '10:02 AM' 
      },
      { 
        id: 3, 
        sender: 'provider', 
        text: 'Understood! I will bring diagnostic gauges and standard replacement capacitors. Upfront fixed rate is Rs. 2,500. Here is your official service card below:', 
        time: '10:05 AM',
        hasOffer: true
      }
    ]
  },
  {
    id: 'akram-electrician',
    name: 'Muhammad Akram',
    role: 'Certified Electrician',
    service: 'Short-Circuit & DB Box Repair',
    avatar: '⚡',
    image: null,
    price: 'Rs. 1,800',
    lastMessage: 'I am ready with circuit breakers and load meters.',
    time: '10:15 AM',
    unread: 0,
    verified: true,
    online: true,
    location: 'Gulgasht Colony, Multan',
    offer: {
      id: 'off-akram-1',
      service: 'Complete Breaker & Wiring Diagnostic',
      amount: 'Rs. 1,800',
      status: 'pending',
      details: 'Main breaker trip resolution, grounding test, circuit load balance, and vendor receipts for parts.'
    },
    messages: [
      { id: 1, sender: 'provider', text: 'Hello! I received your electrical diagnostic request. I am nearby Gulgasht Colony.', time: '09:45 AM' },
      { id: 2, sender: 'user', text: 'Hi Akram, yes the main breaker keeps tripping since yesterday night.', time: '09:50 AM' },
      { id: 3, sender: 'provider', text: 'I am ready with circuit breakers and load meters. Can dispatch in 15 mins.', time: '10:15 AM', hasOffer: true }
    ]
  },
  {
    id: 'tom-plumber',
    name: 'Tom Anderson',
    role: 'Master Plumber',
    service: 'Concealed Leakage & Pipe Fitting',
    avatar: '🔧',
    image: null,
    price: 'Rs. 2,200',
    lastMessage: 'The replacement pipe and PPRC joints are ready.',
    time: 'Yesterday',
    unread: 0,
    verified: true,
    online: false,
    location: 'Shah Rukn-e-Alam, Multan',
    offer: {
      id: 'off-tom-1',
      service: 'Underground & Concealed Pipe Leakage Repair',
      amount: 'Rs. 2,200',
      status: 'pending',
      details: 'Pressure testing, PPRC pipeline joint welding, and zero-mess cleanup guarantee.'
    },
    messages: [
      { id: 1, sender: 'user', text: 'Hi Tom, do you have availability this afternoon for washroom pipe inspection?', time: 'Yesterday' },
      { id: 2, sender: 'provider', text: 'Yes! I can arrive with acoustic leak detectors by 2:00 PM.', time: 'Yesterday' },
      { id: 3, sender: 'provider', text: 'The replacement pipe and PPRC joints are ready. Please review rate card.', time: 'Yesterday', hasOffer: true }
    ]
  },
  {
    id: 'tariq-carpenter',
    name: 'Tariq Mehmood',
    role: 'Woodwork & Furniture Specialist',
    service: 'Door Locks & Cabinet Renovation',
    avatar: '🪚',
    image: null,
    price: 'Rs. 2,000',
    lastMessage: 'All brass hinges and alignment tools packed.',
    time: '2 days ago',
    unread: 0,
    verified: true,
    online: false,
    location: 'Model Town, Multan',
    offer: {
      id: 'off-tariq-1',
      service: 'Hardware Alignment & Lock Installation',
      amount: 'Rs. 2,000',
      status: 'pending',
      details: 'Premium hinge realignment, smooth sliding rails, and safety lock installation.'
    },
    messages: [
      { id: 1, sender: 'user', text: 'Main door lock is jamming and sliding cabinet needs alignment.', time: '2 days ago' },
      { id: 2, sender: 'provider', text: 'I carry high-grade mortise locks and realignment shims. Rate is Rs. 2,000.', time: '2 days ago', hasOffer: true }
    ]
  }
]

function Messages({ setCurrentPage }) {
  const [conversations, setConversations] = useState(() => {
    // Check if a specialist was selected from Services or Profile
    try {
      const activeRaw = localStorage.getItem('active_chat_provider')
      if (activeRaw) {
        const activePro = JSON.parse(activeRaw)
        if (activePro && activePro.name) {
          const proId = String(activePro.id || activePro.name).toLowerCase().replace(/\s+/g, '-')
          const existing = INITIAL_CONVERSATIONS.find(c => c.id === proId || c.name.toLowerCase() === activePro.name.toLowerCase())
          
          if (existing) {
            // Move existing to top with active image
            const updated = {
              ...existing,
              image: activePro.image || existing.image,
              role: activePro.service || existing.role,
              price: activePro.price || existing.price,
              unread: 1,
              time: 'Just now'
            }
            return [updated, ...INITIAL_CONVERSATIONS.filter(c => c.id !== existing.id)]
          } else {
            // Create new conversation entry at top
            const newConv = {
              id: proId,
              name: activePro.name,
              role: activePro.service || 'Verified Specialist',
              service: activePro.service || 'Home Doorstep Service',
              avatar: activePro.name.charAt(0),
              image: activePro.image || null,
              price: activePro.price || 'Rs. 2,500',
              lastMessage: `Hello! I'm ${activePro.name}. Please review my verified PKR rate card.`,
              time: 'Just now',
              unread: 1,
              verified: true,
              online: true,
              location: 'Multan Local Delivery Area',
              offer: {
                id: `off-${Date.now()}`,
                service: activePro.service || 'Verified Home Service',
                amount: activePro.price || 'Rs. 2,500',
                status: 'pending',
                details: 'Complete doorstep diagnostic inspection, genuine parts guarantee, and certified workmanship.'
              },
              messages: [
                {
                  id: 1,
                  sender: 'provider',
                  text: `Assalam-o-Alaikum! I am ${activePro.name}, verified ${activePro.service || 'Specialist'} with MUX SERVICES. How can I assist with your project in Multan today?`,
                  time: 'Just now'
                },
                {
                  id: 2,
                  sender: 'provider',
                  text: `Standard inspection & service rate is ${activePro.price || 'Rs. 2,500'}. You can accept the offer below to start your service immediately or send a counter-offer.`,
                  time: 'Just now',
                  hasOffer: true
                }
              ]
            }
            return [newConv, ...INITIAL_CONVERSATIONS]
          }
        }
      }
    } catch (e) {
      console.warn('Error reading active chat provider:', e)
    }
    return INITIAL_CONVERSATIONS
  })

  // Selected chat ID
  const [selectedChatId, setSelectedChatId] = useState(() => {
    try {
      const activeRaw = localStorage.getItem('active_chat_provider')
      if (activeRaw) {
        const activePro = JSON.parse(activeRaw)
        if (activePro && activePro.name) {
          return String(activePro.id || activePro.name).toLowerCase().replace(/\s+/g, '-')
        }
      }
    } catch (e) {}
    return INITIAL_CONVERSATIONS[0].id
  })

  const [inputText, setInputText] = useState('')
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'active' | 'unread'
  const [searchQuery, setSearchQuery] = useState('')
  const [showCustomOfferDrawer, setShowCustomOfferDrawer] = useState(false)
  const [customOfferInput, setCustomOfferInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false)
  const messagesEndRef = useRef(null)

  // Get active conversation object
  const activeConversation = conversations.find(c => c.id === selectedChatId) || conversations[0]

  // Auto-scroll messages to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeConversation?.messages, isTyping])

  // Save active booking to localStorage (syncs with MyBookings)
  const saveBookingToLocalStorage = (conv, agreedPrice) => {
    const bookingRef = `MUX-${Date.now().toString().slice(-6)}`
    const newBooking = {
      id: bookingRef,
      refNumber: bookingRef,
      service: conv.role || conv.service,
      provider: conv.name,
      price: agreedPrice,
      status: 'active',
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      location: conv.location || 'Multan, Pakistan',
      address: 'Doorstep Delivery, Multan',
      warranty: '14-Day Free Workmanship Guarantee',
      phone: '+92 300 1234567',
      technicianETA: '< 25 Mins',
      createdAt: new Date().toISOString()
    }

    try {
      const saved = localStorage.getItem('servicehub_bookings')
      const existing = saved ? JSON.parse(saved) : []
      const merged = [newBooking, ...existing.filter(b => b.refNumber !== bookingRef)]
      localStorage.setItem('servicehub_bookings', JSON.stringify(merged))
    } catch (e) {
      console.warn('Failed to save booking to localStorage:', e)
    }
  }

  // 1. ACCEPT OFFER: Price finalized, service starts!
  const handleAcceptOffer = () => {
    if (!activeConversation || !activeConversation.offer) return
    const agreedPrice = activeConversation.offer.amount

    // Update conversation offer state to 'accepted'
    setConversations(prev => prev.map(conv => {
      if (conv.id === activeConversation.id) {
        const updatedOffer = { ...conv.offer, status: 'accepted' }
        const confirmationMsg = {
          id: Date.now(),
          sender: 'provider',
          text: `🎉 Upfront offer of ${agreedPrice} has been ACCEPTED! Your booking is confirmed and live tracking is now active in your Bookings screen. I am dispatched to your doorstep across Multan.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isStatusAnnouncement: true
        }
        return {
          ...conv,
          offer: updatedOffer,
          isServiceActive: true,
          lastMessage: `Offer Accepted (${agreedPrice}) • View in Bookings`,
          time: 'Just now',
          messages: [...conv.messages, confirmationMsg]
        }
      }
      return conv
    }))

    // Save to official My Bookings
    saveBookingToLocalStorage(activeConversation, agreedPrice)

    // Automatically navigate to Bookings screen after 1 second so user sees live tracking!
    if (typeof setCurrentPage === 'function') {
      setTimeout(() => {
        setCurrentPage('bookings')
      }, 1000)
    }
  }

  // 2. REJECT OFFER: Price declined, can negotiate or send counter-offer
  const handleRejectOffer = () => {
    if (!activeConversation || !activeConversation.offer) return

    setConversations(prev => prev.map(conv => {
      if (conv.id === activeConversation.id) {
        const updatedOffer = { ...conv.offer, status: 'rejected' }
        const declineMsg = {
          id: Date.now(),
          sender: 'user',
          text: `I have declined the offer of ${conv.offer.amount}. Let's negotiate a fair rate for this project.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        return {
          ...conv,
          offer: updatedOffer,
          messages: [...conv.messages, declineMsg]
        }
      }
      return conv
    }))

    // Specialist response acknowledging negotiation
    setTimeout(() => {
      setConversations(prev => prev.map(conv => {
        if (conv.id === activeConversation.id) {
          const replyMsg = {
            id: Date.now() + 1,
            sender: 'provider',
            text: `Understood! What price or budget do you have in mind? Please tap "Send Custom Offer" below and I will review it immediately.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
          return {
            ...conv,
            messages: [...conv.messages, replyMsg]
          }
        }
        return conv
      }))
    }, 900)
  }

  // 3. SEND CUSTOM OFFER: Customer proposes their own price
  const handleSendCustomOffer = (e) => {
    e.preventDefault()
    if (!customOfferInput.trim()) return

    const formattedAmount = customOfferInput.startsWith('Rs.') ? customOfferInput.trim() : `Rs. ${customOfferInput.replace(/[^\d,]/g, '')}`
    const offerText = `Custom Offer Propose: ${formattedAmount} for ${activeConversation.role}`

    // User message with custom offer
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: `I would like to propose a rate of ${formattedAmount} for this job. Can you accept this?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setConversations(prev => prev.map(conv => {
      if (conv.id === activeConversation.id) {
        return {
          ...conv,
          lastMessage: offerText,
          time: 'Just now',
          messages: [...conv.messages, userMsg]
        }
      }
      return conv
    }))

    setCustomOfferInput('')
    setShowCustomOfferDrawer(false)
    setIsTyping(true)

    // Specialist considers and accepts or counters
    setTimeout(() => {
      setIsTyping(false)
      setConversations(prev => prev.map(conv => {
        if (conv.id === activeConversation.id) {
          const newOffer = {
            id: `off-${Date.now()}`,
            service: conv.role,
            amount: formattedAmount,
            status: 'pending',
            details: `Agreed negotiated rate of ${formattedAmount}. Verified workmanship and doorstep diagnostic inspection included.`
          }
          const providerReply = {
            id: Date.now() + 10,
            sender: 'provider',
            text: `Deal agreed! I accept your proposed rate of ${formattedAmount}. I have updated your official service card below. Please tap "Accept & Start Service" so I can dispatch immediately!`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            hasOffer: true
          }
          return {
            ...conv,
            offer: newOffer,
            lastMessage: `Agreed on ${formattedAmount}! Tap Accept to start.`,
            time: 'Just now',
            messages: [...conv.messages, providerReply]
          }
        }
        return conv
      }))
    }, 1200)
  }

  // Send regular text message
  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const messageText = inputText.trim()
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setConversations(prev => prev.map(conv => {
      if (conv.id === activeConversation.id) {
        return {
          ...conv,
          lastMessage: messageText,
          time: 'Just now',
          messages: [...conv.messages, userMsg]
        }
      }
      return conv
    }))

    setInputText('')
    setIsTyping(true)

    // Dynamic specialist response simulation
    setTimeout(() => {
      setIsTyping(false)
      let reply = `Thank you! I have noted this. All our tools and certified parts are pre-tested for your doorstep safety.`
      const lower = messageText.toLowerCase()

      if (lower.includes('price') || lower.includes('discount') || lower.includes('pkr') || lower.includes('rs') || lower.includes('kam')) {
        reply = `We follow MUX SERVICES standardized PKR rate cards. You can send a custom offer using the button below or accept our verified quote of ${activeConversation.offer?.amount || 'Rs. 2,500'}.`
      } else if (lower.includes('time') || lower.includes('reach') || lower.includes('kahan') || lower.includes('kab')) {
        reply = `I am active in Multan! Once you accept the service offer, my arrival window is guaranteed in under 25 minutes.`
      } else if (lower.includes('material') || lower.includes('part') || lower.includes('saman')) {
        reply = `Any required replacement components are purchased with genuine vendor cash receipts and zero middleman surcharge.`
      }

      setConversations(prev => prev.map(conv => {
        if (conv.id === activeConversation.id) {
          const providerMsg = {
            id: Date.now() + 20,
            sender: 'provider',
            text: reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
          return {
            ...conv,
            lastMessage: reply,
            time: 'Just now',
            messages: [...conv.messages, providerMsg]
          }
        }
        return conv
      }))
    }, 1100)
  }

  // Quick reply pills
  const handleQuickReply = (text) => {
    setInputText(text)
  }

  // Filtered conversations
  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          conv.role.toLowerCase().includes(searchQuery.toLowerCase())
    if (activeTab === 'active') {
      return matchesSearch && (conv.offer?.status === 'accepted' || conv.isServiceActive)
    }
    if (activeTab === 'unread') {
      return matchesSearch && conv.unread > 0
    }
    return matchesSearch
  })

  return (
    <div className="messages-page">
      <div className="messages-container">
        
        {/* ══════════════════════════════════════════════════
            LEFT PANEL: SPECIALISTS LIST (Bandy Ka Names)
        ══════════════════════════════════════════════════ */}
        <aside className={`messages-sidebar ${selectedChatId ? 'has-active-chat' : ''}`}>
          {/* Sidebar Header */}
          <div className="messages-sidebar-header">
            <div className="sidebar-title-row">
              <div className="title-with-pulse">
                <h2 className="messages-sidebar-title">Specialist Chats</h2>
                <span className="live-status-dot" title="Live Messaging Active"></span>
              </div>
              <span className="messages-count-badge">{conversations.length} Verified</span>
            </div>

            {/* Search Filter Input */}
            <div className="sidebar-search-wrap">
              <svg className="sidebar-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                className="sidebar-search-input"
                placeholder="Search specialists in Multan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Tabs */}
            <div className="messages-tabs">
              <button 
                type="button" 
                className={`msg-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Chats
              </button>
              <button 
                type="button" 
                className={`msg-tab-btn ${activeTab === 'active' ? 'active' : ''}`}
                onClick={() => setActiveTab('active')}
              >
                Active Jobs ({conversations.filter(c => c.offer?.status === 'accepted' || c.isServiceActive).length})
              </button>
              <button 
                type="button" 
                className={`msg-tab-btn ${activeTab === 'unread' ? 'active' : ''}`}
                onClick={() => setActiveTab('unread')}
              >
                Unread
              </button>
            </div>
          </div>

          {/* Conversations List */}
          <div className="conversations-list">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conv) => {
                const isSelected = conv.id === activeConversation?.id
                const isServiceActive = conv.offer?.status === 'accepted' || conv.isServiceActive

                return (
                  <div
                    key={conv.id}
                    className={`conversation-item ${isSelected ? 'active' : ''} ${isServiceActive ? 'is-active-service' : ''}`}
                    onClick={() => {
                      setSelectedChatId(conv.id)
                      // Mark as read
                      setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unread: 0 } : c))
                    }}
                  >
                    {/* Specialist DP Avatar */}
                    <div className="conv-avatar">
                      {conv.image ? (
                        <img src={conv.image} alt={conv.name} className="conv-dp-img" />
                      ) : (
                        <span className="conv-avatar-icon">{conv.avatar}</span>
                      )}
                      {conv.online && <span className="conv-online-dot" title="Online in Multan"></span>}
                      {conv.verified && <span className="conv-verified-dot" title="Verified CNIC & Police Vetted">✓</span>}
                    </div>

                    {/* Specialist Info */}
                    <div className="conv-content">
                      <div className="conv-header-row">
                        <h4 className="conv-name">{conv.name}</h4>
                        <span className="conv-time">{conv.time}</span>
                      </div>
                      
                      <div className="conv-sub-row">
                        <span className="conv-role">{conv.role}</span>
                        {isServiceActive ? (
                          <span className="conv-active-service-pill">🚀 Started</span>
                        ) : conv.unread > 0 ? (
                          <span className="conv-unread-pill">{conv.unread}</span>
                        ) : null}
                      </div>

                      <p className="conv-last-msg">{conv.lastMessage}</p>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="sidebar-no-results">
                <span>No specialists found matching &quot;{searchQuery}&quot;</span>
              </div>
            )}
          </div>

          {/* Quick link to browse more services */}
          {setCurrentPage && (
            <div className="sidebar-bottom-action">
              <button 
                type="button" 
                className="sidebar-browse-btn"
                onClick={() => setCurrentPage('services')}
              >
                <span>+ Hire Another Specialist</span>
              </button>
            </div>
          )}
        </aside>

        {/* ══════════════════════════════════════════════════
            RIGHT PANEL: ATTACHED CHAT BOX (Chart Box Attach)
        ══════════════════════════════════════════════════ */}
        <main className={`messages-main ${selectedChatId ? 'chat-open' : ''}`}>
          {activeConversation ? (
            <div className="conversation-thread-view">
              
              {/* Chat Header */}
              <div className="thread-header">
                <button
                  type="button"
                  className="thread-back-btn"
                  onClick={() => setSelectedChatId(null)}
                  title="Back to specialist list"
                >
                  ←
                </button>

                <div className="thread-user-info">
                  <div className="thread-avatar">
                    {activeConversation.image ? (
                      <img src={activeConversation.image} alt={activeConversation.name} className="thread-dp-img" />
                    ) : (
                      <span>{activeConversation.avatar}</span>
                    )}
                    <span className="thread-avatar-status-dot"></span>
                  </div>
                  <div>
                    <div className="thread-name-row">
                      <h3 className="thread-user-name">{activeConversation.name}</h3>
                      {activeConversation.verified && (
                        <span className="thread-verified-badge">✓ Multan Verified</span>
                      )}
                    </div>
                    <span className="thread-user-role">
                      {activeConversation.role} • <strong style={{ color: '#8FD3E8' }}>{activeConversation.price}</strong> Upfront Rate
                    </span>
                  </div>
                </div>

                <div className="thread-header-actions">
                  <button
                    type="button"
                    className="thread-offer-btn"
                    onClick={() => setShowCustomOfferDrawer(true)}
                  >
                    <span>Make Counter Offer</span>
                  </button>
                  {setCurrentPage && (
                    <button
                      type="button"
                      className="thread-services-link"
                      onClick={() => setCurrentPage('services')}
                    >
                      Services
                    </button>
                  )}
                </div>
              </div>

              {/* Official Protection Notice */}
              <div className="thread-safety-banner">
                <span>🛡️ <strong>Official MUX Protection:</strong> Upfront PKR pricing with zero hidden doorstep surcharges across Cantt, Bosan Road, Gulgasht &amp; all Multan.</span>
              </div>

              {/* ══════════════════════════════════════════════════
                  MESSAGES SCROLLABLE THREAD
              ══════════════════════════════════════════════════ */}
              <div className="thread-messages-list">
                {activeConversation.messages.map((msg) => {
                  const isUser = msg.sender === 'user'

                  return (
                    <div
                      key={msg.id}
                      className={`thread-msg-bubble-wrap ${isUser ? 'msg-user' : 'msg-provider'} ${msg.isStatusAnnouncement ? 'msg-announcement' : ''}`}
                    >
                      <div className="thread-msg-bubble">
                        <span className="thread-msg-sender-tag">
                          {isUser ? 'You (Customer)' : activeConversation.name}
                        </span>
                        <p className="thread-msg-text">{msg.text}</p>
                        <span className="thread-msg-time">{msg.time}</span>
                      </div>
                    </div>
                  )
                })}

                {/* ══════════════════════════════════════════════════
                    FORMAL PRICE OFFER CARD (Accept or Reject in Chart)
                    (jasy hi iski price final ho jay chart ma accept or reject ho jay)
                ══════════════════════════════════════════════════ */}
                {activeConversation.offer && (
                  <div className={`in-chat-offer-card ${activeConversation.offer.status}`}>
                    <div className="ic-offer-header">
                      <div className="ic-offer-title-wrap">
                        <span className="ic-offer-badge">🏷️ Upfront Rate Card</span>
                        <h4 className="ic-offer-service">{activeConversation.offer.service}</h4>
                      </div>
                      <div className="ic-offer-price-box">
                        <span className="ic-offer-pkr-label">Agreed PKR Rate</span>
                        <strong className="ic-offer-amount">{activeConversation.offer.amount}</strong>
                      </div>
                    </div>

                    <p className="ic-offer-details">{activeConversation.offer.details}</p>

                    {/* Offer Actions: Accept or Reject */}
                    {activeConversation.offer.status === 'pending' && (
                      <div className="ic-offer-actions-row">
                        <button
                          type="button"
                          className="ic-offer-accept-btn"
                          onClick={handleAcceptOffer}
                        >
                          <span className="btn-icon">✓</span>
                          <span>Accept &amp; Start Service</span>
                        </button>
                        <button
                          type="button"
                          className="ic-offer-reject-btn"
                          onClick={handleRejectOffer}
                        >
                          <span className="btn-icon">✕</span>
                          <span>Decline / Counter</span>
                        </button>
                      </div>
                    )}

                    {activeConversation.offer.status === 'accepted' && (
                      <div className="ic-offer-status-ribbon accepted">
                        <span>✓ Offer Accepted ({activeConversation.offer.amount}) • Live Service Started!</span>
                        {setCurrentPage && (
                          <button
                            type="button"
                            className="ic-view-booking-btn"
                            onClick={() => setCurrentPage('bookings')}
                          >
                            🚀 View Live Doorstep Tracking in Bookings →
                          </button>
                        )}
                      </div>
                    )}

                    {activeConversation.offer.status === 'rejected' && (
                      <div className="ic-offer-status-ribbon rejected">
                        <span>✕ Offer Declined • Tap &quot;Make Counter Offer&quot; above to negotiate a new rate</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="typing-indicator-wrap">
                    <div className="typing-bubble">
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                    </div>
                    <span className="typing-text">{activeConversation.name} is typing...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* ══════════════════════════════════════════════════
                  CUSTOM OFFER INLINE DRAWER
              ══════════════════════════════════════════════════ */}
              {showCustomOfferDrawer && (
                <div className="custom-offer-drawer">
                  <div className="drawer-header">
                    <h4>Make a Custom Price Offer to {activeConversation.name}</h4>
                    <button type="button" className="drawer-close-btn" onClick={() => setShowCustomOfferDrawer(false)}>✕</button>
                  </div>
                  <form className="drawer-body" onSubmit={handleSendCustomOffer}>
                    <div className="drawer-input-wrap">
                      <span className="drawer-currency">PKR</span>
                      <input
                        type="text"
                        className="drawer-input"
                        placeholder="e.g. 2,200"
                        value={customOfferInput}
                        onChange={(e) => setCustomOfferInput(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div className="drawer-actions">
                      <button type="button" className="drawer-cancel-btn" onClick={() => setShowCustomOfferDrawer(false)}>Cancel</button>
                      <button type="submit" className="drawer-submit-btn" disabled={!customOfferInput.trim()}>
                        Send Offer to Specialist →
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ══════════════════════════════════════════════════
                  QUICK REPLY PILLS
              ══════════════════════════════════════════════════ */}
              <div className="quick-replies-strip">
                <span className="qr-hint">Quick Messages:</span>
                <button type="button" className="qr-pill" onClick={() => handleQuickReply('How soon can you arrive at my doorstep in Multan?')}>
                  ⏱️ How soon can you arrive?
                </button>
                <button type="button" className="qr-pill" onClick={() => handleQuickReply('Can we do Rs. 2,000 for this repair?')}>
                  💰 Can we do Rs. 2,000?
                </button>
                <button type="button" className="qr-pill" onClick={() => handleQuickReply('Are genuine replacement materials included?')}>
                  📦 Are materials included?
                </button>
                <button type="button" className="qr-pill" onClick={() => handleQuickReply('Yes, please bring diagnostic tools today.')}>
                  🛠️ Please arrive today
                </button>
              </div>

              {/* ══════════════════════════════════════════════════
                  CHAT INPUT BAR
              ══════════════════════════════════════════════════ */}
              <form className="thread-input-bar" onSubmit={handleSendMessage}>
                {/* Attachment Menu Toggle */}
                <div className="attachment-wrapper">
                  <button 
                    type="button" 
                    className="msg-attachment-btn"
                    onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                    title="Send photo, location or document"
                  >
                    +
                  </button>
                  {showAttachmentMenu && (
                    <div className="attachment-dropdown-menu">
                      <button type="button" className="atm-item" onClick={() => { setShowAttachmentMenu(false); handleQuickReply('Sending photo of the damaged unit...'); }}>
                        <span>📷 Photo of Issue</span>
                      </button>
                      <button type="button" className="atm-item" onClick={() => { setShowAttachmentMenu(false); handleQuickReply('My location: Cantt / Bosan Road, Multan'); }}>
                        <span>📍 Share Multan Location</span>
                      </button>
                      <button type="button" className="atm-item" onClick={() => { setShowAttachmentMenu(false); setShowCustomOfferDrawer(true); }}>
                        <span>🏷️ Propose Price Offer</span>
                      </button>
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  className="thread-input-field"
                  placeholder={`Type your message or negotiate with ${activeConversation.name}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />

                {/* Quick Offer Trigger */}
                <button
                  type="button"
                  className="thread-quick-offer-btn"
                  onClick={() => setShowCustomOfferDrawer(!showCustomOfferDrawer)}
                  title="Make a custom price offer"
                >
                  PKR Offer
                </button>

                <button
                  type="submit"
                  className="thread-send-btn"
                  title="Send message"
                  disabled={!inputText.trim()}
                >
                  <span>Send</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </form>
            </div>
          ) : (
            <div className="messages-empty-state">
              <div className="empty-state-card">
                <div className="empty-icon-circle">💬</div>
                <h3 className="empty-title">Select a Verified Specialist</h3>
                <p className="empty-subtitle">
                  Choose a specialist from the list on the left to discuss project scope, negotiate your upfront PKR rate, and start doorstep service across Multan.
                </p>
                {setCurrentPage && (
                  <button
                    type="button"
                    className="empty-action-btn"
                    onClick={() => setCurrentPage('services')}
                  >
                    Browse Multan Specialists →
                  </button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Messages
