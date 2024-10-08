import { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import { IoMdArrowDropleft, IoMdArrowDropright, IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"

function Pagination({ query, currentPage, itemsPerPage, setItemsPerPage }) {
  const navigate = useNavigate()

  const { isDarkMode } = useContext(ThemeContext)

  const [toggleItemsPerPageMenu, setToggleItemsPerPageMenu] = useState(false)

  const toggleItemsPerPageMenuIcon = toggleItemsPerPageMenu ? <IoMdArrowDropup/> : <IoMdArrowDropdown/>
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

  const handleChangeItemsPerPage = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage)
    setToggleItemsPerPageMenu(false)
  }

  return (
    <div className='grid grid-cols-3'>
      <div></div>
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
      <div className='flex gap-2 text-xs items-center place-content-end'>
        <span>Rows</span>
        <button
          className='flex items-center place-content-center h-7 w-12 bg-[#4BCC00] rounded-lg text-white'
          onClick={() => setToggleItemsPerPageMenu(prev => !prev)}
        >
          {itemsPerPage}
          {toggleItemsPerPageMenuIcon}
        </button>
        {toggleItemsPerPageMenu && (
          <ul className='absolute mb-32 ml-12 w-12 overflow-y-auto bg-[#4BCC00] rounded-lg text-white text-xs'>
            {[25, 50, 100].map(value => (
              <li
                key={value}
                className='flex px-3 py-2 cursor-pointer text-xs '
                onClick={() => handleChangeItemsPerPage(value)}
              >
                {value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Pagination
