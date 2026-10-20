import { Routes, Route } from 'react-router-dom'
import DocumentList from './DocumentList.jsx'
import './App.css'
import SingleDocument from './SingleDocument.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'

function App() {
  return (
    <>
      <div className="app">
        <header>
          <h1>TextEditor</h1>
        </header>
      </div>
      <div className="submenu">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<DocumentList />} />
          <Route path="/documents/:id" element={<SingleDocument />} />
        </Routes>
      </div>
      <section id="spacer"></section>
    </>
  )
}

export default App
