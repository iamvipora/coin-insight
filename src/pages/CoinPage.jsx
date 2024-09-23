import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom' 
import axios from 'axios'
import Header from '../components/Header'
import { ThemeContext } from '../context/ThemeContext'
import { CurrencyContext } from '../context/CurrencyContext'
import { FadeLoader } from 'react-spinners'
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"

function CoinPage() {
  const { isDarkMode } = useContext(ThemeContext)
  const { selectedCurrency } = useContext(CurrencyContext)

  const { id } = useParams()
  const [coinData, setCoinData] = useState()
  const [loading, setLoading] = useState(true)
  
  const currencySymbol = selectedCurrency == 'USD' ? '$' : '₱' 
  const currencyName = selectedCurrency == 'USD' ? 'US Dollars' : 'Philippine Peso' 

  const textStyling = isDarkMode && 'text-white'
  const loaderColor = isDarkMode ? '#FFFFFF' : '#656565'

  const priceFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const percentageFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      url: `https://api.coingecko.com/api/v3/coins/${id}`,
      headers: {accept: 'application/json', 'x-cg-api-key': 'CG-gYy2EZbRi34XuJ6VgXAcTcRZ'}
    }
    try {
      const res = await axios.request(options)
      setCoinData(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCoinData()
  }, [selectedCurrency])

  return (
    <div className='font-outfit tracking-wider'>
      <Header/>
      <div className='flex flex-col px-4'>
        { loading ? 
          <div className='flex place-content-center w-full mt-10'>
            <FadeLoader color={loaderColor}/>
          </div>  
          :
          <div className={`flex flex-col ${textStyling}`}>
            <div className='flex items-center'>
              <img src={coinData.image.thumb} className='mr-1'/>
              <h1>{coinData.name}
                <span className='ml-1 text-[#64748B] text-xs'>{coinData.symbol.toUpperCase() + ' / ' + selectedCurrency}</span>
              </h1>
              <div className={`flex place-content-center rounded-lg ml-1 h-4 w-6 text-[#64748B] text-xs ${isDarkMode ? 'bg-[#1B232D]' : 'bg-[#F1F5F9]'}`}>
                {'#' + coinData.market_cap_rank}
              </div> 
            </div>
            <div className='flex items-center'>
              <h1 className='text-3xl mr-1'>{currencySymbol + priceFormatter.format(coinData.market_data.current_price[selectedCurrency.toLowerCase()])}</h1>
              <span className={`flex items-center py-4 ${coinData.market_data.price_change_percentage_24h > 0 ? 'text-[#00A83E]' : 'text-[#FF3A33]'}`}>
                {coinData.market_data.price_change_percentage_24h > 0 ? <IoMdArrowDropup className='h-5 w-5'/> : <IoMdArrowDropdown className='h-5 w-5'/>}
                {Math.abs(percentageFormatter.format(coinData.market_data.price_change_percentage_24h)) + '%'}
              </span>
            </div>
            <div>
              <h2 className='text-lg'>Covert {coinData.name} to {currencyName} ({coinData.symbol.toUpperCase()} to {selectedCurrency})</h2>
              <p className='text-sm text-[#64748B]'>The price of converting 1 {coinData.name} ({coinData.symbol.toUpperCase()}) to {selectedCurrency} is {priceFormatter.format(coinData.market_data.current_price[selectedCurrency.toLowerCase()])} today.</p>
              <div className={`flex flex-col gap-4 px-6 py-4 my-2 rounded-lg ${isDarkMode ? 'bg-[#384A61]' : 'bg-[#F1F5F9]'}`}>
                <input 
                  type='number'
                  className={`outline-none ring-0 h-10 p-2 rounded-lg border ${isDarkMode && 'bg-[#0D1217] text-white'} ${isDarkMode ? 'border-[#384A61]' : 'border-[#EFF2F5]'}`}
                 /> 
                <input 
                  type='number'
                  className={`outline-none ring-0 h-10 p-2 rounded-lg border ${isDarkMode && 'bg-[#0D1217] text-white'} ${isDarkMode ? 'border-[#384A61]' : 'border-[#EFF2F5]'}`}
                 />
                 <p className='text-sm'>1 ({coinData.symbol.toUpperCase()}) = {currencySymbol + priceFormatter.format(coinData.market_data.current_price[selectedCurrency.toLowerCase()])}</p>
              </div>
            </div>
          </div>    
        }   
      </div>
    </div>
  )
}

export default CoinPage