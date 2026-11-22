import React from 'react'
import './MuxTickerStrips.css'

function MuxTickerStrips() {
  // Strip 1: Core Platform Guarantees & Features (Left-to-Right)
  const strip1Items = [
    { icon: '🛡️', title: '100% Escrow Protection', desc: 'Payment released only after your satisfaction.' },
    { icon: '⚡', title: '30-Minute Rapid Arrival', desc: 'Emergency verified pros across Multan.' },
    { icon: '⭐', title: '4.9/5 Rating from 40K+ Homes', desc: "Multan's most trusted doorstep service." },
    { icon: '🔍', title: 'NADRA & Police Verified', desc: '100% background-checked technicians.' },
    { icon: '💰', title: 'Custom Price Offer System', desc: 'Negotiate and lock fair budgets directly.' },
    { icon: '🛠️', title: 'Free 14-Day Warranty', desc: 'Zero-cost rework coverage on every booking.' },
    { icon: '📞', title: '24/7 Dedicated Support', desc: 'Live assistance for all maintenance needs.' },
    { icon: '🏆', title: 'MUX SERVICES Platform', desc: "Pakistan's smart home services ecosystem." }
  ]

  // Strip 2: Verified Trades & Specialized Capabilities (Right-to-Left)
  const strip2Items = [
    { icon: '⚡', title: 'Certified Electricians', desc: 'Wiring, solar inverter & DB panels.' },
    { icon: '🚰', title: 'Master Plumbers', desc: 'Acoustic leak detection & PPRC piping.' },
    { icon: '❄️', title: 'Inverter AC & HVAC Pros', desc: 'Deep jet chemical wash & gas top-up.' },
    { icon: '🪵', title: 'Artisan Carpenters', desc: 'Modular UV cabinets & solid wood doors.' },
    { icon: '✨', title: 'Deep Cleaning Experts', desc: 'Floor rotary buffing & sofa steam wash.' },
    { icon: '🎨', title: 'Luxury Velvet Painting', desc: 'Weather-shield & dampness proofing.' },
    { icon: '🌿', title: 'Gardening & Landscape', desc: 'Dhaka grass turf & micro drip irrigation.' },
    { icon: '🚪', title: 'Glass & Aluminum', desc: 'Soundproof double-glazed windows.' },
    { icon: '🔥', title: 'Structural Welding', desc: 'Iron sliding gates & steel truss sheds.' },
    { icon: '👔', title: 'Express Laundry Care', desc: 'Delicate dry-clean & crisp steam press.' }
  ]

  return (
    <div className="mux-dual-ticker-section" aria-label="MUX Services Features and Specializations">
      {/* Patti 1: Left-to-Right Animation */}
      <div className="mux-ticker-track-wrapper strip-1-theme">
        <div className="mux-ticker-inner mux-ticker-ltr">
          {strip1Items.map((item, idx) => (
            <div key={`s1-main-${idx}`} className="mux-ticker-item">
              <span className="ticker-badge-icon" aria-hidden="true">{item.icon}</span>
              <div className="ticker-text-wrap">
                <span className="ticker-title">{item.title}.</span>
                <span className="ticker-dot-sep">•</span>
                <span className="ticker-desc">{item.desc}</span>
              </div>
            </div>
          ))}
          {strip1Items.map((item, idx) => (
            <div key={`s1-dup-${idx}`} className="mux-ticker-item" aria-hidden="true">
              <span className="ticker-badge-icon">{item.icon}</span>
              <div className="ticker-text-wrap">
                <span className="ticker-title">{item.title}.</span>
                <span className="ticker-dot-sep">•</span>
                <span className="ticker-desc">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patti 2: Right-to-Left Animation */}
      <div className="mux-ticker-track-wrapper strip-2-theme">
        <div className="mux-ticker-inner mux-ticker-rtl">
          {strip2Items.map((item, idx) => (
            <div key={`s2-main-${idx}`} className="mux-ticker-item">
              <span className="ticker-badge-icon" aria-hidden="true">{item.icon}</span>
              <div className="ticker-text-wrap">
                <span className="ticker-title">{item.title}.</span>
                <span className="ticker-dot-sep">•</span>
                <span className="ticker-desc">{item.desc}</span>
              </div>
            </div>
          ))}
          {strip2Items.map((item, idx) => (
            <div key={`s2-dup-${idx}`} className="mux-ticker-item" aria-hidden="true">
              <span className="ticker-badge-icon">{item.icon}</span>
              <div className="ticker-text-wrap">
                <span className="ticker-title">{item.title}.</span>
                <span className="ticker-dot-sep">•</span>
                <span className="ticker-desc">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MuxTickerStrips
