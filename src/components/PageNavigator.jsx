import React from 'react'

function PageNavigator() {

  return (
    <div className="flex justify-center items-center space-x-2 my-4">
      <button
        className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
      >
      </button>
      <button
        className={`px-3 py-1 border rounded`}
      > 
      </button>
      <button
        className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
      >
        Next
      </button>
    </div>
  )
}

export default PageNavigator
