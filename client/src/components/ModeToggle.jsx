import { useMode } from '../context/ModeContext'

export default function ModeToggle() {
  const { mode, toggleMode } = useMode()

  return (
    <div className="mode-toggle-wrapper">
      <button
        className="mode-toggle"
        onClick={toggleMode}
        aria-label={`Switch to ${mode === 'personal' ? 'business' : 'personal'} mode`}
      >
        <span className={`mode-label ${mode === 'personal' ? 'active' : ''}`}>Personal</span>
        <span className="mode-toggle-track">
          <span className={`mode-toggle-thumb ${mode === 'business' ? 'business' : ''}`} />
        </span>
        <span className={`mode-label ${mode === 'business' ? 'active' : ''}`}>Business</span>
      </button>
    </div>
  )
}
