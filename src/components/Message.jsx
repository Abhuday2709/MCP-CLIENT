import React from 'react'
import '../styles/Message.css'

function Message({ message }) {
  // Format the AI response for better readability
  const formatContent = (content) => {
    if (typeof content !== 'string') return content;

    // Parse markdown-style formatting
    const lines = content.split('\n');
    const elements = [];
    let currentList = [];
    let listType = null; // 'ul' or 'ol'

    const flushList = () => {
      if (currentList.length > 0) {
        if (listType === 'ul') {
          elements.push(
            <ul key={`list-${elements.length}`} className="message-list">
              {currentList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
        }
        currentList = [];
        listType = null;
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      
      // Empty line - add spacing
      if (!trimmed) {
        flushList();
        return;
      }

      // Markdown unordered list (* or -)
      const ulMatch = trimmed.match(/^[\*\-]\s+(.+)$/);
      if (ulMatch) {
        if (listType !== 'ul') {
          flushList();
          listType = 'ul';
        }
        // Remove ** bold markdown and format
        const itemText = ulMatch[1].replace(/\*\*(.+?)\*\*/g, '$1');
        currentList.push(itemText);
        return;
      }

      // Markdown numbered list (1., 2., etc.)
      const olMatch = trimmed.match(/^\d+\.\s+(.+)$/);
      if (olMatch) {
        flushList();
        elements.push(
          <p key={idx} className="numbered-item">
            {olMatch[0]}
          </p>
        );
        return;
      }

      // Headers (lines ending with : or starting with ##)
      if ((trimmed.endsWith(':') && trimmed.length < 100) || trimmed.startsWith('##')) {
        flushList();
        const headerText = trimmed.replace(/^##\s*/, '').replace(/:$/, '');
        elements.push(
          <h4 key={idx} className="message-header">
            {headerText}
          </h4>
        );
        return;
      }

      // Code blocks (``` ... ```)
      if (trimmed.startsWith('```')) {
        flushList();
        return; // Skip code block markers for now
      }

      // Regular paragraph
      flushList();
      
      // Parse inline formatting (bold, inline code, etc.)
      const formatted = parseInlineFormatting(trimmed);
      elements.push(
        <p key={idx}>{formatted}</p>
      );
    });

    // Flush any remaining list
    flushList();

    return elements;
  };

  // Parse inline markdown formatting
  const parseInlineFormatting = (text) => {
    const parts = [];
    let currentIndex = 0;
    
    // Match **bold**, `code`, or regular text
    const regex = /(\*\*[^*]+\*\*)|(`[^`]+`)/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Add text before match
      if (match.index > currentIndex) {
        parts.push(text.substring(currentIndex, match.index));
      }

      // Add formatted match
      if (match[0].startsWith('**')) {
        parts.push(
          <strong key={match.index}>
            {match[0].slice(2, -2)}
          </strong>
        );
      } else if (match[0].startsWith('`')) {
        parts.push(
          <code key={match.index} className="inline-code">
            {match[0].slice(1, -1)}
          </code>
        );
      }

      currentIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (currentIndex < text.length) {
      parts.push(text.substring(currentIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className={`message ${message.type}`}>
      <div className="message-avatar">
        {message.type === 'bot' ? '🤖' : '👤'}
      </div>
      <div className="message-content">
        {message.type === 'bot' ? formatContent(message.content) : message.content}
      </div>
    </div>
  )
}

export default Message