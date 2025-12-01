// Load footer CSS automatically
const footerCSS = document.createElement("link");
footerCSS.rel = "stylesheet";
footerCSS.href = "css/footer.css";
document.head.appendChild(footerCSS);

// Inject footer HTML after page loads
document.addEventListener("DOMContentLoaded", () => {
  const footerHTML = `
    <footer class="main-footer">
      

      <div class="footer-icons">
        <a href="https://www.instagram.com/b.a_hedir/" target="_blank" class="socialContainer containerOne">
          <svg class="socialSvg" viewBox="0 0 24 24">
            <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm4.5-.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5z"/>
          </svg>
        </a>

        <a href="https://www.linkedin.com/in/hadir-ben-arbia/" target="_blank" class="socialContainer containerTwo">
          <svg class="socialSvg" viewBox="0 0 24 24">
            <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.67-1.2 2.3-2.5 4.7-2.5 5 0 5.9 3.3 5.9 7.6V24h-5V16c0-1.9-.03-4.3-2.7-4.3-2.7 0-3.1 2.1-3.1 4.2V24h-5V8z"/>
          </svg>
        </a>

        <a href="https://github.com/bhedir" target="_blank" class="socialContainer containerThree">
          <svg class="socialSvg" viewBox="0 0 24 24">
            <path d="M12 .5C5.7.5.5 5.77.5 12.2c0 5.18 3.44 9.57 8.2 11.12.6.1.82-.26.82-.58v-2.02c-3.34.74-4.04-1.64-4.04-1.64-.54-1.4-1.32-1.78-1.32-1.78-1.1-.78.08-.76.08-.76 1.22.1 1.86 1.26 1.86 1.26 1.08 1.9 2.82 1.35 3.5 1.03.1-.8.42-1.35.75-1.66-2.66-.31-5.46-1.36-5.46-6.06 0-1.34.46-2.44 1.22-3.3-.12-.32-.53-1.57.12-3.27 0 0 1-.33 3.3 1.25a11.3 11.3 0 0 1 6 0c2.28-1.58 3.28-1.25 3.28-1.25.66 1.7.25 2.95.12 3.27.76.86 1.22 1.96 1.22 3.3 0 4.72-2.8 5.75-5.48 6.06.44.38.82 1.1.82 2.24v3.32c0 .34.2.7.82.58 4.76-1.55 8.2-5.94 8.2-11.12C23.5 5.77 18.3.5 12 .5z"/>
          </svg>
        </a>

        <a href="https://x.com/ba_hedir" target="_blank" class="socialContainer containerFour">
          <svg class="socialSvg" viewBox="0 0 24 24">
            <path d="M18.25 2.5h3.3l-7.2 8.23L22 21.5h-6.56l-4.58-6.05-5.24 6.05H2.3l7.7-8.9L2 2.5h6.7l4.12 5.38L18.25 2.5z"/>
          </svg>
        </a>
      </div>

      <p class="footer-copy">© 2025 Hedir Bel Arbia</p>
    </footer>
  `;

  document.body.insertAdjacentHTML("beforeend", footerHTML);
});
