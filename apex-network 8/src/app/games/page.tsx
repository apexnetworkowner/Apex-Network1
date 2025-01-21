'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faGamepad, faStar, faFire, faHeart } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../../components/ThemeProvider'
import { useAuth } from '../../lib/auth'
import Link from 'next/link'
import Loading from '../../components/Loading'
import ContextMenu from '../../components/ContextMenu'

interface Game {
  id: string
  name: string
  image: string
  url: string
  popularity?: number
  isNew?: boolean
  description?: string
}

const games: Game[] = [
  { 
    id: '1', 
    name: '1v1.LOL', 
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1v1-ieeaDmTfv9u0AQXgmMF474EBLV8ZGp.png', 
    url: '/games/1v1', 
    popularity: 95, 
    isNew: true,
    description: 'Build and fight in this competitive shooter game'
  },
  { 
    id: '2', 
    name: 'Block Blast', 
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BB-324301oLdyA2dv56h226xxYsKRAsga.png', 
    url: '/games/block-blast', 
    popularity: 88,
    description: 'Classic puzzle game with colorful blocks'
  },
  { 
    id: '3', 
    name: 'Call of Duty', 
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/callofduty-g6B5MRmTS63lXWZN7CT2Z7vMlYlSQW.png', 
    url: '/games/cod', 
    popularity: 98,
    description: 'Experience intense military combat'
  },
  { 
    id: '4', 
    name: 'Chess.com', 
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cs-w1pwDDcFCNFENBymwpgyAbB9qR66L0.png', 
    url: '/games/chess', 
    popularity: 92,
    description: 'Play chess online against players worldwide'
  },
  { 
    id: '5', 
    name: 'Bob The Robber', 
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BTR-ngQoiLLfvHDuvcfWdHb5PAEvglAktk.png', 
    url: '/games/bob-the-robber', 
    popularity: 85,
    description: 'Stealth and strategy in this heist game'
  },
  { 
    id: '6', 
    name: 'Cluster Truck', 
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CT-8sLdBj6Btz3RFT9kdqe5R8x6nFTHFF.png', 
    url: '/games/cluster-truck', 
    popularity: 87,
    isNew: true,
    description: 'Jump across moving trucks in this intense action game'
  },
  { 
    id: '7', 
    name: 'Five Nights at Freddy\'s', 
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fnaf1-anSDBNWrxqNwHbXKYfxwxMFLn8Tc3j.png', 
    url: '/games/fnaf1', 
    popularity: 94,
    description: 'Survive the night in this horror classic'
  },
  { 
    id: '8', 
    name: 'FC Mobile', 
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fc-krdbu2QgJTjFY2QC1rFTPAgMz2uQsE.png', 
    url: '/games/fc-mobile', 
    popularity: 90,
    description: 'Ultimate soccer experience on mobile'
  },
  { 
    id: '9', 
    name: 'Five Nights at Freddy\'s 3', 
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fnaf3-yS3aJdrPPyqepVQNeE7V4WGHBbVfiv.png', 
    url: '/games/fnaf3', 
    popularity: 91,
    isNew: true,
    description: 'Face Springtrap in this terrifying sequel'
  },
  { 
    id: '10', 
    name: 'Just Fall LOL', 
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/justfalllol-Ri0rgTrk2t7HHs9VMK9FcEIZHbxbrc.png', 
    url: '/games/just-fall-lol', 
    popularity: 89,
    isNew: true,
    description: 'Compete in crazy multiplayer party games'
  },
]

