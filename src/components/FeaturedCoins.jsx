import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import CoinBox from './CoinBox'
import { FaRankingStar } from "react-icons/fa6"
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi"

function FeaturedCoins({ componentName, data }) {
  const { isDarkMode } = useContext(ThemeContext)

  const [randomCoin, setRandomCoin] = useState()

  const bgStyling = isDarkMode ? 'bg-[#212D3B]' : 'bg-[#EFF2F5]'
  const textStyling = isDarkMode && 'text-white'

  const isTop3Coins = componentName == 'Top 3 Coins' ? true : false
  const componentIcon = isTop3Coins ? <FaRankingStar className='h-6 w-6 ml-1'/> : <GiPerspectiveDiceSixFacesRandom className='h-6 w-6'/>

  const generateRandomCoin = () => {
    const random = Math.floor(Math.random() * data.length)
    setRandomCoin(data[random])
  }

  const stableCoins = ['Tether', 'USDC', 'Dai']

  const renderTopCoins = data.filter(item => !stableCoins.includes(item.name)).slice(0, 3).map((item, key) => {
    return (
      <CoinBox 
        key={key}
        icon={item.image}
        name={item.name}
        price={item.current_price}
        dailyPriceChangePercentage={item.price_change_percentage_24h}
      />
    )  
  })

  useEffect(() => {
    if (componentName == 'Random Coin Generator'){
      generateRandomCoin()
    }
  }, [])
  
  return (
    <div className={`flex flex-col p-2 w-full rounded-lg ${bgStyling} ${textStyling}`}>
      <h2 className='flex items-center gap-1 text-lg font-bold pb-2'>{componentIcon}{componentName}</h2>
      {isTop3Coins ?
        <div className='flex flex-col gap-2'>
          {renderTopCoins}
        </div>
        :
        <div className='flex flex-col gap-2 place-items-end'>
          <p className='text-xs text-justify'>Generates a random coin from the list of top 50 supported coins on Coin Insight.</p>
          {randomCoin && (
            <CoinBox 
              icon={randomCoin.image}
              name={randomCoin.name}
              price={randomCoin.current_price}
              dailyPriceChangePercentage={randomCoin.price_change_percentage_24h}
            />
          )}
          <button 
            className='flex items-center h-7 w-20 bg-[#4BCC00] rounded-lg'
            onClick={() => generateRandomCoin()}  
          >
            <span className='text-xs text-white w-full'>Generate</span>
          </button>
        </div>
      } 
    </div>
  )
} 

export default FeaturedCoins