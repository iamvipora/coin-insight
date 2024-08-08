import React from 'react'
import Header from '../components/Header'
import MarketStatistics from '../components/MarketStatistics'
import FeaturedCoins from '../components/FeaturedCoins'

function Index() {
  return (
    <div className='font-outfit'>
      <Header/>
      <div className='flex flex-col gap-2 px-4'>
        <MarketStatistics/>
        <MarketStatistics/>
        <FeaturedCoins/>
        <FeaturedCoins/>
      </div>    
    </div>
  )
}

export default Index