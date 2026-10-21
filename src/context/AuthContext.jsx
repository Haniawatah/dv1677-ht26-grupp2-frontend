import { createContext, useContext, useState } from 'react'
import { decodeToken } from './decodeToken.js'

const AuthContext = createContext(null)

// Shared with api.js so a 401 can clear the token and trigger the redirect.
export function logout() {
  localStorage.removeItem('token')
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(() => decodeToken(localStorage.getItem('token')))

  function login(newToken) {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    setUser(decodeToken(newToken))
  }

  function handleLogout() {
    logout()
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}