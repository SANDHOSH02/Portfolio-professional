import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import '../styles/other-side.css'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const PASS = 'ant02'
const STATUS_BADGE_MAP = {
  'Present': 'badge-present',
  'Leave': 'badge-leave',
  'Half Day': 'badge-halfday',
  'WFH': 'badge-wfh',
  'Government Holiday': 'badge-holiday'
}

function pad(n) { return String(n).padStart(2, '0') }
function dateKeyFromParts(y, m, d) { return `${y}-${pad(m + 1)}-${pad(d)}` }

function getReports() {
  try { const raw = localStorage.getItem('dailyReports'); return raw ? JSON.parse(raw) : {} } catch { return {} }
}
function saveReportsToStorage(data) { localStorage.setItem('dailyReports', JSON.stringify(data)) }

function getShortReports() {
  try { const raw = localStorage.getItem('shortReports'); return raw ? JSON.parse(raw) : {} } catch { return {} }
}
function saveShortReportsToStorage(data) { localStorage.setItem('shortReports', JSON.stringify(data)) }

// Stars component
function Stars() {
  const starsRef = useRef(null)
  useEffect(() => {
    const container = starsRef.current
    if (!container) return
    for (let i = 0; i < 200; i++) {
      const star = document.createElement('div')
      star.className = 'star'
      star.style.left = Math.random() * 100 + '%'
      star.style.top = Math.random() * 100 + '%'
      star.style.animationDelay = Math.random() * 3 + 's'
      container.appendChild(star)
    }
  }, [])
  return <div className="stars" ref={starsRef}></div>
}

// Calendar component used by both modals
function Calendar({ year, month, reports, onDayClick, selectedDateKey }) {
  const firstDayIdx = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const blanks = Array.from({ length: firstDayIdx })
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <div className="calendar-grid">
      {DAYS.map(d => <div key={d} className="day-name">{d}</div>)}
      {blanks.map((_, i) => <div key={`blank-${i}`} className="calendar-cell"></div>)}
      {days.map(day => {
        const key = dateKeyFromParts(year, month, day)
        const entry = reports[key]
        const isSelected = key === selectedDateKey
        return (
          <div key={day} className={`calendar-cell${entry ? ' has-entry' : ''}${isSelected ? ' selected' : ''}`}>
            <button type="button" data-key={key} onClick={() => onDayClick(year, month, day)}>
              {day}
              {entry?.status && (
                <div className={`status-badge ${STATUS_BADGE_MAP[entry.status] || 'badge-present'}`}>
                  {entry.status}
                </div>
              )}
              {entry?.notes && (
                <div style={{ fontSize: '8px', padding: '1px 3px', background: 'rgba(255,255,255,0.2)', color: 'var(--text-white)', borderRadius: '2px', marginTop: '1px', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {entry.notes}
                </div>
              )}
            </button>
          </div>
        )
      })}
    </div>
  )
}

// Month/Year selector
function MonthYearSelector({ month, year, onMonthChange, onYearChange }) {
  const rangeStart = year - 5
  const rangeEnd = year + 5
  const years = Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => rangeStart + i)

  return (
    <div className="modal-controls">
      <label>Month
        <select value={month} onChange={e => onMonthChange(parseInt(e.target.value, 10))}>
          {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}
        </select>
      </label>
      <label>Year
        <select value={year} onChange={e => onYearChange(parseInt(e.target.value, 10))}>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </label>
    </div>
  )
}

