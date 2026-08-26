import React from 'react'

const cards = [
    {
        title: 'Le splendide rocce monolitiche creano solide pareti che assicurano stabilità alla struttura.',
    },
    {
        title: 'Realizzate con sabbie naturali, ricreano nel tuo giardino l\'effetto spiaggia tipico delle oasi più esclusive. Godrai dei benefici legati a questo elemento curativo che assorbe e trasmette il calore solare.'
    },
    {
        title: 'Beneficia ogni giorno del suono dell\'acqua in caduta, al quale viene da sempre riconosciuto un potere rilassante e curativo legato alla meditazione e alla spiritualità.'
    }
]

export default function Details() {
    return (
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {cards.map((c, i) => (
                <div key={i} className="bg-white p-6 rounded shadow">
                    <p>{c.title}</p>
                </div>
            ))}
        </div>
    )
}
