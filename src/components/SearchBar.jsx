import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { FaSearch } from "react-icons/fa"

function SearchBar() {
  const { isDarkMode } = useContext(ThemeContext)

  const bgStyling = isDarkMode ? 'bg-[#1B232D]' : 'bg-[#EFF2F5]'
  const textStyling = isDarkMode && 'text-white'

  return (
    <div className={`flex items-center gap-2 h-8 w-full px-2 rounded-lg ${bgStyling}`}>
      <FaSearch className={`h-3 w-3 ${textStyling}`}/>
      <input
        className={`w-full bg-inherit outline-none text-xs ${textStyling}`}
        type='text'
        placeholder='Search'
      />
    </div>  
  )
}

export default SearchBar