export default function GamesPage() {
  const { theme } = useTheme()
  const { user, addFavoriteGame, removeFavoriteGame } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredGames, setFilteredGames] = useState<Game[]>(games)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; gameId: string } | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleAddToFavorites = useCallback((gameId: string) => {
    if (user) {
      const game = games.find(g => g.id === gameId)
      if (game) {
        addFavoriteGame(game.name)
      }
    }
    setContextMenu(null)
  }, [user, addFavoriteGame])

  const handleRemoveFromFavorites = useCallback((gameId: string) => {
    if (user) {
      const game = games.find(g => g.id === gameId)
      if (game) {
        removeFavoriteGame(game.name)
      }
    }
    setContextMenu(null)
  }, [user, removeFavoriteGame])

  useEffect(() => {
    const results = games.filter(game =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || 
       (selectedCategory === 'new' && game.isNew) ||
       (selectedCategory === 'popular' && game.popularity && game.popularity > 85) ||
       (selectedCategory === 'favorites' && user && user.favoriteGames.includes(game.name)))
    )
    setFilteredGames(results)
  }, [searchTerm, selectedCategory, user])

  if (!theme) return null

  if (isLoading) return <Loading />

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl"
      >
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold mb-4 glow-text"
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
            APEX GAMES
          </motion.h1>
          <p className="text-lg" style={{ color: theme.text }}>
            Experience the ultimate collection of games
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 rounded-lg text-lg glass-effect"
              style={{ 
                backgroundColor: `${theme.secondary}20`,
                color: theme.text,
                border: `1px solid ${theme.accent}40`
              }}
            />
            <FontAwesomeIcon 
              icon={faSearch} 
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              style={{ color: theme.text }}
            />
          </div>
          
          <div className="flex gap-2 flex-wrap justify-center">
            {[
              { id: 'all', label: 'All Games', icon: faGamepad },
              { id: 'new', label: 'New', icon: faStar },
              { id: 'popular', label: 'Popular', icon: faFire },
              { id: 'favorites', label: 'Favorites', icon: faHeart }
            ].map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  selectedCategory === category.id ? 'neon-border' : 'glass-effect'
                }`}
                style={{ 
                  backgroundColor: selectedCategory === category.id ? `${theme.accent}40` : `${theme.secondary}20`,
                  color: theme.text
                }}
              >
                <FontAwesomeIcon icon={category.icon} />
                <span>{category.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                onContextMenu={(e) => {
                  e.preventDefault()
                  setContextMenu({ x: e.clientX, y: e.clientY, gameId: game.id })
                }}
              >
                <Link href={game.url}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-4 rounded-xl glass-effect group"
                    style={{ 
                      backgroundColor: `${theme.secondary}20`,
                      border: `1px solid ${theme.accent}40`
                    }}
                  >
                    <div className="relative mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={game.image} 
                        alt={game.name}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {game.isNew && (
                        <div 
                          className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold"
                          style={{ backgroundColor: theme.accent, color: theme.text }}
                        >
                          NEW
                        </div>
                      )}
                    </div>
                    <h3 
                      className="text-xl font-bold mb-2"
                      style={{ color: theme.accent }}
                    >
                      {game.name}
                    </h3>
                    {game.description && (
                      <p 
                        className="text-sm mb-3 opacity-80"
                        style={{ color: theme.text }}
                      >
                        {game.description}
                      </p>
                    )}
                    {game.popularity && (
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faFire} style={{ color: theme.text }} />
                        <div 
                          className="h-2 flex-1 rounded-full overflow-hidden"
                          style={{ backgroundColor: `${theme.secondary}40` }}
                        >
                          <motion.div
                            className="h-full"
                            style={{ backgroundColor: theme.accent }}
                            initial={{ width: 0 }}
                            animate={{ width: `${game.popularity}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          options={[
            {
              label: user && user.favoriteGames.includes(games.find(g => g.id === contextMenu.gameId)?.name || '') 
                ? 'Remove from Favorites' 
                : 'Add to Favorites',
              onClick: () => user && user.favoriteGames.includes(games.find(g => g.id === contextMenu.gameId)?.name || '')
                ? handleRemoveFromFavorites(contextMenu.gameId)
                : handleAddToFavorites(contextMenu.gameId)
            }
          ]}
        />
      )}
    </div>
  )
}

