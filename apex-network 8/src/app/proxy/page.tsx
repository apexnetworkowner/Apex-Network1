'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSearch, 
  faHome,
  faArrowLeft,
  faArrowRight,
  faVolumeUp,
  faVolumeMute,
  faExpand,
  faCompress,
  faClock,
  faBars,
  faChevronLeft,
  faChevronRight,
  faHistory,
  faStar,
  faCog,
  faGlobe,
  faXmark,
  faRocket,
  faSatellite,
  faUserAstronaut
} from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../../components/ThemeProvider'
import ParticleField from './ParticleField'
import SearchSuggestions from './SearchSuggestions'
import ProxySettings from '../../components/ProxySettings'

declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
  }

  interface HTMLElement {
    mozRequestFullScreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
  }
}

interface HistoryItem {
  url: string
  timestamp: Date
}

export default function ProxyPage() {
  const { theme } = useTheme()
  const [time, setTime] = useState(new Date())
  const [url, setUrl] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [browserHistory, setBrowserHistory] = useState<HistoryItem[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
  }, [recentSearches])

  const toggleFullscreen = () => {
    if (!document) {
      console.warn('Document not available. Fullscreen may not work.');
      return;
    }

    const elem = document.documentElement;
    if (!isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const toggleSound = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
      setIsMuted(!isMuted)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setIsSearching(true);
    let searchUrl = url
    if (!isUrl(url)) {
      searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(url)
      setRecentSearches(prev => {
        const newSearches = [url, ...prev.filter(s => s !== url)].slice(0, 10)
        return newSearches
      })
    } else if (!/^https?:\/\//i.test(url)) {
      searchUrl = 'https://' + url
    }

    setBrowserHistory(prev => [{
      url: searchUrl,
      timestamp: new Date()
    }, ...prev])

    window.open(searchUrl, '_blank');
    setIsSearching(false);
    setUrl('');
  }

  const isUrl = (string: string) => {
    try {
      new URL(string)
      return true
    } catch {
      return false
    }
  }

  const clearHistory = () => {
    setBrowserHistory([])
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (pageRef.current) {
      const rect = pageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Pass mouse coordinates to ParticleField
      // We'll update ParticleField component to accept these props
    }
  };

  return (
    <div ref={pageRef} className="relative min-h-screen overflow-hidden" style={{ background: theme.background }} onMouseMove={handleMouseMove}>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-t-4 border-accent rounded-full"
            style={{ borderTopColor: theme.accent }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
      <ParticleField />
      
      <motion.div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="stars"></div>
        <div className="twinkling"></div>
      </motion.div>

      <motion.h1 
        className="text-6xl font-bold mb-8 glow-text text-center pt-20"
        style={{ color: theme.accent }}
        animate={{ 
          textShadow: [
            '0 0 10px var(--color-accent)',
            '0 0 20px var(--color-accent)',
            '0 0 10px var(--color-accent)'
          ],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        APEX PROXY
      </motion.h1>
      <motion.p 
        className="text-2xl mb-12 glow-text text-center"
        style={{ color: theme.text }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {'Explore the Digital Universe'}
      </motion.p>

      <audio ref={audioRef} loop>
        <source src="/ambient-space.mp3" type="audio/mp3" />
      </audio>

      {(isMobile && isMobileMenuOpen) || !isMobile ? (
        <motion.aside
          className={`fixed top-0 left-0 h-full z-50 glass-effect border-r flex flex-col transition-all duration-300 ${
            isSidebarCollapsed ? 'w-16' : 'w-64'
          }`}
          style={{ 
            backgroundColor: `${theme.secondary}40`,
            borderColor: `${theme.accent}20`
          }}
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-accent/20">
            <motion.div
              className="flex items-center justify-between"
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {!isSidebarCollapsed && (
                <motion.span
                  className="text-xl font-bold"
                  style={{ color: theme.accent }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  APEX
                </motion.span>
              )}
              <motion.button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FontAwesomeIcon 
                  icon={isSidebarCollapsed ? faChevronRight : faChevronLeft}
                  style={{ color: theme.accent }}
                />
              </motion.button>
            </motion.div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="space-y-2 px-2">
              {[
                { icon: faHome, label: 'Home', onClick: () => window.location.href = '/' },
                { icon: faRocket, label: 'Launch', onClick: () => handleSubmit(new Event('submit') as React.FormEvent) },
                { icon: faSatellite, label: 'Explore', onClick: () => setUrl('https://www.nasa.gov') },
                { 
                  icon: isMuted ? faVolumeMute : faVolumeUp, 
                  label: isMuted ? 'Unmute' : 'Mute',
                  onClick: toggleSound
                },
                {
                  icon: isFullscreen ? faCompress : faExpand,
                  label: isFullscreen ? 'Exit Fullscreen' : 'Fullscreen',
                  onClick: toggleFullscreen
                },
                { 
                  icon: faHistory, 
                  label: 'Flight Log', 
                  onClick: () => {
                    setShowSettings(true)
                    setTimeout(() => document.querySelector('[data-tab="history"]')?.click(), 100)
                  }
                },
                { 
                  icon: faCog, 
                  label: 'Mission Control',
                  onClick: () => setShowSettings(true)
                },
              ].map((item, index) => (
                <motion.button
                  key={index}
                  onClick={item.onClick}
                  className={`w-full flex items-center gap-4 p-2 rounded-lg hover:bg-accent/10 transition-colors ${
                    isSidebarCollapsed ? 'justify-center' : 'justify-start'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon 
                    icon={item.icon}
                    className="text-xl"
                    style={{ color: theme.accent }}
                  />
                  {!isSidebarCollapsed && (
                    <span style={{ color: theme.text }}>
                      {item.label}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Clock at bottom */}
          <div className="p-4 border-t border-accent/20">
            <motion.div
              className="flex items-center justify-center"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FontAwesomeIcon 
                icon={faClock}
                className="text-sm mr-2"
                style={{ color: theme.accent }}
              />
              <span 
                className={`text-sm font-medium ${isSidebarCollapsed ? 'hidden' : 'block'}`}
                style={{ color: theme.accent }}
              >
                {time.toLocaleTimeString([], { 
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </motion.div>
          </div>
        </motion.aside>
      ) : null}

      {/* Main Content */}
      <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen p-4 transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        {/* Search Bar */}
        <motion.div
          ref={searchContainerRef}
          className="w-full max-w-3xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="relative">
            <motion.div
              animate={isSearchFocused ? { 
                scale: 1.02,
                boxShadow: `0 0 20px ${theme.accent}40`
              } : { 
                scale: 1,
                boxShadow: 'none'
              }}
              className="relative"
            >
              <div className="relative flex items-center">
                <motion.div
                  className="absolute left-6"
                  animate={{ 
                    scale: isSearchFocused ? 1.1 : 1,
                    color: isSearchFocused ? theme.accent : theme.text
                  }}
                >
                  <FontAwesomeIcon icon={faUserAstronaut} className="text-xl" />
                </motion.div>
                <label htmlFor="search-input" className="sr-only">Navigate the cosmos</label>
                <input
                  id="search-input"
                  type="text"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value)
                    setShowSuggestions(true)
                  }}
                  onFocus={() => {
                    setIsSearchFocused(true)
                    setShowSuggestions(true)
                  }}
                  onBlur={() => {
                    setIsSearchFocused(false)
                    setTimeout(() => setShowSuggestions(false), 200)
                  }}
                  placeholder="Navigate the cosmos"
                  className="w-full pl-16 pr-20 py-4 rounded-full text-lg transition-all duration-200 glass-effect"
                  style={{ 
                    backgroundColor: `${theme.secondary}20`,
                    color: theme.text,
                    border: `2px solid ${isSearchFocused ? theme.accent : 'transparent'}`,
                  }}
                />
                <div className="absolute right-4 flex items-center gap-2">
                  {url && (
                    <motion.button
                      type="button"
                      onClick={() => setUrl('')}
                      className="p-2 rounded-full hover:bg-opacity-50 transition-colors"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FontAwesomeIcon 
                        icon={faXmark}
                        className="text-lg"
                        style={{ color: theme.text }}
                      />
                    </motion.button>
                  )}
                  <motion.button
                    type="submit"
                    className="p-2 rounded-full glass-effect"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ 
                      backgroundColor: `${theme.accent}40`,
                    }}
                  >
                    <FontAwesomeIcon 
                      icon={faRocket} 
                      className="text-xl"
                      style={{ color: theme.text }}
                    />
                  </motion.button>
                </div>
              </div>
            </motion.div>
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute w-full mt-2"
                >
                  <SearchSuggestions 
                    query={url} 
                    onSelect={(suggestion) => {
                      setUrl(suggestion);
                      handleSubmit(new Event('submit') as React.FormEvent);
                    }}
                    recentSearches={recentSearches}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>

      {/* Mobile menu button - only visible on mobile */}
      {isMobile && (
        <motion.button
          className="fixed bottom-4 right-4 z-50 p-4 rounded-full glass-effect"
          style={{ backgroundColor: theme.accent }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FontAwesomeIcon 
            icon={isMobileMenuOpen ? faChevronLeft : faBars}
            style={{ color: theme.text }}
          />
        </motion.button>
      )}

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <ProxySettings
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
            isMuted={isMuted}
            isFullscreen={isFullscreen}
            onToggleSound={toggleSound}
            onToggleFullscreen={toggleFullscreen}
            browserHistory={browserHistory}
            onClearHistory={clearHistory}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

