import React from 'react'
import Hero from '../components/Hero'
import Philosophy from '../components/Philosophy'
import Details from '../components/Details'
import Gallery from '../components/Gallery'
import { GALLERY } from '../assets/images'

export default function Home() {
    return (
        <main>
            <Hero />
            <section id="esposizione" className="py-10 px-6 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-2xl font-semibold mb-4">La nostra piscina espositiva</h2>
                    <p className="mb-6">Vieni a trovarci presso la nostra sede</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <img src="/optimized/Immagine_WhatsApp_2025-07-25_ore_09.49.04_3aa4d41e.jpg" alt="Piscina espositiva 1 - Piscine Rocks Design" className="w-full h-56 object-cover rounded" />
                        <img src="/optimized/Immagine_WhatsApp_2025-11-15_ore_08.37.12_0235cc71.jpg" alt="Piscina espositiva 2 - Piscine Rocks Design" className="w-full h-56 object-cover rounded" />
                        <img src="/optimized/0005.jpg" alt="Piscina espositiva 3 - Piscine Rocks Design" className="w-full h-56 object-cover rounded" />
                    </div>
                </div>
            </section>
            <section id="la-filosofia" className="py-12 px-6">
                <Philosophy />
            </section>
            <section id="i-dettagli-naturali" className="py-12 px-6 bg-gray-50">
                <Details />
            </section>
            <section id="galleria" className="py-12 px-6">
                <Gallery />
            </section>
        </main>
    )
}
