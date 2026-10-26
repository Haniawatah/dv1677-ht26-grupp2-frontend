import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom"
import DocumentList from './DocumentList.jsx'
import './App.css'
import SingleDocument from './SingleDocument.jsx'
/////////// This code gonna be replaced later///////
function App() {
  return (
    <>
    <div className="app">
        <header>
          <h1>TextEditor</h1>
        </header>
      </div>
    <div className='submenu'>
      <Routes>
        <Route path="/" element={<DocumentList />} />
        <Route path="/documents/:id" element={<SingleDocument />} />
      </Routes>
    </div>
      <section id="spacer"></section>
    </>
  )
}

export default App
