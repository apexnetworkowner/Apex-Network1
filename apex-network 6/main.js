document.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome to the Apex Network! 🚀")

  // Easter egg
  let konami = ""
  const konamiCode = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba"

  document.addEventListener("keydown", (e) => {
    konami += e.key
    if (konamiCode.indexOf(konami) !== 0) {
      konami = ""
      return
    }
    if (konami === konamiCode) {
      document.getElementById("easter-egg").style.display = "block"
      setTimeout(() => {
        document.getElementById("easter-egg").style.display = "none"
      }, 3000)
      konami = ""
    }
  })

  // Animate features on scroll
  const features = document.querySelectorAll(".feature")
  const observerOptions = {
    threshold: 0.5,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  features.forEach((feature) => {
    feature.style.opacity = "0"
    feature.style.transform = "translateY(50px)"
    feature.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    observer.observe(feature)
  })

  // Random color change for feature icons
  const colors = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#ff8c94", "#35a79c"]
  setInterval(() => {
    features.forEach((feature) => {
      const icon = feature.querySelector("i")
      icon.style.color = colors[Math.floor(Math.random() * colors.length)]
    })
  }, 3000)
})

