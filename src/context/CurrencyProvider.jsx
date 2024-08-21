import { useState } from "react"
import { CurrencyContext } from "./CurrencyContext"

export function CurrencyProvider({ children }) {
  const [selectedCurrency, setSelectedCurrency] = useState(localStorage.getItem('selectedCurrency') || 'USD')

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export default CurrencyProvider