// Daily Report Modal
function ReportModal({ isOpen, onClose }) {
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())
  const [selectedKey, setSelectedKey] = useState(null)
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [reports, setReports] = useState(getReports)

  const selectDate = (y, m, d) => {
    const key = dateKeyFromParts(y, m, d)
    setSelectedKey(key)
    const entry = reports[key]
    setText(entry?.text || '')
    setTitle(entry?.title || '')
  }

  const handleSave = () => {
    if (!selectedKey) return alert('Select a date first')
    const updated = { ...reports, [selectedKey]: { text: text.trim(), title: title.trim(), updatedAt: new Date().toISOString() } }
    setReports(updated)
    saveReportsToStorage(updated)
    alert('Report saved')
  }

  const handleExportPdf = useCallback(async () => {
    if (!selectedKey) return alert('Select a date first')
    const { jsPDF } = await import('jspdf')
    const entry = reports[selectedKey]
    const doc = new jsPDF()
    const heading = (entry?.title?.length) ? entry.title : 'Daily Report'
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()

    doc.setDrawColor(0, 0, 0); doc.setLineWidth(0.5)
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10)

    const boxX = 14, boxY = 14, boxWidth = pageWidth - 28, boxHeight = 24
    doc.setDrawColor(0, 51, 102); doc.setLineWidth(0.8)
    doc.rect(boxX, boxY, boxWidth, boxHeight)
    doc.rect(boxX + 2, boxY + 2, boxWidth - 4, boxHeight - 4)
    doc.setTextColor(0, 51, 102); doc.setFont('helvetica', 'bold'); doc.setFontSize(18)
    const tw = doc.getTextWidth(heading)
    doc.text(heading, pageWidth / 2 - tw / 2, boxY + 15)
    doc.setTextColor(0, 0, 0); doc.setFont('helvetica', 'normal'); doc.setFontSize(12)
    doc.text(`Date: ${selectedKey}`, 14, 46)
    const lines = doc.splitTextToSize(entry?.text || '(No entry)', 180)
    doc.text(lines, 14, 56)
    doc.save(`${selectedKey}_${heading.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`)
  }, [selectedKey, reports])

  const handleExportAllPdf = useCallback(async () => {
    const keys = Object.keys(reports).sort()
    if (keys.length === 0) return alert('No saved reports')
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF()
    keys.forEach((k, idx) => {
      if (idx > 0) doc.addPage()
      const entry = reports[k]
      const heading = (entry?.title?.length) ? entry.title : 'Daily Report'
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      doc.setDrawColor(0, 0, 0); doc.setLineWidth(0.5)
      doc.rect(5, 5, pageWidth - 10, pageHeight - 10)
      const boxX = 14, boxY = 14, boxWidth = pageWidth - 28, boxHeight = 24
      doc.setDrawColor(0, 51, 102); doc.setLineWidth(0.8)
      doc.rect(boxX, boxY, boxWidth, boxHeight)
      doc.rect(boxX + 2, boxY + 2, boxWidth - 4, boxHeight - 4)
      doc.setTextColor(0, 51, 102); doc.setFont('helvetica', 'bold'); doc.setFontSize(18)
      const tw = doc.getTextWidth(heading)
      doc.text(heading, pageWidth / 2 - tw / 2, boxY + 15)
      doc.setTextColor(0, 0, 0); doc.setFont('helvetica', 'normal'); doc.setFontSize(12)
      doc.text(`Date: ${k}`, 14, 46)
      const lines = doc.splitTextToSize(entry?.text || '(No entry)', 180)
      doc.text(lines, 14, 56)
    })
    doc.save(`Reports_${keys[0]}_to_${keys[keys.length - 1]}.pdf`)
  }, [reports])

  if (!isOpen) return null

  return (
    <div className="modal show" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Daily Report</h2>
          <button className="close-modal" aria-label="Close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <MonthYearSelector month={month} year={year} onMonthChange={setMonth} onYearChange={setYear} />
          <Calendar year={year} month={month} reports={reports} onDayClick={selectDate} selectedDateKey={selectedKey} />
          {selectedKey && (
            <div className="report-form" style={{ display: 'block' }}>
              <h3>Report for {selectedKey}</h3>
              <label htmlFor="reportTitle" style={{ color: 'var(--line-color)' }}>PDF Heading</label>
              <input id="reportTitle" type="text" placeholder="e.g., Promon Software solutions" value={title} onChange={e => setTitle(e.target.value)} />
              <label htmlFor="reportText" style={{ color: 'var(--line-color)' }}>Today's Tasks</label>
              <textarea id="reportText" rows="8" placeholder="Write what you did today..." value={text} onChange={e => setText(e.target.value)}></textarea>
              <div className="form-actions">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleExportPdf}>Export PDF</button>
                <button className="secondary" onClick={handleExportAllPdf}>Export All Days PDF</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Short Report Modal
function ShortReportModal({ isOpen, onClose }) {
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())
  const [selectedKey, setSelectedKey] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [notes, setNotes] = useState('')
  const [reports, setReports] = useState(getShortReports)

  const selectDate = (y, m, d) => {
    const key = dateKeyFromParts(y, m, d)
    setSelectedKey(key)
    const entry = reports[key]
    setSelectedStatus(entry?.status || null)
    setNotes(entry?.notes || '')
  }

  const handleSave = () => {
    if (!selectedKey) return alert('Select a date first')
    if (!selectedStatus) return alert('Select a status first')
    const updated = { ...reports, [selectedKey]: { status: selectedStatus, notes: notes.trim(), updatedAt: new Date().toISOString() } }
    setReports(updated)
    saveShortReportsToStorage(updated)
    alert('Status saved')
  }

  const handleClear = () => {
    if (!selectedKey) return alert('Select a date first')
    const updated = { ...reports }
    delete updated[selectedKey]
    setReports(updated)
    saveShortReportsToStorage(updated)
    setSelectedStatus(null)
    setNotes('')
    alert('Status cleared')
  }

  const handleExportPdf = useCallback(async () => {
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF()
    const monthName = MONTHS[month]
    const heading = `Attendance Report - ${monthName} ${year}`

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    doc.setDrawColor(0, 0, 0); doc.setLineWidth(0.5)
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10)

    const boxX = 14, boxY = 14, boxWidth = pageWidth - 28, boxHeight = 24
    doc.setDrawColor(0, 51, 102); doc.setLineWidth(0.8)
    doc.rect(boxX, boxY, boxWidth, boxHeight)
    doc.rect(boxX + 2, boxY + 2, boxWidth - 4, boxHeight - 4)
    doc.setTextColor(0, 51, 102); doc.setFont('helvetica', 'bold'); doc.setFontSize(18)
    const tw = doc.getTextWidth(heading)
    doc.text(heading, pageWidth / 2 - tw / 2, boxY + 15)

    doc.setTextColor(0, 0, 0); doc.setFont('helvetica', 'normal'); doc.setFontSize(10)
    const startY = 50, cellSize = 25, gridX = 14
    DAYS.forEach((d, i) => { doc.setFont('helvetica', 'bold'); doc.text(d, gridX + i * cellSize + 3, startY) })

    const firstDayIdx = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    let row = 0, col = firstDayIdx
    doc.setFont('helvetica', 'normal')
    for (let day = 1; day <= daysInMonth; day++) {
      const key = dateKeyFromParts(year, month, day)
      const x = gridX + col * cellSize
      const y = startY + 8 + row * cellSize
      doc.setDrawColor(200, 200, 200)
      doc.rect(x, y - 6, cellSize - 2, cellSize - 2)
      doc.setFontSize(10)
      doc.text(String(day), x + 3, y)
      if (reports[key]) {
        doc.setFontSize(7); doc.text(reports[key].status, x + 3, y + 5)
        if (reports[key].notes) { doc.setFontSize(6); doc.text(reports[key].notes, x + 3, y + 9) }
      }
      col++
      if (col > 6) { col = 0; row++ }
    }

    const summaryY = startY + 8 + (row + 2) * cellSize
    doc.setFont('helvetica', 'bold'); doc.setFontSize(12)
    doc.text('Summary:', 14, summaryY)
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10)
    const statusCounts = {}
    Object.values(reports).forEach(r => { if (r.status) statusCounts[r.status] = (statusCounts[r.status] || 0) + 1 })
    let offset = 0
    for (const [status, count] of Object.entries(statusCounts)) {
      doc.text(`${status}: ${count} days`, 14, summaryY + 8 + offset)
      offset += 6
    }
    doc.save(`Attendance_${monthName}_${year}.pdf`)
  }, [month, year, reports])

  if (!isOpen) return null

  return (
    <div className="modal show" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Short Report (Attendance)</h2>
          <button className="close-short-modal" aria-label="Close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="modal-controls">
            <MonthYearSelector month={month} year={year} onMonthChange={setMonth} onYearChange={setYear} />
            <button onClick={handleExportPdf} style={{ background: 'var(--accent-color)', color: 'var(--text-white)', border: '2px solid var(--accent-color)', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer' }}>Export Calendar PDF</button>
          </div>
          <Calendar year={year} month={month} reports={reports} onDayClick={selectDate} selectedDateKey={selectedKey} />
          {selectedKey && (
            <div className="report-form" style={{ display: 'block' }}>
              <h3>Status for {selectedKey}</h3>
              <label style={{ color: 'var(--line-color)' }}>Select Status</label>
              <div className="status-options">
                {['Present', 'Leave', 'Half Day', 'Work From Home', 'Government Holiday'].map(status => (
                  <button
                    key={status}
                    className={`status-btn ${selectedStatus === status ? 'active' : ''}`}
                    data-status={status}
                    onClick={() => setSelectedStatus(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <label htmlFor="shortNotes" style={{ color: 'var(--line-color)', marginTop: '12px', display: 'block' }}>2 Words / Notes</label>
              <input
                id="shortNotes"
                type="text"
                placeholder="e.g., Good work, Meeting done"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                style={{ width: '100%', background: '#1f2329', color: 'var(--text-white)', border: '1px solid var(--line-color)', borderRadius: '6px', padding: '8px 10px', marginBottom: '12px' }}
              />
              <div className="form-actions" style={{ marginTop: '16px' }}>
                <button onClick={handleSave}>Save</button>
                <button className="secondary" onClick={handleClear}>Clear</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Content section data
const sections = [
  {
    style: {},
    bgStyle: { backgroundImage: "url('/other-side/space.png')" },
    title: '<span>Space</span> & Universe',
    cards: [
      { icon: '', title: 'Cosmic Wonders', desc: "Fascinated by the mysteries of black holes, neutron stars, and the vast expanse of the cosmos. Every documentary about space exploration ignites my sense of wonder about our place in the universe." },
      { icon: '', title: 'Space Exploration', desc: "Following missions from SpaceX, NASA, and ISRO closely. The idea of humanity becoming a multi-planetary species is not just science fiction anymore\u2014it's the future we're building." },
      { icon: '', title: 'Stargazing', desc: "There's something humbling about looking up at the night sky and realizing how small we are. Spotting constellations and planets reminds me that there's always more to discover." },
    ]
  },
  {
    style: { background: 'linear-gradient(135deg, #2d1b00 0%, #1a0f00 100%)' },
    bgStyle: { backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600')" },
    title: '<span>Books</span> & Reading',
    cards: [
      { icon: '', title: 'Sci-Fi & Fantasy', desc: "Lost in worlds created by Asimov, Clarke, and Tolkien. Science fiction teaches us to imagine impossible futures, while fantasy reminds us of the power of storytelling and mythmaking." },
      { icon: '', title: 'Philosophy & Psychology', desc: "Exploring the human mind through works on cognitive science, philosophy, and psychology. Understanding how we think helps me build better solutions and connect with people." },
      { icon: '', title: 'Technology & Innovation', desc: "Staying updated with books on AI, blockchain, and emerging technologies. Reading about innovation fuels my own creative process and keeps me ahead in the tech landscape." },
    ]
  },
  {
    style: { background: 'linear-gradient(135deg, #1a0033 0%, #0d001a 100%)' },
    bgStyle: { backgroundImage: "url('https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600')" },
    title: '<span>Anime</span> & Manga',
    cards: [
      { icon: '', title: 'Epic Storytelling', desc: "From Attack on Titan to Fullmetal Alchemist, anime shows complex narratives, deep character development, and philosophical themes that rival any literary masterpiece." },
      { icon: '', title: 'Art & Animation', desc: "Appreciating the incredible artistry in anime\u2014from Studio Ghibli's breathtaking landscapes to the fluid action sequences in modern battle shounen. Every frame is a work of art." },
      { icon: '', title: 'Life Lessons', desc: "Anime teaches resilience, friendship, and determination. Stories about never giving up and protecting what matters most resonate deeply and inspire me in my own journey." },
    ]
  },
  {
    style: { background: 'linear-gradient(135deg, #001a00 0%, #000d00 100%)' },
    bgStyle: { backgroundImage: "url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1600')" },
    title: '<span>Cricket</span> Passion',
    cards: [
      { icon: '', title: "The Gentleman's Game", desc: "Cricket isn't just a sport\u2014it's a test of patience, strategy, and mental strength. Whether it's Test cricket's slow burn or T20's explosive action, every format has its own charm." },
      { icon: '', title: 'Team India', desc: "Following the Indian cricket team through victories and defeats. The passion, the nail-biting finishes, and the moments of pure brilliance make it more than just a game." },
      { icon: '', title: 'Stats & Strategy', desc: "Analyzing player statistics, match strategies, and team compositions. Cricket analytics combines my love for numbers with the excitement of the sport." },
    ]
  },
]

export default function OtherSidePage() {
  const [isLocked, setIsLocked] = useState(true)
  const [authError, setAuthError] = useState(false)
  const [passwordValue, setPasswordValue] = useState('')
  const [reportOpen, setReportOpen] = useState(false)
  const [shortReportOpen, setShortReportOpen] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    try {
      if (sessionStorage.getItem('os_pass') === PASS) {
        setIsLocked(false)
      }
    } catch {}
  }, [])

  useEffect(() => {
    if (isLocked && inputRef.current) inputRef.current.focus()
  }, [isLocked])

  const tryUnlock = () => {
    if (passwordValue === PASS) {
      try { sessionStorage.setItem('os_pass', PASS) } catch {}
      setIsLocked(false)
      setAuthError(false)
    } else {
      setAuthError(true)
    }
  }

  return (
    <div className={isLocked ? 'locked' : ''} style={{ fontFamily: '"Fira Code", monospace, sans-serif' }}>
      {/* Password gate */}
      <div className="auth-overlay" style={{ display: isLocked ? 'flex' : 'none' }}>
        <div className="auth-box" role="dialog" aria-labelledby="authTitle">
          <h2 id="authTitle">Enter Password</h2>
          <p>Access to this page is protected.</p>
          <input
            ref={inputRef}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={passwordValue}
            onChange={e => setPasswordValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && tryUnlock()}
          />
          <div className="form-actions" style={{ marginTop: '12px' }}>
            <button onClick={tryUnlock}>Unlock</button>
          </div>
          {authError && <div className="auth-error">Incorrect password. Try again.</div>}
        </div>
      </div>

      <Link to="/" className="back-home">&larr; Back to Portfolio</Link>
      <a href="#" className="report-button" onClick={e => { e.preventDefault(); setReportOpen(true) }}>Report</a>
      <a href="#" className="short-report-button" onClick={e => { e.preventDefault(); setShortReportOpen(true) }}>Short Report</a>

      <ReportModal isOpen={reportOpen} onClose={() => setReportOpen(false)} />
      <ShortReportModal isOpen={shortReportOpen} onClose={() => setShortReportOpen(false)} />

      {/* Header */}
      <section className="other-header">
        <Stars />
        <div className="header-content">
          <h1>The <span>Other Side</span> of Me</h1>
          <p>Beyond code and algorithms, there's a universe of passions that drive my curiosity. Here's what fuels my imagination when I'm not building tech solutions.</p>
        </div>
      </section>

      {/* Content sections */}
      {sections.map((section, i) => (
        <section key={i} className="content-section" style={section.style}>
          <div className="section-bg" style={section.bgStyle}></div>
          <div className="section-container">
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: section.title }}></h2>
            <div className="section-content">
              {section.cards.map((card, j) => (
                <div key={j} className="content-card">
                  <span className="card-icon">{card.icon}</span>
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-description">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
