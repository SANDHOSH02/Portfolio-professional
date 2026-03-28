import { useEffect, useRef } from 'react'

const projectItems = [
  { href: 'https://github.com/SANDHOSH02/PyLab_Arena', video: '/assets/pylearn.mp4', label: 'Code clash' },
  { href: 'https://nscet.org/iqarena', video: '/assets/iqarena_vid.mp4', label: 'HackZion project on GitHub' },
  { href: 'https://github.com/SANDHOSH02/Result-Portal', video: '/assets/result.mp4', label: 'Result-Portal project link' },
  { href: 'http://nscet.org/hackathon', video: '/assets/hackathon.mp4', label: 'NSCET-HACKATHON-MANAGEMENT' },
  { href: 'https://github.com/SANDHOSH02/Safety-gear', video: '/assets/Safetygear.mp4', label: 'Safety-gear' },
  { href: 'https://github.com/SANDHOSH02/Retail-monitoring', video: '/assets/retail.mp4', label: 'Retail-monitoring' },
]

export default function Projects() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const videos = container.querySelectorAll('.project-video')

    // Try autoplay all videos
    videos.forEach(v => {
      try {
        v.muted = true
        v.playsInline = true
        v.setAttribute('playsinline', '')
        v.setAttribute('muted', '')
        const p = v.play()
        if (p && typeof p.catch === 'function') p.catch(() => {})
      } catch (e) { /* ignore */ }
    })

    // Continuous playback
    videos.forEach(v => {
      v.addEventListener('ended', () => {
        try { v.currentTime = 0; v.play() } catch (e) {}
      })
      v.addEventListener('pause', () => {
        if (v.muted) setTimeout(() => { try { v.play() } catch (e) {} }, 300)
      })
      v.addEventListener('stalled', () => {
        try { v.load(); v.play() } catch (e) {}
      })
      v.addEventListener('suspend', () => {
        try { v.play() } catch (e) {}
      })
    })

    // Hover/touch interactions
    const items = container.querySelectorAll('.project-item')
    items.forEach(item => {
      const video = item.querySelector('video')
      if (!video) return
      video.muted = true

      item.addEventListener('mouseenter', () => { try { video.play() } catch (e) {} })
      item.addEventListener('mouseleave', () => { try { video.pause(); video.currentTime = 0 } catch (e) {} })

      item.addEventListener('click', (e) => {
        if (video.paused) {
          e.preventDefault()
          try { video.play() } catch (err) {}
          item.classList.add('previewing')
          setTimeout(() => item.classList.remove('previewing'), 1200)
        }
      })
    })
  }, [])

  return (
    <div id="projects" ref={containerRef}>
      <img src="/assets/projects/main.svg" alt="" />
      <div className="project-round projects-grid-round">
        {projectItems.map((proj, i) => (
          <a key={i} className="project-item" href={proj.href} target="_blank" rel="noopener noreferrer" aria-label={proj.label}>
            <video className="project-video" src={proj.video} muted playsInline loop autoPlay preload="auto"></video>
            <div className="project-overlay"><span className="project-title"></span></div>
          </a>
        ))}
      </div>
    </div>
  )
}
