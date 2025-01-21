'use client'

import { useState } from 'react'

export default function SidebarToggle() {
  const [isHorizontal, setIsHorizontal] = useState(false)

  return (
    <button
      onClick={() => setIsHorizontal(!isHorizontal)}
      className="fixed bottom-4 right-4 bg-red-600 text-black px-4 py-2 rounded-md font-bold hover:bg-red-700 transition-colors duration-200 z-50 glow-button"
    >
      {isHorizontal ? 'Vertical' : 'Horizontal'} Sidebar
    </button>
  )
}

