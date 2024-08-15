import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"

function CoinBox({ icon, name, price, dailyPriceChangePercentage }) {
  const { isDarkMode } = useContext(ThemeContext)

  const componentBg = isDarkMode ? 'bg-[#0D1217]' : 'bg-white'
  const componentText = isDarkMode && 'text-white'
  const isPricePositive = dailyPriceChangePercentage > 0 ? true : false
  const priceChangeIcon = isPricePositive ? <IoMdArrowDropup className='h-5 w-5'/> : <IoMdArrowDropdown className='h-5 w-5'/>
  const priceChangeTextColor = isPricePositive ? 'text-[#00A83E]' : 'text-[#FF3A33]'

  const formatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const percentageFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })

  const formattedPrice = formatter.format(price)
  const formattedPriceChange = percentageFormatter.format(Math.abs(dailyPriceChangePercentage))

  return (
    <div className={`grid grid-cols-11 justify-between py-3 px-4 w-full rounded-lg items-center text-xs ${componentBg} ${componentText}`}>
      <img src={icon} className='h-6 w-6 rounded-full'/>
      <span className='ml-1 col-span-5'>{name}</span>
      <span className='col-span-3'>${formattedPrice}</span>
      <span className={`col-span-2 flex items-center ${priceChangeTextColor}`}>{priceChangeIcon}{'%' + formattedPriceChange}</span>
    </div>
  )
}

export default CoinBox