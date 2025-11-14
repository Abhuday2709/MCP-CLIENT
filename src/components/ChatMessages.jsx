import React, { useRef, useEffect } from 'react'
import Message from './Message'
import TypingIndicator from './TypingIndicator'
import '../styles/ChatMessages.css'

function ChatMessages({ messages, isTyping }) {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  return (
    <div className="chat-messages">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      
      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatMessages
