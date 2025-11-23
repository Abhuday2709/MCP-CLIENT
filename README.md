# MCP Chatbot - Frontend

A modern React-based chatbot interface that integrates with Google services through OAuth2 authentication and the Model Context Protocol (MCP).

## 🏗️ Architecture

### Technology Stack
- **Framework**: React 18 with Vite
- **Styling**: CSS Modules
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Fetch API
- **Authentication**: JWT with HTTP-only cookies
- **OAuth2**: Google OAuth2 for Gmail integration

### Project Structure
```
client/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, icons, fonts
│   ├── components/      # React components
│   │   ├── AppItem.jsx          # Individual app connection card
│   │   ├── AppsModal.jsx        # Modal for available MCP apps
│   │   ├── ChatMessages.jsx     # Chat messages container
│   │   ├── Header.jsx           # Application header
│   │   ├── InputArea.jsx        # Message input field
│   │   ├── Message.jsx          # Individual message component
│   │   └── TypingIndicator.jsx  # Loading indicator
│   ├── data/
│   │   └── appsData.js          # MCP apps configuration
│   ├── hooks/
│   │   └── useChatbot.js        # Custom chatbot logic hook
│   ├── services/
│   │   └── api.js               # API communication layer
│   ├── styles/          # Component-specific CSS
│   ├── utils/
│   │   └── botResponses.js      # Bot response templates
│   ├── App.jsx          # Main application component
│   ├── App.css          # Global application styles
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global CSS reset/base styles
├── .env                 # Environment variables
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies and scripts
```

## 🚀 Features

### 1. **Intelligent Chatbot Interface**
- Real-time message streaming
- Typing indicators
- Message history with timestamps
- User and bot message differentiation
- Smooth scrolling to latest messages

### 2. **OAuth2 Authentication**
- Google OAuth2 integration for Gmail
- Secure JWT token management
- HTTP-only cookies for enhanced security
- Automatic token refresh
- Session persistence

### 3. **MCP Apps Integration**
- Gmail integration for email management
- Extensible architecture for additional MCP apps
- Real-time connection status
- Easy app discovery through modal interface

### 4. **User Experience**
- Responsive design for all screen sizes
- Clean, modern UI with smooth animations
- Error handling with user-friendly messages
- Loading states for better feedback
- Auto-focus on input field

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend server running on `http://localhost:3000`
- Google OAuth2 credentials configured on backend

## 🛠️ Installation

### 1. Clone the repository
```bash
cd client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Start development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📖 How to Use

### Getting Started

1. **Open the Application**
   - Navigate to `http://localhost:5173` in your browser
   - You'll see the chatbot interface with an input field

2. **Connect MCP Apps**
   - Click the **"📱 Apps"** button in the header
   - A modal will open showing available MCP apps
   - Click **"Connect"** on Gmail to authenticate

3. **Google OAuth Authentication**
   - Click "Connect" on the Gmail app
   - You'll be redirected to Google's login page
   - Sign in with your Google account
   - Grant the requested permissions:
     - Read emails (gmail.readonly)
     - Send emails (gmail.send)
     - Access basic profile info
   - You'll be redirected back to the app
   - The Gmail app will show "✓ Connected"

4. **Start Chatting**
   - Type your message in the input field
   - Press Enter or click the send button
   - The bot will process your request and respond
   - Use Gmail-related commands once connected

### Example Commands

Once Gmail is connected, you can use commands like:
- "Check my latest emails"
- "Send an email to john@example.com"
- "Show unread messages"
- "Draft an email"

### Managing Connections

- **View Status**: Connected apps show "✓ Connected (Logout)"
- **Disconnect**: Click on a connected app to logout
- **Reconnect**: Click "Connect" again to re-authenticate

## 🔐 Authentication Flow

```
User clicks "Connect Gmail"
        ↓
Frontend → GET /api/auth/google
        ↓
Receives authUrl from backend
        ↓
Redirects to Google OAuth page
        ↓
User grants permissions
        ↓
Google redirects to backend callback
        ↓
Backend → Exchanges code for tokens
        ↓
Backend → Stores tokens in Redis
        ↓
Backend → Sets JWT cookie
        ↓
Redirects to /auth/success?provider=google
        ↓
Frontend → Detects success redirect
        ↓
Frontend → Calls GET /api/auth/status
        ↓
Updates UI to show "Connected"
```

## 🔧 Configuration

### API Integration

The application communicates with the backend through the `api.js` service:

```javascript
// All API calls include credentials for JWT cookies
fetch(`${API_URL}/endpoint`, {
  credentials: 'include'
})
```

### Available API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/google` | GET | Get Google OAuth URL |
| `/api/auth/google/callback` | GET | OAuth callback handler |
| `/api/auth/status` | GET | Get current auth status |
| `/api/auth/logout/:provider` | POST | Logout from provider |
| `/api/chat` | POST | Send chat message |


Features:
- Message state management
- API communication
- Error handling
- Typing indicators
- Auto-scroll to latest message

## 🎨 Styling

The application uses CSS modules with the following design principles:

- **Color Scheme**:
  - Primary: #667eea (Purple gradient)
  - Secondary: #764ba2 (Deep purple)
  - Background: #f7fafc (Light gray)
  - Text: #2d3748 (Dark gray)

- **Layout**:
  - Flexbox for component alignment
  - CSS Grid for complex layouts
  - Responsive breakpoints for mobile/tablet/desktop

- **Animations**:
  - Smooth transitions (0.3s ease)
  - Fade-in effects for messages
  - Slide-up for modals
  - Pulse animation for typing indicator

## 🔒 Security Features

1. **JWT Authentication**
   - Tokens stored in HTTP-only cookies
   - Automatic expiration (7 days)
   - Secure flag in production

2. **CORS Protection**
   - Credentials required
   - Origin validation
   - Allowed methods restriction

3. **Input Validation**
   - XSS prevention through React's escaping
   - No direct HTML rendering from user input

4. **OAuth2 Security**
   - PKCE flow support
   - State parameter validation
   - Secure redirect URIs

## 📄 License

This project is licensed under the MIT License.

## 🔗 Related Documentation

- [Backend Server Documentation](../server/README.md)
- [MCP Protocol Specification](https://modelcontextprotocol.io)
- [Google OAuth2 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check existing issues for solutions
- Review troubleshooting section above
---

**Built with ❤️ using React and Vite**