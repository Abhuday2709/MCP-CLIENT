import { useState } from 'react'
import Header from '../components/Header'
import ChatMessages from '../components/ChatMessages'
import InputArea from '../components/InputArea'
import AppsModal from '../components/AppsModal'
import { useChatbot } from '../hooks/useChatbot'
import { apps } from '../data/appsData'
import './AppAI.css'

function AppAI() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    connectedApps,
    handleSendMessage,
    toggleAppConnection
  } = useChatbot()

  return (
    <>
      <div className="container">
        <Header onAddAppsClick={() => setIsModalOpen(true)} />
        <ChatMessages messages={messages} isTyping={isTyping} />
        <InputArea 
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
        />
      </div>

      <AppsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        apps={apps}
        connectedApps={connectedApps}
        onToggleApp={toggleAppConnection}
      />
    </>
  )
}

export default AppAI