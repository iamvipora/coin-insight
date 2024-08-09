import React from 'react'

function MarketStatistics() {
  return (
    <div className='flex items-center gap-4 p-2 h-24 w-full bg-[#EFF2F5] rounded-lg'>
      <div className='flex flex-col items-center place-content-center h-full'>
        <h2 className='text-lg font-bold'>$2,069,506,473,668 </h2>
        <span className='text-sm'>Market Cap</span>
      </div>
      <div className='flex items-center place-content-center h-full w-full'>
        Chart here
      </div>
    </div>
  )
}

export default MarketStatistics