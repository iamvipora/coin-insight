import React from 'react'
import Header from '../components/Header'
import MarketStatistics from '../components/MarketStatistics'
import FeaturedCoins from '../components/FeaturedCoins'
import SearchBar from '../components/SearchBar'
import CoinTable from '../components/CoinTable'
import PageNavigator from '../components/PageNavigator'

function Index() {
  return (
    <div className='font-outfit tracking-wider'>
      <Header/>
      <div className='flex flex-col px-4'>
        <div className='flex flex-col gap-2'>
          <MarketStatistics/>
          <MarketStatistics/>
          <FeaturedCoins/>
          <FeaturedCoins/>
          <h2 className='mt-4 text-lg font-bold text-center'>Cryptocurrency Prices by Market Cap</h2>
          <SearchBar/>
          <CoinTable/>
          <PageNavigator/>
        </div>     
      </div>
    </div>
  )
}

export default Index