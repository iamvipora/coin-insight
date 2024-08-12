import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { ThemeContext } from '../context/ThemeContext'
import Header from '../components/Header'
import MarketStatistics from '../components/MarketStatistics'
import FeaturedCoins from '../components/FeaturedCoins'
import SearchBar from '../components/SearchBar'
import CoinTable from '../components/CoinTable'
import PageNavigator from '../components/PageNavigator'

function Index() {
  const { isDarkMode } = useContext(ThemeContext)
  const [] = useState()

  useEffect(() => {
    const fetchData = () => {
      const options = {
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/global/decentralized_finance_defi',
        headers: {accept: 'application/json', 'x-cg-api-key': 'CG-PdnVsh4UqGxGeBstTVvG9RFE'}
      };
      
      axios.request(options)
        .then(res => {
          console.log(res.data)
        })
        .catch(err => console.error(err))
      }

    // fetchData()
  }, [])

  return (
    <div className='font-outfit tracking-wider'>
      <Header/>
      <div className='flex flex-col px-4'>
        <div className='flex flex-col gap-2'>
          <MarketStatistics

          />
          <MarketStatistics/>
          <FeaturedCoins/>
          <FeaturedCoins/>
          <h2 className={`mt-4 text-lg font-bold text-center ${isDarkMode && 'text-white'}`}>Cryptocurrency Prices by Market Cap</h2>
          <SearchBar/>
          <CoinTable/>
          <PageNavigator/>
        </div>     
      </div>
    </div>
  )
}

export default Index