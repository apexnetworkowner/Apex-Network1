'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

interface Message {
  id: string
  text: string
  sender: string
  timestamp: Date
}

const ChatRoom: React.FC = () => {
  const { theme } = useTheme()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulated initial messages
    setMessages([
      { id: '1', text: 'Welcome to APEX NETWORK chat!', sender: 'System', timestamp: new Date() },
      { id: '2', text: 'Feel free to start chatting.', sender: 'System', timestamp: new Date() },
    ])
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: 'User',
        timestamp: new Date(),
      }
      setMessages(prevMessages => [...prevMessages, newMessage])
      setInputMessage('')

      // Simulated response after a short delay
      setTimeout(() => {
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `Echo: ${inputMessage}`,
          sender: 'APEX AI',
          timestamp: new Date(),
        }
        setMessages(prevMessages => [...prevMessages, responseMessage])
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-4 rounded-lg" style={{ backgroundColor: `${theme.secondary}20` }}>
      <div className="flex-grow overflow-y-auto mb-4 p-4 rounded-lg" style={{ backgroundColor: `${theme.primary}40` }}>
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-4 p-3 rounded-lg ${message.sender === 'User' ? 'ml-auto' : 'mr-auto'}`}
              style={{
                maxWidth: '70%',
                backgroundColor: message.sender === 'User' ? theme.accent : theme.secondary,
              }}
            >
              <p className="text-sm font-bold mb-1" style={{ color: theme.text }}>
                {message.sender}
              </p>
              <p style={{ color: theme.text }}>{message.text}</p>
              <p className="text-xs mt-1 text-right" style={{ color: `${theme.text}80` }}>
                {message.timestamp.toLocaleTimeString()}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="flex">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 rounded-l-lg"
          style={{ backgroundColor: theme.primary, color: theme.text }}
        />
        <button
          type="submit"
          className="p-2 rounded-r-lg transition-colors duration-200"
          style={{ backgroundColor: theme.accent }}
        >
          <FontAwesomeIcon icon={faPaperPlane} style={{ color: theme.text }} />
        </button>
      </form>
    </div>
  )
}

export default ChatRoom

