export const API_ENDPOINT = process.env.NODE_ENV === 'production' ? `${window.location.origin}/api` : 'http://localhost:3000/api'
export const CURRENT_USER_URL = `${API_ENDPOINT}/users/me`
export const LOGIN_URL = `${API_ENDPOINT}/users/login`
export const LOGOUT_URL = `${API_ENDPOINT}/users/logout`
export const USERS_URL = `${API_ENDPOINT}/users`