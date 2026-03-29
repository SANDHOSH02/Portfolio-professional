export default function AboutMe() {
  return (
    <>
      <img src="/assets/aboutme/about.svg" alt="" />
      <div id="about-me">
        <img className="git-back" src="/assets/aboutme/github-back.png" alt="" />

        <div className="about-box">
          <p className="about-p">Hello, i'm Sandhosh !</p>
          <p className="about-p1">
            I am an engineering student specializing in <span> Artificial Intelligence and Data Science</span>, with a strong focus on AI development and Fullstack . Passionate about modern technology, I constantly work towards masteringand integrating the latest advancements in tech. My interests span various modern technologies, driving my commitment to innovative solutions and continuous learning
          </p>
          <a className="readme" href="#resume"><img src="/assets/aboutme/readmore.svg" alt="" /></a>
        </div>
      </div>
    </>
  )
}
