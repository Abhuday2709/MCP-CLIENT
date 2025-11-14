import React, { useRef } from 'react'
import '../styles/InputArea.css'

function InputArea({ inputValue, setInputValue, onSendMessage, isTyping }) {
  const inputRef = useRef(null)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSendMessage()
    }
  }

  return (
    <div className="input-area">
      <div className="input-wrapper">
        <input 
          type="text" 
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isTyping ? "Wait for AI to respond..." : "Type your message here..."} 
          aria-label="Message input"
          disabled={isTyping}
        />
      </div>
      <button 
        onClick={onSendMessage}
        disabled={inputValue.trim() === '' || isTyping}
        aria-label="Send message"
      >
        {isTyping ? 'Waiting...' : 'Send'}
      </button>
    </div>
  )
}

export default InputArea
