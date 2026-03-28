export default function Competitions() {
  return (
    <>
      <img src="/assets/competition.svg" alt="" />
      <div id="competition">
        <div className="competition-page">
          <h2>competitions</h2>

          <div className="set">
            <div className="one">
              <h2>Hackathon - HackZion V.1 at AMC Engineering College, Bengaluru</h2>
              <a className="lightbox" href="/assets/competition/competition-one.jpg"><img src="/assets/competition/competition-one.jpg" alt="HackZion" /></a>
              <a className="lightbox" href="/assets/competition/competition-two.jpg"><img src="/assets/competition/competition-two.jpg" alt="HackZion Team" /></a>
            </div>

            <div className="two">
              <h2>Quantahon 2.0 X IBM Qiskit online , organized by SRM University!</h2>
              <a className="lightbox" href="/assets/competition/competition-three.jpg"><img src="/assets/competition/competition-three.jpg" alt="Quantathon" /></a>
              <a className="lightbox" href="/assets/competition/competition-four.jpg"><img src="/assets/competition/competition-four.jpg" alt="Quantathon Highlights" /></a>
            </div>

            <div className="three">
              <h2>36-hour Hackathon at Karur Kumarasamy College of Engineering</h2>
              <a className="lightbox" href="/assets/competition/competition-five.jpeg"><img src="/assets/competition/competition-five.jpeg" alt="Karur Hackathon" /></a>
              <a className="lightbox" href="/assets/competition/competition-six.jpg"><img src="/assets/competition/competition-six.jpg" alt="Karur Hackathon Team" /></a>
            </div>

            <div className="four">
              <h2>Quantahon 2.0 X IBM Qiskit offline in ( SRM chennai ) , organized by SRM University!</h2>
              <a className="lightbox" href="/assets/competition/competition-seven.jpeg"><img src="/assets/competition/competition-seven.jpeg" alt="SRM Offline" /></a>
              <a className="lightbox" href="/assets/competition/competition-eight.jpeg"><img src="/assets/competition/competition-eight.jpeg" alt="SRM Event" /></a>
            </div>

            <div className="five">
              <h2>Major AI Research Challenge! - OpenAI to Z Challenge, a Global hackathon</h2>
              <a className="lightbox" href="/assets/competition/competition-ten.jpeg"><img src="/assets/competition/competition-ten.jpeg" alt="OpenAI to Z" /></a>
              <a className="lightbox" href="/assets/competition/amazon.jpeg"><img src="/assets/competition/amazon.jpeg" alt="Amazon Archaeology Project" /></a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
