import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ThemeProvider from './context/ThemeProvider'
import CurrencyProvider from './context/CurrencyProvider'
import Index from './pages/Index'
import CoinPage from './pages/CoinPage'

function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Index />}/>
            <Route path='/coins/:id' element={<CoinPage />}/>
          </Routes>
        </BrowserRouter>
      </CurrencyProvider>
    </ThemeProvider>
  )
}

export default App
