// ------------------------------------------------------------------------------------------------
// FÖRLADDA BILDER --------------------------------------------------------------------------------
// -------------------------------------------------------------------------------- FÖRLADDA BILDER

function preloadImages(urls) {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}
const imageUrls = ["../img/day-time-big.avif", "../img/nite-time-big.avif"];
window.onload = () => {
  preloadImages(imageUrls);
};

// ------------------------------------------------------------------------------------------------
// JUSTERAR BAKGRUNDEN ----------------------------------------------------------------------------
// ---------------------------------------------------------------------------- JUSTERAR BAKGRUNDEN

document.addEventListener("scroll", function () {
  let scrolledY = window.scrollY;
  let positionY = -scrolledY * 0.1;

  document.body.style.backgroundPosition = "center " + positionY + "px";
});

// ------------------------------------------------------------------------------------------------
// FÄRGTEMAT --------------------------------------------------------------------------------------
// Kollar om det finns något i local storage annars systemets och jag styr detta med klasser som
// appliceras på body. Har en knapp som växlar färgtemat och byter ikon i knappen beroende på vad
// som är föredraget. Kollar också efter ändringar i systemet , uppdaterar om användaren skiftar.
// -------------------------------------------------------------------------------------- FÄRGTEMAT

document.addEventListener("DOMContentLoaded", () => {
  const themeToggler = document.getElementById("theme-toggler");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  const currentTheme = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : null;

  if (currentTheme) {
    document.body.classList.add(currentTheme);
    updateButtonIcon(currentTheme);
  } else {
    updateThemeBody(prefersDarkScheme.matches);
  }

  themeToggler.addEventListener("click", () => {
    let theme = document.body.classList.contains("dark-theme")
      ? "light-theme"
      : "dark-theme";
    document.body.classList.remove("dark-theme", "light-theme");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    updateButtonIcon(theme);
  });

  prefersDarkScheme.addEventListener("change", (e) => {
    updateThemeBody(e.matches);
  });

  function updateThemeBody(isDark) {
    const theme = isDark ? "dark-theme" : "light-theme";
    document.body.classList.remove("dark-theme", "light-theme");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    updateButtonIcon(theme);
  }

  function updateButtonIcon(theme) {
    themeToggler.textContent = theme === "dark-theme" ? "☀️" : "🌑";
  }
});

// ------------------------------------------------------------------------------------------------
// Hover på temaknapp -----------------------------------------------------------------------------
// ----------------------------------------------------------------------------- Hover på temaknapp

const button = document.getElementById("theme-toggler");

button.addEventListener("mouseenter", function () {
  if (this.textContent === "☀️") {
    this.textContent = "🌞";
  } else if (this.textContent === "🌑") {
    this.textContent = "🌚";
  }
});

button.addEventListener("mouseleave", function () {
  if (this.textContent === "🌞") {
    this.textContent = "☀️";
  } else if (this.textContent === "🌚") {
    this.textContent = "🌑";
  }
});

// ------------------------------------------------------------------------------------------------
// Pausar border scroll vid resize ----------------------------------------------------------------
// ---------------------------------------------------------------- Pausar border scroll vid resize

window.addEventListener("resize", function () {
  let animatedElement = document.querySelector(".div-clouds-border-ani");
  animatedElement.style.animationPlayState = "paused";

  setTimeout(function () {
    animatedElement.style.animation = "none";
    animatedElement.offsetHeight;
    animatedElement.style.animation = "";
    animatedElement.style.animationPlayState = "running";
  }, 0);
});
