import { useState } from "react"
import { ThemeContext } from "./ThemeContext"

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem('theme')) || false)

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider