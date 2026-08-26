import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Philosophy from './components/Philosophy'
import Details from './components/Details'
import Gallery from './components/Gallery'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <div id="root" className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/filosofia" element={<div className="py-12 px-6"><Philosophy /></div>} />
            <Route path="/dettagli" element={<div className="py-12 px-6 bg-gray-50"><Details /></div>} />
            <Route path="/galleria" element={<div className="py-12 px-6"><Gallery /></div>} />
            <Route path="/contatti" element={<Footer />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
