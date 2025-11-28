// api.ts

import axios from 'axios'

// 1. O erro de login ocorre aqui se VITE_API_URL estiver ausente/incorreta
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3333'

const api = axios.create({
  baseURL: API_BASE, // DEVE ser 'http://localhost:3333'
})

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

export default api