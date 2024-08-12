import { useEffect, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeContext } from './context/ThemeContext'
import ThemeProvider from './context/ThemeProvider'
import CurrencyProvider from './context/CurrencyProvider'
import Index from './pages/Index'

function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Index />}/>
          </Routes>
        </BrowserRouter>
      </CurrencyProvider>
    </ThemeProvider>
  )
}

export default App
