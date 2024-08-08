import React, { useState } from 'react'
import { MdLightMode, MdDarkMode } from "react-icons/md"
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"

function Header() {
  const [toggleDarkMode, setToggleDarkMode] = useState(false)
  const [toggleCurrency, setToggleCurrency] = useState(false)

  const toggleDarkModeIcon = toggleDarkMode ? <MdDarkMode/> : <MdLightMode/>
  const toggleCurrencyIcon = toggleCurrency ? <IoMdArrowDropdown/> : <IoMdArrowDropup/>

  const btnStyle = 'flex items-center place-content-center h-7 w-12 bg-[#4BCC00] rounded-lg text-white'

  return (
    <header className='flex justify-between px-4 py-2'>
      <h1 className='font-bold text-xl text-[#656565]'>Coin Insight</h1>
      <div className='flex gap-2'>
        <button 
          className={btnStyle}
          onClick={() => setToggleDarkMode(prev => !prev)}
        >
          {toggleDarkModeIcon}
        </button>
        <button 
          className={btnStyle}
          onClick={() => setToggleCurrency(prev => !prev)}
        >
          <p className='text-xs'>USD</p>
          {toggleCurrencyIcon}
        </button>
      </div>
    </header>
  )
}

export default Header