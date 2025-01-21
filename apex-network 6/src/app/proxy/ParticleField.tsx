'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from '../../components/ThemeProvider'

interface Particle {
  x: number
  y: number
  radius: number
  speedX: number
  speedY: number
  color: string
  twinkleSpeed: number
  twinklePhase: number
}

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles: Particle[] = []
    const particleCount = 200
    const connectionDistance = 100
    const mouseRadius = 150

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color: theme.accent,
      twinkleSpeed: Math.random() * 0.05 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
    })

    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle())
      }
    }

    const drawParticle = (particle: Particle) => {
      const twinkle = Math.sin(particle.twinklePhase) * 0.5 + 0.5
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius * twinkle, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.fill()

      // Draw glow effect
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.radius * 4
      )
      gradient.addColorStop(0, `${particle.color}${Math.floor(twinkle * 40).toString(16).padStart(2, '0')}`)
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.fill()
    }

    const updateParticle = (particle: Particle) => {
      particle.x += particle.speedX
      particle.y += particle.speedY

      if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
      if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

      particle.twinklePhase += particle.twinkleSpeed

      // Mouse interaction
      const dx = particle.x - mouseRef.current.x
      const dy = particle.y - mouseRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < mouseRadius) {
        const force = (1 - distance / mouseRadius) * 0.03
        particle.x += dx * force
        particle.y += dy * force
      }
    }

    const drawConnections = () => {
      ctx.strokeStyle = `${theme.accent}20`
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        drawParticle(particle)
        updateParticle(particle)
      })

      drawConnections()

      requestAnimationFrame(animate)
    }

    resizeCanvas()
    initParticles()
    animate()

    window.addEventListener('resize', resizeCanvas)
    canvas.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  )
}

export default ParticleField

