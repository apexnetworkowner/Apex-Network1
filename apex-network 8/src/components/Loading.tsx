'use client'

import { useTheme } from './ThemeProvider'
import { motion } from 'framer-motion'
import LoadingBackground from './LoadingBackground'

export default function Loading() {
  const { theme } = useTheme()

  if (!theme) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <LoadingBackground />
      <div className="text-center z-10">
        <motion.div
          className="w-64 h-2 mb-4 rounded-full overflow-hidden"
          style={{ backgroundColor: `${theme.secondary}40` }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: theme.accent }}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        <motion.h2
          className="text-4xl font-bold glow-text"
          style={{ color: theme.accent }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          APEX IS LOADING
        </motion.h2>
        <motion.div
          className="mt-4 flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: theme.accent }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

