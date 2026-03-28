import { useEffect } from 'react'

export default function useFloatingIcons(containerRef) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const tooltips = container.querySelectorAll('.tooltip')
    const iconData = Array.from(tooltips).map(tooltip => ({
      element: tooltip,
      x: Math.random() * (container.offsetWidth - 60),
      y: Math.random() * (container.offsetHeight - 60),
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      isHovered: false
    }))

    // Set initial positions
    iconData.forEach(data => {
      data.element.style.left = `${data.x}px`
      data.element.style.top = `${data.y}px`
    })

    let animationId
    function animate() {
      iconData.forEach(data => {
        if (!data.isHovered) {
          data.x += data.vx
          data.y += data.vy

          if (data.x <= 0 || data.x >= container.offsetWidth - data.element.offsetWidth) {
            data.vx = -data.vx
            data.x = Math.max(0, Math.min(data.x, container.offsetWidth - data.element.offsetWidth))
          }
          if (data.y <= 0 || data.y >= container.offsetHeight - data.element.offsetHeight) {
            data.vy = -data.vy
            data.y = Math.max(0, Math.min(data.y, container.offsetHeight - data.element.offsetHeight))
          }

          data.element.style.left = `${data.x}px`
          data.element.style.top = `${data.y}px`
        }
      })
      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Add hover/touch listeners
    tooltips.forEach(tooltip => {
      const data = iconData.find(d => d.element === tooltip)

      const handleMouseEnter = () => {
        data.isHovered = true
        tooltip.classList.add('active')
      }
      const handleMouseLeave = () => {
        data.isHovered = false
        data.vx = (Math.random() - 0.5) * 2
        data.vy = (Math.random() - 0.5) * 2
        tooltip.classList.remove('active')
      }
      const handleTouchStart = (e) => {
        e.preventDefault()
        data.isHovered = true
        tooltip.classList.add('active')
      }
      const handleTouchEnd = (e) => {
        e.preventDefault()
        data.isHovered = false
        data.vx = (Math.random() - 0.5) * 2
        data.vy = (Math.random() - 0.5) * 2
        tooltip.classList.remove('active')
      }
      const handleTouchMove = (e) => {
        e.preventDefault()
      }

      tooltip.addEventListener('mouseenter', handleMouseEnter)
      tooltip.addEventListener('mouseleave', handleMouseLeave)
      tooltip.addEventListener('touchstart', handleTouchStart)
      tooltip.addEventListener('touchend', handleTouchEnd)
      tooltip.addEventListener('touchmove', handleTouchMove, { passive: false })
    })

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [containerRef])
}
