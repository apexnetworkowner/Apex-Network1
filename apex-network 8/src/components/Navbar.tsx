'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faHome,
  faGamepad,
  faGear,
  faSearch,
  faLink,
  faPlus,
  faClock,
  faStar
} from '@fortawesome/free-solid-svg-icons'
import { useTheme } from './ThemeProvider'

export default function Navbar() {
  const quickLinks = [
    { name: 'Google', icon: 'https://www.google.com/favicon.ico', url: 'https://google.com' },
    { name: 'Discord', icon: 'https://discord.com/assets/847541504914fd33810e70a0ea73177e.ico', url: 'https://discord.com' },
    { name: 'GitHub', icon: 'https://github.githubassets.com/favicons/favicon.svg', url: 'https://github.com' },
    { name: 'YouTube', icon: 'https://www.youtube.com/s/desktop/8498231a/img/favicon_32x32.png', url: 'https://youtube.com' },
  ]

  const { theme } = useTheme()
  const [time, setTime] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [quickLinksState, setQuickLinksState] = useState(quickLinks)
  const [showAddLinkModal, setShowAddLinkModal] = useState(false)
  const [bookmarks, setBookmarks] = useState<Array<{ name: string, url: string }>>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])


  const navItems = [
    { href: '/', icon: faHome, label: 'Home' },
    { href: '/games', icon: faGamepad, label: 'Games' },
    { href: '/proxy', icon: faSearch, label: 'Proxy' },
    { href: '/chat', icon: faLink, label: 'Chat' },
    { href: '/settings', icon: faGear, label: 'Settings' },
  ]

  if (!theme) return null

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed left-0 top-0 h-screen w-20 flex flex-col items-center py-8 glass-effect"
        style={{ backgroundColor: `${theme.primary}10` }}
      >
        <div className="flex flex-col items-center space-y-12">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="group relative"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 flex items-center justify-center rounded-xl transition-all duration-200"
                style={{ 
                  backgroundColor: `${theme.secondary}20`,
                  border: `1px solid ${theme.accent}40`
                }}
              >
                <FontAwesomeIcon 
                  icon={item.icon} 
                  className="text-2xl transition-colors duration-200"
                  style={{ color: theme.text }}
                />
              </motion.div>
              <div 
                className="absolute left-full ml-2 px-2 py-1 rounded bg-opacity-90 invisible group-hover:visible"
                style={{ backgroundColor: theme.secondary }}
              >
                <span className="text-sm" style={{ color: theme.text }}>{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="flex-1 ml-20">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed top-0 left-20 right-0 z-50 glass-effect"
          style={{ 
            backgroundColor: `${theme.primary}10`,
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Digital Clock */}
          <div className="flex items-center justify-between px-6 py-4 gap-4">
            {/* Left side - Clock */}
            <motion.div
              className="flex items-center space-x-2 shrink-0"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FontAwesomeIcon icon={faClock} style={{ color: theme.accent }} />
              <span className="text-xl font-bold" style={{ color: theme.accent }}>
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </motion.div>

            {/* Center - Search Bar */}
            <div className="flex-1 max-w-2xl">
              <motion.div
                animate={isSearchFocused ? { scale: 1.02 } : { scale: 1 }}
                className="relative"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search or enter URL"
                  className="w-full px-4 py-2 rounded-lg text-sm transition-all duration-200"
                  style={{ 
                    backgroundColor: `${theme.secondary}20`,
                    color: theme.text,
                    border: `1px solid ${isSearchFocused ? theme.accent : 'transparent'}`,
                  }}
                />
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  style={{ color: theme.text }}
                />
              </motion.div>
            </div>

            {/* Right side - Quick Links */}
            <div className="flex items-center space-x-4 shrink-0">
              {bookmarks.map((bookmark, index) => (
                <motion.a
                  key={index}
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center glass-effect"
                    style={{ backgroundColor: `${theme.secondary}40` }}
                  >
                    <FontAwesomeIcon icon={faStar} className="w-5 h-5" style={{ color: theme.text }} />
                  </div>
                  <span 
                    className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs invisible group-hover:visible"
                    style={{ backgroundColor: theme.secondary, color: theme.text }}
                  >
                    {bookmark.name}
                  </span>
                </motion.a>
              ))}
              <motion.button
                type="button"
                onClick={() => setShowAddLinkModal(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-full flex items-center justify-center glass-effect"
                style={{ backgroundColor: `${theme.secondary}40` }}
              >
                <FontAwesomeIcon icon={faPlus} style={{ color: theme.text }} />
              </motion.button>

              {showAddLinkModal && (
                <div className="fixed inset-0 backdrop-blur-md bg-black/50 flex items-center justify-center z-50">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: -20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    className="bg-black/90 p-6 rounded-lg w-96 backdrop-blur-sm"
                    style={{ border: `1px solid ${theme.accent}` }}
                  >
                    <h3 className="text-xl mb-4" style={{ color: theme.accent }}>Add Bookmark</h3>
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      const formData = new FormData(e.currentTarget)
                      const newBookmark = {
                        name: formData.get('name') as string,
                        url: formData.get('url') as string,
                      }
                      setBookmarks([...bookmarks, newBookmark])
                      setShowAddLinkModal(false)
                    }}>
                      <input
                        name="name"
                        placeholder="Bookmark Name"
                        className="w-full mb-2 p-2 rounded bg-transparent"
                        style={{ border: `1px solid ${theme.accent}`, color: theme.text }}
                        required
                      />
                      <input
                        name="url"
                        placeholder="URL (https://...)"
                        className="w-full mb-4 p-2 rounded bg-transparent"
                        style={{ border: `1px solid ${theme.accent}`, color: theme.text }}
                        required
                      />
                      <div className="flex justify-end gap-2">
                        <motion.button
                          type="button"
                          onClick={() => setShowAddLinkModal(false)}
                          className="px-4 py-2 rounded"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{ backgroundColor: `${theme.secondary}40`, color: theme.text }}
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          type="submit"
                          className="px-4 py-2 rounded"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{ backgroundColor: theme.accent, color: theme.text }}
                        >
                          Add
                        </motion.button>
                      </div>
                    </form>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

