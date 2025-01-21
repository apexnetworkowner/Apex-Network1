document.addEventListener("DOMContentLoaded", () => {
  const games = [
    {
      id: "1",
      name: "1v1.LOL",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1v1-ieeaDmTfv9u0AQXgmMF474EBLV8ZGp.png",
      url: "/games/1v1",
      popularity: 95,
      isNew: true,
      description: "Build and fight in this competitive shooter game",
    },
    {
      id: "2",
      name: "Block Blast",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BB-324301oLdyA2dv56h226xxYsKRAsga.png",
      url: "/games/block-blast",
      popularity: 88,
      description: "Classic puzzle game with colorful blocks",
    },
    {
      id: "3",
      name: "Call of Duty",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/callofduty-g6B5MRmTS63lXWZN7CT2Z7vMlYlSQW.png",
      url: "/games/cod",
      popularity: 98,
      description: "Experience intense military combat",
    },
    {
      id: "4",
      name: "Chess.com",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cs-w1pwDDcFCNFENBymwpgyAbB9qR66L0.png",
      url: "/games/chess",
      popularity: 92,
      description: "Play chess online against players worldwide",
    },
    {
      id: "5",
      name: "Bob The Robber",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BTR-ngQoiLLfvHDuvcfWdHb5PAEvglAktk.png",
      url: "/games/bob-the-robber",
      popularity: 85,
      description: "Stealth and strategy in this heist game",
    },
  ]

  const gameFilters = document.getElementById("game-filters")
  const gameGrid = document.getElementById("game-grid")

  const filters = [
    { id: "all", label: "All Games", icon: "gamepad" },
    { id: "new", label: "New", icon: "star" },
    { id: "popular", label: "Popular", icon: "fire" },
  ]

  let activeFilter = "all"

  function createFilterButtons() {
    filters.forEach((filter) => {
      const button = document.createElement("button")
      button.className = `px-4 py-2 rounded-lg flex items-center gap-2 ${
        filter.id === activeFilter ? "bg-accent bg-opacity-40" : "bg-secondary bg-opacity-20"
      } text-text hover:bg-accent hover:bg-opacity-20 transition-colors`
      button.innerHTML = `
                <i class="fas fa-${filter.icon}"></i>
                <span>${filter.label}</span>
            `
      button.addEventListener("click", () => {
        activeFilter = filter.id
        updateFilters()
        renderGames()
      })
      gameFilters.appendChild(button)
    })
  }

  function updateFilters() {
    gameFilters.querySelectorAll("button").forEach((button) => {
      if (button.textContent.trim() === filters.find((f) => f.id === activeFilter).label) {
        button.classList.add("bg-accent", "bg-opacity-40")
        button.classList.remove("bg-secondary", "bg-opacity-20")
      } else {
        button.classList.remove("bg-accent", "bg-opacity-40")
        button.classList.add("bg-secondary", "bg-opacity-20")
      }
    })
  }

  function renderGames() {
    gameGrid.innerHTML = ""
    const filteredGames = games.filter((game) => {
      if (activeFilter === "all") return true
      if (activeFilter === "new") return game.isNew
      if (activeFilter === "popular") return game.popularity > 90
      return true
    })

    filteredGames.forEach((game) => {
      const gameCard = document.createElement("div")
      gameCard.className =
        "relative p-4 rounded-xl glass-effect group bg-secondary bg-opacity-20 border border-accent border-opacity-40"
      gameCard.innerHTML = `
                <div class="relative mb-4 rounded-lg overflow-hidden">
                    <img src="${game.image}" alt="${game.name}" class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110">
                    ${game.isNew ? '<div class="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold bg-accent text-text">NEW</div>' : ""}
                </div>
                <h3 class="text-xl font-bold mb-2 text-accent">${game.name}</h3>
                <p class="text-sm mb-3 opacity-80 text-text">${game.description}</p>
                <div class="flex items-center gap-2">
                    <i class="fas fa-fire text-text"></i>
                    <div class="h-2 flex-1 rounded-full bg-secondary bg-opacity-40">
                        <div class="h-full rounded-full bg-accent" style="width: ${game.popularity}%"></div>
                    </div>
                </div>
            `
      gameGrid.appendChild(gameCard)
    })
  }

  createFilterButtons()
  renderGames()
})

