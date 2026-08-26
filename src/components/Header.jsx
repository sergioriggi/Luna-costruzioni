import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className="w-full border-b bg-white">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="text-left">
                    <a href="https://piscinerocksdesign.com" target="_blank" rel="noreferrer" className="text-sm font-semibold text-gray-700">Luna Costruzioni srl - Concessionario Autorizzato Sicilia</a>
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
