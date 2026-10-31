import { useNavigate, Routes, Route } from 'react-router-dom'
import DocumentList from './DocumentList.jsx'
import './App.css'
import SingleDocument from './SingleDocument.jsx'
import CreateDocument from './CreateDocument.jsx'
import CreateCode from './CreateCode.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { useAuth } from './context/AuthContext.jsx'

function App() {
  const { token, user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  function createDocument() {
    navigate('/createtext')
  }

  function createCode() {
    navigate('createcode')
  }

  return (
    <>
      <div className="app">
        <header>
          <h1>TextEditor</h1>
          {token && (
            <div className="user-info">
              <span>{user?.email}</span>
              <button className="create-doc-button" onClick={createDocument}>
                Skapa Text
              </button>
              <button className="create-code-button" onClick={createCode}>
                Skapa Kod
              </button>
              <button className="logout-button" onClick={handleLogout}>
                Logga ut
              </button>
            </div>
          )}
        </header>
      </div>
      <div className="submenu">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/createtext"
            element={
              <ProtectedRoute>
                <CreateDocument />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createcode"
            element={
              <ProtectedRoute>
                <CreateCode />
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <ProtectedRoute>
                <DocumentList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DocumentList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents/:id"
            element={
              <ProtectedRoute>
                <SingleDocument />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <section id="spacer"></section>
    </>
  )
}

export default App
