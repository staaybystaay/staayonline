import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('syo-theme') || 'light'
  )

  const toggleTheme = () =>
    setTheme(t => {
      const next = t === 'light' ? 'dark' : 'light'
      localStorage.setItem('syo-theme', next)
      return next
    })

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)