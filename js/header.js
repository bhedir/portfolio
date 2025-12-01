// Inject CSS
const headerCSS = document.createElement("link");
headerCSS.rel = "stylesheet";
headerCSS.href = "css/header.css";
document.head.appendChild(headerCSS);

// Create the animated top bar
const bar = document.createElement("div");
bar.classList.add("top-loading-bar");
document.body.prepend(bar);

// Page → Progress % mapping
const pageProgress = {
  "index.html": "10%",
  "": "10%", // root fallback
  "experience.html": "30%",
  "projects.html": "50%",
  "certifications.html": "80%",
  "activities.html": "100%"
};

// Get current page file name
const currentPage = window.location.pathname.split("/").pop();

// Apply width based on the page
bar.style.width = pageProgress[currentPage] || "10%";
