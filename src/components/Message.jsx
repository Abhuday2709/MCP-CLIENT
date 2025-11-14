import React from 'react'
import '../styles/Message.css'

function Message({ message }) {
  return (
    <div className={`message ${message.type}`}>
      <div className="message-avatar">
        {message.type === 'bot' ? 'AI' : 'You'}
      </div>
      <div className="message-content">
        {message.content}
      </div>
    </div>
  )
}

export default Message
