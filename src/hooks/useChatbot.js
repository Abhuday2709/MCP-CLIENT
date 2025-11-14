import { useState } from 'react'
import { generateBotResponse } from '../utils/botResponses'

export const useChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your MCP-powered assistant. How can I help you today?"
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [connectedApps, setConnectedApps] = useState(new Set())

  const handleSendMessage = () => {
    if (inputValue.trim() === '' || isTyping) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue
    }

    const messageToRespond = inputValue
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: generateBotResponse(messageToRespond, connectedApps.size)
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const toggleAppConnection = (appId) => {
    setConnectedApps(prev => {
      const newSet = new Set(prev)
      if (newSet.has(appId)) {
        newSet.delete(appId)
      } else {
        newSet.add(appId)
      }
      return newSet
    })
  }

  return {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    connectedApps,
    handleSendMessage,
    toggleAppConnection
  }
}
