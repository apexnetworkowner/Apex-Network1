'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../lib/auth'
import { useTheme } from './ThemeProvider'

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, signup } = useAuth()
  const { theme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      if (isLogin) {
        await login(username, password)
      } else {
        await signup(username, password)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <label htmlFor="username" className="block text-sm font-medium mb-1" style={{ color: theme.text }}>
          Username
        </label>
        <div className="relative">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg pl-10 glass-effect"
            style={{ backgroundColor: `${theme.secondary}20`, color: theme.text }}
            required
          />
          <FontAwesomeIcon 
            icon={faUser} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2" 
            style={{ color: theme.accent }}
          />
        </div>
      </div>
      {!isLogin && (
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: theme.text }}>
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg pl-10 glass-effect"
              style={{ backgroundColor: `${theme.secondary}20`, color: theme.text }}
              required
            />
            <FontAwesomeIcon 
              icon={faEnvelope} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2" 
              style={{ color: theme.accent }}
            />
          </div>
        </div>
      )}
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1" style={{ color: theme.text }}>
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg pl-10 glass-effect"
            style={{ backgroundColor: `${theme.secondary}20`, color: theme.text }}
            required
          />
          <FontAwesomeIcon 
            icon={faLock} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2" 
            style={{ color: theme.accent }}
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <motion.button
        type="submit"
        className="w-full p-3 rounded-lg font-medium"
        style={{ backgroundColor: theme.accent, color: theme.primary }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isLogin ? 'Log in' : 'Sign up'}
      </motion.button>
      <motion.button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        className="w-full text-center text-sm"
        style={{ color: theme.accent }}
        whileHover={{ scale: 1.05 }}
      >
        {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
      </motion.button>
    </motion.form>
  )
}

