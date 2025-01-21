'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSearch, 
  faHistory, 
  faStar, 
  faGlobe,
  faArrowRight,
  faClock
} from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../../components/ThemeProvider'

interface SearchSuggestionsProps {
  query: string
  onSelect: (suggestion: string) => void
  recentSearches: string[]
}

export default function SearchSuggestions({ query, onSelect, recentSearches }: SearchSuggestionsProps) {
  const { theme } = useTheme()
  const [suggestions, setSuggestions] = useState<Array<{
    text: string
    type: 'search' | 'history' | 'url' | 'trending'
  }>>([])

  useEffect(() => {
    if (query) {
      // Simulate search suggestions
      const searchSuggestions = [
        { text: `${query} search`, type: 'search' as const },
        { text: `${query} online`, type: 'search' as const },
        { text: `${query}.com`, type: 'url' as const },
        { text: `best ${query}`, type: 'trending' as const },
        { text: `${query} tutorial`, type: 'trending' as const },
      ]
      setSuggestions(searchSuggestions)
    } else if (recentSearches.length > 0) {
      // Show recent searches when no query
      setSuggestions(
        recentSearches.slice(0, 5).map(search => ({
          text: search,
          type: 'history' as const
        }))
      )
    } else {
      setSuggestions([])
    }
  }, [query, recentSearches])

  if (!suggestions.length) return null

  return (
    <motion.div
      className="w-full rounded-xl overflow-hidden z-50 glass-effect border"
      style={{ 
        backgroundColor: `${theme.secondary}80`,
        borderColor: `${theme.accent}40`,
        backdropFilter: 'blur(10px)'
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="p-2">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={index}
            className="w-full px-4 py-3 flex items-center gap-4 rounded-lg hover:bg-opacity-50 transition-colors"
            style={{ 
              backgroundColor: 'transparent',
              color: theme.text
            }}
            onClick={() => onSelect(suggestion.text)}
            whileHover={{ backgroundColor: `${theme.accent}20` }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <FontAwesomeIcon 
              icon={
                suggestion.type === 'search' ? faSearch :
                suggestion.type === 'history' ? faClock :
                suggestion.type === 'url' ? faGlobe :
                faStar
              }
              className={`text-lg ${
                suggestion.type === 'trending' ? 'text-yellow-500' :
                suggestion.type === 'history' ? 'opacity-70' :
                ''
              }`}
              style={{ color: theme.accent }}
            />
            <span className="flex-1 text-left">{suggestion.text}</span>
            {suggestion.type === 'trending' && (
              <span 
                className="text-xs px-2 py-1 rounded-full"
                style={{ backgroundColor: `${theme.accent}40` }}
              >
                Trending
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

