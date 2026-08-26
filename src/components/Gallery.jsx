import React from 'react'
import { GALLERY } from '../assets/images'

export default function Gallery() {
    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Galleria</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {GALLERY.map((src, i) => (
                    <div key={i} className="rounded overflow-hidden bg-gray-100">
                        <img src={src} alt={`Piscina ${i + 1}`} className="w-full h-56 object-cover" />
                    </div>
                ))}
            </div>
        </div>
    )
}
