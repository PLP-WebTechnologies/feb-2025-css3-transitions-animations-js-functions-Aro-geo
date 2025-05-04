const animateBtn = document.getElementById("animateBtn");
const saveBtn = document.getElementById("savePref");
const resetBtn = document.getElementById("resetPref");
const colorInput = document.getElementById("colorInput");
const darkModeToggle = document.getElementById("darkModeToggle");

// Trigger animation
animateBtn.addEventListener("click", () => {
  animateBtn.classList.add("animate");
  setTimeout(() => {
    animateBtn.classList.remove("animate");
  }, 600);
});

// Save preferences using localStorage
saveBtn.addEventListener("click", () => {
  const settings = {
    color: colorInput.value,
    darkMode: darkModeToggle.checked
  };
  localStorage.setItem("userSettings", JSON.stringify(settings));
  applySettings(settings);
  alert("Preferences saved!");
});

// Reset preferences
resetBtn.addEventListener("click", () => {
  localStorage.removeItem("userSettings");
  colorInput.value = "#3498db";
  darkModeToggle.checked = false;
  applySettings({ color: "#3498db", darkMode: false });
  alert("Preferences reset!");
});

// Apply settings
function applySettings(settings) {
  animateBtn.style.backgroundColor = settings.color;
  colorInput.value = settings.color;

  if (settings.darkMode) {
    document.body.style.setProperty("--bg-color", "#2c3e50");
    document.body.style.setProperty("--text-color", "#ecf0f1");
  } else {
    document.body.style.setProperty("--bg-color", "#ffffff");
    document.body.style.setProperty("--text-color", "#000000");
  }
  darkModeToggle.checked = settings.darkMode;
}

// Load saved settings
window.addEventListener("load", () => {
  const saved = localStorage.getItem("userSettings");
  if (saved) {
    const settings = JSON.parse(saved);
    applySettings(settings);
  } else {
    applySettings({ color: "#3498db", darkMode: false });
  }
});
