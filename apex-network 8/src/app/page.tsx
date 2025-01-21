'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket, faShieldAlt, faBolt, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../components/ThemeProvider'
import Loading from '../components/Loading'

export default function Home() {
  const { theme } = useTheme()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!theme) return null

  if (isLoading) return <Loading />

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.h1 
          className="text-7xl font-bold mb-8 glow-text"
          style={{ color: theme.accent }}
          animate={{ 
            textShadow: [
              '0 0 10px var(--color-accent)',
              '0 0 20px var(--color-accent)',
              '0 0 10px var(--color-accent)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          APEX NETWORK
        </motion.h1>
        <motion.p 
          className="text-xl mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ color: theme.text }}
        >
          Apex v1 has released in a v2 will check here to stay updated.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link 
            href="/proxy"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold overflow-hidden rounded-full neon-border"
            style={{
              backgroundColor: `${theme.primary}80`,
              color: theme.text,
            }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  `linear-gradient(45deg, ${theme.accent}00, ${theme.accent}40)`,
                  `linear-gradient(45deg, ${theme.accent}40, ${theme.accent}00)`,
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="relative flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faRocket} className="mr-2" />
              <span>Launch Now</span>
            </motion.div>
          </Link>
        </motion.div>

        <motion.div 
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[
            { icon: faShieldAlt, title: 'Security', description: 'Advanced encryption and protection' },
            { icon: faBolt, title: 'Speed', description: 'Lightning-fast performance' },
            { icon: faGlobe, title: 'Access', description: 'Unrestricted global connectivity' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl glass-effect"
              style={{ backgroundColor: `${theme.secondary}20` }}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${theme.accent}20` }}
                animate={{ 
                  boxShadow: [
                    `0 0 0 ${theme.accent}40`,
                    `0 0 20px ${theme.accent}40`,
                    `0 0 0 ${theme.accent}40`
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FontAwesomeIcon 
                  icon={feature.icon} 
                  className="text-2xl"
                  style={{ color: theme.accent }}
                />
              </motion.div>
              <h3 
                className="text-xl font-semibold mb-2"
                style={{ color: theme.accent }}
              >
                {feature.title}
              </h3>
              <p style={{ color: theme.text }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

