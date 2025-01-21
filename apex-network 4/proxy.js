document.addEventListener("DOMContentLoaded", (event) => {
  const searchForm = document.getElementById("search-form")
  const searchInput = document.getElementById("search-input")
  const clearSearchButton = document.getElementById("clear-search")
  const searchSuggestions = document.getElementById("search-suggestions")
  const sidebar = document.getElementById("sidebar")

  let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || []

  function updateSidebar() {
    sidebar.innerHTML = `
            <div class="p-4 border-b border-accent border-opacity-20">
                <div class="flex items-center justify-between">
                    <span class="text-xl font-bold text-accent">APEX</span>
                    <button id="toggle-sidebar" class="p-2 rounded-lg hover:bg-accent hover:bg-opacity-10 transition-colors">
                        <i class="fas fa-chevron-left text-accent"></i>
                    </button>
                </div>
            </div>
            <div class="flex-1 overflow-y-auto py-4">
                <div class="space-y-2 px-2">
                    <button class="w-full flex items-center gap-4 p-2 rounded-lg hover:bg-accent hover:bg-opacity-10 transition-colors">
                        <i class="fas fa-home text-xl text-accent"></i>
                        <span class="text-text">Home</span>
                    </button>
                    <button class="w-full flex items-center gap-4 p-2 rounded-lg hover:bg-accent hover:bg-opacity-10 transition-colors">
                        <i class="fas fa-rocket text-xl text-accent"></i>
                        <span class="text-text">Launch</span>
                    </button>
                    <button class="w-full flex items-center gap-4 p-2 rounded-lg hover:bg-accent hover:bg-opacity-10 transition-colors">
                        <i class="fas fa-satellite text-xl text-accent"></i>
                        <span class="text-text">Explore</span>
                    </button>
                    <button id="toggle-sound" class="w-full flex items-center gap-4 p-2 rounded-lg hover:bg-accent hover:bg-opacity-10 transition-colors">
                        <i class="fas fa-volume-mute text-xl text-accent"></i>
                        <span class="text-text">Unmute</span>
                    </button>
                    <button id="toggle-fullscreen" class="w-full flex items-center gap-4 p-2 rounded-lg hover:bg-accent hover:bg-opacity-10 transition-colors">
                        <i class="fas fa-expand text-xl text-accent"></i>
                        <span class="text-text">Fullscreen</span>
                    </button>
                    <button id="show-history" class="w-full flex items-center gap-4 p-2 rounded-lg hover:bg-accent hover:bg-opacity-10 transition-colors">
                        <i class="fas fa-history text-xl text-accent"></i>
                        <span class="text-text">Flight Log</span>
                    </button>
                    <button id="show-settings" class="w-full flex items-center gap-4 p-2 rounded-lg hover:bg-accent hover:bg-opacity-10 transition-colors">
                        <i class="fas fa-cog text-xl text-accent"></i>
                        <span class="text-text">Mission Control</span>
                    </button>
                </div>
            </div>
            <div class="p-4 border-t border-accent border-opacity-20">
                <div class="flex items-center justify-center">
                    <i class="fas fa-clock text-sm mr-2 text-accent"></i>
                    <span id="current-time" class="text-sm font-medium text-accent"></span>
                </div>
            </div>
        `
  }

  updateSidebar()

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const searchTerm = searchInput.value.trim()
    if (searchTerm) {
      let searchUrl = searchTerm
      if (!isUrl(searchTerm)) {
        searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(searchTerm)
        recentSearches = [searchTerm, ...recentSearches.filter((s) => s !== searchTerm)].slice(0, 10)
        localStorage.setItem("recentSearches", JSON.stringify(recentSearches))
      } else if (!/^https?:\/\//i.test(searchTerm)) {
        searchUrl = "https://" + searchTerm
      }
      window.open(searchUrl, "_blank")
      searchInput.value = ""
      updateClearButton()
    }
  })

  searchInput.addEventListener("input", () => {
    updateClearButton()
    updateSearchSuggestions()
  })

  searchInput.addEventListener("focus", () => {
    updateSearchSuggestions()
  })

  clearSearchButton.addEventListener("click", () => {
    searchInput.value = ""
    updateClearButton()
    updateSearchSuggestions()
  })

  function updateClearButton() {
    if (searchInput.value) {
      clearSearchButton.classList.remove("hidden")
    } else {
      clearSearchButton.classList.add("hidden")
    }
  }

  function updateSearchSuggestions() {
    const query = searchInput.value.trim().toLowerCase()
    if (query) {
      const suggestions = [
        { text: `${query} search`, type: "search" },
        { text: `${query} online`, type: "search" },
        { text: `${query}.com`, type: "url" },
        { text: `best ${query}`, type: "trending" },
        { text: `${query} tutorial`, type: "trending" },
      ]
      renderSuggestions(suggestions)
    } else if (recentSearches.length > 0) {
      const suggestions = recentSearches.map((search) => ({ text: search, type: "history" }))
      renderSuggestions(suggestions)
    } else {
      searchSuggestions.classList.add("hidden")
    }
  }

  function renderSuggestions(suggestions) {
    searchSuggestions.innerHTML = suggestions
      .map(
        (suggestion) => `
            <button class="w-full px-4 py-3 flex items-center gap-4 rounded-lg hover:bg-accent hover:bg-opacity-20 transition-colors text-left">
                <i class="fas fa-${getSuggestionIcon(suggestion.type)} text-lg text-accent"></i>
                <span class="flex-1">${suggestion.text}</span>
                ${suggestion.type === "trending" ? '<span class="text-xs px-2 py-1 rounded-full bg-accent bg-opacity-40">Trending</span>' : ""}
            </button>
        `,
      )
      .join("")
    searchSuggestions.classList.remove("hidden")
  }

  function getSuggestionIcon(type) {
    switch (type) {
      case "search":
        return "search"
      case "history":
        return "clock"
      case "url":
        return "globe"
      case "trending":
        return "star"
      default:
        return "search"
    }
  }

  function isUrl(string) {
    try {
      new URL(string)
      return true
    } catch {
      return false
    }
  }

  // Sidebar functionality
  const toggleSidebarButton = document.getElementById("toggle-sidebar")
  toggleSidebarButton.addEventListener("click", () => {
    sidebar.classList.toggle("w-16")
    sidebar.classList.toggle("w-64")
  })

  // Sound toggle
  const toggleSoundButton = document.getElementById("toggle-sound")
  const ambientAudio = document.getElementById("ambient-audio")
  let isMuted = true

  toggleSoundButton.addEventListener("click", () => {
    if (isMuted) {
      ambientAudio.play()
      toggleSoundButton.innerHTML =
        '<i class="fas fa-volume-up text-xl text-accent"></i><span class="text-text">Mute</span>'
    } else {
      ambientAudio.pause()
      toggleSoundButton.innerHTML =
        '<i class="fas fa-volume-mute text-xl text-accent"></i><span class="text-text">Unmute</span>'
    }
    isMuted = !isMuted
  })

  // Fullscreen toggle
  const toggleFullscreenButton = document.getElementById("toggle-fullscreen")
  let isFullscreen = false

  toggleFullscreenButton.addEventListener("click", () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      }
      toggleFullscreenButton.innerHTML =
        '<i class="fas fa-compress text-xl text-accent"></i><span class="text-text">Exit Fullscreen</span>'
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
      toggleFullscreenButton.innerHTML =
        '<i class="fas fa-expand text-xl text-accent"></i><span class="text-text">Fullscreen</span>'
    }
    isFullscreen = !isFullscreen
  })

  // Update current time
  function updateTime() {
    const now = new Date()
    const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    document.getElementById("current-time").textContent = timeString
  }

  updateTime()
  setInterval(updateTime, 1000)
})

