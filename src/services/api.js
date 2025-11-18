const API_BASE_URL = 'http://localhost:3000';

export const sendMessageToAI = async (message, conversationHistory = []) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        message,
        conversationHistory: conversationHistory.slice(-10) // Send last 10 messages for context
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to get response from AI');
    }

    return data.response;
  } catch (error) {
    console.error('Error calling AI API:', error);
    throw error;
  }
};

export const checkServerHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    return response.ok;
  } catch (error) {
    console.error('Server health check failed:', error);
    return false;
  }
};
