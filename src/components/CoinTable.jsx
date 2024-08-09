import React from 'react'

function CoinTable() {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse min-w-full">
        <thead>
          <tr>
            <th className="sticky left-0 bg-white z-10 px-4 py-2 border">Ranking</th>
            <th className="sticky left-[5.5rem] bg-white z-10 px-4 py-2 border">Coin</th>
            <th className="px-4 py-2 bg-gray-100 border">Price</th>
            <th className="px-4 py-2 bg-gray-100 border">1h</th>
            <th className="px-4 py-2 bg-gray-100 border">24h</th>
            <th className="px-4 py-2 bg-gray-100 border">7d</th>
            <th className="px-4 py-2 bg-gray-100 border">24h Volume </th>
            <th className="px-4 py-2 bg-gray-100 border">Market Cap</th>
            <th className="px-4 py-2 bg-gray-100 border">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="sticky left-0 bg-white z-10 px-4 py-2 border"></td>
            <td className="sticky left-[5.5rem] bg-white z-10 px-4 py-2 border"></td>
            <td className="px-4 py-2 border"></td>
            <td className="px-4 py-2 border"></td>
            <td className="px-4 py-2 border"></td>
            <td className="px-4 py-2 border"></td>
            <td className="px-4 py-2 border"></td>
            <td className="px-4 py-2 border"></td>
            <td className="px-4 py-2 border"></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CoinTable
