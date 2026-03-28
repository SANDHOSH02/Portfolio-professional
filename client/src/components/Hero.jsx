import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Hero() {
  const flipCardRef = useRef(null)

  useEffect(() => {
    const flipCard = flipCardRef.current
    if (!flipCard) return

    const handleClick = () => flipCard.classList.toggle('flipped')
    flipCard.addEventListener('click', handleClick)
    return () => flipCard.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="mian">
      <div className="hero">
        <h2>I'am Sandhosh <span>Ai model developer </span><br />&amp;<span>Full Stack Enthusiast </span></h2>
        <h4>I create AI-powered websites where technology <br />enhances imagination</h4>
      </div>
      <div className="image-hero">
        <div className="flip-card" id="imageFlipCard" ref={flipCardRef}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img className="image" src="/assets/sandhosh .jpeg" alt="" />
            </div>
            <div className="flip-card-back">
              <img className="image" src="/assets/sandhosh .jpeg" alt="" />
              <Link to="/other-side" className="flip-button">Other Side of Me</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="box2">
        <a href="#resume"><img src="/assets/box2.svg" alt="" /></a>
      </div>
    </div>
  )
}
