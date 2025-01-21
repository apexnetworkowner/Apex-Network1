'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

const HexagonBackground: React.FC = () => {
  const { theme } = useTheme()
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const hexSize = 50
  const columns = Math.ceil(windowSize.width / (hexSize * 1.5)) + 1
  const rows = Math.ceil(windowSize.height / (hexSize * 1.732)) + 1

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: rows * columns }).map((_, index) => {
          const col = index % columns
          const row = Math.floor(index / columns)
          const x = col * hexSize * 1.5
          const y = row * hexSize * 1.732 + (col % 2 === 0 ? 0 : hexSize * 0.866)

          return (
            <motion.path
              key={index}
              d={`M${x},${y + hexSize} l${hexSize * 0.866},${-hexSize * 0.5} l${hexSize * 0.866},${hexSize * 0.5} l0,${hexSize} l${-hexSize * 0.866},${hexSize * 0.5} l${-hexSize * 0.866},${-hexSize * 0.5} Z`}
              fill="none"
              stroke={theme.accent}
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}

const PulsatingCircle: React.FC = () => {
  const { theme } = useTheme()

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="rounded-full"
        style={{ backgroundColor: theme.accent }}
        initial={{ opacity: 0.5, scale: 0 }}
        animate={{ 
          opacity: [0.5, 1, 0.5],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

const LoadingBackground: React.FC = () => {
  const { theme } = useTheme()

  return (
    <div 
      className="fixed inset-0 z-0" 
      style={{
        background: `radial-gradient(circle, ${theme.secondary}, ${theme.primary})`,
      }}
    >
      <HexagonBackground />
      <PulsatingCircle />
    </div>
  )
}

export default LoadingBackground

