import React from 'react'

export function ImageThumbs({ images }) {
    if (!images?.length) return null
    return (
        <div className="thumbs">
            {images.slice(0, 3).map((img, i) => (
                <img key={i} src={img.url} alt={img.alt || `ref-${i + 1}`} className="thumb" loading="lazy" />
            ))}
        </div>
    )
}