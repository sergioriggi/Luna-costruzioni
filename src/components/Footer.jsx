import React, { useState } from 'react'

export default function Footer() {
    const [form, setForm] = useState({ nome: '', email: '', telefono: '', citta: '', messaggio: '' })
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Lead form submitted', form)
        alert('Grazie! Ricevuto il messaggio.')
        setForm({ nome: '', email: '', telefono: '', citta: '', messaggio: '' })
    }

    return (
        <footer id="contatti" className="border-t bg-white mt-8">
            <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-4">Contattaci</h3>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" required className="w-full p-3 border rounded" />
                        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required className="w-full p-3 border rounded" />
                        <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Telefono" required className="w-full p-3 border rounded" />
                        <input name="citta" value={form.citta} onChange={handleChange} placeholder="Città in Sicilia" required className="w-full p-3 border rounded" />
                        <textarea name="messaggio" value={form.messaggio} onChange={handleChange} placeholder="Messaggio" rows="4" className="w-full p-3 border rounded"></textarea>
                        <div>
                            <button type="submit" className="bg-[#0ea5a4] text-white px-4 py-2 rounded">Invia</button>
                        </div>
                    </form>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-4">Dati aziendali</h3>
                    <p className="mb-2">Luna Costruzioni srl, Concessionario autorizzato Sicilia</p>
                    <p className="mb-2">Referente Luciano Naro</p>
                    <p className="mb-2">Tel: 3404900710</p>
                    <p className="mt-6 text-sm text-gray-600">Luna Costruzioni srl - Concessionario Autorizzato Piscine Rocks Design. Tutti i diritti riservati.</p>
                </div>
            </div>
        </footer>
    )
}
