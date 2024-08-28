import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { CurrencyContext } from "../context/CurrencyContext"
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"

function CoinBox({ icon, name, price, dailyPriceChangePercentage }) {
  const { isDarkMode } = useContext(ThemeContext)
  const { selectedCurrency } = useContext(CurrencyContext)

  const currencySymbol = selectedCurrency == 'USD' ? '$' : '₱' 

  const componentBg = isDarkMode ? 'bg-[#0D1217]' : 'bg-white'
  const componentText = isDarkMode && 'text-white'
  const isPricePositive = dailyPriceChangePercentage > 0 ? true : false
  const priceChangeIcon = isPricePositive ? <IoMdArrowDropup className='h-5 w-5'/> : <IoMdArrowDropdown className='h-5 w-5'/>
  const priceChangeTextColor = isPricePositive ? 'text-[#00A83E]' : 'text-[#FF3A33]'

  const priceFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const percentageFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })

  return (
    <div className={`grid grid-cols-11 justify-between py-3 px-4 w-full rounded-lg items-center text-xs ${componentBg} ${componentText}`}>
      <img src={icon} className='h-6 w-6 rounded-full'/>
      <span className='ml-1 col-span-4'>{name}</span>
      <span className='col-span-4 text-right'>{currencySymbol + priceFormatter.format(price)}</span>
      <span className={`col-span-2 flex items-center ${priceChangeTextColor}`}>{priceChangeIcon}{'%' + Math.abs(percentageFormatter.format(dailyPriceChangePercentage))}</span>
    </div>
  )
}

export default CoinBox