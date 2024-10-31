import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom' 
import axios from 'axios'
import Header from '../components/Header'
import TradingViewChart from '../components/TradingViewChart'
import { ThemeContext } from '../context/ThemeContext'
import { CurrencyContext } from '../context/CurrencyContext'
import { FadeLoader } from 'react-spinners'
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"
import { FaArrowRight } from "react-icons/fa";

function CoinPage() {
  const { isDarkMode } = useContext(ThemeContext)
  const { selectedCurrency } = useContext(CurrencyContext)

  const { id } = useParams()
  const [coinData, setCoinData] = useState()
  const [loading, setLoading] = useState(true)
  const [coinCalculatorValue, setCoinCalculatorValue] = useState('')
  const [currencyCalculatorValue, setCurrencyCalculatorValue] = useState('')

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
      setCoinCalculatorValue()
      setCurrencyCalculatorValue()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCoinValueChange = (e) => {
    const inputValue = e.target.value
    setCoinCalculatorValue(inputValue)

    if (inputValue !== '') {
      const calculatedValue = inputValue * coinData.market_data.current_price[selectedCurrency.toLowerCase()]
      setCurrencyCalculatorValue(calculatedValue.toFixed(2))
    } else {
      setCurrencyCalculatorValue('')
    }
  }

  const handleCurrencyValueChange = (e) => {
    const inputValue = e.target.value
    setCurrencyCalculatorValue(inputValue)

    if (inputValue !== '') {
      const calculatedValue = inputValue / coinData.market_data.current_price[selectedCurrency.toLowerCase()]
      setCoinCalculatorValue(calculatedValue.toFixed(6))
    } else {
      setCoinCalculatorValue('')
    } 
  }

  useEffect(() => {
    fetchCoinData()
  }, [selectedCurrency])

  return (
    <div className='font-outfit tracking-wider md:px-6 lg:px-8 xl:px-16 2xl:px-96'>
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
                <span className='ml-1 text-[#64748B] text-sm'>{coinData.symbol.toUpperCase() + ' / ' + selectedCurrency}</span>
              </h1>
              <div className={`flex place-content-center rounded-lg ml-1 h-4 w-6 text-[#64748B] text-sm ${isDarkMode ? 'bg-[#1B232D]' : 'bg-[#F1F5F9]'}`}>
                {'#' + coinData.market_cap_rank}
              </div> 
            </div>
            <div className='flex items-center'>
              <h1 className='text-3xl mr-1 font-medium'>{currencySymbol + priceFormatter.format(coinData.market_data.current_price[selectedCurrency.toLowerCase()])}</h1>
              <span className={`flex items-center py-4 ${coinData.market_data.price_change_percentage_24h > 0 ? 'text-[#00A83E]' : 'text-[#FF3A33]'}`}>
                {coinData.market_data.price_change_percentage_24h > 0 ? <IoMdArrowDropup className='h-5 w-5'/> : <IoMdArrowDropdown className='h-5 w-5'/>}
                {Math.abs(percentageFormatter.format(coinData.market_data.price_change_percentage_24h)) + '%'}
              </span>
            </div>
            <div>
              <div>
                <h2 className='text-xl font-medium'>Convert {coinData.name} to {currencyName} ({coinData.symbol.toUpperCase()} to {selectedCurrency})</h2>
                <p className='text-base text-[#64748B]'>The price of converting 1 {coinData.name} ({coinData.symbol.toUpperCase()}) to {selectedCurrency} is {priceFormatter.format(coinData.market_data.current_price[selectedCurrency.toLowerCase()])} today.</p>
                <div className={`flex flex-col gap-4 px-6 py-4 my-2 rounded-lg ${isDarkMode ? 'bg-[#384A61]' : 'bg-[#F1F5F9]'}`}>
                  <div className='flex flex-col gap-4 xl:flex-row'>
                    <div className={`flex items-center h-10 w-full px-2 rounded-lg border text-sm ${isDarkMode ? 'bg-[#0D1217]' : 'bg-white'} ${isDarkMode ? 'border-[#384A61]' : 'border-[#EFF2F5]'}`}>
                      <input
                        className='outline-none w-full bg-inherit'
                        type='text' 
                        value={coinCalculatorValue}
                        onChange={handleCoinValueChange}
                      />
                      <span className={` pl-2 ${isDarkMode ? 'text-[#9EB0C7]' : 'text-[#64748B]'}`}>{coinData.symbol.toUpperCase()}</span>
                    </div>
                    <div className={`hidden xl:flex xl:items-center ${textStyling}`}>
                      <FaArrowRight />
                    </div>
                    <div className={`flex items-center h-10 w-full px-2 rounded-lg border text-sm ${isDarkMode ? 'bg-[#0D1217]' : 'bg-white'} ${isDarkMode ? 'border-[#384A61]' : 'border-[#EFF2F5]'}`}>
                      <input
                        className='outline-none w-full bg-inherit'
                        type='text' 
                        value={currencyCalculatorValue}
                        onChange={handleCurrencyValueChange}
                      />
                      <span className={` pl-2 ${isDarkMode ? 'text-[#9EB0C7]' : 'text-[#64748B]'}`}>{selectedCurrency}</span>
                    </div>
                  </div>
                  <p className='text-base'>1 ({coinData.symbol.toUpperCase()}) = {currencySymbol + priceFormatter.format(coinData.market_data.current_price[selectedCurrency.toLowerCase()])}</p>
                </div>
              </div>
              <div className='h-96 mb-8'>
                <h2 className='text-xl font-medium'>{coinData.symbol.toUpperCase()} to {selectedCurrency} Chart</h2>
                <TradingViewChart
                  coinSymbol={coinData.symbol.toUpperCase()}
                  selectedCurrency={selectedCurrency}
                />
              </div>
              <div className='py-4'>
                <h2 className='text-xl font-medium'>{coinData.name} Statistics</h2>
                <table className='w-full'>
                  <tbody className='w-full'>
                    <tr className='flex justify-between w-full border-b py-2 text-base'>
                      <td className='text-[#64748B]'>Market Cap</td>
                      <td className={`textStyling`}>{currencySymbol + priceFormatter.format(coinData.market_data.market_cap[selectedCurrency.toLowerCase()])}</td>
                    </tr>
                    <tr className='flex justify-between w-full border-b py-2 text-base'>
                      <td className='text-[#64748B]'>Fully Diluted Valuation</td>
                      <td className={`textStyling`}>{currencySymbol + priceFormatter.format(coinData.market_data.fully_diluted_valuation[selectedCurrency.toLowerCase()])}</td>
                    </tr>
                    <tr className='flex justify-between w-full border-b py-2 text-base'>
                      <td className='text-[#64748B]'>Total Volume</td>
                      <td className={`textStyling`}>{currencySymbol + priceFormatter.format(coinData.market_data.total_volume[selectedCurrency.toLowerCase()])}</td>
                    </tr>
                    <tr className='flex justify-between w-full border-b py-2 text-base'>
                      <td className='text-[#64748B]'>Circulating Supply</td>
                      <td className={`textStyling`}>{priceFormatter.format(coinData.market_data.circulating_supply)}</td>
                    </tr>
                    <tr className='flex justify-between w-full border-b py-2 text-base'>
                      <td className='text-[#64748B]'>Total Supply</td>
                      <td className={`textStyling`}>{priceFormatter.format(coinData.market_data.total_supply)}</td>
                    </tr>
                    <tr className='flex justify-between w-full border-b py-2 text-base'>
                      <td className='text-[#64748B]'>Max Supply</td>
                      <td className={`textStyling`}>{priceFormatter.format(coinData.market_data.max_supply)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }   
      </div>
    </div>
  )
}

export default CoinPage