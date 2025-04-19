// Theme definitions
const themes = {
  bloodMoon: {
    name: "Blood Moon",
    primary: "#ff0000",
    secondary: "#ff3333",
    background: "#000000",
  },
  cyberOcean: {
    name: "Cyber Ocean",
    primary: "#00ffff",
    secondary: "#0099ff",
    background: "#000913",
  },
  voidPurple: {
    name: "Void Purple",
    primary: "#9333ea",
    secondary: "#a855f7",
    background: "#0a0118",
  },
}

// Search recommendations
const searchRecommendations = [
  "Unblock websites",
  "Bypass restrictions",
  "Anonymous browsing",
  "Secure connection",
  "Hide IP address",
  "Access blocked content",
]

// DOM Elements
const app = document.getElementById("app")
const particlesCanvas = document.getElementById("particles-canvas")
const searchInput = document.getElementById("search-input")
const searchRecommendationsContainer = document.getElementById("search-recommendations")
const settingsBtn = document.getElementById("settings-btn")
const settingsDialog = document.getElementById("settings-dialog")
const closeDialogBtn = document.getElementById("close-dialog-btn")
const autoBlankSwitch = document.getElementById("auto-blank-switch")
const antiCloseSwitch = document.getElementById("anti-close-switch")
const aboutBlankBtn = document.getElementById("about-blank-btn")
const discordBtn = document.getElementById("discord-btn")
const navItems = document.querySelectorAll(".nav-item")
const pages = document.querySelectorAll(".page")
const themeButtons = document.querySelectorAll(".theme-btn")

// Current state
let currentTheme = localStorage.getItem("apex-theme") || "bloodMoon"
let autoBlank = localStorage.getItem("apex-auto-blank") === "true"
let antiClose = localStorage.getItem("apex-anti-close") === "true"

// Initialize the app
function init() {
  // Apply theme
  applyTheme(currentTheme)

  // Set active theme button
  updateActiveThemeButton()

  // Set switch states
  autoBlankSwitch.checked = autoBlank
  antiCloseSwitch.checked = antiClose

  // Initialize particles
  initParticles()

  // Set up event listeners
  setupEventListeners()
}

// Apply theme
function applyTheme(themeName) {
  const theme = themes[themeName]
  if (!theme) return

  document.documentElement.style.setProperty("--primary-color", theme.primary)
  document.documentElement.style.setProperty("--secondary-color", theme.secondary)
  document.documentElement.style.setProperty("--background-color", theme.background)

  // Update CSS variables
  document.body.style.backgroundColor = theme.background

  // Update nav icons
  document.querySelectorAll(".nav-icon").forEach((icon) => {
    icon.style.color = theme.primary
  })

  // Update nav tooltips
  document.querySelectorAll(".nav-tooltip").forEach((tooltip) => {
    tooltip.style.color = theme.primary
  })

  // Update active nav item
  const activeNavItem = document.querySelector(".nav-item.active")
  if (activeNavItem) {
    activeNavItem.style.boxShadow = `0 0 10px ${theme.primary}40`
    activeNavItem.style.borderColor = theme.primary
  }

  // Update title
  const title = document.querySelector(".title")
  if (title) {
    title.style.background = `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`
    title.style.textShadow = `0 0 20px ${theme.primary}80`
  }

  // Update search input
  const searchInput = document.querySelector(".search-input")
  if (searchInput) {
    searchInput.style.borderColor = theme.primary
    searchInput.style.color = theme.primary
    searchInput.style.boxShadow = `0 0 10px ${theme.primary}80`
  }

  // Update search icon
  const searchIcon = document.querySelector(".search-icon")
  if (searchIcon) {
    searchIcon.style.color = theme.primary
  }

  // Update buttons
  const aboutBlankBtn = document.querySelector(".about-blank-btn")
  if (aboutBlankBtn) {
    aboutBlankBtn.style.color = theme.primary
    aboutBlankBtn.style.borderColor = theme.primary
    aboutBlankBtn.style.boxShadow = `0 0 10px ${theme.primary}40`
    aboutBlankBtn.style.background = `linear-gradient(45deg, #000000, ${theme.primary}30)`
  }

  const discordBtn = document.querySelector(".discord-btn")
  if (discordBtn) {
    discordBtn.style.color = theme.secondary
    discordBtn.style.borderColor = theme.secondary
    discordBtn.style.boxShadow = `0 0 10px ${theme.secondary}40`
    discordBtn.style.background = `linear-gradient(45deg, #000000, ${theme.secondary}30)`
  }

  // Update settings button
  const settingsBtn = document.querySelector(".settings-btn")
  if (settingsBtn) {
    settingsBtn.style.color = theme.primary
    settingsBtn.style.boxShadow = `0 0 10px ${theme.primary}40`
  }

  // Update dialog
  const dialogContent = document.querySelector(".dialog-content")
  if (dialogContent) {
    dialogContent.style.borderColor = theme.primary
    dialogContent.style.boxShadow = `0 0 20px ${theme.primary}40`
  }

  // Update dialog title
  const dialogTitle = document.querySelector(".dialog-title")
  if (dialogTitle) {
    dialogTitle.style.background = `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`
  }

  // Update close button
  const closeBtn = document.querySelector(".close-dialog-btn")
  if (closeBtn) {
    closeBtn.style.color = theme.primary
  }

  // Update setting labels
  document.querySelectorAll(".setting-label").forEach((label) => {
    label.style.color = theme.primary
  })

  // Update sliders
  document.querySelectorAll("input:checked + .slider").forEach((slider) => {
    slider.style.backgroundColor = theme.primary
  })

  // Update page icons and titles
  document.querySelectorAll(".page-icon").forEach((icon) => {
    icon.style.color = theme.primary
  })

  document.querySelectorAll(".page-title").forEach((title) => {
    title.style.color = theme.primary
  })

  document.querySelectorAll(".page-description").forEach((desc) => {
    desc.style.color = theme.secondary
  })

  // Save theme preference
  localStorage.setItem("apex-theme", themeName)
  currentTheme = themeName
}

