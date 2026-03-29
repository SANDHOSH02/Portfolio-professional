import ChatWidget from '../components/ChatWidget'
import Nav from '../components/Nav'
import SocialLine from '../components/SocialLine'
import Logo from '../components/Logo'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import AboutMe from '../components/AboutMe'
import Experience from '../components/Experience'
import Competitions from '../components/Competitions'
import Resume from '../components/Resume'
import Lightbox from '../components/Lightbox'
import useCustomCursor from '../hooks/useCustomCursor'

export default function HomePage() {
  useCustomCursor()

  return (
    <>
      <ChatWidget />
      <Nav />
      <SocialLine />
      <Logo />
      <Hero />

      <div className="quote">
        <img className="quote-box" src="/assets/quote.svg" alt="" />
      </div>

      <img className="box3" src="/assets/box3.svg" alt="" />

      <Projects />
      <Skills />
      <AboutMe />
      <Experience />
      <Competitions />
      <Resume />
      <Lightbox />
    </>
  )
}
