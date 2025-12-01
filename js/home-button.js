// Inject CSS
const css = document.createElement("link");
css.rel = "stylesheet";
css.href = "css/home-button.css";
document.head.appendChild(css);

// Insert button
document.addEventListener("DOMContentLoaded", () => {
  document.body.insertAdjacentHTML(
    "afterbegin",
    `
    <a href="index.html" class="home-btn">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none"
           viewBox="0 0 24 24" stroke-width="1.8">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M3 9.75L12 3l9 6.75M4.5 10.5V21h15V10.5"/>
      </svg>
    </a>
    `
  );
});
