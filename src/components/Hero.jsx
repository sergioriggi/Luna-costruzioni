import React from 'react'
import { HERO } from '../assets/images'

export default function Hero() {
    return (
        <section id="home" className="relative">
            <div className="h-[68vh] md:h-[72vh] bg-cover bg-center" style={{ backgroundImage: `url(${HERO})` }}>
                <div className="backdrop-brightness-75 h-full flex items-center">
                    <div className="max-w-6xl mx-auto px-6 text-white">
                        <h1 className="text-4xl md:text-6xl font-semibold">Stile e Design Unico in Sicilia</h1>
                        <p className="mt-4 max-w-2xl text-lg">L'eleganza intangibile su misura che non passa inosservata. Le Piscine Rocks Design si adattano perfettamente all'ambiente circostante. Rispetto alle classiche piscine, non esiste un catalogo: l'opera viene realizzata da Luna Costruzioni in base alla morfologia del tuo giardino, come un vestito su misura.</p>
                        <div className="mt-6">
                            <a href="#contatti" className="inline-block bg-[#0ea5a4] hover:bg-[#0c948f] text-white px-5 py-3 rounded">Richiedi un Progetto Sartoriale</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
