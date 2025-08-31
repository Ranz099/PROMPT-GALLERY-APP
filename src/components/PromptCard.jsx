import React from 'react'
import { Button } from './ui/Button/Button.jsx'
import { Tag } from './ui/Tag/Tag.jsx'
import { ImageThumbs } from './ImageThumbs.jsx'
import { copyToClipboard } from '../utils/clipboard.js'

export function PromptCard({ p }) {
    return (
        <div className="card">
            <div className="card-header">
                <div className="title-row">
                    <div className="title">{p.name}</div>
                    <div className="tag-row">
                        {(p.tags || []).slice(0, 3).map(t => <Tag key={t}>{t}</Tag>)}
                        <Tag>{p.model}</Tag>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="muted line-clamp" title={p.fullText}>{p.fullText}</div>
                <ImageThumbs images={p.images} />
                <div className="actions">
                    <Button onClick={() => copyToClipboard(p.fullText)}>⿻ Copy Full Prompt</Button>
                    {p.brandMemory && <Button kind='secondary' onClick={() => copyToClipboard(p.brandMemory)}>⿻ Brand Memory</Button>}
                    {p.brand && <Button kind='ghost' onClick={() => copyToClipboard(p.brand)}>⿻ Brand</Button>}
                    {p.project && <Button kind='ghost' onClick={() => copyToClipboard(p.project)}>⿻ Project</Button>}
                    {p.style && <Button kind='ghost' onClick={() => copyToClipboard(p.style)}>⿻ Style</Button>}
                </div>
            </div>
        </div>
    )
}