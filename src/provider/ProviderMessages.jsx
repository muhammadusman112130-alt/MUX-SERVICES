import { useState, useEffect, useRef } from 'react'
import '../pages/Messages.css'

// Default verified customer inquiries in Multan
const INITIAL_PROVIDER_CONVERSATIONS = [
  {
    id: 'malik-farhan',
    name: 'Malik Farhan',
    role: 'Officers Colony, Bosan Road',
    service: '3-Phase DB Panel Short Circuit & Load Balancing',
    avatar: 'MF',
    image: null,
    price: 'PKR 6,500',
    lastMessage: 'Shukriya! Please digital multimeter aur replacement breakers sath le aaiyega.',
    time: '4 mins ago',
    unread: 1,
    verified: true,
    online: true,
    location: 'House 42, Officers Colony, Bosan Road, Multan',
    phone: '0301-7654321',
    offer: {
      id: 'off-farhan-1',
      service: '3-Phase DB Panel Short Circuit & Load Balancing',
      amount: 'PKR 6,500',
      status: 'pending',
      details: 'Emergency diagnosis of main breaker tripping, burning odor inspection, phase load balancing, and breaker replacement.'
    },
    messages: [
      {
        id: 1,
        sender: 'customer',
        text: 'Assalam-o-Alaikum Ustad Ji! Hamari DB panel se smoke aur burning smell aa rahi hai. AC chalane par main breaker baar baar trip ho raha hai.',
        time: '10:18 AM'
      },
      {
        id: 2,
        sender: 'user',
        text: 'Walaikum Assalam Farhan Bhai! Main ready hoon. MUX SERVICES se aapki emergency request receive ho gayi hai. Main Bosan Road ke qareeb hi hoon, 15 minute mein pohanch raha hoon.',
        time: '10:20 AM'
      },
      {
        id: 3,
        sender: 'customer',
        text: 'Shukriya! Please digital multimeter aur standard replacement breakers sath le aaiyega. Rate card approve kar diya hai.',
        time: '10:22 AM',
        hasOffer: true
      }
    ]
  },
  {
    id: 'engr-bilal',
    name: 'Engr. Bilal',
    role: 'Wapda Town Phase 1',
    service: '10kW Hybrid Solar Inverter Bus Voltage Calibration',
    avatar: 'EB',
    image: null,
    price: 'PKR 7,500',
    lastMessage: 'Solar diagnostics unit sath laiye ga, 30 mins mein inspection kar letay hain.',
    time: '18 mins ago',
    unread: 0,
    verified: true,
    online: true,
    location: 'Wapda Town Phase 1, Multan',
    phone: '0302-9876543',
    offer: {
      id: 'off-bilal-1',
      service: '10kW Hybrid Solar Inverter Bus Voltage Calibration',
      amount: 'PKR 7,500',
      status: 'pending',
      details: 'Comprehensive solar DC bus voltage testing, firmware load calibration, and battery 48V cutoff test.'
    },
    messages: [
      {
        id: 1,
        sender: 'customer',
        text: 'Assalam-o-Alaikum! 10kW solar inverter battery 48V pe aate hi grid bypass pe chala jata hai. Kya aap load testing kar saktay hain?',
        time: '09:40 AM'
      },
      {
        id: 2,
        sender: 'user',
        text: 'Walaikum Assalam Engineer Sahab! Jee bilkul, solar analyzer aur firmware load unit sath le kar aaon ga. Standard diagnostic charge PKR 7,500 hai.',
        time: '09:45 AM',
        hasOffer: true
      },
      {
        id: 3,
        sender: 'customer',
        text: 'Solar diagnostics unit sath laiye ga, 30 mins mein inspection kar letay hain.',
        time: '09:48 AM'
      }
    ]
  },
  {
    id: 'dr-asim',
    name: 'Dr. Asim',
    role: 'Bosan Road / Officers Colony',
    service: 'Solar Inverter Diagnostic & Earthing Leakage',
    avatar: 'DA',
    image: null,
    price: 'PKR 4,000',
    lastMessage: 'Earth resistance test karwani hai. Neutral line pe shock feel hota hai.',
    time: '1 hr ago',
    unread: 0,
    verified: true,
    online: false,
    location: 'Bosan Road, Multan',
    phone: '0300-8765432',
    offer: {
      id: 'off-asim-1',
      service: 'Solar Inverter Diagnostic & Earthing Leakage Test',
      amount: 'PKR 4,000',
      status: 'accepted',
      details: 'Digital megger earthing test (< 5 Ohms), neutral line ground leakage resolution.'
    },
    messages: [
      {
        id: 1,
        sender: 'customer',
        text: 'Doctor Asim speaking. Earth resistance test karwani hai. Neutral line pe shock feel hota hai.',
        time: '08:30 AM'
      },
      {
        id: 2,
        sender: 'user',
        text: 'Assalam-o-Alaikum Dr. Asim! Main digital megger tester se earth resistance check kar ke ground leakage solve kar doon ga.',
        time: '08:35 AM',
        hasOffer: true
      }
    ]
  },
  {
    id: 'tariq-mahmood',
    name: 'Dr. Tariq Mahmood',
    role: 'Sector A, Gulgasht Colony',
    service: 'Whole House Short-Circuit Diagnosis & Earthing Test',
    avatar: 'TM',
    image: null,
    price: 'PKR 5,500',
    lastMessage: 'Kal 11:00 AM ka slot confirm hai inspection ke liye.',
    time: 'Yesterday',
    unread: 0,
    verified: true,
    online: false,
    location: 'Sector A, Gulgasht Colony, Multan',
    phone: '0300-4567890',
    offer: {
      id: 'off-tariq-1',
      service: 'Whole House Short-Circuit Diagnosis & Earthing Test',
      amount: 'PKR 5,500',
      status: 'pending',
      details: 'Frequent earth leakage trip resolution, full house wiring megger test.'
    },
    messages: [
      {
        id: 1,
        sender: 'customer',
        text: 'Frequent earth leakage tripping during rain. Megger test karwana hai.',
        time: 'Yesterday'
      },
      {
        id: 2,
        sender: 'user',
        text: 'Kal 11:00 AM ka slot confirm hai inspection ke liye.',
        time: 'Yesterday',
        hasOffer: true
      }
    ]
  },
  {
    id: 'haji-riaz',
    name: 'Haji Riaz',
    role: 'Cantt Sadar',
    service: 'Main Changeover Switch & Distribution Panel',
    avatar: 'HR',
    image: null,
    price: 'PKR 5,500',
    lastMessage: 'Changeover switch stuck ho gaya hai. Emergency inspection needed.',
    time: '2 days ago',
    unread: 0,
    verified: true,
    online: false,
    location: 'Cantt Sadar, Multan',
    phone: '0303-1234567',
    offer: {
      id: 'off-riaz-1',
      service: 'Main Changeover Switch & Distribution Panel Replacement',
      amount: 'PKR 5,500',
      status: 'pending',
      details: 'Heavy-duty copper changeover switch replacement, wiring lugs crimping, and load balancing.'
    },
    messages: [
      {
        id: 1,
        sender: 'customer',
        text: 'Changeover switch stuck ho gaya hai. Emergency inspection needed.',
        time: '2 days ago'
      },
      {
        id: 2,
        sender: 'user',
        text: 'Main heavy-duty copper changeover switch sath le kar aa raha hoon.',
        time: '2 days ago',
        hasOffer: true
      }
    ]
  }
]

