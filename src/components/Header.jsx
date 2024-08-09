import React, { useState } from 'react'
import { MdLightMode, MdDarkMode } from "react-icons/md"
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"

function Header() {
  const [toggleDarkMode, setToggleDarkMode] = useState(false)
  const [toggleCurrency, setToggleCurrency] = useState(false)

  const toggleDarkModeIcon = toggleDarkMode ? <MdDarkMode/> : <MdLightMode/>
  const toggleCurrencyIcon = toggleCurrency ? <IoMdArrowDropdown/> : <IoMdArrowDropup/> 

  return (
    <header className='flex justify-between px-4 my-2'>
      <h1 className='font-bold text-xl text-[#656565]'>Coin Insight</h1>
      <div className='flex gap-2'>
        <button 
          className='flex items-center place-content-center h-7 w-10 bg-[#4BCC00] rounded-lg text-white'
          onClick={() => setToggleDarkMode(prev => !prev)}
        >
          {toggleDarkModeIcon}
        </button>
        <button 
          className='flex items-center place-content-center h-7 w-14 bg-[#4BCC00] rounded-lg text-white'
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