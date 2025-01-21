'use client'

import { useEffect, useRef } from 'react'

class Particle {
  x: number
  y: number
  radius: number
  speedX: number
  speedY: number
  context: CanvasRenderingContext2D
  canvasHeight: number
  canvasWidth: number

  constructor(context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.radius = Math.random() * 2 + 1
    this.speedX = (Math.random() - 0.5) * 0.5
    this.speedY = (Math.random() - 0.5) * 0.5
    this.context = context
    this.canvasHeight = canvasHeight
    this.canvasWidth = canvasWidth
  }

  draw() {
    this.context.beginPath()
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.context.fillStyle = '#ad0101'
    this.context.fill()
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x < 0 || this.x > this.canvasWidth) this.speedX *= -1
    if (this.y < 0 || this.y > this.canvasHeight) this.speedY *= -1
  }
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particles: Particle[] = []
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle(context, canvas.width, canvas.height))
    }

    let animationFrameId: number

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((particle) => {
        particle.draw()
        particle.update()
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" />
}

