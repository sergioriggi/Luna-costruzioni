import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className="w-full border-b bg-white">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <a href="https://piscinerocksdesign.com" target="_blank" rel="noreferrer" className="flex items-center gap-3">
                        <img src="/catalogo/0001.jpg" alt="Concessionario Autorizzato Piscine Rocks Design" className="w-20 h-auto object-contain rounded" />
                        <span className="text-sm font-semibold text-gray-700">Luna Costruzioni srl - Concessionario Autorizzato Sicilia</span>
                    </a>
                </div>
                <nav>
                    <ul className="flex gap-6 text-gray-600">
                        <li><Link to="/" className="hover:text-gray-900">Home</Link></li>
                        <li><Link to="/filosofia" className="hover:text-gray-900">La Filosofia</Link></li>
                        <li><Link to="/dettagli" className="hover:text-gray-900">I Dettagli Naturali</Link></li>
                        <li><Link to="/galleria" className="hover:text-gray-900">Galleria</Link></li>
                        <li><Link to="/contatti" className="hover:text-gray-900">Contatti</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
