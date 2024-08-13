import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"

function CoinBox() {
  const { isDarkMode } = useContext(ThemeContext)

  const componentBg = isDarkMode ? 'bg-[#0D1217]' : 'bg-white'
  const componentText = isDarkMode && 'text-white'

  return (
    <div className={`grid grid-cols-10 justify-between py-3 px-4 w-full rounded-lg items-center text-xs bg-${isDarkMode ? '[#0D1217]' : 'white' }`}>
      <span className='h-6 w-6 rounded-full bg-gray-500'></span>
      <span className='col-span-5'>Neiro on Eth</span>
      <span className='col-span-2'>$0.1842</span>
      <span className='col-span-2 flex items-center text-[#00A83E]'><IoMdArrowDropup className='h-5 w-5'/> 45%</span>
    </div>
  )
}

export default CoinBox