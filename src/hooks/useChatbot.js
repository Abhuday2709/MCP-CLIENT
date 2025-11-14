import { useState } from 'react'
import { sendMessageToAI } from '../services/api'

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
  const [error, setError] = useState(null)

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isTyping) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue
    }

    const messageToSend = inputValue
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)
    setError(null)

    try {
      // Get conversation history for context (last few messages)
      const conversationHistory = messages.slice(-10).map(msg => ({
        type: msg.type,
        content: msg.content
      }))

      // Call Gemini API
      const aiResponse = await sendMessageToAI(messageToSend, conversationHistory)

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: aiResponse
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    } catch (error) {
      console.error('Failed to get AI response:', error)
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "I apologize, but I'm having trouble connecting to the AI service. Please make sure the server is running on port 3000 and try again."
      }
      
      setMessages(prev => [...prev, errorMessage])
      setError(error.message)
      setIsTyping(false)
    }
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
    error,
    handleSendMessage,
    toggleAppConnection
  }
}
