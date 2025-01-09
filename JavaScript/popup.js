const closeBtn = document.querySelector(".closeBtn");

closeBtn.addEventListener("click", () => {
  popupOverlay.style.display = "none"; // Hide the popup
});

// Close popup when clicking outside the popup
window.addEventListener("click", (event) => {
  if (event.target === popupOverlay) {
    popupOverlay.style.display = "none"; // Hide the popup
  }
});