function ProviderMessages({ setCurrentPage }) {
  const [conversations, setConversations] = useState(() => {
    try {
      const activeRaw = localStorage.getItem('provider_active_chat_customer')
      if (activeRaw) {
        const targetCust = JSON.parse(activeRaw)
        if (targetCust && targetCust.customer) {
          const custId = String(targetCust.id || targetCust.customer).toLowerCase().replace(/[^a-z0-9]/g, '-')
          const existing = INITIAL_PROVIDER_CONVERSATIONS.find(
            c => c.id === custId || c.name.toLowerCase() === targetCust.customer.toLowerCase()
          )

          if (existing) {
            const updated = {
              ...existing,
              role: targetCust.location || existing.role,
              service: targetCust.title || existing.service,
              price: targetCust.budget || existing.price,
              unread: 1,
              time: 'Just now'
            }
            return [updated, ...INITIAL_PROVIDER_CONVERSATIONS.filter(c => c.id !== existing.id)]
          } else {
            const newConv = {
              id: custId,
              name: targetCust.customer,
              role: targetCust.location || 'Multan',
              service: targetCust.title || 'Direct Customer Inquiry',
              avatar: targetCust.customer.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase(),
              image: null,
              price: targetCust.budget || 'PKR 5,000',
              lastMessage: targetCust.details || 'Customer submitted direct service inquiry via MUX SERVICES.',
              time: 'Just now',
              unread: 1,
              verified: true,
              online: true,
              location: targetCust.location || 'Multan, Pakistan',
              phone: targetCust.phone || '0300-1234567',
              offer: {
                id: `off-${Date.now()}`,
                service: targetCust.title || 'Direct Customer Service',
                amount: targetCust.budget || 'PKR 5,000',
                status: 'pending',
                details: targetCust.details || 'Verified doorstep service inquiry. Upfront pricing.'
              },
              messages: [
                {
                  id: 1,
                  sender: 'customer',
                  text: `Assalam-o-Alaikum! I have submitted this inquiry: "${targetCust.title}". Details: ${targetCust.details || ''}`,
                  time: 'Just now'
                },
                {
                  id: 2,
                  sender: 'user',
                  text: `Walaikum Assalam ${targetCust.customer}! I received your request on MUX SERVICES. I am available with necessary tools. Stated budget is ${targetCust.budget}. Please confirm your exact doorstep address.`,
                  time: 'Just now',
                  hasOffer: true
                }
              ]
            }
            return [newConv, ...INITIAL_PROVIDER_CONVERSATIONS]
          }
        }
      }
    } catch (e) {
      console.warn('Error reading provider active chat customer:', e)
    }
    return INITIAL_PROVIDER_CONVERSATIONS
  })

  const [selectedChatId, setSelectedChatId] = useState(() => {
    try {
      const activeRaw = localStorage.getItem('provider_active_chat_customer')
      if (activeRaw) {
        const targetCust = JSON.parse(activeRaw)
        if (targetCust && targetCust.customer) {
          return String(targetCust.id || targetCust.customer).toLowerCase().replace(/[^a-z0-9]/g, '-')
        }
      }
    } catch (e) {}
    return INITIAL_PROVIDER_CONVERSATIONS[0].id
  })

  const [inputText, setInputText] = useState('')
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'active' | 'unread'
  const [searchQuery, setSearchQuery] = useState('')
  const [showCustomOfferDrawer, setShowCustomOfferDrawer] = useState(false)
  const [customOfferInput, setCustomOfferInput] = useState('')
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const messagesEndRef = useRef(null)

  const activeConversation = conversations.find(c => c.id === selectedChatId) || conversations[0]

  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeConversation?.messages])

  const handleSelectChat = (id) => {
    setSelectedChatId(id)
    setConversations(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c))
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputText.trim() || !activeConversation) return

    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const newMessage = {
      id: Date.now(),
      sender: 'user', // 'user' produces .msg-user which is outgoing bubble on right
      text: inputText.trim(),
      time: timeStr
    }

    setConversations(prev => prev.map(c => {
      if (c.id === activeConversation.id) {
        return {
          ...c,
          messages: [...c.messages, newMessage],
          lastMessage: inputText.trim(),
          time: 'Just now'
        }
      }
      return c
    }))

    setInputText('')
  }

  // Quick reply pills
  const handleQuickReply = (text) => {
    setInputText(text)
  }

  // Handle Proposing Custom Price Offer
  const handleSendCustomOffer = (e) => {
    e.preventDefault()
    if (!customOfferInput.trim() || !activeConversation) return

    const cleanNumber = customOfferInput.replace(/[^\d]/g, '')
    const formattedPrice = `PKR ${Number(cleanNumber || 0).toLocaleString()}`

    const updatedOffer = {
      id: `off-${Date.now()}`,
      service: activeConversation.service,
      amount: formattedPrice,
      status: 'pending',
      details: `Official verified rate proposed by technician for doorstep arrival and service completion.`
    }

    const offerAnnouncement = {
      id: Date.now(),
      sender: 'user',
      text: `Proposed customized quote: ${formattedPrice} for "${activeConversation.service}".`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isStatusAnnouncement: false
    }

    setConversations(prev => prev.map(c => {
      if (c.id === activeConversation.id) {
        return {
          ...c,
          offer: updatedOffer,
          price: formattedPrice,
          lastMessage: `Proposed quote: ${formattedPrice}`,
          time: 'Just now',
          messages: [...c.messages, offerAnnouncement]
        }
      }
      return c
    }))

    setShowCustomOfferDrawer(false)
    setCustomOfferInput('')
    triggerToast(`Proposal of ${formattedPrice} sent to ${activeConversation.name}!`)
  }

  // Handle Accept or Confirm Booking -> Directly navigates to Booked screen
  const handleAcceptBooking = () => {
    if (!activeConversation) return

    const bookedMission = {
      id: `MUX-${Date.now().toString().slice(-6)}`,
      refNumber: `MUX-${Date.now().toString().slice(-6)}`,
      customer: activeConversation.name,
      phone: activeConversation.phone || '0301-7654321',
      location: activeConversation.location || 'House 42, Officers Colony, Bosan Road, Multan',
      service: activeConversation.service,
      price: activeConversation.price,
      status: 'active',
      date: 'Today',
      time: 'Just now',
      bikePlate: 'MN-24-7890 (Honda CD-70)',
      currentLocality: 'Crossing Bosan Road towards Officers Colony',
      speed: '34 km/h',
      distance: '1.8 km remaining',
      initialSeconds: 885
    }

    try {
      localStorage.setItem('provider_live_booking', JSON.stringify(bookedMission))
    } catch {}

    setConversations(prev => prev.map(c => {
      if (c.id === activeConversation.id && c.offer) {
        return {
          ...c,
          isServiceActive: true,
          offer: {
            ...c.offer,
            status: 'accepted'
          }
        }
      }
      return c
    }))

    // Direct transition to Booked screen as requested by user
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('booked')
    }
  }

  // Handle Decline
  const handleRejectBooking = () => {
    if (!activeConversation) return
    setConversations(prev => prev.map(c => {
      if (c.id === activeConversation.id && c.offer) {
        return {
          ...c,
          offer: {
            ...c.offer,
            status: 'rejected'
          }
        }
      }
      return c
    }))
    triggerToast(`Inquiry from ${activeConversation.name} declined.`)
  }

  // Filter conversations
  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          conv.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          conv.service.toLowerCase().includes(searchQuery.toLowerCase())
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
      {/* Toast Notification */}
      {toastMessage && (
        <div className="messages-toast-pill" role="status">
          <span className="toast-icon">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="messages-container">
        {/* ══════════════════════════════════════════════════
            LEFT PANEL: CUSTOMER INQUIRIES LIST
        ══════════════════════════════════════════════════ */}
        <aside className={`messages-sidebar ${selectedChatId ? 'has-active-chat' : ''}`}>
          {/* Sidebar Header */}
          <div className="messages-sidebar-header">
            <div className="sidebar-title-row">
              <div className="title-with-pulse">
                <h2 className="messages-sidebar-title">Customer Inquiries</h2>
                <span className="live-status-dot" title="Live Console Active"></span>
              </div>
              <span className="messages-count-badge">{conversations.length} Active Leads</span>
            </div>

            {/* Search Filter Input */}
            <div className="sidebar-search-wrap">
              <svg className="sidebar-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                className="sidebar-search-input"
                placeholder="Search customers or locations..."
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
                All Inquiries
              </button>
              <button 
                type="button" 
                className={`msg-tab-btn ${activeTab === 'active' ? 'active' : ''}`}
                onClick={() => setActiveTab('active')}
              >
                Confirmed ({conversations.filter(c => c.offer?.status === 'accepted' || c.isServiceActive).length})
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
                    onClick={() => handleSelectChat(conv.id)}
                  >
                    {/* Customer DP Avatar */}
                    <div className="conv-avatar">
                      {conv.image ? (
                        <img src={conv.image} alt={conv.name} className="conv-dp-img" />
                      ) : (
                        <span className="conv-avatar-icon">{conv.avatar}</span>
                      )}
                      {conv.online && <span className="conv-online-dot" title="Active Client"></span>}
                      {conv.verified && <span className="conv-verified-dot" title="Verified Customer">✓</span>}
                    </div>

                    {/* Customer Info */}
                    <div className="conv-content">
                      <div className="conv-header-row">
                        <h4 className="conv-name">{conv.name}</h4>
                        <span className="conv-time">{conv.time}</span>
                      </div>
                      
                      <div className="conv-sub-row">
                        <span className="conv-role">{conv.role}</span>
                        {isServiceActive ? (
                          <span className="conv-active-service-pill">✓ Confirmed</span>
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
                <span>No customer inquiries found matching &quot;{searchQuery}&quot;</span>
              </div>
            )}
          </div>

          {/* Bottom link to view requests */}
          {setCurrentPage && (
            <div className="sidebar-bottom-action">
              <button 
                type="button" 
                className="sidebar-browse-btn"
                onClick={() => setCurrentPage('services')}
              >
                <span>+ View Customer Requests Feed</span>
              </button>
            </div>
          )}
        </aside>

        {/* ══════════════════════════════════════════════════
            RIGHT PANEL: ATTACHED CHAT BOX
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
                  title="Back to inquiries list"
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
                        <span className="thread-verified-badge">✓ Verified Client</span>
                      )}
                    </div>
                    <span className="thread-user-role">
                      {activeConversation.service} • <strong style={{ color: '#8FD3E8' }}>{activeConversation.price}</strong> Stated Budget
                    </span>
                  </div>
                </div>

                <div className="thread-header-actions">
                  <button
                    type="button"
                    className="thread-offer-btn"
                    onClick={() => setShowCustomOfferDrawer(true)}
                  >
                    <span>Propose Rate Quote</span>
                  </button>
                  {setCurrentPage && (
                    <button
                      type="button"
                      className="thread-services-link"
                      onClick={() => setCurrentPage('services')}
                    >
                      Requests Feed
                    </button>
                  )}
                </div>
              </div>

              {/* Official Protection Notice */}
              <div className="thread-safety-banner">
                <span>🛡️ <strong>Direct Customer Dispatch:</strong> Verified Multan inquiry. Guaranteed direct payout with zero middleman deductions.</span>
              </div>

              {/* ══════════════════════════════════════════════════
                  MESSAGES SCROLLABLE THREAD
              ══════════════════════════════════════════════════ */}
              <div className="thread-messages-list">
                {activeConversation.messages.map((msg) => {
                  const isTechnician = msg.sender === 'user'

                  return (
                    <div
                      key={msg.id}
                      className={`thread-msg-bubble-wrap ${isTechnician ? 'msg-user' : 'msg-provider'} ${msg.isStatusAnnouncement ? 'msg-announcement' : ''}`}
                    >
                      <div className="thread-msg-bubble">
                        <span className="thread-msg-sender-tag">
                          {isTechnician ? 'You (Technician)' : `${activeConversation.name} (Client)`}
                        </span>
                        <p className="thread-msg-text">{msg.text}</p>
                        <span className="thread-msg-time">{msg.time}</span>
                      </div>
                    </div>
                  )
                })}

                {/* ══════════════════════════════════════════════════
                    RATE QUOTE / PROPOSAL CARD IN CHAT
                ══════════════════════════════════════════════════ */}
                {activeConversation.offer && (
                  <div className={`in-chat-offer-card ${activeConversation.offer.status}`}>
                    <div className="ic-offer-header">
                      <div className="ic-offer-title-wrap">
                        <span className="ic-offer-badge">🏷️ Client Service Request</span>
                        <h4 className="ic-offer-service">{activeConversation.offer.service}</h4>
                      </div>
                      <div className="ic-offer-price-box">
                        <span className="ic-offer-pkr-label">Agreed Compensation</span>
                        <strong className="ic-offer-amount">{activeConversation.offer.amount}</strong>
                      </div>
                    </div>

                    <p className="ic-offer-details">{activeConversation.offer.details}</p>

                    {/* Offer Actions: Accept or Decline */}
                    {activeConversation.offer.status === 'pending' && (
                      <div className="ic-offer-actions-row">
                        <button
                          type="button"
                          className="ic-offer-accept-btn"
                          onClick={handleAcceptBooking}
                        >
                          <span className="btn-icon">✓</span>
                          <span>Accept &amp; Confirm Booking</span>
                        </button>
                        <button
                          type="button"
                          className="ic-offer-reject-btn"
                          onClick={handleRejectBooking}
                        >
                          <span className="btn-icon">✕</span>
                          <span>Decline Request</span>
                        </button>
                      </div>
                    )}

                    {activeConversation.offer.status === 'accepted' && (
                      <div className="ic-offer-status-ribbon accepted">
                        <span>✓ Job Confirmed ({activeConversation.offer.amount}) • Doorstep Dispatch Active!</span>
                        {setCurrentPage && (
                          <button
                            type="button"
                            className="ic-view-booking-btn"
                            onClick={() => setCurrentPage('booked')}
                          >
                            🚀 View Live Doorstep GPS Tracking in Booked →
                          </button>
                        )}
                      </div>
                    )}

                    {activeConversation.offer.status === 'rejected' && (
                      <div className="ic-offer-status-ribbon rejected">
                        <span>✕ Request Declined • Click &quot;Propose Rate Quote&quot; above to suggest an alternative quote</span>
                      </div>
                    )}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* ══════════════════════════════════════════════════
                  CUSTOM RATE QUOTE INLINE DRAWER
              ══════════════════════════════════════════════════ */}
              {showCustomOfferDrawer && (
                <div className="custom-offer-drawer">
                  <div className="drawer-header">
                    <h4>Propose a Custom Rate Quote to {activeConversation.name}</h4>
                    <button type="button" className="drawer-close-btn" onClick={() => setShowCustomOfferDrawer(false)}>✕</button>
                  </div>
                  <form className="drawer-body" onSubmit={handleSendCustomOffer}>
                    <div className="drawer-input-wrap">
                      <span className="drawer-currency">PKR</span>
                      <input
                        type="text"
                        className="drawer-input"
                        placeholder="e.g. 5,500"
                        value={customOfferInput}
                        onChange={(e) => setCustomOfferInput(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div className="drawer-actions">
                      <button type="button" className="drawer-cancel-btn" onClick={() => setShowCustomOfferDrawer(false)}>Cancel</button>
                      <button type="submit" className="drawer-submit-btn" disabled={!customOfferInput.trim()}>
                        Send Quote to Customer →
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ══════════════════════════════════════════════════
                  QUICK REPLY PILLS FOR TECHNICIAN
              ══════════════════════════════════════════════════ */}
              <div className="quick-replies-strip">
                <span className="qr-hint">Quick Messages:</span>
                <button type="button" className="qr-pill" onClick={() => handleQuickReply('Assalam-o-Alaikum! I have dispatched with all diagnostic tools.')}>
                  ⏱️ Dispatched with tools
                </button>
                <button type="button" className="qr-pill" onClick={() => handleQuickReply('Please confirm your exact house and street address in Multan.')}>
                  📍 Confirm exact address
                </button>
                <button type="button" className="qr-pill" onClick={() => handleQuickReply('I will arrive at your doorstep in 15-20 minutes.')}>
                  ⚡ Arriving in 15-20 mins
                </button>
                <button type="button" className="qr-pill" onClick={() => handleQuickReply('Will perform line voltage and ground continuity test.')}>
                  🛠️ Diagnostic test check
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
                    title="Send photo or location"
                  >
                    +
                  </button>
                  {showAttachmentMenu && (
                    <div className="attachment-dropdown-menu">
                      <button type="button" className="atm-item" onClick={() => { setShowAttachmentMenu(false); handleQuickReply('En route to your location in Multan...'); }}>
                        <span>📍 Share Live Location</span>
                      </button>
                      <button type="button" className="atm-item" onClick={() => { setShowAttachmentMenu(false); setShowCustomOfferDrawer(true); }}>
                        <span>🏷️ Propose Rate Quote</span>
                      </button>
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  className="thread-input-field"
                  placeholder={`Reply to ${activeConversation.name}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />

                {/* Quick Quote Trigger */}
                <button
                  type="button"
                  className="thread-quick-offer-btn"
                  onClick={() => setShowCustomOfferDrawer(!showCustomOfferDrawer)}
                  title="Propose a custom quote"
                >
                  PKR Quote
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
                <h3 className="empty-title">Select a Customer Inquiry</h3>
                <p className="empty-subtitle">
                  Choose a verified customer request from the left list to communicate directly, confirm doorstep arrival, and coordinate repairs.
                </p>
                {setCurrentPage && (
                  <button
                    type="button"
                    className="empty-action-btn"
                    onClick={() => setCurrentPage('services')}
                  >
                    View Customer Requests →
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

export default ProviderMessages
