document.addEventListener("DOMContentLoaded", () => {
  const games = [
    { name: "Cosmic Clash", image: "game1.jpg", category: "action" },
    { name: "Nebula Navigator", image: "game2.jpg", category: "puzzle" },
    { name: "Starship Simulator", image: "game3.jpg", category: "simulation" },
    { name: "Asteroid Annihilator", image: "game4.jpg", category: "action" },
    { name: "Quantum Quandary", image: "game5.jpg", category: "puzzle" },
  ]

  const gameGrid = document.getElementById("game-grid")
  const gameFilters = document.getElementById("game-filters")

  // Create filter buttons
  const categories = ["all", ...new Set(games.map((game) => game.category))]
  categories.forEach((category) => {
    const button = document.createElement("button")
    button.textContent = category.charAt(0).toUpperCase() + category.slice(1)
    button.addEventListener("click", () => filterGames(category))
    gameFilters.appendChild(button)
  })

  function filterGames(category) {
    const filteredGames = category === "all" ? games : games.filter((game) => game.category === category)
    renderGames(filteredGames)

    // Update active filter button
    document.querySelectorAll("#game-filters button").forEach((btn) => {
      btn.classList.toggle("active", btn.textContent.toLowerCase() === category)
    })
  }

  function renderGames(gamesToRender) {
    gameGrid.innerHTML = ""
    gamesToRender.forEach((game) => {
      const gameCard = document.createElement("div")
      gameCard.className = "game-card"
      gameCard.innerHTML = `
                <img src="${game.image}" alt="${game.name}">
                <h3>${game.name}</h3>
                <a href="#" class="play-button">Play Now</a>
            `
      gameGrid.appendChild(gameCard)
    })
  }

  // Initial render
  renderGames(games)
})

