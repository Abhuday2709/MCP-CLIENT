import React, { useState, useRef, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import AppAI from './pages/AppAI.jsx';

const ChatInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showHiveModal, setShowHiveModal] = useState(false);
  const [selectedBees, setSelectedBees] = useState(new Set());
  const [activeBees, setActiveBees] = useState([]);
  const [activeBee, setActiveBee] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const availableBees = [
    {
      id: 'image-generation',
      name: 'Image Generation',
      icon: '🖼️',
      description: 'Generate stunning images from text prompts',
      color: '#3b82f6'
    },
    {
      id: 'app-ai',
      name: 'APP AI',
      icon: '🤖',
      description: 'Talk with different applications all in one place',
      color: '#8b5cf6'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sync activeBee state with current route
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath !== '/') {
      const beeId = currentPath.substring(1);
      const bee = activeBees.find(b => b.id === beeId);
      if (bee && activeBee?.id !== bee.id) {
        setActiveBee(bee);
        setMessages([]);
      }
    } else if (activeBee) {
      setActiveBee(null);
      setMessages([]);
    }
  }, [location.pathname, activeBees]);

  const handleBeeToggle = (beeId) => {
    const newSelected = new Set(selectedBees);
    if (newSelected.has(beeId)) {
      newSelected.delete(beeId);
    } else {
      newSelected.add(beeId);
    }
    setSelectedBees(newSelected);
  };

  const handleAddBees = () => {
    const beesToAdd = availableBees.filter(bee => selectedBees.has(bee.id));
    setActiveBees([...activeBees, ...beesToAdd]);
    setShowHiveModal(false);
    setSelectedBees(new Set());
  };

  const handleRemoveBee = (beeId) => {
    setActiveBees(activeBees.filter(bee => bee.id !== beeId));
    if (activeBee?.id === beeId) {
      setActiveBee(null);
      setMessages([]);
    }
  };

  const handleBeeClick = (bee) => {
    setActiveBee(bee);
    setMessages([]);
    const route = `/${bee.id}`;
    navigate(route);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isTyping || !activeBee) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: `This is a response from ${activeBee.name}. Your message has been received.`
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="ns-container">
      {/* Sidebar */}
      <div
        className={`ns-sidebar${sidebarOpen ? ' ns-sidebar-open' : ''}${isMobile ? ' ns-sidebar-mobile' : ''}`}
      >
        <div className="ns-sidebar-content">
          {/* Logo */}
          <div className="ns-logo">
            <span className="ns-logo-n">N</span>
            <span className="ns-logo-s">S</span>
            <span className="ns-logo-text">Office.AI</span>
          </div>

          {/* Hive Section */}
          <div className="ns-section">
            <div className="ns-section-header">
              <span>Hive</span>
              <span className="ns-chevron">▼</span>
            </div>
            <button
              className="ns-hive-button"
              onClick={() => setShowHiveModal(true)}
            >
              Open Hive
            </button>
          </div>

          {/* Active Bees */}
          {activeBees.length > 0 && (
            <div className="ns-bees-section">
              {activeBees.map(bee => (
                <div
                  key={bee.id}
                  className={`ns-bee-item${activeBee?.id === bee.id ? ' ns-bee-item-active' : ''}`}
                  onClick={() => handleBeeClick(bee)}
                >
                  <span className="ns-bee-icon">{bee.icon}</span>
                  <span className="ns-bee-name">{bee.name}</span>
                  <button
                    className="ns-remove-bee-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveBee(bee.id);
                    }}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* New Chat Button */}
          <button className="ns-new-chat-button">
            + New Chat
          </button>

          {/* Chat History */}
          <div className="ns-chat-history">
            <div className="ns-chat-history-item">second</div>
            <div className="ns-chat-history-item">first</div>
          </div>

          {/* Bottom Actions */}
          <div className="ns-bottom-actions">
            <button className="ns-action-button">
              <span className="ns-icon">⚙️</span> Settings
            </button>
            <button className="ns-action-button">
              <span className="ns-icon">🚪</span> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ns-main-content">
        {/* Top Bar */}
        <div className="ns-top-bar">
          <button
            className="ns-sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <div className="ns-model-selector">
            <span className="ns-model-label">Model Selection</span>
            <select className="ns-model-dropdown">
              <option>GPT-5</option>
              <option>GPT-4</option>
              <option>Claude</option>
            </select>
          </div>
          <div className="ns-prompts">
            <span className="ns-prompts-text">Prompts: 1/100 (99 left)</span>
          </div>
          <button className="ns-theme-toggle">☀️</button>
        </div>

        {/* Chat Area */}
        <div className="ns-chat-area">
          {!activeBee ? (
            <div className="ns-welcome-screen">
              <h1 className="ns-welcome-title">Welcome to NSOffice.AI</h1>
              <p className="ns-welcome-subtitle">Enterprise AI Productivity Platform</p>
            </div>
          ) : (
            <div className="ns-messages-container">
              {messages.map(message => (
                <div key={message.id} className="ns-message-wrapper">
                  <div className={`ns-message${message.type === 'user' ? ' ns-user-message' : ' ns-bot-message'}`}>
                    {message.content}
                  </div>
                  {message.type === 'bot' && (
                    <div className="ns-message-actions">
                      <button className="ns-action-icon">📋</button>
                      <button className="ns-action-icon">🔊</button>
                      <button className="ns-action-icon">🔄</button>
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="ns-message-wrapper">
                  <div className="ns-message ns-bot-message">
                    <div className="ns-typing-indicator">
                      <span className="ns-dot"></span>
                      <span className="ns-dot"></span>
                      <span className="ns-dot"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="ns-input-area">
          <div className="ns-input-wrapper">
            <button className="ns-input-button">+</button>
            <button className="ns-input-button">🔌</button>
            <button className="ns-input-button">🎤</button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={activeBee ? "Ask Anything..." : "Select a bee from Open Hive to start..."}
              className="ns-input"
              disabled={isTyping || !activeBee}
            />
            <button className="ns-input-button">✏️</button>
            <button className="ns-input-button">🎙️</button>
            <button
              className="ns-send-button"
              style={{ opacity: (isTyping || !inputValue.trim() || !activeBee) ? 0.5 : 1 }}
              onClick={handleSendMessage}
              disabled={isTyping || !inputValue.trim() || !activeBee}
            >
              ↑
            </button>
          </div>
          <p className="ns-disclaimer">
            NSOffice.AI and the models it uses can make mistakes. check important info
          </p>
        </div>
      </div>

      {/* Hive Modal */}
      {showHiveModal && (
        <div className="ns-modal-overlay" onClick={() => setShowHiveModal(false)}>
          <div className="ns-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ns-modal-header">
              <h2 className="ns-modal-title">Hive</h2>
              <button
                className="ns-close-button"
                onClick={() => setShowHiveModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="ns-modal-content">
              <h3 className="ns-section-title">Recommended Bees</h3>

              <div className="ns-bee-grid">
                {availableBees
                  .filter(bee => !activeBees.some(activeBee => activeBee.id === bee.id))
                  .map(bee => {
                    const isSelected = selectedBees.has(bee.id);
                    return (
                      <div
                        key={bee.id}
                        className={`ns-bee-card${isSelected ? ' ns-bee-card-selected' : ''}`}
                        style={{ backgroundColor: bee.color }}
                        onClick={() => handleBeeToggle(bee.id)}
                      >
                        {isSelected && (
                          <div className="ns-checkmark">
                            <Check size={20} color="white" />
                          </div>
                        )}
                        <div className="ns-bee-card-icon">
                          {bee.icon}
                        </div>
                        <h4 className="ns-bee-card-title">{bee.name}</h4>
                        <p className="ns-bee-card-description">{bee.description}</p>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="ns-modal-footer">
              <button
                className="ns-add-button"
                style={{ opacity: selectedBees.size === 0 ? 0.5 : 1 }}
                onClick={handleAddBees}
                disabled={selectedBees.size === 0}
              >
                Add ({selectedBees.size} selected)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NSOfficeChat = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatInterface />} />
        <Route path="/app-ai" element={<AppAI />} />
        <Route path="/image-generation" element={<ChatInterface />} />
      </Routes>
    </BrowserRouter>
  );
};

export default NSOfficeChat;