import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { ThemeContext } from '../context/ThemeContext'
import Header from '../components/Header'
import MarketStatistics from '../components/MarketStatistics'
import FeaturedCoins from '../components/FeaturedCoins'
import SearchBar from '../components/SearchBar'
import CoinTable from '../components/CoinTable'
import PageNavigator from '../components/PageNavigator'
import { FadeLoader } from 'react-spinners'

function Index() {
  const { isDarkMode } = useContext(ThemeContext)

  const [defiMarketCapData, setDefiMarketCapData] = useState()
  const [tradingVolumeData, setTradingVolumeData] = useState()

  const [loading, setLoading] = useState(true)

  const textStyling = isDarkMode && 'text-white'
  const loaderColor = isDarkMode ? '#FFFFFF' : '#656565'

  const fetchMarketStatistics = async () => {
    const options = {
      method: 'GET',
      url: 'https://api.coingecko.com/api/v3/global/decentralized_finance_defi',
      headers: {accept: 'application/json', 'x-cg-api-key': import.meta.env.VITE_API_KEY}
    }

    try { 
      const res = await axios.request(options)
      setDefiMarketCapData({statsName: 'DeFi Market Cap', statsNumber: res.data.data.defi_market_cap})
      setTradingVolumeData({statsName: '24h Trading Volume', statsNumber: res.data.data.trading_volume_24h})
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMarketStatistics()
  }, [])

  return (
    <div className='font-outfit tracking-wider'>
      <Header/>
      <div className='flex flex-col px-4'>
        {loading ? 
          <div className='flex place-content-center w-full mt-10'>
            <FadeLoader color={loaderColor}/>
          </div>
          :
          <div className='flex flex-col gap-2'>
            <MarketStatistics
              data={defiMarketCapData}
            />
            <MarketStatistics
              data={tradingVolumeData}
            />
            <FeaturedCoins/>
            <FeaturedCoins/>
            <h2 className={`mt-4 text-lg font-bold text-center ${textStyling}`}>Cryptocurrency Prices by Market Cap</h2>
            <SearchBar/>
            <CoinTable/>
            <PageNavigator/>
          </div>
        }            
      </div>
    </div>
  )
}

export default Index