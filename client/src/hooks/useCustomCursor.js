import { useEffect } from 'react'

export default function useCustomCursor() {
  useEffect(() => {
    const cursor = document.createElement('div')
    cursor.classList.add('custom-cursor')
    document.body.appendChild(cursor)

    function updateCursor(x, y) {
      cursor.style.left = `${x}px`
      cursor.style.top = `${y}px`

      const glitter = document.createElement('div')
      glitter.classList.add('glitter')
      glitter.style.left = `${x}px`
      glitter.style.top = `${y}px`

      const angle = Math.random() * Math.PI * 2
      const velocity = Math.random() * 6
      glitter.style.transform = `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) rotate(${Math.random() * 360}deg)`

      document.body.appendChild(glitter)
      setTimeout(() => glitter.remove(), 500)
    }

    const handleMouseMove = (e) => updateCursor(e.clientX, e.clientY)

    let isTouching = false
    let lastTouchTime = 0
    let lastTouchY = 0
    let touchStartY = 0
    const throttleDelay = 50

    const handleTouchStart = (e) => {
      const touch = e.touches[0]
      isTouching = true
      touchStartY = touch.clientY
      lastTouchY = touch.clientY
      updateCursor(touch.clientX, touch.clientY)
      cursor.style.opacity = '1'
    }

    const handleTouchMove = (e) => {
      const touch = e.touches[0]
      const currentTime = Date.now()
      const isScrolling = Math.abs(touch.clientY - touchStartY) > 10

      if (isTouching && !isScrolling) {
        if (currentTime - lastTouchTime >= throttleDelay) {
          updateCursor(touch.clientX, touch.clientY)
          lastTouchTime = currentTime
        } else {
          cursor.style.left = `${touch.clientX}px`
          cursor.style.top = `${touch.clientY}px`
        }
      } else {
        cursor.style.left = `${touch.clientX}px`
        cursor.style.top = `${touch.clientY}px`
      }
      lastTouchY = touch.clientY
    }

    const handleTouchEnd = () => {
      isTouching = false
      cursor.style.opacity = '0'
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    // Hover effect for interactive elements
    const addHoverListeners = () => {
      document.querySelectorAll('a, button, .tooltip').forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.style.transform = 'translate(-50%, -50%) scale(1.5)'
        })
        el.addEventListener('mouseleave', () => {
          cursor.style.transform = 'translate(-50%, -50%) scale(1)'
        })
      })
    }

    // Delay to let DOM render
    const timer = setTimeout(addHoverListeners, 500)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      cursor.remove()
    }
  }, [])
}
