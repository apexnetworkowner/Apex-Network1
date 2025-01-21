'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { themes, ThemeName } from '../lib/themes'
import { useAuth } from '../lib/auth'

type Theme = typeof themes.cosmicVoid

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: ThemeName) => void
  availableThemes: ThemeName[]
}>({
  theme: themes.cosmicVoid,
  setTheme: () => {},
  availableThemes: [],
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const [theme, setTheme] = useState<Theme>(themes.cosmicVoid)

  useEffect(() => {
    if (user && themes[user.favoriteTheme as ThemeName]) {
      setTheme(themes[user.favoriteTheme as ThemeName])
    } else {
      const savedTheme = localStorage.getItem('theme') as ThemeName
      if (savedTheme && themes[savedTheme]) {
        setTheme(themes[savedTheme])
      }
    }
  }, [user])

  const updateTheme = (newTheme: ThemeName) => {
    setTheme(themes[newTheme])
    localStorage.setItem('theme', newTheme)
  }

  const availableThemes = Object.keys(themes) as ThemeName[]

  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', theme.primary)
    document.documentElement.style.setProperty('--color-secondary', theme.secondary)
    document.documentElement.style.setProperty('--color-text', theme.text)
    document.documentElement.style.setProperty('--color-accent', theme.accent)
    document.documentElement.style.setProperty('--background', theme.background)
    document.documentElement.style.setProperty('--glow', theme.glow)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  )
}

