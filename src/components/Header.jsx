import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { CurrencyContext } from '../context/CurrencyContext'
import { ThemeContext } from '../context/ThemeContext'
import { MdLightMode, MdDarkMode } from "react-icons/md"
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"

function Header() {
  const [toggleCurrencyMenu, setToggleCurrencyMenu] = useState(false)
  const [currencies, setCurrencies] = useState()

  const { selectedCurrency, setSelectedCurrency } = useContext(CurrencyContext)
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext)

  const toggleDarkModeIcon = isDarkMode ? <MdLightMode/> : <MdDarkMode/>
  const toggleCurrencyMenuIcon = toggleCurrencyMenu ? <IoMdArrowDropdown/> : <IoMdArrowDropup/>

  const textColor = isDarkMode ? 'white' : '[#656565]'

  const prioritizedCurrencies = ['usd', 'eur', 'php']

  const fetchCurrencies = async () => {
    const options = {
      method: 'GET',
      url: 'https://api.coingecko.com/api/v3/simple/supported_vs_currencies',
      headers: {accept: 'application/json', 'x-cg-api-key': import.meta.env.VITE_API_KEY}
    }
    
    try {
      const res = await axios.request(options)
      const allCurrencies = res.data
      const prioritized = prioritizedCurrencies.filter(currency => allCurrencies.includes(currency))
      const others = allCurrencies.filter(currency => !prioritizedCurrencies.includes(currency))
      setCurrencies([...prioritized, ...others])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    // fetchCurrencies()
  }, [])

  useEffect(() => {
    isDarkMode ?  document.body.style.backgroundColor = '#0D1217' : document.body.style.backgroundColor = 'white'
    JSON.stringify(localStorage.setItem('theme', isDarkMode))
  }, [isDarkMode])

  const handleCurrencySelection = (currency) => {
    setSelectedCurrency(currency)
    setToggleCurrencyMenu(false)
  }

  return (
    <header className='flex justify-between px-4 my-2'>
      <h1 className={`font-bold text-xl text-${textColor}`}>Coin Insight</h1>
      <div className='flex gap-2'>
        <button 
          className='flex items-center place-content-center h-7 w-10 bg-[#4BCC00] rounded-lg text-white'
          onClick={() => setIsDarkMode(prev => !prev)}
        >
          {toggleDarkModeIcon}
        </button>
        <button 
          className='flex items-center place-content-center h-7 w-14 bg-[#4BCC00] rounded-lg text-white'
          onClick={() => setToggleCurrencyMenu(prev => !prev)}
        >
          <p className='text-xs'>{selectedCurrency.toUpperCase()}</p>
          {toggleCurrencyMenuIcon}
        </button>
        {toggleCurrencyMenu && (
          <ul className='absolute mt-8 ml-12 h-28 w-14 overflow-y-auto bg-[#4BCC00] rounded-lg text-white text-xs '>
            {currencies.map((currency) => (
              <li
                key={currency}
                className='flex px-3 py-2 cursor-pointer'
                onClick={() => handleCurrencySelection(currency)}
              >
                {currency.toUpperCase()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  )
}

export default Header