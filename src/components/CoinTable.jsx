import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import { CurrencyContext } from '../context/CurrencyContext'
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"

function CoinTable({ data }) {
  const navigate = useNavigate()

  const { isDarkMode } = useContext(ThemeContext)
  const { selectedCurrency } = useContext(CurrencyContext)

  const currencySymbol = selectedCurrency == 'USD' ? '$' : '₱' 

  const bgStyling = isDarkMode ? 'bg-[#0D1217]' : 'bg-white'
  const textStyling = isDarkMode && 'text-white'

  const priceFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const percentageFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })

  return (
    <div className='overflow-x-auto'>
      <table className={`table-auto border-collapse min-w-full text-xs ${textStyling}`}>
        <thead>
          <tr className='h-6 border-y font-bold text-nowrap text-right'>
            <th className={`sticky left-0 z-10 px-2 text-left ${bgStyling}`}>Ranking</th>
            <th className={`sticky left-16 z-10 px-9 text-left ${bgStyling}`}>Coin</th>
            <th className='px-2'>Price</th>
            <th className='px-2'>24h</th>
            <th className='px-2'>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, key) => {
            const isPricePositive = item.price_change_percentage_24h > 0 ? true : false
            const priceChangeIcon = isPricePositive ? <IoMdArrowDropup className='h-5 w-5'/> : <IoMdArrowDropdown className='h-5 w-5'/>
            const priceChangeTextColor = isPricePositive ? 'text-[#00A83E]' : 'text-[#FF3A33]'

            return (
              <tr key={key} className='border-b text-right' onClick={() => navigate(`/coins/${item.name.toLowerCase()}`)}>
                <td className={`sticky left-0 z-10 text-center ${bgStyling}`}>{item.market_cap_rank}</td>
                <td className={`flex items-center sticky left-16 z-10 my-1 ${bgStyling}`}>
                  <img src={item.image} className='h-6 w-6 mr-2'/>
                  <div className='flex flex-col text-left'>
                    {item.name}
                    <span className='text-[#64748B]'>{item.symbol.toUpperCase()}</span>
                  </div>
                </td>
                <td className='px-2 pl-[88px]'>{currencySymbol + priceFormatter.format(item.current_price)}</td>
                <td className={`flex items-center ${priceChangeTextColor}`}>{priceChangeIcon}{'%' + Math.abs(percentageFormatter.format(item.price_change_percentage_24h))}</td>
                <td className='px-2'>{currencySymbol + priceFormatter.format(item.market_cap)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CoinTable
