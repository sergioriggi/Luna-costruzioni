import React, { useState } from 'react'

export default function Footer() {
    const [form, setForm] = useState({ nome: '', email: '', telefono: '', citta: '', messaggio: '', gdpr: false })
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState('')

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
    }

    const validate = () => {
        const err = {}
        if(!form.nome) err.nome = 'Inserisci il nome'
        if(!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) err.email = 'Inserisci una email valida'
        if(!form.telefono) err.telefono = 'Inserisci il telefono'
        if(!form.citta) err.citta = 'Inserisci la città'
        if(!form.gdpr) err.gdpr = 'Devi acconsentire al trattamento dati'
        return err
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const err = validate()
        setErrors(err)
        if(Object.keys(err).length) return
        setStatus('sending')
        try{
            // TODO: replace with real endpoint or integration
            console.log('Lead form submitted (simulate):', form)
            setStatus('sent')
            setForm({ nome: '', email: '', telefono: '', citta: '', messaggio: '', gdpr: false })
        }catch(err){
            setStatus('error')
        }
    }

    return (
        <footer id="contatti" className="border-t bg-white mt-8">
            <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-4">Contattaci</h3>
                    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                        <div>
                            <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" required className="w-full p-3 border rounded" />
                            {errors.nome && <p className="text-red-600 text-sm mt-1">{errors.nome}</p>}
                        </div>
                        <div>
                            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required className="w-full p-3 border rounded" />
                            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Telefono" required className="w-full p-3 border rounded" />
                            {errors.telefono && <p className="text-red-600 text-sm mt-1">{errors.telefono}</p>}
                        </div>
                        <div>
                            <input name="citta" value={form.citta} onChange={handleChange} placeholder="Città in Sicilia" required className="w-full p-3 border rounded" />
                            {errors.citta && <p className="text-red-600 text-sm mt-1">{errors.citta}</p>}
                        </div>
                        <div>
                            <textarea name="messaggio" value={form.messaggio} onChange={handleChange} placeholder="Messaggio" rows="4" className="w-full p-3 border rounded"></textarea>
                        </div>
                        <div className="flex items-start gap-2">
                            <input id="gdpr" name="gdpr" type="checkbox" checked={form.gdpr} onChange={handleChange} />
                            <label htmlFor="gdpr" className="text-sm">Acconsento al trattamento dei dati personali ai fini del contatto (GDPR)</label>
                        </div>
                        {errors.gdpr && <p className="text-red-600 text-sm">{errors.gdpr}</p>}
                        <div>
                            <button type="submit" className="bg-[#0ea5a4] text-white px-4 py-2 rounded">{status === 'sending' ? 'Invio...' : 'Invia'}</button>
                            {status === 'sent' && <span className="ml-3 text-green-600">Messaggio inviato. Ti risponderemo al più presto.</span>}
                            {status === 'error' && <span className="ml-3 text-red-600">Si è verificato un errore, riprova più tardi.</span>}
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
