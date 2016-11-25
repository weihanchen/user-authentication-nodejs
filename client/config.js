export const API_ENDPOINT = process.env.NODE_ENV === 'production' ? `${window.location.origin}/api` : 'http://localhost:3000/api'
export const LOGIN_URL = `${API_ENDPOINT}/users/login`