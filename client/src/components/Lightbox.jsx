import { useState, useEffect, useCallback } from 'react'

export default function Lightbox() {
  const [isActive, setIsActive] = useState(false)
  const [imageSrc, setImageSrc] = useState('')
  const [imageAlt, setImageAlt] = useState('')

  const open = useCallback((href, alt) => {
    setImageSrc(href)
    setImageAlt(alt || '')
    setIsActive(true)
  }, [])

  const close = useCallback(() => {
    setIsActive(false)
    setImageSrc('')
    setImageAlt('')
  }, [])

  useEffect(() => {
    // Attach click handlers to all .lightbox links
    const links = document.querySelectorAll('a.lightbox')
    const handlers = []

    links.forEach(a => {
      const handler = (e) => {
        e.preventDefault()
        open(a.href, a.querySelector('img')?.alt)
      }
      a.addEventListener('click', handler)
      handlers.push({ el: a, handler })
    })

    return () => {
      handlers.forEach(({ el, handler }) => el.removeEventListener('click', handler))
    }
  }, [open])

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [close])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) close()
  }

  return (
    <div
      className={`lightbox-overlay ${isActive ? 'active' : ''}`}
      id="lightboxOverlay"
      aria-hidden={!isActive}
      onClick={handleOverlayClick}
    >
      <div className="lightbox-content" role="dialog" aria-modal="true">
        <button className="lightbox-close" aria-label="Close image" onClick={close}>
          &times;
        </button>
        <img id="lightboxImage" src={imageSrc} alt={imageAlt} />
      </div>
    </div>
  )
}
