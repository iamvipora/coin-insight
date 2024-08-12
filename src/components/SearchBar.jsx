import React from 'react'
import { FaSearch } from "react-icons/fa"

function SearchBar() {
  return (
    <div className='flex items-center gap-2 h-8 w-full px-2 bg-[#EFF2F5] rounded-lg'>
      <FaSearch className='h-3 w-3'/>
      <input
        className='w-full bg-inherit outline-none text-xs'
        type='text'
        placeholder='Search'
      />
    </div>  
  )
}

export default SearchBar