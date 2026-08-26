import React from 'react'
import Hero from '../components/Hero'
import Philosophy from '../components/Philosophy'
import Details from '../components/Details'
import Gallery from '../components/Gallery'

export default function Home() {
    return (
        <main>
            <Hero />
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
