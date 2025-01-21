// Theme management
const themes = {
  cosmicVoid: {
    name: "Cosmic Void",
    background: "radial-gradient(circle, #0f0f23, #060614)",
    primary: "#3a3af0",
    secondary: "#6464a5",
    text: "#e2e2f0",
    accent: "#00ffff",
    glow: "0 0 15px #00ffff",
  },
  // ... (other themes)
}

function setTheme(themeName) {
  const theme = themes[themeName]
  if (theme) {
    document.documentElement.style.setProperty("--background", theme.background)
    document.documentElement.style.setProperty("--color-primary", theme.primary)
    document.documentElement.style.setProperty("--color-secondary", theme.secondary)
    document.documentElement.style.setProperty("--color-text", theme.text)
    document.documentElement.style.setProperty("--color-accent", theme.accent)
    document.documentElement.style.setProperty("--glow", theme.glow)
  }
}

// Set default theme
setTheme("cosmicVoid")

// Add this to your main.js file
document.addEventListener("DOMContentLoaded", (event) => {
  const particleContainer = document.getElementById("particle-container")
  if (particleContainer) {
    createParticleField(particleContainer)
  }
})

function createParticleField(container) {
  const particleCount = 100
  const particles = []

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "absolute rounded-full"
    particle.style.width = "2px"
    particle.style.height = "2px"
    particle.style.backgroundColor = "var(--color-accent)"
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${Math.random() * 100}%`
    particle.style.opacity = Math.random()
    container.appendChild(particle)
    particles.push(particle)
  }

  function animateParticles() {
    particles.forEach((particle) => {
      const speed = 0.2
      let x = Number.parseFloat(particle.style.left)
      let y = Number.parseFloat(particle.style.top)
      x += (Math.random() - 0.5) * speed
      y += (Math.random() - 0.5) * speed
      if (x < 0) x = 100
      if (x > 100) x = 0
      if (y < 0) y = 100
      if (y > 100) y = 0
      particle.style.left = `${x}%`
      particle.style.top = `${y}%`
    })
    requestAnimationFrame(animateParticles)
  }

  animateParticles()
}

// Create particle effect on all pages
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body
  const particleContainer = document.createElement("div")
  particleContainer.id = "particle-container"
  particleContainer.className = "fixed inset-0 pointer-events-none"
  body.insertBefore(particleContainer, body.firstChild)
  createParticleField(particleContainer)
})

