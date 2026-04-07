import { createContext, useContext, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ModeContext = createContext()

export function ModeProvider({ children }) {
  const location = useLocation()
  const navigate = useNavigate()

  const mode = location.pathname.startsWith('/business') ? 'business' : 'personal'

  const toggleMode = useMemo(() => () => {
    if (mode === 'personal') {
      navigate('/business')
    } else {
      navigate('/')
    }
  }, [mode, navigate])

  const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode])

  return (
    <ModeContext.Provider value={value}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  return useContext(ModeContext)
}
