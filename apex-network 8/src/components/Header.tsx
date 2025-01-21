'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
      <h1 className="text-8xl font-bold text-red-600 mb-8 glow-text">APEX</h1>
      <div
        className={`bg-red-600 rounded-full transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-96' : 'w-80'
        }`}
      >
        <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Enter a URL or Search"
            className="w-full bg-black text-red-600 placeholder-red-400 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
            onFocus={() => setIsExpanded(true)}
            onBlur={() => setIsExpanded(false)}
          />
          <button type="submit" className="text-black bg-red-600 p-3 rounded-full hover:bg-red-700 transition-colors duration-200">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
    </div>
  )
}

