import React from 'react'
import '../styles/AppItem.css'

function AppItem({ app, isConnected, onToggle }) {
  return (
    <div className="app-item">
      <div className="app-info">
        <h3>{app.icon} {app.name}</h3>
        <p>{app.description}</p>
      </div>
      <button 
        className={`connect-btn ${isConnected ? 'connected' : ''}`}
        onClick={onToggle}
      >
        {isConnected ? '✓ Connected' : 'Connect'}
      </button>
    </div>
  )
}

export default AppItem
