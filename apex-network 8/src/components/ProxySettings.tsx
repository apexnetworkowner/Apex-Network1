'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faVolumeUp, 
  faVolumeMute, 
  faExpand, 
  faCompress,
  faTimes,
  faHistory,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import { useTheme } from './ThemeProvider'

interface ProxySettingsProps {
  isOpen: boolean
  onClose: () => void
  isMuted: boolean
  isFullscreen: boolean
  onToggleSound: () => void
  onToggleFullscreen: () => void
  browserHistory: Array<{ url: string, timestamp: Date }>
  onClearHistory: () => void
}

export default function ProxySettings({
  isOpen,
  onClose,
  isMuted,
  isFullscreen,
  onToggleSound,
  onToggleFullscreen,
  browserHistory,
  onClearHistory
}: ProxySettingsProps) {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState<'general' | 'history'>('general')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: -20 }}
        className="bg-black/90 p-6 rounded-lg w-[600px] max-h-[80vh] overflow-hidden flex flex-col backdrop-blur-sm"
        style={{ border: `1px solid ${theme.accent}` }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: theme.accent }}>
            Proxy Settings
          </h2>
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full"
            style={{ color: theme.text }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </motion.button>
        </div>

        <div className="flex gap-4 mb-6">
          {(['general', 'history'] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg capitalize ${
                activeTab === tab ? 'neon-border' : 'glass-effect'
              }`}
              style={{ 
                backgroundColor: activeTab === tab ? `${theme.accent}40` : `${theme.secondary}20`,
                color: theme.text
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg glass-effect"
                style={{ backgroundColor: `${theme.secondary}20` }}>
                <span style={{ color: theme.text }}>Sound</span>
                <motion.button
                  onClick={onToggleSound}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${theme.accent}40` }}
                >
                  <FontAwesomeIcon 
                    icon={isMuted ? faVolumeMute : faVolumeUp}
                    style={{ color: theme.text }}
                  />
                </motion.button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg glass-effect"
                style={{ backgroundColor: `${theme.secondary}20` }}>
                <span style={{ color: theme.text }}>Fullscreen</span>
                <motion.button
                  onClick={onToggleFullscreen}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${theme.accent}40` }}
                >
                  <FontAwesomeIcon 
                    icon={isFullscreen ? faCompress : faExpand}
                    style={{ color: theme.text }}
                  />
                </motion.button>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold" style={{ color: theme.accent }}>
                  Browser History
                </h3>
                <motion.button
                  onClick={onClearHistory}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg flex items-center gap-2"
                  style={{ backgroundColor: `${theme.accent}40`, color: theme.text }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  Clear History
                </motion.button>
              </div>
              
              <div className="space-y-2">
                {browserHistory.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg glass-effect"
                    style={{ backgroundColor: `${theme.secondary}20` }}
                  >
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon 
                        icon={faHistory} 
                        style={{ color: theme.accent }}
                      />
                      <span style={{ color: theme.text }}>{item.url}</span>
                    </div>
                    <span className="text-sm" style={{ color: `${theme.text}80` }}>
                      {item.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

