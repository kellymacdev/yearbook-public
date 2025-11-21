document.addEventListener("DOMContentLoaded", () => {
  const popup = document.createElement("div");
  popup.className = "image-popup";
  popup.innerHTML = "<img src='' alt=''>";
  document.body.appendChild(popup);

  const popupImg = popup.querySelector("img");

  // Open image
  document.querySelectorAll("img").forEach(img => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", e => {
      popupImg.src = img.src;
      popup.classList.add("active");
    });
  });

  // Close when clicking the background or pressing Escape
  popup.addEventListener("click", e => {
    if (e.target === popup) popup.classList.remove("active");
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") popup.classList.remove("active");
  });
});