'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faChevronDown, 
  faLock, 
  faUnlock, 
  faStar, 
  faTrash, 
  faPlus,
  faPalette,
  faGamepad,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../../components/ThemeProvider'
import { themes, ThemeName } from '../../lib/themes'
import { useAuth } from '../../lib/auth'
import { AuthForm } from '../../components/AuthForm'
import Loading from '../../components/Loading'

export default function Settings() {
  const { theme, setTheme, availableThemes } = useTheme()
  const { user, logout, claimTheme, addFavoriteGame, removeFavoriteGame, setFavoriteTheme } = useAuth()
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>('default')
  const [isThemeOpen, setIsThemeOpen] = useState(false)
  const [newGame, setNewGame] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'theme' | 'games' | 'account'>('theme')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (theme) {
      const currentTheme = Object.entries(themes).find(([_, t]) => t === theme)
      if (currentTheme) {
        setSelectedTheme(currentTheme[0] as ThemeName)
      }
    }
  }, [theme])

  const handleThemeChange = (newTheme: ThemeName) => {
    setSelectedTheme(newTheme)
    setTheme(newTheme)
    if (user) {
      setFavoriteTheme(newTheme)
    }
    setIsThemeOpen(false)
  }

  const handleClaimTheme = (themeName: ThemeName) => {
    claimTheme(themeName)
  }

  const handleAddFavoriteGame = (e: React.FormEvent) => {
    e.preventDefault()
    if (newGame.trim() && user) {
      addFavoriteGame(newGame.trim())
      setNewGame('')
    }
  }

  if (!theme) return null

  if (isLoading) return <Loading />

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4">
      <motion.h1 
        className="text-5xl font-bold mb-12 glow-text"
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
        APEX SETTINGS
      </motion.h1>
      <motion.div 
        className="bg-opacity-20 p-8 rounded-lg w-full max-w-4xl glow-border"
        style={{ backgroundColor: theme.primary }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {user ? (
          <>
            <motion.h2 
              className="text-3xl font-semibold mb-8 glow-text" 
              style={{ color: theme.accent }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Welcome, {user.username}!
            </motion.h2>
            <div className="flex mb-8 gap-4">
              {(['theme', 'games', 'account'] as const).map((tab) => (
                <motion.button
                  key={tab}
                  className={`flex-1 p-4 rounded-lg flex items-center justify-center gap-2 ${
                    activeTab === tab ? 'neon-border' : 'glass-effect'
                  }`}
                  style={{ 
                    backgroundColor: activeTab === tab ? `${theme.accent}40` : `${theme.secondary}20`,
                    color: theme.text
                  }}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={
                    tab === 'theme' ? faPalette : 
                    tab === 'games' ? faGamepad : 
                    faUser
                  } />
                  <span className="capitalize">{tab}</span>
                </motion.button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {activeTab === 'theme' && (
                <motion.div
                  key="theme"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-semibold mb-4 glow-text" style={{ color: theme.accent }}>Choose Your Theme</h3>
                  <div className="relative mb-6">
                    <button
                      className="w-full p-4 rounded-lg flex items-center justify-between glass-effect"
                      style={{
                        backgroundColor: `${theme.secondary}40`,
                        color: theme.text,
                        border: `2px solid ${theme.accent}`,
                      }}
                      onClick={() => setIsThemeOpen(!isThemeOpen)}
                    >
                      <span>{themes[selectedTheme].name}</span>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`transition-transform duration-300 ${isThemeOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {isThemeOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute mt-2 w-full rounded-lg overflow-hidden z-10"
                          style={{ backgroundColor: theme.secondary, border: `2px solid ${theme.accent}` }}
                        >
                          {availableThemes.map((themeName) => (
                            <motion.button
                              key={themeName}
                              className="w-full p-4 text-left hover:bg-opacity-50 transition-colors duration-200 flex justify-between items-center"
                              style={{
                                backgroundColor: themeName === selectedTheme ? `${theme.accent}40` : 'transparent',
                                color: theme.text,
                              }}
                              onClick={() => handleThemeChange(themeName)}
                              whileHover={{ backgroundColor: `${theme.accent}20` }}
                            >
                              <span>{themes[themeName].name}</span>
                              {themes[themeName].limited && (
                                <FontAwesomeIcon icon={faUnlock} className="text-green-500" />
                              )}
                              {user.favoriteTheme === themeName && (
                                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                              )}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {!user.claimedThemes.includes('arcticFrost') && (
                    <motion.button
                      className="w-full p-4 rounded-lg mb-6 flex items-center justify-center glass-effect"
                      style={{
                        backgroundColor: `${theme.accent}40`,
                        color: theme.text,
                        boxShadow: `0 0 10px ${theme.accent}, 0 0 20px ${theme.accent}`
                      }}
                      onClick={() => handleClaimTheme('arcticFrost')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FontAwesomeIcon icon={faLock} className="mr-2" />
                      Claim Limited Edition Arctic Frost Theme
                    </motion.button>
                  )}
                </motion.div>
              )}
              {activeTab === 'games' && (
                <motion.div
                  key="games"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-semibold mb-4 glow-text" style={{ color: theme.accent }}>Favorite Games</h3>
                  <ul className="mb-4 space-y-2">
                    {user.favoriteGames.map((game, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-center justify-between p-3 rounded-lg glass-effect"
                        style={{ backgroundColor: `${theme.secondary}20`, color: theme.text }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span>{game}</span>
                        <motion.button
                          onClick={() => removeFavoriteGame(game)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FontAwesomeIcon icon={faTrash} style={{ color: theme.accent }} />
                        </motion.button>
                      </motion.li>
                    ))}
                  </ul>
                  <form onSubmit={handleAddFavoriteGame} className="mb-6">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newGame}
                        onChange={(e) => setNewGame(e.target.value)}
                        placeholder="Add a new favorite game"
                        className="flex-grow p-3 rounded-lg glass-effect"
                        style={{ backgroundColor: `${theme.secondary}20`, color: theme.text }}
                      />
                      <motion.button
                        type="submit"
                        className="p-3 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: theme.accent, color: theme.primary }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}
              {activeTab === 'account' && (
                <motion.div
                  key="account"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-semibold mb-4 glow-text" style={{ color: theme.accent }}>Account Settings</h3>
                  <p className="mb-4" style={{ color: theme.text }}>Username: {user.username}</p>
                  <motion.button
                    className="w-full p-4 rounded-lg glass-effect"
                    style={{
                      backgroundColor: `${theme.secondary}40`,
                      color: theme.text,
                    }}
                    onClick={logout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Log out
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-semibold mb-6 glow-text" style={{ color: theme.accent }}>Log in or Sign up</h2>
            <AuthForm />
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

