import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import { loginUser } from './api.js'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const token = await loginUser(email, password)
      login(token)
      navigate('/')
    } catch {
      setError('Fel e-post eller lösenord')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-form">
      <h2>Logga in</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <label>
          E-post
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label>
          Lösenord
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Loggar in...' : 'Logga in'}
        </button>
      </form>

      <p className="auth-link">
        Har du inget konto? <Link to="/register">Registrera dig</Link>
      </p>
    </div>
  )
}