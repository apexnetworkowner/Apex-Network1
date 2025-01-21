document.addEventListener("DOMContentLoaded", () => {
  const proxyForm = document.getElementById("proxy-form")
  const urlInput = document.getElementById("url-input")
  const proxyFrame = document.getElementById("proxy-frame")

  proxyForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const url = urlInput.value.trim()
    if (url) {
      // In a real proxy, you'd send this to your server
      // For this example, we'll just create an iframe
      proxyFrame.innerHTML = `<iframe src="${url}" width="100%" height="100%"></iframe>`
    }
  })
})

