import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { ThemeContext } from '../context/ThemeContext'
import { CurrencyContext } from '../context/CurrencyContext'
import Header from '../components/Header'
import MarketStatistics from '../components/MarketStatistics'
import FeaturedCoins from '../components/FeaturedCoins'
import SearchBar from '../components/SearchBar'
import CoinTable from '../components/CoinTable'
import Pagination from '../components/Pagination'
import { FadeLoader } from 'react-spinners'

function Index() {
  const location = useLocation()

  const { isDarkMode } = useContext(ThemeContext)
  const { selectedCurrency } = useContext(CurrencyContext)

  const [defiMarketCapData, setDefiMarketCapData] = useState()
  const [tradingVolumeData, setTradingVolumeData] = useState()
  const [allCoins, setAllCoins] = useState()
  const [itemsPerPage, setItemsPerPage] = useState(localStorage.getItem('itemsPerPage') || 25)
  const [loading, setLoading] = useState(true)

  const query = new URLSearchParams(location.search)
  const currentPage = parseInt(query.get('page')) || 1

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
    }
  }

  const fetchCoins = async () => {
    const options = {
      method: 'GET',
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&order=market_cap_desc&per_page=${itemsPerPage}&page=${currentPage}`,
      headers: {accept: 'application/json', 'x-cg-api-key': 'CG-gYy2EZbRi34XuJ6VgXAcTcRZ'}
    }

    try {
      const res = await axios.request(options)
      setAllCoins(res.data)
    } catch (err) {
      console.err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMarketStatistics()
  }, [])

  useEffect(() => {
    //Countering public API call limit
    setTimeout(() => {
      fetchCoins()
    }, 3000)
  }, [currentPage, itemsPerPage, selectedCurrency])

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
            <FeaturedCoins
              componentName='Top 3 Coins'
              data={allCoins}
            />
            <FeaturedCoins
              componentName='Random Coin Generator'
              data={allCoins}
            />
            <h2 className={`mt-4 text-lg font-bold text-center ${textStyling}`}>Cryptocurrency Prices by Market Cap</h2>
            <SearchBar/>
            <CoinTable
              data={allCoins}
            />
            <Pagination
              query={query}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
            />
          </div>
        }            
      </div>
    </div>
  )
}

export default Index