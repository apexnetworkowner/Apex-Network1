import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import { ThemeName } from './themes'

interface User {
  id: string
  username: string
  passwordHash: string
  claimedThemes: ThemeName[]
  favoriteGames: string[]
  favoriteTheme: ThemeName
}

const STORAGE_KEY = 'apex_network_user'

export function useAuth() {
  const [user, setUser] = useState<Omit<User, 'passwordHash'> | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY)
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(omitPasswordHash(parsedUser))
    }
  }, [])

  const signup = async (username: string, password: string) => {
    if (await getUserByUsername(username)) {
      throw new Error('Username already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser: User = {
      id: uuidv4(),
      username,
      passwordHash,
      claimedThemes: [],
      favoriteGames: [],
      favoriteTheme: 'bloodRed',
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
    setUser(omitPasswordHash(newUser))
  }

  const login = async (username: string, password: string) => {
    const storedUser = await getUserByUsername(username)
    if (!storedUser) {
      throw new Error('User not found')
    }

    const isMatch = await bcrypt.compare(password, storedUser.passwordHash)
    if (!isMatch) {
      throw new Error('Invalid password')
    }

    setUser(omitPasswordHash(storedUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const claimTheme = (theme: ThemeName) => {
    if (user && !user.claimedThemes.includes(theme)) {
      const updatedUser = {
        ...user,
        claimedThemes: [...user.claimedThemes, theme],
      }
      updateUser(updatedUser)
    }
  }

  const addFavoriteGame = (game: string) => {
    if (user && !user.favoriteGames.includes(game)) {
      const updatedUser = {
        ...user,
        favoriteGames: [...user.favoriteGames, game],
      }
      updateUser(updatedUser)
    }
  }

  const setFavoriteTheme = (theme: ThemeName) => {
    if (user) {
      const updatedUser = {
        ...user,
        favoriteTheme: theme,
      }
      updateUser(updatedUser)
    }
  }

  const updateUser = (updatedUser: Omit<User, 'passwordHash'>) => {
    const storedUser = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    const mergedUser = { ...storedUser, ...updatedUser }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedUser))
    setUser(omitPasswordHash(mergedUser))
  }

  return { user, signup, login, logout, claimTheme, addFavoriteGame, setFavoriteTheme }
}

async function getUserByUsername(username: string): Promise<User | null> {
  const storedUser = localStorage.getItem(STORAGE_KEY)
  if (storedUser) {
    const user = JSON.parse(storedUser)
    if (user.username === username) {
      return user
    }
  }
  return null
}

function omitPasswordHash(user: User): Omit<User, 'passwordHash'> {
  const { passwordHash, ...userWithoutPassword } = user
  return userWithoutPassword
}

