const menuToggle = document.querySelector(".menu-toggle");
const menuContainer = document.querySelector(".menu-container ul");

menuToggle.addEventListener("click", () => {
  menuContainer.classList.toggle("active");
});

// Close the menu when a link is clicked (optional)
document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menuContainer.classList.remove("active");
  });
});
