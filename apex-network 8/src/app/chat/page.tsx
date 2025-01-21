'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faLink,
  faChevronDown,
  faGamepad,
  faCode,
  faFilm,
  faMusic,
  faBook,
  faStar,
  faCalendarWeek
} from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../../components/ThemeProvider'

interface WeeklyLink {
  title: string
  url: string
  description: string
  category: 'games' | 'dev' | 'entertainment' | 'music' | 'education'
  isNew?: boolean
  isFeatured?: boolean
}

const categories = [
  { id: 'games', icon: faGamepad, label: 'Games' },
  { id: 'dev', icon: faCode, label: 'Development' },
  { id: 'entertainment', icon: faFilm, label: 'Entertainment' },
  { id: 'music', icon: faMusic, label: 'Music' },
  { id: 'education', icon: faBook, label: 'Education' }
] as const

export default function WeeklyLinksPage() {
  const { theme } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedLink, setExpandedLink] = useState<string | null>(null)

  // Sample weekly links data
  const weeklyLinks: WeeklyLink[] = [
    {
      title: "New Minecraft Update",
      url: "https://minecraft.net",
      description: "Explore the latest Minecraft update featuring new biomes, mobs, and building materials. This major update brings exciting changes to the game's mechanics and introduces challenging new adventures for players to discover.",
      category: "games",
      isNew: true,
      isFeatured: true
    },
    {
      title: "React 19 Preview",
      url: "https://react.dev",
      description: "Get a sneak peek at the upcoming React 19 release. Learn about new features, performance improvements, and breaking changes that will shape the future of React development.",
      category: "dev",
      isNew: true
    },
    {
      title: "Latest Movies This Week",
      url: "https://movies.example.com",
      description: "Check out this week's movie releases, including blockbuster hits and indie gems. Find reviews, ratings, and where to watch them.",
      category: "entertainment"
    },
    {
      title: "Top Spotify Playlists",
      url: "https://spotify.com",
      description: "Discover this week's trending playlists on Spotify. From chart-toppers to hidden gems, find your next favorite track.",
      category: "music",
      isFeatured: true
    },
    {
      title: "Free Online Courses",
      url: "https://courses.example.com",
      description: "Access free online courses from top universities. Topics range from programming to art history.",
      category: "education"
    }
  ]

  const filteredLinks = selectedCategory === 'all' 
    ? weeklyLinks 
    : weeklyLinks.filter(link => link.category === selectedCategory)

  return (
    <div className="min-h-screen py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-5xl font-bold mb-4 glow-text"
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
            WEEKLY LINKS
          </motion.h1>
          <motion.div
            className="flex items-center justify-center gap-2 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FontAwesomeIcon icon={faCalendarWeek} style={{ color: theme.text }} />
            <p style={{ color: theme.text }}>
              Curated collection of the week's best links
            </p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <motion.button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
              selectedCategory === 'all' ? 'neon-border' : 'glass-effect'
            }`}
            style={{ 
              backgroundColor: selectedCategory === 'all' ? `${theme.accent}40` : `${theme.secondary}20`,
              color: theme.text
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faLink} />
            <span>All</span>
          </motion.button>

          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                selectedCategory === category.id ? 'neon-border' : 'glass-effect'
              }`}
              style={{ 
                backgroundColor: selectedCategory === category.id ? `${theme.accent}40` : `${theme.secondary}20`,
                color: theme.text
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={category.icon} />
              <span>{category.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Links Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredLinks.map((link) => (
              <motion.div
                key={link.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative"
              >
                <motion.div
                  className={`p-6 rounded-lg glass-effect ${
                    link.isFeatured ? 'neon-border' : ''
                  }`}
                  style={{ 
                    backgroundColor: `${theme.secondary}20`,
                    border: link.isFeatured ? `1px solid ${theme.accent}` : undefined
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FontAwesomeIcon 
                          icon={categories.find(c => c.id === link.category)?.icon || faLink}
                          style={{ color: theme.accent }}
                        />
                        <h3 className="text-xl font-semibold" style={{ color: theme.accent }}>
                          {link.title}
                        </h3>
                        {link.isNew && (
                          <span 
                            className="px-2 py-1 text-xs rounded-full"
                            style={{ backgroundColor: theme.accent, color: theme.text }}
                          >
                            NEW
                          </span>
                        )}
                        {link.isFeatured && (
                          <FontAwesomeIcon 
                            icon={faStar} 
                            className="text-sm"
                            style={{ color: theme.accent }}
                          />
                        )}
                      </div>
                      <motion.p
                        className="text-sm mb-4"
                        style={{ color: theme.text }}
                        animate={{ height: expandedLink === link.title ? 'auto' : '3em' }}
                      >
                        {link.description}
                      </motion.p>
                    </div>
                    <motion.button
                      onClick={() => setExpandedLink(
                        expandedLink === link.title ? null : link.title
                      )}
                      className="p-2 rounded-full hover:bg-opacity-50 transition-colors"
                      style={{ color: theme.text }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.div
                        animate={{ 
                          rotate: expandedLink === link.title ? 180 : 0 
                        }}
                      >
                        <FontAwesomeIcon icon={faChevronDown} />
                      </motion.div>
                    </motion.button>
                  </div>
                  <motion.a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 rounded-lg text-sm"
                    style={{ 
                      backgroundColor: theme.accent,
                      color: theme.text
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Visit Link
                  </motion.a>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

