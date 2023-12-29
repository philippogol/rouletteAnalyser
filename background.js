chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed.');
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received:', message);

  // Perform background task (e.g., store data, make API requests, etc.)
  // ...

  // Send a response back to the popup if needed
  sendResponse({ status: 'Task completed' });
});