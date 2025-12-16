const scriptTag = document.currentScript;
const scriptSrc = scriptTag.src;
const projectRoot = scriptSrc.substring(0, scriptSrc.lastIndexOf("/js/"));
const footerPath = `${projectRoot}/components/footer.html`;
const navbarPath = `${projectRoot}/components/navbar/index.html`;

document.addEventListener("DOMContentLoaded", function () {
  // Load Navbar
  const navbarPlaceholder = document.getElementById("navbar-placeholder");
  if (navbarPlaceholder) {
    fetch(navbarPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load navbar: ${response.statusText}`);
        }
        return response.text();
      })
      .then((data) => {
        navbarPlaceholder.innerHTML = data;

        // --- Fix navbar links to use correct paths ---
        const navLinks = navbarPlaceholder.querySelectorAll(".nav-menu a");
        const logoLink = navbarPlaceholder.querySelector(".logo");

        // Update logo to point to root index.html
        if (logoLink) {
          logoLink.href = `${projectRoot}/index.html`;
        }

        // Update navigation links
        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          if (href && href.startsWith("./")) {
            // Convert ./path to absolute path using projectRoot
            link.href = `${projectRoot}/${href.substring(2)}`;
          }
        });

        // --- Navbar Shrink Logic (from original script.js) ---
        const header = document.querySelector(".header");
        if (header) {
          window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
              header.classList.add("header-shrink");
            } else {
              header.classList.remove("header-shrink");
            }
          });
        }
      })
      .catch((error) =>
        console.error("Error loading navbar component:", error)
      );
  }

  // Load Footer
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    fetch(footerPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load footer: ${response.statusText}`);
        }
        return response.text();
      })
      .then((data) => {
        footerPlaceholder.innerHTML = data;
      })
      .catch((error) =>
        console.error("Error loading footer component:", error)
      );
  }
});
