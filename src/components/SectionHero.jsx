import React from 'react'

export function SectionHero({ title, subtitle, chips }) {
    return (
        <div className="hero">
            <div>
                <div className="hero-title">{title}</div>
                <div className="muted">{subtitle}</div>
            </div>
            <div className="chip-row">
                {chips.map(c => <span key={c} className="chip">{c}</span>)}
            </div>
        </div>
    )
}