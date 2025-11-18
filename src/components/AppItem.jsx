import React, { useEffect, useState } from 'react'
import '../styles/AppItem.css'

function AppItem({ app, isConnected, onToggle }) {
  const [authStatus, setAuthStatus] = useState({
    google: { authenticated: false, user: null }
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
      const response = await fetch(`${API_URL}/auth/status`,{
        credentials: 'include'
      });
      const data = await response.json();
      setAuthStatus(data);
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
    if (app.id === 'gmail' && !authStatus.google.authenticated) {
      handleGoogleLogin();
    } else if (app.id === 'gmail' && authStatus.google.authenticated) {
      handleLogout('google');
    } else {
      onToggle(app.id);
    }
  };

  const isGmailConnected = app.id === 'gmail' && authStatus.google.authenticated;

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
        {error && <p className="error-message">{error}</p>}
      </div>
      <button 
        className={`connect-btn ${isGmailConnected || isConnected ? 'connected' : ''}`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Loading...' : 
         isGmailConnected ? '✓ Connected (Logout)' : 
         isConnected ? '✓ Connected' : 'Connect'}
      </button>
    </div>
  )
}

export default AppItem