import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import AzioniRapide from './components/AzioniRapide'
import BannerCookie from './components/BannerCookie'
import Home from './pages/Home'
import Tecnologia from './pages/Tecnologia'
import Modelli from './pages/Modelli'
import Modello from './pages/Modello'
import Azienda from './pages/Azienda'
import Sabbie from './pages/Sabbie'
import Giardini from './pages/Giardini'
import HotelResort from './pages/HotelResort'
import QuantoCosta from './pages/QuantoCosta'
import GalleriaPagina from './pages/GalleriaPagina'
import Showroom from './pages/Showroom'
import ComeLavoriamo from './pages/ComeLavoriamo'
import Faq from './pages/Faq'
import Contatti from './pages/Contatti'
import Zona from './pages/Zona'
import Privacy from './pages/Privacy'
import Cookie from './pages/Cookie'
import NonTrovata from './pages/NonTrovata'
import { FornitoreLingua } from './i18n/lingua'

/** Riporta in cima a ogni cambio di rotta, rispettando le ancore interne. */
function InizioPagina() {
    const { pathname, hash } = useLocation()
    useEffect(() => {
        if (hash) return
        window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
    }, [pathname, hash])
    return null
}

export default function App() {
    return (
        <FornitoreLingua>
        <div className="flex min-h-screen flex-col">
            <a
                href="#contenuto"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-superficie focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-testo focus:shadow-lg"
            >
                Vai al contenuto
            </a>
            <InizioPagina />
            <Header />
            <main id="contenuto" className="flex-1 pb-16 sm:pb-0">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/piscine-rocks-design" element={<Tecnologia />} />
                    <Route path="/azienda" element={<Azienda />} />
                    <Route path="/modelli" element={<Modelli />} />
                    <Route path="/modelli/:modello" element={<Modello />} />
                    <Route path="/sabbie" element={<Sabbie />} />
                    <Route path="/giardini-e-opere-in-pietra" element={<Giardini />} />
                    <Route path="/hotel-e-resort" element={<HotelResort />} />
                    <Route path="/quanto-costa" element={<QuantoCosta />} />
                    <Route path="/galleria" element={<GalleriaPagina />} />
                    <Route path="/showroom" element={<Showroom />} />
                    <Route path="/come-lavoriamo" element={<ComeLavoriamo />} />
                    <Route path="/domande-frequenti" element={<Faq />} />
                    <Route path="/contatti" element={<Contatti />} />
                    <Route path="/piscine-rocks-design/:provincia" element={<Zona />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/cookie-policy" element={<Cookie />} />
                    <Route path="*" element={<NonTrovata />} />
                </Routes>
            </main>
            <Footer />
            <AzioniRapide />
            <BannerCookie />
        </div>
        </FornitoreLingua>
    )
}
