export default function Resume() {
  return (
    <>
      <img src="/assets/resume/resume.svg" alt="" />
      <div id="resume">
        <div className="mainresume">
          <h2 className="resume-title">My Professional Journey</h2>
          <p className="resume-intro">
            This is my professional resume, showcasing my skills and experiences in Artificial Intelligence, Data Science, and Fullstack Development. Click below to download the full PDF version!
          </p>
          <div className="timeline">
            <div className="timeline-item">
              <span className="timeline-dot"></span>
              <p>2023 - Present: Engineering Student at Anna University</p>
            </div>
            <div className="timeline-item">
              <span className="timeline-dot"></span>
              <p>2024: Frontend Enthusiast &amp; AI</p>
            </div>
            <div className="timeline-item">
              <span className="timeline-dot"></span>
              <p>2025: Currently Intern at WG Tech Solutions Pvt. — AI model development</p>
            </div>
            <div className="timeline-item">
              <span className="timeline-dot"></span>
              <p>Ongoing: Personal Projects in Web Development and AI</p>
            </div>
          </div>
          <a href="/assets/resume/Santhosh-resume.pdf" target="_blank" className="resume-link">Download Resume</a>
          <p className="resume-cta">
            Want to collaborate? <a href="mailto:sandhoshtechie02@gmail.com" className="email-link">Email me!</a>
          </p>
        </div>
      </div>
    </>
  )
}
