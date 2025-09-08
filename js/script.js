// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");
    const header = document.querySelector(".header");
  
    if (!hamburger || !mobileMenu || !header) return;
  
    // Set menu top/height to sit exactly below the header
    function positionMenu() {
      const headerRect = header.getBoundingClientRect();
      const headerHeight = Math.ceil(headerRect.height); // integer px
      mobileMenu.style.top = headerHeight + "px";
      mobileMenu.style.height = `calc(100vh - ${headerHeight}px)`;
    }
  
    // initial position, and on resize/orientation change
    positionMenu();
    window.addEventListener("resize", positionMenu);
    window.addEventListener("orientationchange", positionMenu);
  
    // Toggle open/close (uses CSS .open class for slide animation)
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation(); // avoid immediate document click
      hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("open");
      // ensure fallback hidden class not blocking animation
      mobileMenu.classList.remove("hidden");
    });
  
    // Click outside to close the menu
    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target) && mobileMenu.classList.contains("open")) {
        mobileMenu.classList.remove("open");
        hamburger.classList.remove("active");
      }
    });
  
    // Optional: close when navigation link clicked
    mobileMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        hamburger.classList.remove("active");
      });
    });
    
    // Service card click → redirect with query
    document.querySelectorAll(".service-card").forEach(card => {
      card.addEventListener("click", () => {
        const service = card.dataset.service;
        window.location.href = `book.html?service=${encodeURIComponent(service)}`;
      });
    });
  
    // On booking page, display selected service
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    if (service && document.getElementById("selectedService")) {
      document.getElementById("selectedService").textContent = `Selected: ${service}`;
    }
  });
  