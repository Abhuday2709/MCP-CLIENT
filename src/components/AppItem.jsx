import React, { useEffect, useState } from 'react'
import '../styles/AppItem.css'

function AppItem({ app, isConnected, onToggle }) {
  const [authStatus, setAuthStatus] = useState({
    google: { authenticated: false, user: null },
    microsoft: { authenticated: false, user: null }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

  useEffect(() => {
    checkAuthStatus();
    
    // Handle OAuth redirects
    const params = new URLSearchParams(window.location.search);
    const provider = params.get('provider');
    const status = window.location.pathname.includes('success') ? 'success' : 
                   window.location.pathname.includes('error') ? 'error' : null;
    
    if (status === 'success' && provider) {
      setError(null);
      setTimeout(() => {
        window.history.replaceState({}, '', '/');
        checkAuthStatus();
      }, 1000);
    } else if (status === 'error' && provider) {
      setError(`Failed to authenticate with ${provider}`);
      setTimeout(() => {
        window.history.replaceState({}, '', '/');
      }, 3000);
    }
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/auth/status`, {
        credentials: 'include'
      });
      const data = await response.json();
      
      // Update state with the response structure from backend
      setAuthStatus({
        google: data.google || { authenticated: false, user: null },
        microsoft: data.microsoft || { authenticated: false, user: null }
      });
    } catch (err) {
      console.error('Error checking auth status:', err);
      setError('Failed to check authentication status');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/auth/google`);
      const data = await response.json();
      window.location.href = data.authUrl;
    } catch (err) {
      setError('Failed to initiate Google login');
      setLoading(false);
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      setLoading(true);
      console.log('Fetching Microsoft auth URL...');
      const response = await fetch(`${API_URL}/auth/microsoft`);
      const data = await response.json();
      console.log('Microsoft auth response:', data);
      
      if (data.authUrl) {
        console.log('Redirecting to:', data.authUrl);
        window.location.href = data.authUrl;
      } else if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setError('Invalid response from server');
        setLoading(false);
      }
    } catch (err) {
      console.error('Microsoft login error:', err);
      setError('Failed to initiate Microsoft login');
      setLoading(false);
    }
  };

  const handleLogout = async (provider) => {
    try { 
      setLoading(true);
      await fetch(`${API_URL}/auth/logout/${provider}`, {
        method: 'POST',
        credentials: 'include'
      });
      checkAuthStatus();
    } catch (err) {
      setError(`Failed to logout from ${provider}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    console.log('handleSubmit called for app:', app.id);
    console.log('Auth status:', authStatus);
    
    if (app.id === 'gmail' && !authStatus.google.authenticated) {
      console.log('Initiating Google login');
      handleGoogleLogin();
    } else if (app.id === 'gmail' && authStatus.google.authenticated) {
      console.log('Logging out from Google');
      handleLogout('google');
    } else if (app.id === 'teams' && !authStatus.microsoft.authenticated) {
      console.log('Initiating Microsoft login');
      handleMicrosoftLogin();
    } else if (app.id === 'teams' && authStatus.microsoft.authenticated) {
      console.log('Logging out from Microsoft');
      handleLogout('microsoft');
    } else {
      console.log('Toggling app connection');
      onToggle(app.id);
    }
  };

  const isGmailConnected = app.id === 'gmail' && authStatus.google.authenticated;
  const isTeamsConnected = app.id === 'teams' && authStatus.microsoft.authenticated;

  return (
    <div className="app-item">
      <div className="app-info">
        <h3>{app.icon} {app.name}</h3>
        <p>{app.description}</p>
        {authStatus.google.authenticated && app.id === 'gmail' && (
          <p className="user-info">
            Logged in as: {authStatus.google.user?.email}
          </p>
        )}
        {authStatus.microsoft.authenticated && app.id === 'teams' && (
          <p className="user-info">
            Logged in as: {authStatus.microsoft.user?.email}
          </p>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
      <button 
        type="button"
        className={`connect-btn ${isGmailConnected || isTeamsConnected || isConnected ? 'connected' : ''}`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Loading...' : 
         isGmailConnected ? '✓ Connected (Logout)' : 
         isTeamsConnected ? '✓ Connected (Logout)' :
         isConnected ? '✓ Connected' : 'Connect'}
      </button>
    </div>
  )
}

export default AppItem