export const getRole = () => localStorage.getItem("role");

export const isAuthenticated = () => !!localStorage.getItem("token");

export const hasRole = (role) => getRole() === role;

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("session_warning_shown");
  window.location.href = "/";
};