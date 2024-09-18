import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom' 
import axios from 'axios'
import { ThemeContext } from '../context/ThemeContext'
import { CurrencyContext } from '../context/CurrencyContext'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import { FadeLoader } from 'react-spinners'

function Index() {
  const { isDarkMode } = useContext(ThemeContext)
  const { selectedCurrency } = useContext(CurrencyContext)

  const { id } = useParams()
  const [coinData, setCoinData] = useState()

  const [loading, setLoading] = useState(true)

  const textStyling = isDarkMode && 'text-white'
  const loaderColor = isDarkMode ? '#FFFFFF' : '#656565'

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      url: `https://api.coingecko.com/api/v3/coins/${id}`,
      headers: {accept: 'application/json', 'x-cg-api-key': 'CG-gYy2EZbRi34XuJ6VgXAcTcRZ'}
    }

    try {
      const res = await axios.request(options)
      setCoinData(res.data)
      console.log(res.data)
    } catch (err) {
      console.err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCoinData()
  }, [])

  return (
    <div className='font-outfit tracking-wider'>
      <Header/>
      <div className='flex flex-col px-4'>
        { loading ? 
          <div className='flex place-content-center w-full mt-10'>
            <FadeLoader color={loaderColor}/>
          </div>  
          :
          <div>
            <h1>{coinData.name + ' ' + coinData.symbol.toUpperCase()}  </h1>
          </div>    
        }   
      </div>
    </div>
  )
}

export default Index