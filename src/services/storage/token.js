const TOKEN_KEY = "lms_access_token";
const REFRESH_TOKEN_KEY = "lms_refresh_token";

// Fallback in-memory storage kalau localStorage tidak tersedia
let inMemoryAccessToken = null;
let inMemoryRefreshToken = null;

function setToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    inMemoryAccessToken = token;
  }
}

function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || inMemoryAccessToken;
  } catch (e) {
    return inMemoryAccessToken;
  }
}

function removeToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch (e) {
    // ignore
  }
  inMemoryAccessToken = null;
  inMemoryRefreshToken = null;
}

function setRefreshToken(token) {
  try {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  } catch (e) {
    inMemoryRefreshToken = token;
  }
}

function getRefreshToken() {
  try {
    return localStorage.getItem(REFRESH_TOKEN_KEY) || inMemoryRefreshToken;
  } catch (e) {
    return inMemoryRefreshToken;
  }
}

/**
 * Convenience to set both tokens at once.
 * payload: { accessToken: string, refreshToken?: string }
 */
function setTokens(payload = {}) {
  if (payload.accessToken) setToken(payload.accessToken);
  if (payload.refreshToken) setRefreshToken(payload.refreshToken);
}

export {
  setToken,
  getToken,
  removeToken,
  setRefreshToken,
  getRefreshToken,
  setTokens,
};
