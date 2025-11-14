import React from 'react'
import AppItem from './AppItem'
import '../styles/AppsModal.css'

function AppsModal({ isOpen, onClose, apps, connectedApps, onToggleApp }) {
  if (!isOpen) return null

  return (
    <div className={`modal ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Available MCP Apps</h2>
          <button 
            className="close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="app-list">
          {apps.map((app) => (
            <AppItem
              key={app.id}
              app={app}
              isConnected={connectedApps.has(app.id)}
              onToggle={() => onToggleApp(app.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AppsModal
