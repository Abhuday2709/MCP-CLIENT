import React from 'react'
import '../styles/Header.css'

function Header({ onAddAppsClick }) {
  return (
    <div className="header">
      <h1>MCP Chatbot</h1>
      <button 
        className="add-apps-btn" 
        onClick={onAddAppsClick}
        aria-label="Add Apps"
      >
        + Add Apps
      </button>
    </div>
  )
}

export default Header
