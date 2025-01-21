document.addEventListener("DOMContentLoaded", (event) => {
  const features = document.querySelectorAll(".glass-effect")
  features.forEach((feature, index) => {
    feature.style.animationDelay = `${index * 0.1}s`
    feature.classList.add("animate-fadeIn")
  })
})

// Add any additional home page specific functionality here

