import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

function MarketStatistics() {
  const { isDarkMode } = useContext(ThemeContext)
  return (
    <div className={`flex items-center gap-4 p-2 h-24 w-full rounded-lg bg-[${isDarkMode ? '#212D3B' : '#EFF2F5'}] ${isDarkMode && 'text-white'}`}>
      <div className='flex flex-col items-center place-content-center h-full'>
        <h2 className='text-lg font-bold'>$2,069,506,473,668 </h2>
        <span className='text-sm'>Market Cap</span>
      </div>
      <div className='flex items-center place-content-center h-full w-full'>
        Chart here
      </div>
    </div>
  )
}

export default MarketStatistics

// 