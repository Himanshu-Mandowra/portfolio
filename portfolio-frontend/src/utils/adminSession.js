const ADMIN_TOKEN_KEY = "portfolio_admin_token";
const ADMIN_EXPIRY_KEY = "portfolio_admin_expiry";

export function saveAdminSession(token, expiresAt) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
  localStorage.setItem(ADMIN_EXPIRY_KEY, expiresAt);
}

export function clearAdminSession() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_EXPIRY_KEY);
}

export function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function isAdminSessionActive() {
  const expiresAt = localStorage.getItem(ADMIN_EXPIRY_KEY);

  if (!expiresAt) {
    return false;
  }

  return new Date(expiresAt).getTime() > Date.now();
}
