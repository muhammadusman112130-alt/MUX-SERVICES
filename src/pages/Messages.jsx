import { useState } from 'react'
import './Messages.css'

function Messages({ setCurrentPage }) {
  const [selectedChatId, setSelectedChatId] = useState(null)
  const [inputText, setInputText] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  // Sample static conversations representing verified Service HUB bookings
  const conversations = [
    {
      id: 1,
      name: 'Akram',
      role: 'Electrician',
      avatar: '⚡',
      lastMessage: 'I will arrive at 10:30 AM with the circuit breakers.',
      time: '10:15 AM',
      unread: 1,
      verified: true,
      messages: [
        { id: 1, sender: 'provider', text: 'Hello! I received your request for circuit breaker inspection.', time: '09:45 AM' },
        { id: 2, sender: 'user', text: 'Hi Akram, yes the main breaker keeps tripping since yesterday.', time: '09:50 AM' },
        { id: 3, sender: 'provider', text: 'I will arrive at 10:30 AM with the circuit breakers.', time: '10:15 AM' }
      ]
    },
    {
      id: 2,
      name: 'Tom Anderson',
      role: 'Plumber',
      avatar: '🔧',
      lastMessage: 'The replacement pipe has been installed successfully.',
      time: 'Yesterday',
      unread: 0,
      verified: true,
      messages: [
        { id: 1, sender: 'user', text: 'Hi Tom, do you have availability this afternoon for pipe inspection?', time: 'Yesterday' },
        { id: 2, sender: 'provider', text: 'Yes, I can come by 2:00 PM.', time: 'Yesterday' },
        { id: 3, sender: 'provider', text: 'The replacement pipe has been installed successfully.', time: 'Yesterday' }
      ]
    },
    {
      id: 3,
      name: 'Tariq Mehmood',
      role: 'AC & HVAC Technician',
      avatar: '❄️',
      lastMessage: 'The AC gas pressure has been refilled and cooling is optimal.',
      time: '2 days ago',
      unread: 0,
      verified: true,
      messages: [
        { id: 1, sender: 'user', text: 'Hi Tariq, inverter AC is not cooling properly in master bedroom.', time: '2 days ago' },
        { id: 2, sender: 'provider', text: 'The AC gas pressure has been refilled and cooling is optimal.', time: '2 days ago' }
      ]
    }
  ]

  const activeConversation = conversations.find(c => c.id === selectedChatId)

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputText.trim()) return
    // UI prototype only - clean state reset without claiming real backend
    setInputText('')
  }

  return (
    <div className="messages-page">
      <div className="messages-container">
        {/* Left Panel: Inbox / Conversations List */}
        <aside className={`messages-sidebar ${selectedChatId ? 'has-active-chat' : ''}`}>
          <div className="messages-sidebar-header">
            <div className="sidebar-title-row">
              <h2 className="messages-sidebar-title">Messages</h2>
              <span className="messages-count-badge">{conversations.length}</span>
            </div>
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
                className={`msg-tab-btn ${activeTab === 'unread' ? 'active' : ''}`}
                onClick={() => setActiveTab('unread')}
              >
                Unread ({conversations.filter(c => c.unread > 0).length})
              </button>
            </div>
          </div>

          <div className="conversations-list">
            {conversations
              .filter(conv => activeTab === 'all' || (activeTab === 'unread' && conv.unread > 0))
              .map((conv) => {
                const isSelected = conv.id === selectedChatId
                return (
                  <div
                    key={conv.id}
                    className={`conversation-item ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedChatId(conv.id)}
                  >
                    <div className="conv-avatar">
                      <span className="conv-avatar-icon">{conv.avatar}</span>
                      {conv.verified && <span className="conv-verified-dot" title="Verified Provider">✓</span>}
                    </div>
                    <div className="conv-content">
                      <div className="conv-header-row">
                        <h4 className="conv-name">{conv.name}</h4>
                        <span className="conv-time">{conv.time}</span>
                      </div>
                      <div className="conv-sub-row">
                        <span className="conv-role">{conv.role}</span>
                        {conv.unread > 0 && <span className="conv-unread-pill">{conv.unread}</span>}
                      </div>
                      <p className="conv-last-msg">{conv.lastMessage}</p>
                    </div>
                  </div>
                )
              })}
          </div>
        </aside>

        {/* Right Panel: Active Conversation or Empty State */}
        <main className={`messages-main ${selectedChatId ? 'chat-open' : ''}`}>
          {activeConversation ? (
            <div className="conversation-thread-view">
              {/* Header */}
              <div className="thread-header">
                <button
                  type="button"
                  className="thread-back-btn"
                  onClick={() => setSelectedChatId(null)}
                  title="Back to inbox"
                >
                  ←
                </button>
                <div className="thread-user-info">
                  <div className="thread-avatar">
                    <span>{activeConversation.avatar}</span>
                  </div>
                  <div>
                    <div className="thread-name-row">
                      <h3 className="thread-user-name">{activeConversation.name}</h3>
                      {activeConversation.verified && (
                        <span className="thread-verified-badge">✓ Verified</span>
                      )}
                    </div>
                    <span className="thread-user-role">{activeConversation.role} • MUX SERVICES Partner</span>
                  </div>
                </div>
                {setCurrentPage && (
                  <button
                    type="button"
                    className="thread-services-link"
                    onClick={() => setCurrentPage('services')}
                  >
                    Browse Services
                  </button>
                )}
              </div>

              {/* Safety notice */}
              <div className="thread-safety-banner">
                <span>🔒 For your protection, always keep communications and payments inside MUX SERVICES.</span>
              </div>

              {/* Messages area */}
              <div className="thread-messages-list">
                {activeConversation.messages.map((msg) => {
                  const isUser = msg.sender === 'user'
                  return (
                    <div
                      key={msg.id}
                      className={`thread-msg-bubble-wrap ${isUser ? 'msg-user' : 'msg-provider'}`}
                    >
                      <div className="thread-msg-bubble">
                        <p className="thread-msg-text">{msg.text}</p>
                        <span className="thread-msg-time">{msg.time}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Input section (UI prototype only) */}
              <form className="thread-input-bar" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  className="thread-input-field"
                  placeholder={`Reply to ${activeConversation.name}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <button
                  type="submit"
                  className="thread-send-btn"
                  title="Send message"
                  disabled={!inputText.trim()}
                >
                  <span>Send</span>
                  <span>→</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="messages-empty-state">
              <div className="empty-state-card">
                <div className="empty-icon-circle">💬</div>
                <h3 className="empty-title">Select a Conversation</h3>
                <p className="empty-subtitle">
                  Choose a chat from the inbox list on the left to read messages and reply to your service professional.
                </p>
                {setCurrentPage && (
                  <button
                    type="button"
                    className="empty-action-btn"
                    onClick={() => setCurrentPage('services')}
                  >
                    Find New Services →
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
