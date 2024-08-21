import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

function MarketStatistics({ data }) {
  const { isDarkMode } = useContext(ThemeContext)

  const bgStyling = isDarkMode ? 'bg-[#212D3B]' : 'bg-[#EFF2F5]'
  const textStyling = isDarkMode && 'text-white'

  const formatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const formattedNumber = formatter.format(data.statsNumber)

  return (
    <div className={`flex items-center gap-4 p-2 h-24 w-full rounded-lg ${bgStyling} ${textStyling}`}>
      <div className='flex flex-col items-center place-content-center h-full w-full'>
        <h2 className='text-lg font-bold'>${formattedNumber}</h2>
        <span className='text-sm'>{data.statsName}</span>
      </div>
    </div>
  )
}

export default MarketStatistics