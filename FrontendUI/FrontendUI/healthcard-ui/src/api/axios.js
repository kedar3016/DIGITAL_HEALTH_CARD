import axios from "axios";

// Session management utilities
const SESSION_WARNING_TIME = 5 * 60 * 1000; // 5 minutes before expiry
const SESSION_CHECK_INTERVAL = 60 * 1000; // Check every minute

// Parse JWT token to get expiration time
const getTokenExpiration = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000; // Convert to milliseconds
  } catch {
    return null;
  }
};

// Check if token is expired
const isTokenExpired = (token) => {
  const expiration = getTokenExpiration(token);
  return expiration ? Date.now() >= expiration : true;
};

// Check if token is about to expire
const isTokenExpiringSoon = (token) => {
  const expiration = getTokenExpiration(token);
  return expiration ? (expiration - Date.now()) <= SESSION_WARNING_TIME : false;
};

// Show session warning
const showSessionWarning = () => {
  const warningDiv = document.createElement('div');
  warningDiv.id = 'session-warning';
  warningDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #ffc107;
    color: #000;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 10000;
    max-width: 300px;
  `;
  warningDiv.innerHTML = `
    <strong>Session Expiring Soon!</strong><br>
    Your session will expire in 5 minutes.<br>
    <button id="extend-session" style="margin-top: 10px; padding: 5px 10px; background: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer;">Stay Logged In</button>
    <button id="dismiss-warning" style="margin-top: 10px; margin-left: 10px; padding: 5px 10px; background: #6c757d; color: white; border: none; border-radius: 3px; cursor: pointer;">Dismiss</button>
  `;

  document.body.appendChild(warningDiv);

  // Handle extend session
  document.getElementById('extend-session').onclick = () => {
    // For now, just dismiss the warning. In a real app, you'd refresh the token
    warningDiv.remove();
    localStorage.setItem('session_warning_shown', 'true');
  };

  // Handle dismiss
  document.getElementById('dismiss-warning').onclick = () => {
    warningDiv.remove();
    localStorage.setItem('session_warning_shown', 'true');
  };
};

// Start session monitoring
const startSessionMonitoring = () => {
  const checkSession = () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (isTokenExpired(token)) {
      // Token expired, logout
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('session_warning_shown');
      
      // Don't redirect if user is on login or registration pages
      const currentPath = window.location.pathname;
      if (currentPath.includes('/login') || currentPath.includes('/register')) {
        return;
      }
      
      window.location.href = '/';
      return;
    }

    if (isTokenExpiringSoon(token) && !localStorage.getItem('session_warning_shown')) {
      showSessionWarning();
    }
  };

  // Check immediately
  checkSession();

  // Check periodically
  setInterval(checkSession, SESSION_CHECK_INTERVAL);
};

// Initialize session monitoring when module loads
if (typeof window !== 'undefined') {
  startSessionMonitoring();
}

const api = axios.create({
  baseURL: "http://localhost:5133",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !isTokenExpired(token)) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("session_warning_shown");
      
      // Don't redirect if user is on login or registration pages
      const currentPath = window.location.pathname;
      if (currentPath.includes('/login') || currentPath.includes('/register')) {
        return Promise.reject(error);
      }
      
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;