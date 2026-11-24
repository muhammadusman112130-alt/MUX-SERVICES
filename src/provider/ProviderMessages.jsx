import { useState, useEffect, useRef } from 'react'
import '../pages/Messages.css'

// Default verified customer inquiries across Multan
const INITIAL_PROVIDER_CONVERSATIONS = [
  {
    id: 'malik-farhan',
    name: 'Malik Farhan',
    role: 'Customer • Officers Colony, Bosan Road',
    service: '3-Phase DB Panel Short Circuit & Load Balancing',
    avatar: 'MF',
    image: null,
    price: 'PKR 6,500',
    lastMessage: 'Shukriya! Please digital multimeter aur replacement breakers sath le aaiyega.',
    time: '4 mins ago',
    unread: 1,
    verified: true,
    online: true,
    location: 'Officers Colony, Bosan Road, Multan',
    phone: '0301-7654321',
    messages: [
      {
        id: 1,
        sender: 'customer',
        text: 'Assalam-o-Alaikum Ustad Ji! Hamari DB panel se smoke aur burning smell aa rahi hai. AC on karne par main circuit breaker baar baar trip ho raha hai.',
        time: '10:18 AM'
      },
      {
        id: 2,
        sender: 'provider',
        text: 'Walaikum Assalam Farhan Bhai! Main ready hoon. MUX SERVICES se aapki emergency request receive ho gayi hai. Main Bosan Road ke qareeb hi hoon, 15 minute mein pohanch raha hoon.',
        time: '10:20 AM'
      },
      {
        id: 3,
        sender: 'customer',
        text: 'Shukriya! Please digital multimeter aur standard replacement breakers sath le aaiyega.',
        time: '10:22 AM'
      }
    ]
  },
  {
    id: 'engr-bilal',
    name: 'Engr. Bilal',
    role: 'Customer • Wapda Town Phase 1',
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
    messages: [
      {
        id: 1,
        sender: 'customer',
        text: 'Assalam-o-Alaikum! 10kW solar inverter battery 48V pe aate hi grid bypass pe chala jata hai. Kya aap load testing kar saktay hain?',
        time: '09:40 AM'
      },
      {
        id: 2,
        sender: 'provider',
        text: 'Walaikum Assalam Engineer Sahab! Jee bilkul, solar analyzer aur firmware load unit sath le kar aaon ga.',
        time: '09:45 AM'
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
    role: 'Customer • Bosan Road / Officers Colony',
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
    messages: [
      {
        id: 1,
        sender: 'customer',
        text: 'Doctor Asim speaking. Earth resistance test karwani hai. Neutral line pe shock feel hota hai.',
        time: '08:30 AM'
      },
      {
        id: 2,
        sender: 'provider',
        text: 'Assalam-o-Alaikum Dr. Asim! Main digital megger tester se earth resistance check kar ke ground leakage solve kar doon ga.',
        time: '08:35 AM'
      }
    ]
  },
  {
    id: 'tariq-mahmood',
    name: 'Dr. Tariq Mahmood',
    role: 'Customer • Gulgasht Colony',
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
    messages: [
      {
        id: 1,
        sender: 'customer',
        text: 'Frequent earth leakage tripping during rain. Megger test karwana hai.',
        time: 'Yesterday'
      },
      {
        id: 2,
        sender: 'provider',
        text: 'Kal 11:00 AM ka slot confirm hai inspection ke liye.',
        time: 'Yesterday'
      }
    ]
  },
  {
    id: 'haji-riaz',
    name: 'Haji Riaz',
    role: 'Customer • Cantt Sadar',
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
    messages: [
      {
        id: 1,
        sender: 'customer',
        text: 'Changeover switch stuck ho gaya hai. Emergency inspection needed.',
        time: '2 days ago'
      },
      {
        id: 2,
        sender: 'provider',
        text: 'Main heavy-duty copper changeover switch sath le kar aa raha hoon.',
        time: '2 days ago'
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
              role: `Customer • ${targetCust.location || existing.location}`,
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
              role: `Customer • ${targetCust.location || 'Multan'}`,
              service: targetCust.title || 'Direct Service Inquiry',
              avatar: targetCust.customer.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase(),
              image: null,
              price: targetCust.budget || 'Direct Agreement',
              lastMessage: targetCust.details || 'Customer initiated direct service request via MUX SERVICES.',
              time: 'Just now',
              unread: 1,
              verified: true,
              online: true,
              location: targetCust.location || 'Multan, Pakistan',
              phone: targetCust.phone || '0300-1234567',
              messages: [
                {
                  id: 1,
                  sender: 'customer',
                  text: `Assalam-o-Alaikum! I submitted this request: "${targetCust.title}". ${targetCust.details || ''}`,
                  time: 'Just now'
                },
                {
                  id: 2,
                  sender: 'provider',
                  text: `Walaikum Assalam ${targetCust.customer}! I received your request on MUX SERVICES. I am available for immediate doorstep arrival. Please confirm your exact location.`,
                  time: 'Just now'
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
  const [showToast, setShowToast] = useState('')
  const messagesEndRef = useRef(null)

  const activeConversation = conversations.find(c => c.id === selectedChatId) || conversations[0]

  const triggerToast = (msg) => {
    setShowToast(msg)
    setTimeout(() => setShowToast(''), 3500)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeConversation?.messages])

  // Clean active customer selection on unmount or selection
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
      sender: 'provider',
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

  // Filter conversations
  const filteredConversations = conversations.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === 'unread') return matchesSearch && c.unread > 0
    if (activeTab === 'active') return matchesSearch && c.online
    return matchesSearch
  })

  const totalUnread = conversations.reduce((acc, c) => acc + (c.unread || 0), 0)

  return (
    <div className="messages-page">
      {/* Toast Notification */}
      {showToast && (
        <div className="messages-toast-pill" role="status">
          <span className="toast-icon">✓</span>
          <span>{showToast}</span>
        </div>
      )}

      <div className="messages-container">
        {/* ── LEFT SIDEBAR: CUSTOMER CONVERSATIONS ── */}
        <aside className="messages-sidebar" aria-label="Customer conversations list">
          <div className="sidebar-header">
            <div className="sidebar-title-row">
              <h2 className="sidebar-title">Direct Inquiries</h2>
              {totalUnread > 0 && (
                <span className="unread-total-badge">{totalUnread} new</span>
              )}
            </div>
            <p className="sidebar-subtitle">Verified customer service requests &amp; quote discussions</p>

            {/* Search Input */}
            <div className="sidebar-search-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Search customers or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search conversations"
              />
              {searchQuery && (
                <button type="button" className="clear-search-btn" onClick={() => setSearchQuery('')} aria-label="Clear search">✕</button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="sidebar-tabs-row" role="tablist">
              <button 
                type="button" 
                className={`sidebar-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All ({conversations.length})
              </button>
              <button 
                type="button" 
                className={`sidebar-tab-btn ${activeTab === 'active' ? 'active' : ''}`}
                onClick={() => setActiveTab('active')}
              >
                Online
              </button>
              <button 
                type="button" 
                className={`sidebar-tab-btn ${activeTab === 'unread' ? 'active' : ''}`}
                onClick={() => setActiveTab('unread')}
              >
                Unread {totalUnread > 0 && `(${totalUnread})`}
              </button>
            </div>
          </div>

          {/* Conversations List */}
          <div className="conversations-list" role="list">
            {filteredConversations.length === 0 ? (
              <div className="no-conversations-state">
                <p>No customer chats found matching "{searchQuery}"</p>
              </div>
            ) : (
              filteredConversations.map(conv => {
                const isSelected = conv.id === selectedChatId
                return (
                  <div 
                    key={conv.id}
                    className={`conversation-item ${isSelected ? 'active' : ''} ${conv.unread > 0 ? 'has-unread' : ''}`}
                    onClick={() => handleSelectChat(conv.id)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="conv-avatar-wrap">
                      <div className="conv-avatar-placeholder">
                        {conv.avatar || conv.name.charAt(0)}
                      </div>
                      {conv.online && <span className="online-indicator" title="Online now" aria-label="Online"></span>}
                    </div>

                    <div className="conv-details">
                      <div className="conv-header-row">
                        <strong className="conv-name">{conv.name}</strong>
                        <span className="conv-time">{conv.time}</span>
                      </div>
                      <div className="conv-service-tag">{conv.service}</div>
                      <p className="conv-last-msg">{conv.lastMessage}</p>
                    </div>

                    {conv.unread > 0 && (
                      <span className="conv-unread-pill">{conv.unread}</span>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </aside>

        {/* ── RIGHT CHAT AREA ── */}
        <main className="chat-area" aria-label="Active chat panel">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <header className="chat-header">
                <div className="chat-header-info">
                  <div className="chat-header-avatar">
                    {activeConversation.avatar || activeConversation.name.charAt(0)}
                  </div>
                  <div>
                    <div className="chat-header-name-row">
                      <h3 className="chat-header-name">{activeConversation.name}</h3>
                      <span className="chat-verified-badge" title="Verified Customer">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        Verified Client
                      </span>
                    </div>
                    <div className="chat-header-meta">
                      <span className="chat-service-name">{activeConversation.service}</span>
                      <span className="chat-meta-divider">•</span>
                      <span className="chat-locality-text">{activeConversation.location}</span>
                    </div>
                  </div>
                </div>

                {/* Chat Action Buttons */}
                <div className="chat-header-actions">
                  <button 
                    type="button" 
                    className="chat-action-btn phone-btn"
                    title={`Call ${activeConversation.name}`}
                    onClick={() => triggerToast(`Dialing direct secure call to ${activeConversation.name} (${activeConversation.phone || '0300-1234567'})...`)}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    Call Client
                  </button>

                  <button 
                    type="button" 
                    className="chat-action-btn view-req-btn"
                    onClick={() => {
                      if (typeof setCurrentPage === 'function') {
                        setCurrentPage('services')
                      }
                    }}
                    title="Back to Customer Requests Feed"
                  >
                    View Requests
                  </button>
                </div>
              </header>

              {/* Chat Messages Feed */}
              <div className="chat-messages" role="log">
                <div className="chat-security-banner">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span>Encrypted Master Artisan Console • Direct Customer Payout Guaranteed by MUX SERVICES</span>
                </div>

                {activeConversation.messages.map(msg => {
                  const isProviderMsg = msg.sender === 'provider'
                  return (
                    <div 
                      key={msg.id} 
                      className={`message-bubble-wrapper ${isProviderMsg ? 'outgoing' : 'incoming'}`}
                    >
                      <div className={`message-bubble ${isProviderMsg ? 'provider-msg' : 'customer-msg'}`}>
                        <div className="msg-sender-name">
                          {isProviderMsg ? 'You (Technician)' : activeConversation.name}
                        </div>
                        <p className="msg-text">{msg.text}</p>
                        <span className="msg-timestamp">{msg.time}</span>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendMessage} className="chat-input-bar">
                <input 
                  type="text" 
                  placeholder={`Reply directly to ${activeConversation.name}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="chat-text-input"
                  autoFocus
                />
                <button 
                  type="submit" 
                  className="chat-send-btn"
                  disabled={!inputText.trim()}
                  title="Send message"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="chat-empty-selection">
              <h3>Select a customer inquiry</h3>
              <p>Choose an incoming customer request from the left list to begin direct communication.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default ProviderMessages
