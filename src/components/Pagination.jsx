import { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io"

function Pagination({ query, currentPage }) {
  const navigate = useNavigate()

  const { isDarkMode } = useContext(ThemeContext)

  const textStyling = isDarkMode && 'text-white'

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1
      query.set('page', prevPage)
      navigate(`?${query.toString()}`)
    }
  }

  const handleNextPage = () => {
    const nextPage = currentPage + 1
    query.set('page', nextPage)
    navigate(`?${query.toString()}`)
  }

  return (
    <div className='flex justify-center items-center space-x-2 my-2 text-sm'>
      <button
        className={`${textStyling}`}
        onClick={handlePrevPage}
      >
        <IoMdArrowDropleft className='h-5 w-5'/>
      </button>
      <button
        className='px-2 rounded && bg-[#E8FCC9] text-[#35AF00]'
      > 
        {currentPage}
      </button>
      <button
        className={`${textStyling}`}
        onClick={handleNextPage}
      >
        <IoMdArrowDropright className='h-5 w-5'/>
      </button>
    </div>
  )
}

export default Pagination
