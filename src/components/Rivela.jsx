import { useEffect, useRef, useState } from 'react'

/** Comparsa progressiva alla prima entrata in viewport (no-op senza JS o con reduced-motion). */
export default function Rivela({ as: Tag = 'div', delay = 0, className = '', children, ...resto }) {
    const ref = useRef(null)
    const [visibile, setVisibile] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el || typeof IntersectionObserver === 'undefined') {
            setVisibile(true)
            return
        }
        const obs = new IntersectionObserver(
            entries => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        setVisibile(true)
                        obs.disconnect()
                    }
                }
            },
            { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    return (
        <Tag
            ref={ref}
            className={`rivela ${visibile ? 'visibile' : ''} ${className}`}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
            {...resto}
        >
            {children}
        </Tag>
    )
}
