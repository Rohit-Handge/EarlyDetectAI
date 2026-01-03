// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu")
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden")
  } else {
    menu.classList.add("hidden")
  }
}

// Close mobile menu when clicking links
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("mobile-menu")
    menu.classList.add("hidden")
  })
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})
