import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom' 
import axios from 'axios'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import { ThemeContext } from '../context/ThemeContext'
import { CurrencyContext } from '../context/CurrencyContext'
import { FadeLoader } from 'react-spinners'
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"

function Index() {
  const { isDarkMode } = useContext(ThemeContext)
  const { selectedCurrency } = useContext(CurrencyContext)

  const { id } = useParams()
  const [coinData, setCoinData] = useState()
  const [coinPrice, setCoinPrice] = useState()

  const [loading, setLoading] = useState(true)
  
  const currencySymbol = selectedCurrency == 'USD' ? '$' : '₱' 

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
      setCoinPrice()
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
        <SearchBar />
        { loading ? 
          <div className='flex place-content-center w-full mt-10'>
            <FadeLoader color={loaderColor}/>
          </div>  
          :
          <div className='py-2'>
            <div className='flex items-center'>
              <img src={coinData.image.thumb} className='mr-1'/>
              <h1>{coinData.name}
                <span className='ml-1 text-[#64748B] text-xs'>{coinData.symbol.toUpperCase() + ' / ' + selectedCurrency}</span>
              </h1>
              <div className='flex place-content-center rounded-lg ml-1 h-4 w-6 bg-[#F1F5F9] text-[#64748B] text-xs'>
                {'#' + coinData.market_cap_rank}
              </div> 
            </div>
            <div className='flex items-center'>
              <h1 className='text-3xl mr-1'>{currencySymbol + priceFormatter.format(coinData.market_data.current_price[selectedCurrency.toLowerCase()])}</h1>
              <span>{'%' + Math.abs(percentageFormatter.format(coinData.market_data.price_change_percentage_24h))}</span>
            </div>
          </div>    
        }   
      </div>
    </div>
  )
}

export default Index