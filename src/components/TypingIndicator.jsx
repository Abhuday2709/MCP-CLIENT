import React from 'react'
import '../styles/TypingIndicator.css'

function TypingIndicator() {
  return (
    <div className="message bot">
      <div className="message-avatar">AI</div>
      <div className="message-content typing-indicator active">
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
      </div>
    </div>
  )
}

export default TypingIndicator
