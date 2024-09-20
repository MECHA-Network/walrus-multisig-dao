// session.js

const SESSION_KEY = 'user_session';
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

function login() {
  const now = Date.now();
  const session = {
    expiresAt: now + SESSION_DURATION
  };
  chrome.storage.local.set({ [SESSION_KEY]: session }, () => {
    console.log('Session saved');
  });
}

function logout() {
  chrome.storage.local.remove(SESSION_KEY, () => {
    console.log('Session removed');
  });
}

function isLoggedIn(callback: (arg0: boolean) => void) {
  chrome.storage.local.get(SESSION_KEY, (result) => {
    const session = result[SESSION_KEY];
    const now = Date.now();
    if (session && session.expiresAt > now) {
      callback(true);
    } else {
      if (session) {
        logout(); // Clear expired session
      }
      callback(false);
    }
  });
}

function refreshSession() {
  chrome.storage.local.get(SESSION_KEY, (result) => {
    const session = result[SESSION_KEY];
    if (session) {
      session.expiresAt = Date.now() + SESSION_DURATION;
      chrome.storage.local.set({ [SESSION_KEY]: session }, () => {
        console.log('Session refreshed');
      });
    }
  });
}

// Export functions if using modules
export { login, isLoggedIn, refreshSession };