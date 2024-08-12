import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import CoinBox from './CoinBox'
import { FaFire } from "react-icons/fa6"

function FeaturedCoins() {
  const { isDarkMode } = useContext(ThemeContext)
  
  return (
    <div className={`flex flex-col p-2 w-full rounded-lg bg-[${isDarkMode ? '#212D3B' : '#EFF2F5'}] ${isDarkMode && 'text-white'}`}>
      <h2 className='flex items-center gap-1 text-lg font-bold pb-2'>{<FaFire className='text-red-600'/>} Trending Coins</h2>
      <div className='flex flex-col gap-2'>
        {/* MAP COINS HERE */}
        <CoinBox/>
        <CoinBox/>
        <CoinBox/>
      </div>
    </div>
  )
} 

export default FeaturedCoins