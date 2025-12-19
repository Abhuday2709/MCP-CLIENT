import { useState, useEffect } from 'react';

function DebugPanel() {
  const [authStatus, setAuthStatus] = useState(null);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

  const checkStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/status`, {
        credentials: 'include'
      });
      const data = await response.json();
      setAuthStatus(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const testMicrosoftEndpoint = async () => {
    try {
      //console.log('Testing Microsoft endpoint...');
      const response = await fetch(`${API_URL}/auth/microsoft`);
      const data = await response.json();
      //console.log('Microsoft endpoint response:', data);
      alert(`Response: ${JSON.stringify(data, null, 2)}`);
    } catch (err) {
      console.error('Error:', err);
      alert(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: '#f0f0f0',
      border: '1px solid #ccc',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      maxWidth: '300px',
      zIndex: 9999
    }}>
      <h4 style={{ margin: '0 0 10px 0' }}>Debug Panel</h4>
      
      <button onClick={checkStatus} style={{ marginBottom: '10px' }}>
        Refresh Status
      </button>
      
      <button onClick={testMicrosoftEndpoint} style={{ marginBottom: '10px', marginLeft: '5px' }}>
        Test Microsoft Endpoint
      </button>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          Error: {error}
        </div>
      )}
      
      {authStatus && (
        <div>
          <div><strong>Google:</strong> {authStatus.google?.authenticated ? '✓' : '✗'}</div>
          <div><strong>Microsoft:</strong> {authStatus.microsoft?.authenticated ? '✓' : '✗'}</div>
          {authStatus.google?.user && (
            <div style={{ fontSize: '10px', marginTop: '5px' }}>
              Google: {authStatus.google.user.email}
            </div>
          )}
          {authStatus.microsoft?.user && (
            <div style={{ fontSize: '10px', marginTop: '5px' }}>
              Microsoft: {authStatus.microsoft.user.email}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DebugPanel;