// Update active theme button
function updateActiveThemeButton() {
  themeButtons.forEach((btn) => {
    btn.classList.remove("active")
    if (btn.dataset.theme === currentTheme) {
      btn.classList.add("active")
      btn.style.borderColor = themes[currentTheme].primary
      btn.style.color = themes[currentTheme].primary
    }
  })
}

// Initialize particles
function initParticles() {
  const canvas = particlesCanvas
  const ctx = canvas.getContext("2d")

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const particles = []
  const particleCount = 100

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 2 + 1
      this.speedY = Math.random() * 1 + 0.5
      this.color = themes[currentTheme].primary
    }

    update() {
      this.y += this.speedY
      if (this.y > canvas.height) {
        this.y = 0 - this.size
        this.x = Math.random() * canvas.width
      }
    }

    draw() {
      ctx.fillStyle = this.color
      ctx.shadowBlur = 15
      ctx.shadowColor = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < particles.length; i++) {
      particles[i].color = themes[currentTheme].primary
      particles[i].update()
      particles[i].draw()
    }

    requestAnimationFrame(animate)
  }

  animate()

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}

// Set up event listeners
function setupEventListeners() {
  // Search input focus
  searchInput.addEventListener("focus", () => {
    searchInput.style.boxShadow = `0 0 20px ${themes[currentTheme].primary}70`
  })

  searchInput.addEventListener("blur", () => {
    searchInput.style.boxShadow = `0 0 10px ${themes[currentTheme].primary}50`
    setTimeout(() => {
      searchRecommendationsContainer.classList.add("hidden")
    }, 200)
  })

  // Search input typing
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase()
    if (query.length > 0) {
      const filteredRecommendations = searchRecommendations.filter((rec) => rec.toLowerCase().includes(query))

      if (filteredRecommendations.length > 0) {
        renderSearchRecommendations(filteredRecommendations)
        searchRecommendationsContainer.classList.remove("hidden")
      } else {
        searchRecommendationsContainer.classList.add("hidden")
      }
    } else {
      searchRecommendationsContainer.classList.add("hidden")
    }
  })

  // Settings dialog
  settingsBtn.addEventListener("click", () => {
    settingsDialog.classList.add("visible")
  })

  closeDialogBtn.addEventListener("click", () => {
    settingsDialog.classList.remove("visible")
  })

  // Click outside dialog to close
  settingsDialog.addEventListener("click", (e) => {
    if (e.target === settingsDialog) {
      settingsDialog.classList.remove("visible")
    }
  })

  // Theme buttons
  themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const themeName = btn.dataset.theme
      applyTheme(themeName)
      updateActiveThemeButton()
    })
  })

  // Auto blank switch
  autoBlankSwitch.addEventListener("change", () => {
    autoBlank = autoBlankSwitch.checked
    localStorage.setItem("apex-auto-blank", autoBlank)
  })

  // Anti close switch
  antiCloseSwitch.addEventListener("change", () => {
    antiClose = antiCloseSwitch.checked
    localStorage.setItem("apex-anti-close", antiClose)

    if (antiClose) {
      window.addEventListener("beforeunload", handleBeforeUnload)
    } else {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  })

  // About blank button
  aboutBlankBtn.addEventListener("click", openAboutBlank)

  // Discord button
  discordBtn.addEventListener("click", () => {
    window.open("https://discord.com", "_blank")
  })

  // Navigation
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const pageName = item.dataset.page
      navigateToPage(pageName)
    })
  })

  // Set up anti-close if enabled
  if (antiClose) {
    window.addEventListener("beforeunload", handleBeforeUnload)
  }
}

// Render search recommendations
function renderSearchRecommendations(recommendations) {
  searchRecommendationsContainer.innerHTML = ""

  recommendations.forEach((rec) => {
    const item = document.createElement("div")
    item.className = "recommendation-item"
    item.textContent = rec
    item.addEventListener("click", () => {
      searchInput.value = rec
      searchRecommendationsContainer.classList.add("hidden")
    })
    searchRecommendationsContainer.appendChild(item)
  })
}

// Navigate to page
function navigateToPage(pageName) {
  // Update active nav item
  navItems.forEach((item) => {
    item.classList.remove("active")
    if (item.dataset.page === pageName) {
      item.classList.add("active")
      item.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
      item.style.boxShadow = `0 0 10px ${themes[currentTheme].primary}40`
      item.style.border = `1px solid ${themes[currentTheme].primary}`
    } else {
      item.style.backgroundColor = "transparent"
      item.style.boxShadow = "none"
      item.style.border = "none"
    }
  })

  // Show active page
  pages.forEach((page) => {
    page.classList.remove("active")
    if (page.id === `${pageName}-page`) {
      page.classList.add("active")
    }
  })

  // Special handling for about-blank page
  if (pageName === "about-blank") {
    openAboutBlank()
  }
}

// Open about:blank
function openAboutBlank() {
  window.open("about:blank", "_blank")?.document.write(`
        <html>
            <head>
                <title>Google</title>
                <link rel="icon" href="https://www.google.com/favicon.ico">
            </head>
            <body style="margin:0;padding:0;overflow:hidden;height:100%;">
                <iframe src="${window.location.href}" style="border:none;width:100%;height:100vh;"></iframe>
            </body>
        </html>
    `)
}

// Handle before unload (anti-close)
function handleBeforeUnload(e) {
  e.preventDefault()
  e.returnValue = ""
  return ""
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", init)
