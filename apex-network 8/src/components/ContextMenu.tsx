import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

interface ContextMenuProps {
  x: number
  y: number
  onClose: () => void
  options: Array<{
    label: string
    onClick: () => void
  }>
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, options }) => {
  const { theme } = useTheme()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.1 }}
      className="fixed z-50 rounded-lg shadow-lg overflow-hidden"
      style={{
        left: x,
        top: y,
        backgroundColor: theme.secondary,
        border: `1px solid ${theme.accent}`,
      }}
    >
      {options.map((option, index) => (
        <button
          key={index}
          className="w-full px-4 py-2 text-left hover:bg-opacity-50 transition-colors duration-200"
          style={{
            color: theme.text,
            backgroundColor: 'transparent',
          }}
          onClick={option.onClick}
        >
          {option.label}
        </button>
      ))}
    </motion.div>
  )
}

export default ContextMenu

