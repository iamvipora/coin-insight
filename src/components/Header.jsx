import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CurrencyContext } from '../context/CurrencyContext'
import { ThemeContext } from '../context/ThemeContext'
import { MdLightMode, MdDarkMode } from "react-icons/md"
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"

function Header() {
  const [toggleCurrencyMenu, setToggleCurrencyMenu] = useState(false)
  const [currencies, setCurrencies] = useState(['USD', 'PHP'])

  const { selectedCurrency, setSelectedCurrency } = useContext(CurrencyContext)
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext)

  const toggleDarkModeIcon = isDarkMode ? <MdLightMode/> : <MdDarkMode/>
  const toggleCurrencyMenuIcon = toggleCurrencyMenu ? <IoMdArrowDropdown/> : <IoMdArrowDropup/>

  const textColor = isDarkMode ? 'text-white' : 'text-[#656565]'

  useEffect(() => {
    isDarkMode ?  document.body.style.backgroundColor = '#0D1217' : document.body.style.backgroundColor = 'white'
    JSON.stringify(localStorage.setItem('theme', isDarkMode))
  }, [isDarkMode])

  const handleCurrencySelection = (currency) => {
    localStorage.setItem('selectedCurrency', currency)
    setSelectedCurrency(currency)
    setToggleCurrencyMenu(false)
  }

  return (
    <header className='flex justify-between px-4 my-2'>
      <Link to='/'>
        <h1 className={`font-bold text-xl ${textColor}`}>Coin Insight</h1>
      </Link>
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
          <span className='text-xs'>{selectedCurrency}</span>
          {toggleCurrencyMenuIcon}
        </button>
        {toggleCurrencyMenu && (
          <ul className='absolute mt-8 ml-12 w-14 overflow-y-auto bg-[#4BCC00] rounded-lg text-white text-xs '>
            {currencies.map((currency) => (
              <li
                key={currency}
                className='flex px-3 py-2 cursor-pointer'
                onClick={() => handleCurrencySelection(currency)}
              >
                {currency}
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  )
}

export default Header