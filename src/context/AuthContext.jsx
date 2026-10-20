import { createContext, useContext, useState } from 'react'
import { decodeToken } from './decodeToken.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(() => decodeToken(localStorage.getItem('token')))

  function login(newToken) {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    setUser(decodeToken(newToken))
  }

  function logout() {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
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