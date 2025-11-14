export const generateBotResponse = (userInput, connectedAppsCount) => {
  const input = userInput.toLowerCase()
  
  if (input.includes('hello') || input.includes('hi')) {
    return "Hello! How can I assist you today?"
  } else if (input.includes('help')) {
    return "I can help you with various tasks using connected MCP apps. Try connecting some apps from the '+ Add Apps' button!"
  } else if (input.includes('app')) {
    return `You currently have ${connectedAppsCount} app(s) connected. Click '+ Add Apps' to connect more services.`
  } else {
    return "I understand you're asking about '" + userInput + "'. This is a demo chatbot. Connect MCP apps to enable real functionality!"
  }
}
